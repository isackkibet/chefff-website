import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { draftReply } from '@/lib/ai'

const schema = z.object({
  name:    z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
  context: z.enum(['contact', 'booking']).default('contact'),
})

const AI_CONFIGURED = Boolean(process.env.AI_API_KEY)

// Fallback used when no AI key is configured, so the feature still works.
function fallbackReply(context: 'contact' | 'booking', name: string, subject: string, message: string): string {
  const firstLine = message.split(/\n+/)[0].slice(0, 120)
  const opener = context === 'booking'
    ? `Thank you for your booking request${name ? `, ${name.split(' ')[0]}` : ''}! I've received it and it sounds like a great plan.`
    : `Thank you for reaching out${name ? `, ${name.split(' ')[0]}` : ''}, and for your message about "${subject}".`

  return `${opener}

I've noted your details${firstLine ? ` (${firstLine}…)` : ''} and I'll be in touch within 24 hours to confirm the menu, guest numbers and everything we need to make it perfect.

If you'd like to chat sooner, just reply here on WhatsApp.

Best,
Chef Harrizona`
}

// POST /api/admin/ai-reply, draft a reply to a client message using AI.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, subject, message, context } = schema.parse(body)

    if (!AI_CONFIGURED) {
      return NextResponse.json({ reply: fallbackReply(context, name, subject, message), provider: 'template' })
    }

    const reply = await draftReply({ context, name, subject, message })
    // Never block the admin: if the AI provider fails or returns empty,
    // fall back to a sensible template so there is always a draft to send.
    if (!reply) {
      return NextResponse.json({ reply: fallbackReply(context, name, subject, message), provider: 'template' })
    }

    return NextResponse.json({ reply, provider: 'ai' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/admin/ai-reply]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}