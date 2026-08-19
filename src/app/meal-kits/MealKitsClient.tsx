'use client'

import { useState } from 'react'
import { ShoppingCart, Star, Clock, Users, ChefHat, X, Check, Truck, Zap } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useToast } from '@/components/ui/ToastProvider'
import { useCart } from '@/lib/cart'
import { mealKits, type MealKit } from '@/lib/data'

type Filter = 'All' | 'Easy' | 'Beginner' | 'Intermediate' | 'Vegetarian' | 'Vegan' | 'Gluten Free'
const filters: Filter[] = ['All', 'Easy', 'Beginner', 'Intermediate', 'Vegetarian', 'Vegan', 'Gluten Free']

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`${rating} out of 5 stars`} role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`size-3.5 ${i < Math.round(rating) ? 'fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]' : 'fill-none text-[hsl(0_0%_30%)]'}`}
            viewBox="0 0 20 20" aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-semibold text-[hsl(45_90%_52%)]">{rating}</span>
      <span className="text-xs text-[hsl(0_0%_45%)]">({count})</span>
    </div>
  )
}

function DifficultyDot({ difficulty }: { difficulty: MealKit['difficulty'] }) {
  const color = { Easy: 'bg-[hsl(142_71%_45%)]', Beginner: 'bg-[hsl(142_71%_45%)]', Intermediate: 'bg-[hsl(38_92%_50%)]' }[difficulty]
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[hsl(0_0%_55%)]">
      <span className={`size-1.5 rounded-full ${color}`} aria-hidden="true" />
      {difficulty}
    </span>
  )
}

