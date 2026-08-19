'use client'

import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Clock, Users, Calendar, MapPin } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useToast } from '@/components/ui/ToastProvider'

const schema = z.object({
  fullName:        z.string().min(2, 'Full name is required'),
  email:           z.email('Valid email is required'),
  phone:           z.string().min(9, 'Phone number is required'),
  eventType:       z.string().min(1, 'Please select an event type'),
  eventDate:       z.string().min(1, 'Event date is required'),
  preferredTime:   z.string().min(1, 'Preferred time is required'),
  guestCount:      z.coerce.number().int().min(1, 'At least 1 guest is required').max(500),
  location:        z.string().min(3, 'Location is required'),
  budgetRange:     z.string().optional(),
  cuisinePrefs:    z.string().optional(),
  dietaryReqs:     z.string().optional(),
  specialRequests: z.string().optional(),
})
type FormData = z.infer<typeof schema>

const eventTypes = [
  'Private Dining',
  'Wedding Catering',
  'Corporate Event',
  'Birthday / Private Party',
  'Anniversary Dinner',
  'Cooking Class',
  'Weekly Meal Preparation',
  'Other',
]

const budgetRanges = [
  'Under KES 20,000',
  'KES 20,000 – 50,000',
  'KES 50,000 – 100,000',
  'KES 100,000 – 250,000',
  'Above KES 250,000',
  'Not sure yet',
]

const steps = [
  { icon: <Calendar size={20} />, title: 'Tell Us About Your Event', desc: 'Share the basics — date, location, guest count and type.' },
  { icon: <Users size={20} />,    title: 'Design Your Menu',           desc: 'Chef Harrizona creates a personalised proposal for you.' },
  { icon: <CheckCircle size={20} />, title: 'Confirm',               desc: 'Review and approve the proposal and deposit terms.' },
  { icon: <MapPin size={20} />,   title: 'Enjoy',                     desc: 'Chef arrives, cooks and serves an unforgettable experience.' },
]

const inputClass = 'w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_40%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors'
const labelClass = 'block text-sm font-medium mb-1.5'
const errorClass = 'mt-1 text-xs text-[hsl(0_72%_65%)]'

