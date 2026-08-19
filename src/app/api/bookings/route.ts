import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db/client'
import { bookings } from '@/lib/db/schema'

const schema = z.object({
  fullName:        z.string().min(2),
  email:           z.email(),
  phone:           z.string().min(9),
  eventType:       z.string().min(1),
  eventDate:       z.string().min(1),
  preferredTime:   z.string().min(1),
  guestCount:      z.number().int().min(1).max(500),
  location:        z.string().min(3),
  budgetRange:     z.string().optional(),
  cuisinePrefs:    z.string().optional(),
  dietaryReqs:     z.string().optional(),
  specialRequests: z.string().optional(),
})

function generateRef() {
  return `CHEF-${Math.floor(1000 + Math.random() * 9000)}`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const refNumber = generateRef()

    const [booking] = await db.insert(bookings).values({
      refNumber,
      fullName:        data.fullName,
      email:           data.email,
      phone:           data.phone,
      eventType:       data.eventType,
      eventDate:       data.eventDate,
      preferredTime:   data.preferredTime,
      guestCount:      data.guestCount,
      location:        data.location,
      budgetRange:     data.budgetRange,
      cuisinePrefs:    data.cuisinePrefs,
      dietaryReqs:     data.dietaryReqs,
      specialRequests: data.specialRequests,
      status:          'PENDING',
    }).returning()

    return NextResponse.json({ success: true, refNumber, id: booking.id }, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    }
    console.error('[POST /api/bookings]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
