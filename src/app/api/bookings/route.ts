import { NextRequest, NextResponse, after } from 'next/server'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { bookings } from '@/lib/db/schema'
import { draftReply, sendReplyEmail } from '@/lib/ai'
import {
  forbiddenResponse,
  getClientIp,
  logSecurityEvent,
  originIsAllowed,
  rateLimit,
  rateLimitedResponse,
} from '@/lib/security'

const BOOKING_LIMIT = 10
const BOOKING_WINDOW_MS = 60 * 60 * 1000

const schema = z.object({
  fullName:        z.string().trim().min(2).max(80),
  email:           z.email().max(254),
  phone:           z.string().trim().min(9).max(30),
  eventType:       z.string().trim().min(1).max(80),
  eventDate:       z.string().trim().min(1).max(40),
  preferredTime:   z.string().trim().min(1).max(40),
  guestCount:      z.number().int().min(1).max(500),
  location:        z.string().trim().min(3).max(200),
  budgetRange:     z.string().trim().max(80).optional(),
  cuisinePrefs:    z.string().trim().max(500).optional(),
  dietaryReqs:     z.string().trim().max(500).optional(),
  specialRequests: z.string().trim().max(2_000).optional(),
})

function generateRef() {
  return `CHEF-${Math.floor(1000 + Math.random() * 9000)}`
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)

  if (!originIsAllowed(req)) {
    logSecurityEvent('origin-blocked', { ip, route: '/api/bookings' })
    return forbiddenResponse()
  }

  const { allowed, retryAfterSeconds } = rateLimit(`booking:${ip}`, BOOKING_LIMIT, BOOKING_WINDOW_MS)
  if (!allowed) {
    logSecurityEvent('rate-limited', { ip, route: '/api/bookings' })
    return rateLimitedResponse(retryAfterSeconds)
  }

  try {
    const body = await req.json()
    const data = schema.parse(body)

    const refNumber = generateRef()

    const [booking] = await db.insert(bookings).values({
      refNumber,
      fullName:        data.fullName,
      email:           data.email,
      phone:           data.phone,
      eventType:       data.eventType,
      eventDate:       data.eventDate,
      preferredTime:   data.preferredTime,
      guestCount:      data.guestCount,
      location:        data.location,
      budgetRange:     data.budgetRange,
      cuisinePrefs:    data.cuisinePrefs,
      dietaryReqs:     data.dietaryReqs,
      specialRequests: data.specialRequests,
      status:          'PENDING',
    }).returning()

    logSecurityEvent('submission', { ip, route: '/api/bookings', refNumber, id: booking.id })

    // Auto-reply assistant: draft a response immediately (and auto-email it
    // when RESEND_API_KEY is configured), without blocking the form response.
    after(async () => {
      try {
        const brief = [
          `Event type: ${data.eventType}`,
          `Date: ${data.eventDate} at ${data.preferredTime}`,
          `Guests: ${data.guestCount}`,
          `Location: ${data.location}`,
          data.budgetRange && `Budget: ${data.budgetRange}`,
          data.cuisinePrefs && `Cuisine preferences: ${data.cuisinePrefs}`,
          data.dietaryReqs && `Dietary requirements: ${data.dietaryReqs}`,
          data.specialRequests && `Special requests: ${data.specialRequests}`,
        ].filter(Boolean).join('\n')

        const reply = await draftReply({
          context: 'booking',
          name: data.fullName,
          subject: data.eventType,
          message: brief,
        })
        if (!reply) return

        const emailed = await sendReplyEmail({
          to: data.email,
          subject: `${data.eventType} booking ${refNumber} - Chef Harrizona`,
          reply,
        })

        await db
          .update(bookings)
          .set(emailed ? { aiReply: reply, replyEmailedAt: new Date() } : { aiReply: reply })
          .where(eq(bookings.id, booking.id))
      } catch (err) {
        console.error('[ai-autoreply booking]', err)
      }
    })

    return NextResponse.json({ success: true, refNumber, id: booking.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      logSecurityEvent('validation-failed', { ip, route: '/api/bookings' })
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}