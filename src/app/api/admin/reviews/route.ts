import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { ensureReviewsSchema, sql } from '@/lib/db'

// GET /api/admin/reviews, list all customer reviews, newest first
export async function GET() {
  try {
    await ensureReviewsSchema()
    const rows = await sql`
      SELECT id, name, service, rating, review, approved, created_at
      FROM customer_reviews
      ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch (err) {
    console.error('[GET /api/admin/reviews]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/admin/reviews, approve or unapprove a review
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const id = String(body.id ?? '')
    const approved = Boolean(body.approved)
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 422 })

    const rows = await sql`
      UPDATE customer_reviews
      SET approved = ${approved}
      WHERE id = ${id}
      RETURNING id, name, approved
    `
    if (rows.length === 0) return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (err) {
    console.error('[PATCH /api/admin/reviews]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/reviews?id=..., permanently remove a review
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 422 })

    await sql`DELETE FROM customer_reviews WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/admin/reviews]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}