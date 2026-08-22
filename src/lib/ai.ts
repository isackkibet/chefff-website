/**
 * Shared AI reply assistant used by the public form routes (auto-draft +
 * optional auto-email) and the admin panel endpoint.
 */

const AI_KEY = process.env.AI_API_KEY
const AI_BASE_URL = process.env.AI_BASE_URL ?? 'https://api.openai.com/v1'
const AI_MODEL = process.env.AI_MODEL ?? 'gpt-4o-mini'

export type ReplyContext = 'contact' | 'booking'

const systemPrompt = `You are the booking assistant for Chef Harrizona, a private chef in Nairobi, Kenya offering private dining, catering, cooking classes and weekly meal preparation.

Write a warm, professional reply from Chef Harrizona. Keep it friendly, concise and natural, like a real message rather than a marketing letter. Acknowledge what the client said, confirm the next step (a call/WhatsApp chat to discuss details within 24 hours) and sign off simply. No placeholders like [Name]. Use plain text with minimal line breaks. Never use em dashes.`

interface ReplyInput {
  context: ReplyContext
  name: string
  subject: string
  message: string
}

/**
 * Draft a client reply via the configured OpenAI-compatible provider.
 * Returns null when no key is configured or the provider fails, so callers
 * can fall back gracefully.
 */
export async function draftReply(input: ReplyInput): Promise<string | null> {
  if (!AI_KEY) return null

  try {
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
        // before writing the visible reply, so short caps can exhaust the
        // budget mid-reasoning and return an empty message.
        max_tokens: 4096,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `Client name: ${input.name}\nSubject: ${input.subject}\nTheir message:\n${input.message}\n\nWrite the reply.`,
          },
        ],
      }),
    })
    if (!res.ok) {
      console.error('[ai] Provider error:', res.status, await res.text())
      return null
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] }
    return data.choices?.[0]?.message?.content?.trim() || null
  } catch (err) {
    console.error('[ai] draftReply failed:', err)
    return null
  }
}

interface EmailInput {
  to: string
  subject: string
  reply: string
}

/**
 * Email an AI reply to a client via Resend. Returns false when RESEND_API_KEY
 * is not configured or sending fails, so auto-draft still works without it.
 */
export async function sendReplyEmail(input: EmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const from = process.env.RESEND_FROM || 'Chef Harrizona <onboarding@resend.dev>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        text: input.reply,
      }),
    })
    if (!res.ok) {
      console.error('[email] Resend error:', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[email] sendReplyEmail failed:', err)
    return false
  }
}
