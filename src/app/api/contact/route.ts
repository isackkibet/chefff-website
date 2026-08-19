import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db/client'
import { contactMessages } from '@/lib/db/schema'

const schema = z.object({
  name:    z.string().min(2),
  email:   z.email(),
  phone:   z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const [msg] = await db.insert(contactMessages).values({
      name:    data.name,
      email:   data.email,
      phone:   data.phone,
      subject: data.subject,
      message: data.message,
    }).returning()

    return NextResponse.json({ success: true, id: msg.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/contact]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
