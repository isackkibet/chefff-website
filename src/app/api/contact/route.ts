import { NextRequest, NextResponse, after } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { contactMessages } from '@/lib/db/schema'
import { draftReply, sendReplyEmail } from '@/lib/ai'
import {
  forbiddenResponse,
  getClientIp,
  logSecurityEvent,
  originIsAllowed,
  rateLimit,
  rateLimitedResponse,
} from '@/lib/security'

const CONTACT_LIMIT = 5
const CONTACT_WINDOW_MS = 60 * 60 * 1000

const schema = z.object({
  name:    z.string().trim().min(2).max(80),
  email:   z.email().max(254),
  phone:   z.string().trim().max(30).optional(),
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(5_000),
})

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (!originIsAllowed(req)) {
    logSecurityEvent('origin-blocked', { ip, route: '/api/contact' })
    return forbiddenResponse()
  }

  const { allowed, retryAfterSeconds } = rateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS)
  if (!allowed) {
    logSecurityEvent('rate-limited', { ip, route: '/api/contact' })
    return rateLimitedResponse(retryAfterSeconds)
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const [msg] = await db.insert(contactMessages).values({
      name:    data.name,
      email:   data.email,
      phone:   data.phone,
      subject: data.subject,
      message: data.message,
    }).returning()

    logSecurityEvent('submission', { ip, route: '/api/contact', id: msg.id })

    // Auto-reply assistant: draft a response immediately (and auto-email it
    // when RESEND_API_KEY is configured), without blocking the form response.
    after(async () => {
      try {
        const reply = await draftReply({
          context: 'contact',
          name: data.name,
          subject: data.subject,
          message: data.message,
        })
        if (!reply) return

        const emailed = await sendReplyEmail({
          to: data.email,
          subject: `Re: ${data.subject}`,
          reply,
        })

        await db
          .update(contactMessages)
          .set(emailed ? { aiReply: reply, replyEmailedAt: new Date() } : { aiReply: reply })
          .where(eq(contactMessages.id, msg.id))
      } catch (err) {
        console.error('[ai-autoreply contact]', err)
      }
    })

    return NextResponse.json({ success: true, id: msg.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      logSecurityEvent('validation-failed', { ip, route: '/api/contact' })
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}