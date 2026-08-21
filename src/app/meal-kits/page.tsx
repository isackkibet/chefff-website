import type { Metadata } from 'next'
import { Truck, Zap, Leaf } from 'lucide-react'
import MealKitsClient from './MealKitsClient'

export const metadata: Metadata = {
  title: 'Authentic Kenyan Meal Kits | Chef Harrizona',
  description:
    "Bring Chef Harrizona's expertise to your kitchen. Fresh ingredients, traditional Kenyan recipes and step-by-step guidance delivered to your door in Nairobi.",
}

export default function MealKitsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8" aria-label="Meal kits header">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">
                Harrizona Cullinaries
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Authentic Kenyan<br />
                <span className="text-gold-gradient">Meal Kits</span>
              </h1>
              <div className="section-divider mb-8" />
              <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed mb-8">
                Bring Chef Harrizona's expertise to your kitchen with our carefully curated meal kits.
                Fresh ingredients, traditional recipes, and step-by-step guidance for authentic Kenyan cuisine.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: <Truck size={16} aria-hidden="true" />, text: 'Free delivery in Nairobi' },
                  { icon: <Zap size={16} aria-hidden="true" />, text: 'Same-day delivery available' },
                  { icon: <Leaf size={16} aria-hidden="true" />, text: 'Fresh ingredients guaranteed' },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full bg-[hsl(0_0%_14%)] border border-[hsl(0_0%_20%)] px-4 py-2 text-sm text-[hsl(42_30%_85%)]"
                  >
                    <span className="text-[hsl(45_90%_52%)]" aria-hidden="true">{icon}</span>
                    {text}
                  </span>
                ))}
              </div>

              {/* Aggregate rating */}
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="size-5 fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-2xl font-display font-bold text-gold-gradient">4.8</span>
                <span className="text-sm text-[hsl(0_0%_50%)]">from 1,143 reviews</span>
              </div>
            </div>

            {/* Hero image grid */}
            <div className="grid grid-cols-2 gap-3 h-[420px]">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="/nyama-choma.jpeg"
                  alt="Nyama choma meal kit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
                    alt="Coastal fish meal kit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="/pilau-masala.jpeg"
                    alt="Pilau meal kit"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kits grid */}
      <MealKitsClient />
    </>
  )
}