export default function MealKitsClient() {
  const { toast } = useToast()
  const { addItem, getQty, openCart } = useCart()
  const [filter, setFilter] = useState<Filter>('All')
  const [selected, setSelected] = useState<MealKit | null>(null)

  const filtered = mealKits.filter((kit) => {
    if (filter === 'All') return true
    if (['Easy', 'Beginner', 'Intermediate'].includes(filter)) return kit.difficulty === filter
    return kit.dietary?.includes(filter) ?? false
  })

  function addToCart(kit: MealKit) {
    addItem(kit)
    toast('success', `${kit.name} added to cart!`)
    openCart()
  }

  const discount = (kit: MealKit) =>
    Math.round(((kit.originalPrice - kit.price) / kit.originalPrice) * 100)

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Meal kits catalogue">
      <div className="mx-auto max-w-7xl">

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="group" aria-label="Filter meal kits">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === f
                  ? 'bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]'
                  : 'bg-[hsl(0_0%_14%)] text-[hsl(0_0%_65%)] hover:bg-[hsl(0_0%_18%)] hover:text-[hsl(42_30%_94%)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="text-sm text-[hsl(0_0%_45%)] text-center mb-8" aria-live="polite">
          Showing {filtered.length} kit{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Kits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
          {filtered.map((kit) => (
            <article
              key={kit.id}
              role="listitem"
              className="group flex flex-col overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={kit.image}
                  alt={kit.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {kit.badge && (
                    <span className="rounded-full bg-[hsl(45_90%_52%)] px-2.5 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                      {kit.badge}
                    </span>
                  )}
                  <span className="rounded-full bg-[hsl(0_72%_51%)] px-2.5 py-0.5 text-xs font-bold text-white">
                    -{discount(kit)}%
                  </span>
                </div>
                {/* Cart indicator */}
                {getQty(kit.id) > 0 && (
                  <div className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-[hsl(142_71%_45%)]">
                    <Check size={14} className="text-white" aria-label="Added to cart" />
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-4">
                <StarRating rating={kit.rating} count={kit.reviews} />

                <h2 className="mt-2 font-display font-semibold text-base leading-snug mb-1">
                  {kit.name}
                </h2>
                <p className="text-xs text-[hsl(0_0%_55%)] leading-relaxed mb-3 line-clamp-2 flex-1">
                  {kit.shortDesc}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 text-xs text-[hsl(0_0%_50%)]">
                  <span className="flex items-center gap-1">
                    <Users size={12} aria-hidden="true" /> {kit.serves}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" /> {kit.time}
                  </span>
                  <DifficultyDot difficulty={kit.difficulty} />
                </div>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {kit.features.slice(0, 2).map((f) => (
                    <div key={f} className="flex items-center gap-1.5 text-xs text-[hsl(0_0%_55%)]">
                      <Check size={11} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                      {f}
                    </div>
                  ))}
                </div>

                {/* Price + actions */}
                <div className="pt-3 border-t border-[hsl(0_0%_16%)]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-[hsl(45_90%_52%)]">
                      KSh {kit.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-[hsl(0_0%_40%)] line-through">
                      KSh {kit.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => addToCart(kit)}
                      aria-label={`Add ${kit.name} to cart`}
                    >
                      <ShoppingCart size={14} aria-hidden="true" />
                      {getQty(kit.id) > 0 ? `In Cart (${getQty(kit.id)})` : 'Add to Cart'}
                    </Button>
                    <button
                      onClick={() => setSelected(kit)}
                      className="rounded-full px-3 py-2 text-xs font-medium bg-[hsl(0_0%_18%)] text-[hsl(0_0%_65%)] hover:bg-[hsl(0_0%_22%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                      aria-label={`View details for ${kit.name}`}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Delivery info banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[hsl(38_85%_38%/0.15)] to-[hsl(45_90%_52%/0.08)] border border-[hsl(45_90%_52%/0.25)] p-6 sm:p-8">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { Icon: Truck,   title: 'Free Delivery',       desc: 'On all orders within Nairobi' },
              { Icon: Zap,     title: 'Same-Day Delivery',    desc: 'Order before 11 AM' },
              { Icon: ChefHat, title: 'Chef-Curated Recipes', desc: 'Step-by-step video guides included' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <div className="flex size-12 items-center justify-center rounded-full bg-[hsl(45_90%_52%/0.15)] text-[hsl(45_90%_52%)]">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <p className="font-semibold text-sm text-[hsl(42_30%_94%)]">{title}</p>
                <p className="text-xs text-[hsl(0_0%_55%)]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Custom order CTA */}
        <div className="mt-12 text-center">
          <p className="text-[hsl(0_0%_55%)] mb-4">Want a custom meal kit or a large order?</p>
          <ButtonLink href="/contact" variant="outline">Get in Touch</ButtonLink>
        </div>
      </div>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        aria-label={selected ? `Details for ${selected.name}` : undefined}
        className="max-w-lg"
      >
        {selected && (
          <div>
            {/* Image */}
            <div className="relative h-52 rounded-xl overflow-hidden mb-5 -mx-0">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center justify-between">
                  <StarRating rating={selected.rating} count={selected.reviews} />
                  {selected.badge && (
                    <span className="rounded-full bg-[hsl(45_90%_52%)] px-2.5 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                      {selected.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3 pr-8">
              <h2 className="font-display text-xl font-bold">{selected.name}</h2>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-[hsl(45_90%_52%)]">KSh {selected.price.toLocaleString()}</p>
                <p className="text-xs text-[hsl(0_0%_40%)] line-through">KSh {selected.originalPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 text-xs text-[hsl(0_0%_55%)] mb-4">
              <span className="flex items-center gap-1"><Users size={12} aria-hidden="true" /> {selected.serves}</span>
              <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" /> {selected.time}</span>
              <DifficultyDot difficulty={selected.difficulty} />
            </div>

            <p className="text-sm text-[hsl(0_0%_65%)] leading-relaxed mb-5">{selected.description}</p>

            {/* Two columns: ingredients + features */}
            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[hsl(42_30%_94%)] mb-2">
                  Ingredients Included
                </h3>
                <ul className="space-y-1.5">
                  {selected.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-1.5 text-xs text-[hsl(0_0%_60%)]">
                      <Check size={11} className="shrink-0 mt-0.5 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-[hsl(42_30%_94%)] mb-2">
                  Features
                </h3>
                <ul className="space-y-1.5">
                  {selected.features.map((f) => (
                    <li key={f} className="flex items-start gap-1.5 text-xs text-[hsl(0_0%_60%)]">
                      <Check size={11} className="shrink-0 mt-0.5 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dietary tags */}
            {selected.dietary && selected.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.dietary.map((d) => (
                  <span key={d} className="rounded-full bg-[hsl(142_71%_45%/0.12)] text-[hsl(142_71%_55%)] px-2.5 py-0.5 text-xs font-medium">
                    {d}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <Button
              variant="primary"
              size="lg"
              className="w-full gap-2"
              onClick={() => { addToCart(selected); setSelected(null) }}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              Add to Cart — KSh {selected.price.toLocaleString()}
            </Button>
          </div>
        )}
      </Modal>
    </section>
  )
}
