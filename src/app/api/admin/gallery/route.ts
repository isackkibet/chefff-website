import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/lib/db/client'
import { galleryImages } from '@/lib/db/schema'
import { getGalleryRows } from '@/lib/gallery'

const CATEGORIES = ['Food', 'Events', 'Private Dining', 'Weddings', 'Behind the Scenes', 'Chef'] as const

// GET /api/admin/gallery, list all gallery images
export async function GET() {
  try {
    return NextResponse.json(await getGalleryRows())
  } catch (err) {
    console.error('[GET /api/admin/gallery]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

const addSchema = z.object({
  src: z.string().url().max(2000),
  alt: z.string().min(1).max(300),
  caption: z.string().max(200).optional(),
  category: z.enum(CATEGORIES),
})

// POST /api/admin/gallery, add an image
export async function POST(req: NextRequest) {
  try {
    const data = addSchema.parse(await req.json())
    const [row] = await db
      .insert(galleryImages)
      .values({
        src: data.src,
        alt: data.alt,
        caption: data.caption ?? null,
        category: data.category,
      })
      .returning()
    return NextResponse.json(row, { status: 201 })
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Validation failed', details: err.issues }, { status: 422 })
    console.error('[POST /api/admin/gallery]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/gallery?id=..., permanently remove an image
export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.searchParams.get('id'))
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: 'Invalid id' }, { status: 422 })
    }

    const deleted = await db.delete(galleryImages).where(eq(galleryImages.id, id)).returning({ id: galleryImages.id })
    if (deleted.length === 0) return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/admin/gallery]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