export default function BookingClient() {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [guestName, setGuestName] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  })

  async function onSubmit(data: FormData) {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const result = await response.json() as { refNumber?: string; error?: string }

    if (!response.ok || !result.refNumber) {
      toast('error', result.error ?? 'We could not submit your request. Please try again.')
      return
    }

    setBookingId(result.refNumber)
    setGuestName(data.fullName.split(' ')[0])
    setSubmitted(true)
    reset()
    toast('success', `Booking request ${result.refNumber} received!`)
  }

  if (submitted) {
    return (
      <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Booking confirmation">
        <div className="mx-auto max-w-lg text-center py-16">
          <div className="inline-flex size-20 items-center justify-center rounded-full bg-[hsl(142_71%_45%/0.15)] mb-6">
            <CheckCircle size={40} className="text-[hsl(142_71%_45%)]" aria-hidden="true" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Asante{guestName ? `, ${guestName}` : ''}! Request Received</h2>
          <p className="text-[hsl(0_0%_55%)] mb-8">
            Your booking request is safely with Chef Harrizona. He will personally review the details and get back to you within 24 hours. Karibu sana!
          </p>

          {/* Booking reference */}
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 mb-8 text-left">
            <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-1">Booking Reference</p>
            <p className="font-display text-2xl font-bold text-[hsl(45_90%_52%)] mb-4">#{bookingId}</p>

            {/* Status tracker */}
            <ol className="space-y-3" aria-label="Booking status">
              {[
                { label: 'Request Received', done: true },
                { label: 'Chef Reviewing', done: false },
                { label: 'Confirmed', done: false },
                { label: 'Completed', done: false },
              ].map(({ label, done }) => (
                <li key={label} className="flex items-center gap-3">
                  <span
                    className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      done
                        ? 'border-[hsl(45_90%_52%)] bg-[hsl(45_90%_52%)]'
                        : 'border-[hsl(0_0%_30%)] bg-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    {done && <CheckCircle size={12} className="text-[hsl(0_0%_10%)]" />}
                  </span>
                  <span className={`text-sm ${done ? 'text-[hsl(42_30%_94%)] font-medium' : 'text-[hsl(0_0%_40%)]'}`}>
                    {label}
                  </span>
                  {done && <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[hsl(45_90%_52%/0.15)] text-[hsl(45_90%_52%)]">Current</span>}
                </li>
              ))}
            </ol>
          </div>

          <p className="text-sm text-[hsl(0_0%_45%)]">
            Confirmation details will be sent to your email. For urgent enquiries, contact us on{' '}
            <a href="https://wa.me/254768737930" className="text-[hsl(45_90%_52%)] hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>

          <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-[hsl(45_90%_52%)] hover:underline">
            Submit another request
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Booking form">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-[1fr_420px] gap-16">

        {/* Form */}
        <div>
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <fieldset className="mb-8">
                <legend className="text-lg font-semibold mb-6 pb-3 border-b border-[hsl(0_0%_18%)] w-full">
                  Your Details
                </legend>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fullName" className={labelClass}>
                      Full Name <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="fullName" autoComplete="name"
                      {...register('fullName')}
                      aria-required="true" aria-invalid={!!errors.fullName}
                      className={inputClass} placeholder="Your full name"
                    />
                    {errors.fullName && <p role="alert" className={errorClass}>{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="email" type="email" autoComplete="email"
                      {...register('email')}
                      aria-required="true" aria-invalid={!!errors.email}
                      className={inputClass} placeholder="your@email.com"
                    />
                    {errors.email && <p role="alert" className={errorClass}>{errors.email.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="phone" type="tel" autoComplete="tel"
                      {...register('phone')}
                      aria-required="true" aria-invalid={!!errors.phone}
                      className={inputClass} placeholder="0768737930"
                    />
                    {errors.phone && <p role="alert" className={errorClass}>{errors.phone.message}</p>}
                  </div>
                </div>
              </fieldset>

              <fieldset className="mb-8">
                <legend className="text-lg font-semibold mb-6 pb-3 border-b border-[hsl(0_0%_18%)] w-full">
                  Event Details
                </legend>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="eventType" className={labelClass}>
                      Event Type <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <select
                      id="eventType"
                      {...register('eventType')}
                      aria-required="true" aria-invalid={!!errors.eventType}
                      className={`${inputClass} cursor-pointer`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select event type</option>
                      {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.eventType && <p role="alert" className={errorClass}>{errors.eventType.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="guestCount" className={labelClass}>
                      Number of Guests <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="guestCount" type="number" min="1" max="500"
                      {...register('guestCount')}
                      aria-required="true" aria-invalid={!!errors.guestCount}
                      className={inputClass} placeholder="e.g. 8"
                    />
                    {errors.guestCount && <p role="alert" className={errorClass}>{errors.guestCount.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="eventDate" className={labelClass}>
                      Event Date <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="eventDate" type="date"
                      {...register('eventDate')}
                      aria-required="true" aria-invalid={!!errors.eventDate}
                      className={inputClass}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.eventDate && <p role="alert" className={errorClass}>{errors.eventDate.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className={labelClass}>
                      Preferred Time <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="preferredTime" type="time"
                      {...register('preferredTime')}
                      aria-required="true" aria-invalid={!!errors.preferredTime}
                      className={inputClass}
                    />
                    {errors.preferredTime && <p role="alert" className={errorClass}>{errors.preferredTime.message}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="location" className={labelClass}>
                      Event Location <span aria-hidden="true" className="text-[hsl(0_72%_65%)]">*</span>
                    </label>
                    <input
                      id="location" autoComplete="street-address"
                      {...register('location')}
                      aria-required="true" aria-invalid={!!errors.location}
                      className={inputClass} placeholder="Full address or area (e.g. Karen, Nairobi)"
                    />
                    {errors.location && <p role="alert" className={errorClass}>{errors.location.message}</p>}
                  </div>
                </div>
              </fieldset>

              <fieldset className="mb-8">
                <legend className="text-lg font-semibold mb-6 pb-3 border-b border-[hsl(0_0%_18%)] w-full">
                  Preferences (optional)
                </legend>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budgetRange" className={labelClass}>Budget Range</label>
                    <select id="budgetRange" {...register('budgetRange')} className={`${inputClass} cursor-pointer`} defaultValue="">
                      <option value="">Select budget range</option>
                      {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cuisinePrefs" className={labelClass}>Cuisine Preferences</label>
                    <input
                      id="cuisinePrefs"
                      {...register('cuisinePrefs')}
                      className={inputClass} placeholder="e.g. East African, Italian, Mixed"
                    />
                  </div>
                  <div>
                    <label htmlFor="dietaryReqs" className={labelClass}>Dietary Requirements</label>
                    <input
                      id="dietaryReqs"
                      {...register('dietaryReqs')}
                      className={inputClass} placeholder="e.g. Vegetarian, Gluten-free, Nut allergy"
                    />
                  </div>
                  <div>
                    <label htmlFor="specialRequests" className={labelClass}>Special Requests</label>
                    <input
                      id="specialRequests"
                      {...register('specialRequests')}
                      className={inputClass} placeholder="Anything else we should know"
                    />
                  </div>
                </div>
              </fieldset>

              <Button type="submit" variant="primary" size="lg" loading={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting Request…' : 'Submit Booking Request'}
              </Button>

              <p className="mt-4 text-xs text-[hsl(0_0%_40%)] text-center">
                Submitting this form does not confirm a booking. Chef Harrizona will review your request and contact you within 24 hours.
                A deposit is required to confirm. See{' '}
                <a href="/cancellation-policy" className="text-[hsl(45_90%_52%)] hover:underline">Cancellation Policy</a>.
              </p>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Process steps */}
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6">
            <h2 className="font-semibold mb-5">How It Works</h2>
            <ol className="space-y-5" role="list">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]"
                    aria-label={`Step ${i + 1}`}
                  >
                    {step.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">{step.title}</p>
                    <p className="text-xs text-[hsl(0_0%_50%)] mt-0.5">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Quick info */}
          <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 space-y-4">
            <h2 className="font-semibold mb-2">Good to Know</h2>
            {[
              { Icon: Clock, text: 'Responses within 24 hours' },
              { Icon: Users, text: 'Serving groups of 2–200+' },
              { Icon: MapPin, text: 'Nairobi & surrounding areas' },
              { Icon: CheckCircle, text: '40% deposit to confirm' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-[hsl(0_0%_60%)]">
                <Icon size={15} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                {text}
              </div>
            ))}
          </div>

          {/* WhatsApp alternative */}
          <a
            href="https://wa.me/254768737930"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 p-5 hover:bg-[#25D366]/20 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="#25D366" className="size-8 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">Prefer WhatsApp?</p>
              <p className="text-xs text-[hsl(0_0%_50%)]">Chat directly for a faster response</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
