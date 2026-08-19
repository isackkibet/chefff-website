'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import Button from '@/components/ui/Button'
import { brand } from '@/lib/data'
import { useToast } from '@/components/ui/ToastProvider'

const schema = z.object({
  name:    z.string().min(2, 'Please enter your name'),
  email:   z.email('Please enter a valid email'),
  phone:   z.string().optional(),
  subject: z.string().min(3, 'Please enter a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})
type FormData = z.infer<typeof schema>




export default function ContactClient() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
  })

  async function onSubmit(data: FormData) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await res.json() as { error?: string }

    if (!res.ok) {
      toast('error', result.error ?? 'Could not send your message. Please try again.')
      return
    }

    setSubmitted(true)
    reset()
    toast('success', "Your message has been sent. We'll be in touch shortly.")
  }

  const contactItems = [
    { Icon: Phone, label: 'Phone', value: brand.phone, href: `tel:${brand.phone}` },
    { Icon: Mail,  label: 'Email', value: brand.email, href: `mailto:${brand.email}` },
    { Icon: MapPin,label: 'Location', value: brand.serviceArea, href: null },
    { Icon: Clock, label: 'Business Hours', value: brand.businessHours, href: null },
  ]

  const socials = [
    { label: 'Instagram', href: brand.instagram, Icon: InstagramIcon },
    { label: 'TikTok',    href: brand.tiktok,    Icon: TikTokIcon },
    { label: 'Facebook',  href: brand.facebook,  Icon: FacebookIcon },
    { label: 'YouTube',   href: brand.youtube,   Icon: YoutubeIcon },
  ]

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Contact form and information">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16">

        {/* Info panel */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
          <ul className="space-y-5 mb-10" role="list">
            {contactItems.map(({ Icon, label, value, href }) => (
              <li key={label}>
                {href ? (
                  <a href={href} className="flex items-start gap-4 group">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-[hsl(42_30%_94%)] group-hover:text-[hsl(45_90%_52%)] transition-colors">{value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-sm font-medium text-[hsl(42_30%_94%)]">{value}</p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(brand.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 px-5 py-4 hover:bg-[#25D366]/25 transition-colors mb-10"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="#25D366" className="size-6 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">Chat on WhatsApp</p>
              <p className="text-xs text-[hsl(0_0%_55%)]">Quickest way to reach us</p>
            </div>
          </a>

          {/* Socials */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[hsl(0_0%_45%)] mb-3">Follow the Journey</p>
            <div className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-10 flex items-center justify-center rounded-full border border-[hsl(0_0%_22%)] text-[hsl(0_0%_55%)] hover:border-[hsl(45_90%_52%)] hover:text-[hsl(45_90%_52%)] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-10 rounded-2xl overflow-hidden h-56 bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={32} className="text-[hsl(45_90%_52%)] mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm text-[hsl(0_0%_55%)]">Serving Nairobi & surrounding areas</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

            {submitted ? (
              <div className="py-12 text-center animate-fade-in">
                <CheckCircle size={48} className="text-[hsl(142_71%_45%)] mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-[hsl(0_0%_55%)]">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-[hsl(45_90%_52%)] hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">
                      Name <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      autoComplete="name"
                      {...register('name')}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                      placeholder="Your name"
                    />
                    {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-[hsl(0_72%_65%)]">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">
                      Email <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      {...register('email')}
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-[hsl(0_72%_65%)]">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">Phone (optional)</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    {...register('phone')}
                    className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                    placeholder="0768737930"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">
                    Subject <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    {...register('subject')}
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p id="subject-error" role="alert" className="mt-1 text-xs text-[hsl(0_72%_65%)]">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">
                    Message <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    {...register('message')}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors resize-none"
                    placeholder="Tell us about your enquiry..."
                  />
                  {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-[hsl(0_72%_65%)]">{errors.message.message}</p>}
                </div>

                <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>

                <p className="text-xs text-[hsl(0_0%_40%)] text-center">
                  Your information is only used to respond to your enquiry. See our{' '}
                  <a href="/privacy-policy" className="text-[hsl(45_90%_52%)] hover:underline">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
