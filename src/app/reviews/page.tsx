import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import SectionHeader from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ReviewForm from './ReviewForm'
import { testimonials, stats } from '@/lib/data'
import { ensureReviewsSchema, sql } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Reviews | What Chef Harrizona's Guests Say",
  description: "Real testimonials from Chef Harrizona's guests: private dining, wedding catering, corporate events and cooking classes.",
}

export default async function ReviewsPage() {
  let dbReviews: { id: string; name: string; service: string; rating: number; review: string; created_at: string }[] = []
  try {
    await ensureReviewsSchema()
    dbReviews = await sql`
      SELECT id, name, service, rating, review, created_at
      FROM customer_reviews
      WHERE approved = TRUE
      ORDER BY created_at DESC
    ` as typeof dbReviews
  } catch (err) {
    console.error('Failed to load reviews from database', err)
  }

  const displayReviews = dbReviews.length > 0
    ? dbReviews.map((r) => ({
        id: r.id,
        name: r.name,
        role: 'Verified Guest',
        rating: r.rating,
        text: r.review,
        service: r.service,
        date: new Date(r.created_at).toLocaleDateString('en-KE', { month: 'short', year: 'numeric' }),
        featured: false,
      }))
    : testimonials

  const avgRating = displayReviews.reduce((sum, t) => sum + t.rating, 0) / displayReviews.length

  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Reviews header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Guest Feedback</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Real <span className="text-gold-gradient">Reviews</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <StarRating rating={5} size={28} />
              <span className="text-3xl font-display font-bold text-gold-gradient">{avgRating.toFixed(1)}/5</span>
            </div>
            <p className="text-[hsl(0_0%_55%)]">Based on {displayReviews.length} verified review{displayReviews.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </section>

      <section className="bg-[hsl(0_0%_7%)] border-y border-[hsl(0_0%_16%)] py-10 px-4 sm:px-6 lg:px-8" aria-label="Summary statistics">
        <div className="mx-auto max-w-7xl">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-display font-bold text-gold-gradient">{s.value}</dt>
                <dd className="mt-1 text-sm text-[hsl(0_0%_55%)] uppercase tracking-wide">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Guest testimonials">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Testimonials" title="What Our Guests Say" subtitle="These are real reviews from real guests. We never fabricate feedback." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((t) => (
              <blockquote
                key={t.id}
                className={`rounded-2xl border p-6 card-hover flex flex-col ${
                  t.featured ? 'bg-[hsl(0_0%_14%)] border-[hsl(45_90%_52%/0.3)]' : 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_18%)]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <StarRating rating={t.rating} />
                  {t.featured && <Badge variant="gold">Featured</Badge>}
                </div>
                <p className="text-[hsl(42_30%_85%)] leading-relaxed italic flex-1 mb-6">“{t.text}”</p>
                <footer className="flex items-center justify-between mt-auto pt-4 border-t border-[hsl(0_0%_18%)]">
                  <div>
                    <cite className="not-italic font-semibold text-sm text-[hsl(42_30%_94%)]">{t.name}</cite>
                    <p className="text-xs text-[hsl(0_0%_45%)]">{t.role} · {t.date}</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[hsl(0_0%_18%)] text-[hsl(0_0%_55%)]">{t.service}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <ReviewForm />

      <section className="pb-24 px-4 sm:px-6 lg:px-8 text-center" aria-label="Book call to action">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Ready to Create Your Own <span className="text-gold-gradient">Memory?</span>
          </h2>
          <ButtonLink href="/book" size="lg" variant="primary">
            Book Your Experience <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
