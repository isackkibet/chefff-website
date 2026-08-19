import type { Metadata } from 'next'
import MenuClient from './MenuClient'

export const metadata: Metadata = {
  title: 'Menu | Signature Dishes & Culinary Creations',
  description: 'Browse Chef Harrizona\'s full menu — starters, mains, desserts, drinks and chef specials. Filter by dietary requirements.',
}

export default function MenuPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Menu page header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Culinary Creations</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            The <span className="text-gold-gradient">Menu</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed max-w-xl mx-auto">
            Every dish is crafted from the finest seasonal ingredients. Menus for private events are fully customised — this is Chef Harrizona's signature collection.
          </p>
        </div>
      </section>
      <MenuClient />
    </>
  )
}
