import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name:    z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
  context: z.enum(['contact', 'booking']).default('contact'),
})

const AI_KEY = process.env.AI_API_KEY
const AI_BASE_URL = process.env.AI_BASE_URL ?? 'https://api.openai.com/v1'
const AI_MODEL = process.env.AI_MODEL ?? 'gpt-4o-mini'

const systemPrompt = `You are the booking assistant for Chef Harrizona, a private chef in Nairobi, Kenya offering private dining, catering, cooking classes and weekly meal preparation.

Write a warm, professional reply from Chef Harrizona. Keep it friendly, concise and natural, like a real message rather than a marketing letter. Acknowledge what the client said, confirm the next step (a call/WhatsApp chat to discuss details within 24 hours) and sign off simply. No placeholders like [Name]. Use plain text with minimal line breaks. Never use em dashes.`

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

    if (!AI_KEY) {
      return NextResponse.json({ reply: fallbackReply(context, name, subject, message), provider: 'template' })
    }

    const res = await fetch(`${AI_BASE_URL.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: 0.6,
        // Generous cap: reasoning models spend tokens on hidden reasoning
        // before writing the visible reply.
        max_tokens: 800,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Client name: ${name}\nSubject: ${subject}\nTheir message:\n${message}\n\nWrite the reply.`,
          },
        ],
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[ai-reply] Provider error:', res.status, errText)
      return NextResponse.json({ error: 'AI provider failed' }, { status: 502 })
    }

    const data = await res.json() as { choices?: { message?: { content?: string } }[] }
    const reply = data.choices?.[0]?.message?.content?.trim()
    if (!reply) return NextResponse.json({ error: 'Empty AI response' }, { status: 502 })

    return NextResponse.json({ reply, provider: 'ai' })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/admin/ai-reply]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}