import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { contactMessages } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

// GET /api/admin/contact, list all messages newest first
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
    return NextResponse.json(rows)
  } catch (err) {
    console.error('[GET /api/admin/contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/admin/contact, mark a message as read/unread
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const id = Number(body.id)
    const read = Boolean(body.read)
    if (!id) return NextResponse.json({ error: 'Invalid id' }, { status: 422 })

    const [updated] = await db
      .update(contactMessages)
      .set({ read })
      .where(eq(contactMessages.id, id))
      .returning()

    if (!updated) return NextResponse.json({ error: 'Message not found' }, { status: 404 })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('[PATCH /api/admin/contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
