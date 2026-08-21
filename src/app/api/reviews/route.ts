import { randomUUID } from 'crypto'
import { z } from 'zod'
import { ensureReviewsSchema, sql } from '@/lib/db'
import {
  forbiddenResponse,
  getClientIp,
  logSecurityEvent,
  originIsAllowed,
  rateLimit,
  rateLimitedResponse,
} from '@/lib/security'

const REVIEW_LIMIT = 5
const REVIEW_WINDOW_MS = 60 * 60 * 1000

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(80),
  service: z.string().trim().min(2).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  review: z.string().trim().min(20).max(1_000),
})

export async function POST(request: Request) {
  const ip = getClientIp(request)

  if (!originIsAllowed(request)) {
    logSecurityEvent('origin-blocked', { ip, route: '/api/reviews' })
    return forbiddenResponse()
  }

  const { allowed, retryAfterSeconds } = rateLimit(`review:${ip}`, REVIEW_LIMIT, REVIEW_WINDOW_MS)
  if (!allowed) {
    logSecurityEvent('rate-limited', { ip, route: '/api/reviews' })
    return rateLimitedResponse(retryAfterSeconds)
  }

  const parsed = reviewSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    logSecurityEvent('validation-failed', { ip, route: '/api/reviews' })
    return Response.json({ error: 'Please complete all fields before submitting.' }, { status: 400 })
  }

  try {
    await ensureReviewsSchema()
    const { name, service, rating, review } = parsed.data
    await sql`
      INSERT INTO customer_reviews (id, name, service, rating, review)
      VALUES (${randomUUID()}, ${name}, ${service}, ${rating}, ${review})
    `
    logSecurityEvent('submission', { ip, route: '/api/reviews' })
    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Unable to save review', error)
    return Response.json({ error: 'We could not submit your review. Please try again.' }, { status: 500 })
  }
}