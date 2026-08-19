import { randomUUID } from 'crypto'
import { z } from 'zod'
import { ensureReviewsSchema, sql } from '@/lib/db'

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(80),
  service: z.string().trim().min(2).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  review: z.string().trim().min(20).max(1_000),
})

export async function POST(request: Request) {
  const parsed = reviewSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return Response.json({ error: 'Please complete all fields before submitting.' }, { status: 400 })
  }

  try {
    await ensureReviewsSchema()
    const { name, service, rating, review } = parsed.data
    await sql`
      INSERT INTO customer_reviews (id, name, service, rating, review)
      VALUES (${randomUUID()}, ${name}, ${service}, ${rating}, ${review})
    `
    return Response.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Unable to save review', error)
    return Response.json({ error: 'We could not submit your review. Please try again.' }, { status: 500 })
  }
}
