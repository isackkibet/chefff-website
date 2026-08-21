import 'server-only'

import { asc, sql } from 'drizzle-orm'
import { db } from '@/lib/db/client'
import { galleryImages as galleryTable } from '@/lib/db/schema'
import { galleryImages as staticGallery, type GalleryImage } from '@/lib/data'

export interface GalleryRow {
  id: number
  src: string
  alt: string
  caption: string | null
  category: string
}

let seedPromise: Promise<void> | undefined

/** Inserts the built-in gallery once, so a fresh database still shows the default photos. */
export function ensureGallerySeeded(): Promise<void> {
  seedPromise ??= (async () => {
    const [row] = await db.select({ count: sql<number>`count(*)::int` }).from(galleryTable)
    if (row && row.count > 0) return

    await db.insert(galleryTable).values(
      staticGallery.map((img) => ({
        src: img.src,
        alt: img.alt,
        caption: img.caption ?? null,
        category: img.category,
      })),
    )
  })().catch((err) => {
    seedPromise = undefined
    throw err
  })

  return seedPromise
}

/** All gallery images from the database, oldest first. Throws if the database is unreachable. */
export async function getGalleryRows(): Promise<GalleryRow[]> {
  await ensureGallerySeeded()
  return db
    .select({
      id: galleryTable.id,
      src: galleryTable.src,
      alt: galleryTable.alt,
      caption: galleryTable.caption,
      category: galleryTable.category,
    })
    .from(galleryTable)
    .orderBy(asc(galleryTable.id))
}

/** Gallery for the public page. Falls back to the built-in photos if the database fails. */
export async function getPublicGallery(): Promise<GalleryImage[]> {
  try {
    const rows = await getGalleryRows()
    return rows.map((r) => ({
      id: `g${r.id}`,
      src: r.src,
      alt: r.alt,
      caption: r.caption ?? undefined,
      category: r.category as GalleryImage['category'],
    }))
  } catch (err) {
    console.error('[gallery] falling back to built-in images', err)
    return staticGallery
  }
}
