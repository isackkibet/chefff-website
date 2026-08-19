import { NextResponse } from 'next/server'
import { db } from '@/lib/db/client'
import { contactMessages } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

// GET /api/admin/contact — list all messages newest first
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
