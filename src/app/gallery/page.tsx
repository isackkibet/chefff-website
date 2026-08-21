import type { Metadata } from 'next'
import GalleryClient from './GalleryClient'
import { getPublicGallery } from '@/lib/gallery'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Gallery | Food, Events & Private Dining Photography',
  description: 'Browse Chef Harrizona\'s gallery of food photography, private dining events, weddings, corporate catering and behind-the-scenes moments.',
}

export default async function GalleryPage() {
  const images = await getPublicGallery()

  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Gallery header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">A Visual Story</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="text-gold-gradient">Gallery</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            A glimpse into the world of Chef Harrizona: the food, the events and the moments that make every experience unforgettable.
          </p>
        </div>
      </section>
      <GalleryClient images={images} />
    </>
  )
}
