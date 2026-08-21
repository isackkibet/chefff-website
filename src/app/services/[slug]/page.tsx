import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ArrowRight, ArrowLeft, Tag } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import ServiceIcon from '@/components/ui/ServiceIcon'
import { services } from '@/lib/data'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.title} | Chef Harrizona`,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const s = service as typeof service & {
    price?: number; originalPrice?: number; priceLabel?: string;
    pricingItems?: { item: string; price: number; unit: string }[]
  }
  const discount = s.price && s.originalPrice
    ? Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100)
    : null

  const others = services.filter((sv) => sv.slug !== slug).slice(0, 3)

  return (
    <>
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors">
          <ArrowLeft size={16} aria-hidden="true" /> All Services
        </Link>
      </div>

      <article className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Content ─────────────────────────────────────── */}
          <div>
            <div className="mb-4 text-[hsl(45_90%_52%)]" aria-hidden="true"><ServiceIcon name={s.icon} size={48} /></div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{s.title}</h1>
            <div className="section-divider mb-8" />

            {/* Pricing block for priced services */}
            {s.price && s.originalPrice && (
              <div className="mb-8 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(45_90%_52%/0.3)] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {s.priceLabel && (
                      <p className="text-xs text-[hsl(0_0%_45%)] mb-0.5">{s.priceLabel}</p>
                    )}
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-display font-bold text-gold-gradient">
                        KES {s.price.toLocaleString()}
                      </span>
                      <span className="text-[hsl(0_0%_40%)] line-through text-lg">
                        KES {s.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {discount && (
                    <span className="rounded-full bg-[hsl(0_72%_51%)] px-3 py-1 text-sm font-bold text-white">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Per-item pricing table */}
                {s.pricingItems && s.pricingItems.length > 0 && (
                  <div className="rounded-xl bg-[hsl(0_0%_9%)] border border-[hsl(0_0%_16%)] overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[hsl(0_0%_14%)]">
                      <Tag size={13} className="text-[hsl(45_90%_52%)]" aria-hidden="true" />
                      <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(0_0%_45%)]">Item Pricing</span>
                    </div>
                    <dl className="divide-y divide-[hsl(0_0%_13%)]">
                      {s.pricingItems.map(({ item, price, unit }) => (
                        <div key={item} className="flex items-center justify-between px-4 py-3">
                          <dt className="text-sm text-[hsl(42_30%_85%)] font-medium">{item}</dt>
                          <dd className="text-right">
                            {price > 0 ? (
                              <>
                                <span className="font-bold text-[hsl(45_90%_52%)]">
                                  KES {price.toLocaleString()}
                                </span>
                                <span className="text-xs text-[hsl(0_0%_45%)] ml-1.5">{unit}</span>
                              </>
                            ) : (
                              <span className="text-xs italic text-[hsl(45_90%_52%)]">{unit}</span>
                            )}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )}

            <p className="text-[hsl(0_0%_65%)] leading-relaxed text-lg mb-8">{s.description}</p>

            <h2 className="font-semibold text-lg mb-4">What's Included</h2>
            <ul className="space-y-3 mb-10" role="list">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[hsl(0_0%_65%)]">
                  <CheckCircle size={18} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <ButtonLink href="/book" variant="primary" size="lg">
              {s.price ? 'Order Now' : 'Book This Service'}
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>

          {/* ── Image ───────────────────────────────────────── */}
          <div className="relative h-96 lg:h-[520px] rounded-3xl overflow-hidden">
            <Image
              src={s.image} alt={s.title} fill
              className="object-cover" priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {s.price && s.originalPrice && (
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-black/70 backdrop-blur-sm p-4">
                <p className="text-xs text-white/60 mb-1">{s.priceLabel ?? 'Package price'}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold text-[hsl(45_90%_52%)]">
                    KES {s.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/50 line-through">
                    KES {s.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Other services ──────────────────────────────── */}
        {others.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Other Services</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {others.map((sv) => {
                const other = sv as typeof sv & { price?: number; originalPrice?: number }
                return (
                  <Link
                    key={sv.slug} href={`/services/${sv.slug}`}
                    className="group rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 card-hover"
                  >
                    <div className="mb-3 text-[hsl(45_90%_52%)]" aria-hidden="true"><ServiceIcon name={sv.icon} size={28} /></div>
                    <h3 className="font-semibold mb-1 group-hover:text-[hsl(45_90%_52%)] transition-colors">{sv.title}</h3>
                    <p className="text-sm text-[hsl(0_0%_55%)] mb-3">{sv.short}</p>
                    {other.price && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[hsl(45_90%_52%)]">KES {other.price.toLocaleString()}</span>
                        {other.originalPrice && (
                          <span className="text-xs text-[hsl(0_0%_40%)] line-through">KES {other.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
