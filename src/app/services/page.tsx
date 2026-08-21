import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Tag } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceIcon from '@/components/ui/ServiceIcon'
import AddToCartButton from '@/components/cart/AddToCartButton'
import { services } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Services | Private Chef, Catering, Pastry & Cooking Services',
  description:
    'Chef Harrizona offers private chef services, wedding catering, corporate events, cooking classes, pastry services and full cooking services across Nairobi.',
}

const process = [
  { step: '01', title: 'Tell Us About Your Event', desc: 'Share your date, location, guest count, event type and any food preferences.' },
  { step: '02', title: 'Design Your Menu',          desc: 'Chef Harrizona creates a personalised menu proposal for your approval.' },
  { step: '03', title: 'Confirm & Deposit',          desc: 'Review the proposal, confirm the details and secure with a deposit.' },
  { step: '04', title: 'Enjoy',                      desc: 'Chef Harrizona arrives, sets up and delivers an unforgettable culinary experience.' },
]

// Services that have explicit pricing
const pricedSlugs = ['pastry-services', 'cooking-services']

export default function ServicesPage() {
  const pricedServices   = services.filter((s) => pricedSlugs.includes(s.slug))
  const standardServices = services.filter((s) => !pricedSlugs.includes(s.slug))

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Services page header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">What We Offer</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Culinary <span className="text-gold-gradient">Services</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            Every service is designed around your specific needs. No templates. No compromise.
          </p>
        </div>
      </section>

      {/* ── Priced services (Pastry + Cooking) ────────────────── */}
      <section className="pb-10 px-4 sm:px-6 lg:px-8" aria-label="Priced service packages">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Fixed Pricing" title="Ready-to-Order Services" centered={false}
            subtitle="Straightforward pricing. Order directly or enquire for custom quantities." />

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {pricedServices.map((service) => {
              const s = service as typeof service & {
                price?: number; originalPrice?: number; priceLabel?: string;
                pricingItems?: { item: string; price: number; unit: string }[]
              }

              const discount = s.price && s.originalPrice
                ? Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100)
                : null

              return (
                <article
                  key={s.slug}
                  className="rounded-3xl bg-[hsl(0_0%_12%)] border border-[hsl(45_90%_52%/0.25)] overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={s.image} alt={s.title} fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                    {/* Price badge on image */}
                    {s.price && s.originalPrice && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          {s.priceLabel && (
                            <p className="text-xs text-white/70 mb-0.5">{s.priceLabel}</p>
                          )}
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-display font-bold text-[hsl(45_90%_52%)]">
                              KES {s.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-white/50 line-through">
                              KES {s.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {discount && (
                          <span className="rounded-full bg-[hsl(0_72%_51%)] px-2.5 py-1 text-xs font-bold text-white">
                            -{discount}% OFF
                          </span>
                        )}
                      </div>
                    )}
                    <span className="absolute top-4 left-4 text-[hsl(45_90%_52%)]" aria-hidden="true"><ServiceIcon name={s.icon} size={30} /></span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="text-xl font-bold mb-2">{s.title}</h2>
                    <p className="text-[hsl(0_0%_60%)] text-sm leading-relaxed mb-5">{s.description}</p>

                    {/* Pricing breakdown table */}
                    {s.pricingItems && s.pricingItems.length > 0 && (
                      <div className="mb-5 rounded-2xl bg-[hsl(0_0%_9%)] border border-[hsl(0_0%_18%)] overflow-hidden">
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[hsl(0_0%_16%)]">
                          <Tag size={14} className="text-[hsl(45_90%_52%)]" aria-hidden="true" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-[hsl(0_0%_50%)]">Pricing</span>
                        </div>
                        <dl className="divide-y divide-[hsl(0_0%_14%)]">
                          {s.pricingItems.map(({ item, price, unit }) => (
                            <div key={item} className="flex items-center justify-between px-4 py-2.5">
                              <dt className="text-sm text-[hsl(42_30%_85%)]">{item}</dt>
                              <dd className="text-right">
                                {price > 0 ? (
                                  <>
                                    <span className="font-bold text-[hsl(45_90%_52%)]">
                                      KES {price.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-[hsl(0_0%_45%)] ml-1">{unit}</span>
                                  </>
                                ) : (
                                  <span className="text-xs text-[hsl(45_90%_52%)] italic">{unit}</span>
                                )}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}

                    {/* Features */}
                    <ul className="space-y-2 mb-6 flex-1" role="list">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[hsl(0_0%_60%)]">
                          <CheckCircle size={15} className="shrink-0 mt-0.5 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 mt-auto">
                      <ButtonLink href="/book" variant="primary" size="sm" className="flex-1 justify-center">
                        Order Now <ArrowRight size={14} aria-hidden="true" />
                      </ButtonLink>
                      <ButtonLink href={`/services/${s.slug}`} variant="outline" size="sm">
                        Details
                      </ButtonLink>
                    </div>
                    <div className="mt-3">
                      <AddToCartButton
                        item={{ id: s.slug, name: s.title, price: s.price ?? 0, image: s.image }}
                      />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Standard services ──────────────────────────────────── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="All services">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Full Services" title="All Culinary Services" centered={false} />
          <div className="space-y-8">
            {standardServices.map((service, idx) => (
              <article
                key={service.slug}
                id={service.slug}
                className={`grid lg:grid-cols-2 gap-10 items-center rounded-3xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] overflow-hidden p-8 lg:p-12 ${idx % 2 !== 0 ? 'lg:[&>*:first-child]:order-2' : ''}`}
              >
                <div>
                  <div className="mb-4 text-[hsl(45_90%_52%)]" aria-hidden="true"><ServiceIcon name={service.icon} size={48} /></div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-[hsl(0_0%_65%)] leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2.5 mb-8" role="list">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-[hsl(0_0%_65%)]">
                        <CheckCircle size={16} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <ButtonLink href="/book" variant="primary" size="sm">
                      Book This Service <ArrowRight size={14} aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink href={`/services/${service.slug}`} variant="outline" size="sm">
                      Learn More
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={service.image} alt={service.title} fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[hsl(0_0%_8%)]" aria-label="How it works">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="The Process" title="How It Works" subtitle="Four simple steps from enquiry to unforgettable experience." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="relative rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 card-hover">
                <span className="text-5xl font-display font-bold text-[hsl(45_90%_52%/0.18)] absolute top-4 right-5" aria-hidden="true">{step}</span>
                <h3 className="font-semibold text-base mb-2 relative">{title}</h3>
                <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed relative">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center" aria-label="Booking call to action">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Book Your <span className="text-gold-gradient">Experience?</span>
          </h2>
          <p className="text-[hsl(0_0%_65%)] mb-10">
            Send your enquiry and Chef Harrizona will get back to you within 24 hours to discuss your event.
          </p>
          <ButtonLink href="/book" size="lg" variant="primary">
            Book Now <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
