'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { galleryImages, type GalleryCategory } from '@/lib/data'

const categories: GalleryCategory[] = ['All', 'Food', 'Events', 'Private Dining', 'Weddings', 'Behind the Scenes', 'Chef']

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx)
    document.body.style.overflow = 'hidden'
  }
  const closeLightbox = () => {
    setLightboxIdx(null)
    document.body.style.overflow = ''
  }
  const prev = () => setLightboxIdx((i) => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  const next = () => setLightboxIdx((i) => i !== null ? (i + 1) % filtered.length : null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Gallery">
      <div className="mx-auto max-w-7xl">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Gallery categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]'
                  : 'bg-[hsl(0_0%_14%)] text-[hsl(0_0%_65%)] hover:bg-[hsl(0_0%_18%)] hover:text-[hsl(42_30%_94%)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4" role="list">
          {filtered.map((img, idx) => (
            <button
              key={img.id}
              role="listitem"
              onClick={() => openLightbox(idx)}
              className="relative w-full overflow-hidden rounded-xl block group cursor-pointer focus-visible:ring-2 focus-visible:ring-[hsl(45_90%_52%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_10%)]"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                {img.caption && (
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.caption}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIdx]?.alt}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 size-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div className="relative max-w-5xl max-h-[85vh] w-full mx-16">
            <Image
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              width={1200}
              height={800}
              className="object-contain max-h-[85vh] w-auto mx-auto rounded-xl"
              priority
            />
            {filtered[lightboxIdx].caption && (
              <p className="text-center mt-3 text-sm text-white/70">{filtered[lightboxIdx].caption}</p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 size-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/50" aria-live="polite">
            {lightboxIdx + 1} / {filtered.length}
          </p>
        </div>
      )}
    </section>
  )
}
