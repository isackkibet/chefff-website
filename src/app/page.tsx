import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, ChevronRight } from 'lucide-react'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { ButtonLink } from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import StarRating from '@/components/ui/StarRating'
import HeroBackground from '@/components/ui/HeroBackground'
import { brand, stats, services, menuItems, testimonials } from '@/lib/data'
import { ensureReviewsSchema, sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Chef Harrizona | Private Dining, Catering & Culinary Experiences in Nairobi',
  description: brand.description,
}

export default async function HomePage() {
  const featuredDishes = menuItems.filter((m) => m.chefPick).slice(0, 4)
  const featuredServices = services.slice(0, 4)

  let dbReviews: { id: string; name: string; service: string; rating: number; review: string }[] = []
  try {
    await ensureReviewsSchema()
    dbReviews = await sql`
      SELECT id, name, service, rating, review
      FROM customer_reviews
      WHERE approved = TRUE
      ORDER BY created_at DESC
      LIMIT 3
    ` as typeof dbReviews
  } catch (err) {
    console.error('Failed to load reviews for homepage', err)
  }

  const featuredTestimonials = dbReviews.length > 0
    ? dbReviews.map((r) => ({
        id: r.id,
        name: r.name,
        role: 'Verified Guest',
        rating: r.rating,
        text: r.review,
        service: r.service,
      }))
    : testimonials.filter((t) => t.featured)

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
<section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-24" aria-label="Hero">
        <HeroBackground />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="animate-fade-up mb-3 sm:mb-4 text-xs sm:text-base font-semibold uppercase tracking-[0.25em] text-[hsl(45_90%_52%)]">
            {brand.tagline}
          </p>
          <h1 className="animate-fade-up delay-100 text-[2.2rem] leading-tight sm:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Private Dining<br />
            <span className="text-gold-gradient">Crafted For You</span>
          </h1>
          <p className="animate-fade-up delay-200 text-base sm:text-xl text-[hsl(42_30%_85%)] max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            𝑨 𝒔𝒌𝒊𝒍𝒍𝒆𝒅 𝒂𝒏𝒅 𝒅𝒆𝒕𝒆𝒓𝒎𝒊𝒏𝒆𝒅 𝒄𝒉𝒆𝒇 𝒅𝒆𝒅𝒊𝒄𝒂𝒕𝒆𝒅 𝒕𝒐 𝒇𝒖𝒍𝒇𝒊𝒍𝒍 𝒚𝒐𝒖𝒓 𝒄𝒖𝒍𝒊𝒏𝒂𝒓𝒚 𝒘𝒊𝒔𝒉𝒆𝒔, 𝒘𝒉𝒆𝒕𝒉𝒆𝒓 𝒊𝒕𝒔 𝒂𝒏 𝒐𝒖𝒕𝒅𝒐𝒐𝒓 𝒆𝒗𝒆𝒏𝒕 𝒐𝒓 𝒂𝒕 𝒕𝒉𝒆 𝒄𝒐𝒎𝒇𝒐𝒓𝒕 𝒐𝒇 𝒚𝒐𝒖𝒓 𝒉𝒐𝒎𝒆.
          </p>
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <ButtonLink href="/book" size="lg" variant="primary">
              Book a Private Experience
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/menu" size="lg" variant="outline">
              Explore Menu
            </ButtonLink>
          </div>

          {/* Social proof */}
          <div className="animate-fade-up delay-400 mt-8 sm:mt-12 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&q=80',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&q=80',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&q=80',
              ].map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt=""
                  width={36}
                  height={36}
                  aria-hidden="true"
                  className="size-9 rounded-full border-2 border-[hsl(0_0%_10%)] object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-[hsl(42_30%_80%)]">Trusted by 100+ guests</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 rounded-full border-2 border-[hsl(45_90%_52%/0.5)] flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-[hsl(45_90%_52%)]" />
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="bg-[hsl(0_0%_7%)] border-y border-[hsl(0_0%_16%)] py-12" aria-label="Key statistics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl sm:text-4xl font-display font-bold text-gold-gradient">{s.value}</dt>
                <dd className="mt-1 text-sm text-[hsl(0_0%_55%)] uppercase tracking-wide">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Featured Services ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Our services">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="What We Offer"
            title="Culinary Experiences"
            subtitle="From intimate private dinners to grand event catering, every service is designed around you."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 card-hover"
              >
                <div className="mb-4 text-[hsl(45_90%_52%)]" aria-hidden="true"><ServiceIcon name={s.icon} size={40} /></div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-[hsl(45_90%_52%)] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed mb-4">{s.short}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[hsl(45_90%_52%)]">
                  Learn more <ChevronRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="outline">View All Services</ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Signature Dishes ─────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[hsl(0_0%_8%)]" aria-label="Signature dishes">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Signature Dishes"
            title="Chef's Finest Creations"
            subtitle="Each dish is a story, crafted with the finest ingredients and years of culinary expertise."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <article
                key={dish.id}
                className="group overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {dish.chefPick && (
                    <span className="absolute top-3 left-3 rounded-full bg-[hsl(45_90%_52%)] px-2.5 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                      Chef's Pick
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-base mb-1">{dish.name}</h3>
                  <p className="text-xs text-[hsl(0_0%_55%)] leading-relaxed mb-3 line-clamp-2">{dish.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[hsl(45_90%_52%)]">KES {dish.price.toLocaleString()}</span>
                    <Link href="/menu" className="text-xs font-medium text-[hsl(42_30%_94%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                      View dish →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/menu" variant="primary">View Full Menu</ButtonLink>
          </div>
        </div>
      </section>

      {/* ── About teaser ────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="About Chef Harrizona">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-[480px]">
              <Image
                src="/chef-about.jpeg"
                alt="Chef Harrizona in professional kitchen whites"
                fill
                className="object-contain bg-[hsl(0_0%_9%)]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] rounded-2xl p-5 shadow-xl max-w-[180px]">
              <p className="text-3xl font-display font-bold text-gold-gradient">4</p>
              <p className="text-xs text-[hsl(0_0%_55%)] mt-1">Years of culinary excellence</p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Meet the Chef</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Food is More Than<br />a Meal
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-[hsl(0_0%_65%)] leading-relaxed mb-6 text-lg">
              It is an experience, a memory and a way of bringing people together. Chef Harrizona has spent over a decade honing his craft across Nairobi's finest kitchens and private estates.
            </p>
            <p className="text-[hsl(0_0%_65%)] leading-relaxed mb-8">
              Specialising in contemporary African cuisine with classical French technique, every dish he carries his philosophy: exceptional ingredients, honest cooking and an unforgettable experience for every guest.
            </p>
            <ButtonLink href="/about" variant="primary">
              Read the Full Story
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Testimonials teaser ─────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[hsl(0_0%_8%)]" aria-label="Guest reviews">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Guest Reviews"
            title="What Our Guests Say"
            subtitle="Real experiences from real guests, with no manufactured reviews."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.map((t) => (
              <blockquote key={t.id} className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 card-hover">
                <StarRating rating={t.rating} className="mb-4" />
                <p className="text-[hsl(42_30%_85%)] leading-relaxed mb-6 italic">"{t.text}"</p>
                <footer className="flex items-center justify-between">
                  <div>
                    <cite className="not-italic font-semibold text-sm text-[hsl(42_30%_94%)]">{t.name}</cite>
                    <p className="text-xs text-[hsl(0_0%_45%)]">{t.role}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]">
                    {t.service}
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/reviews" variant="outline">See All Reviews</ButtonLink>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Call to action">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Ready to Begin?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Let's Create Something<br />
            <span className="text-gold-gradient">Unforgettable</span>
          </h2>
          <p className="text-[hsl(0_0%_65%)] text-lg mb-10 max-w-xl mx-auto">
            Whether it's an intimate dinner for two or a wedding for 200, get in touch and let Chef Harrizona bring the experience to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/book" size="lg" variant="primary">
              Book Your Experience
              <ArrowRight size={18} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">Get in Touch</ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
