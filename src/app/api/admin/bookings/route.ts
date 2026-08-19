import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { bookings } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

// GET /api/admin/bookings — list all, newest first
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))

    return NextResponse.json(rows)
  } catch (err) {
    console.error('[GET /api/admin/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const patchSchema = z.object({
  id:            z.number().int(),
  status:        z.enum(['PENDING','REVIEWING','QUOTED','CONFIRMED','CANCELLED','COMPLETED']).optional(),
  notes:         z.string().optional(),
  quotedAmount:  z.number().int().optional(),
})

// PATCH /api/admin/bookings — update status / notes / quote
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, notes, quotedAmount } = patchSchema.parse(body)

    const updates: Record<string, unknown> = { updatedAt: new Date() }
    if (status)       updates.status       = status
    if (notes !== undefined) updates.notes = notes
    if (quotedAmount !== undefined) updates.quotedAmount = quotedAmount

    const [updated] = await db
      .update(bookings)
      .set(updates)
      .where(eq(bookings.id, id))
      .returning()

    if (!updated) return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[PATCH /api/admin/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
