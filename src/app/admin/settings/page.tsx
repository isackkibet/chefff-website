'use client'

import { useState } from 'react'
import { Save, Shield } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import Button from '@/components/ui/Button'
import { brand } from '@/lib/data'
import { useToast } from '@/components/ui/ToastProvider'

export default function AdminSettingsPage() {
  const { toast } = useToast()

  const [businessForm, setBusinessForm] = useState({
    name:          'Chef Harrizona',
    tagline:       brand.tagline,
    email:         brand.email,
    phone:         brand.phone,
    whatsapp:      brand.whatsapp,
    location:      brand.location,
    serviceArea:   brand.serviceArea,
    businessHours: brand.businessHours,
    description:   brand.description,
  })

  const [socialForm, setSocialForm] = useState({
    instagram: brand.instagram,
    tiktok:    brand.tiktok,
    facebook:  brand.facebook,
    youtube:   brand.youtube,
  })

  const [bookingForm, setBookingForm] = useState({
    depositPercent: '40',
    minNotice:      '14',
    currency:       'KES',
    maxGuests:      '500',
  })

  const [seoForm, setSeoForm] = useState({
    metaTitle:       'Chef Harrizona | Private Dining, Catering & Culinary Experiences in Nairobi',
    metaDescription: 'Chef Harrizona offers private dining, bespoke event catering, cooking classes and weekly meal preparation across Nairobi and surrounding areas.',
    canonicalUrl:    'https://chefharrizona.co.ke',
  })

  function save(section: string) {
    // In production this would POST to /api/admin/settings
    toast('success', `${section} settings saved`)
  }

  const inputClass = 'w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-4 py-3 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors'
  const labelClass = 'block text-sm font-medium mb-1.5 text-[hsl(42_30%_85%)]'

  const Section = ({ title, children, onSave }: { title: string; children: React.ReactNode; onSave: () => void }) => (
    <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 mb-6">
      <h2 className="text-lg font-semibold mb-6 pb-3 border-b border-[hsl(0_0%_16%)]">{title}</h2>
      <div className="space-y-4">{children}</div>
      <div className="mt-6 pt-4 border-t border-[hsl(0_0%_16%)]">
        <Button variant="primary" size="sm" onClick={onSave}>
          <Save size={14} aria-hidden="true" /> Save {title}
        </Button>
      </div>
    </div>
  )

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="px-4 py-6 pb-28 sm:px-6 lg:p-8 lg:pb-8 max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Settings</h1>
              <p className="text-sm text-[hsl(0_0%_50%)]">Business configuration and preferences</p>
            </div>

            {/* Business info */}
            <Section title="Business Information" onSave={() => save('Business')}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="s-name" className={labelClass}>Business Name</label>
                  <input id="s-name" value={businessForm.name} onChange={(e) => setBusinessForm({ ...businessForm, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-tagline" className={labelClass}>Tagline</label>
                  <input id="s-tagline" value={businessForm.tagline} onChange={(e) => setBusinessForm({ ...businessForm, tagline: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-email" className={labelClass}>Email</label>
                  <input id="s-email" type="email" value={businessForm.email} onChange={(e) => setBusinessForm({ ...businessForm, email: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-phone" className={labelClass}>Phone</label>
                  <input id="s-phone" type="tel" value={businessForm.phone} onChange={(e) => setBusinessForm({ ...businessForm, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-whatsapp" className={labelClass}>WhatsApp Number</label>
                  <input id="s-whatsapp" value={businessForm.whatsapp} onChange={(e) => setBusinessForm({ ...businessForm, whatsapp: e.target.value })} className={inputClass} placeholder="254768737930" />
                </div>
                <div>
                  <label htmlFor="s-hours" className={labelClass}>Business Hours</label>
                  <input id="s-hours" value={businessForm.businessHours} onChange={(e) => setBusinessForm({ ...businessForm, businessHours: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-location" className={labelClass}>Location</label>
                  <input id="s-location" value={businessForm.location} onChange={(e) => setBusinessForm({ ...businessForm, location: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-area" className={labelClass}>Service Area</label>
                  <input id="s-area" value={businessForm.serviceArea} onChange={(e) => setBusinessForm({ ...businessForm, serviceArea: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="s-desc" className={labelClass}>Business Description</label>
                <textarea id="s-desc" rows={3} value={businessForm.description} onChange={(e) => setBusinessForm({ ...businessForm, description: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
            </Section>

            {/* Social links */}
            <Section title="Social Media" onSave={() => save('Social Media')}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { id: 's-ig', label: 'Instagram URL', key: 'instagram' },
                  { id: 's-tt', label: 'TikTok URL',    key: 'tiktok' },
                  { id: 's-fb', label: 'Facebook URL',  key: 'facebook' },
                  { id: 's-yt', label: 'YouTube URL',   key: 'youtube' },
                ].map(({ id, label, key }) => (
                  <div key={id}>
                    <label htmlFor={id} className={labelClass}>{label}</label>
                    <input
                      id={id}
                      value={socialForm[key as keyof typeof socialForm]}
                      onChange={(e) => setSocialForm({ ...socialForm, [key]: e.target.value })}
                      className={inputClass}
                      placeholder="https://…"
                    />
                  </div>
                ))}
              </div>
            </Section>

            {/* Booking rules */}
            <Section title="Booking & Payments" onSave={() => save('Booking')}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="s-dep" className={labelClass}>Deposit Required (%)</label>
                  <input id="s-dep" type="number" min="0" max="100" value={bookingForm.depositPercent} onChange={(e) => setBookingForm({ ...bookingForm, depositPercent: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-notice" className={labelClass}>Minimum Notice (days)</label>
                  <input id="s-notice" type="number" min="1" value={bookingForm.minNotice} onChange={(e) => setBookingForm({ ...bookingForm, minNotice: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-currency" className={labelClass}>Currency</label>
                  <input id="s-currency" value={bookingForm.currency} onChange={(e) => setBookingForm({ ...bookingForm, currency: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="s-maxguests" className={labelClass}>Max Guests Per Event</label>
                  <input id="s-maxguests" type="number" value={bookingForm.maxGuests} onChange={(e) => setBookingForm({ ...bookingForm, maxGuests: e.target.value })} className={inputClass} />
                </div>
              </div>
            </Section>

            {/* SEO */}
            <Section title="SEO & Metadata" onSave={() => save('SEO')}>
              <div>
                <label htmlFor="s-meta-title" className={labelClass}>Default Page Title</label>
                <input id="s-meta-title" value={seoForm.metaTitle} onChange={(e) => setSeoForm({ ...seoForm, metaTitle: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label htmlFor="s-meta-desc" className={labelClass}>Default Meta Description</label>
                <textarea id="s-meta-desc" rows={3} value={seoForm.metaDescription} onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
              <div>
                <label htmlFor="s-canonical" className={labelClass}>Canonical URL</label>
                <input id="s-canonical" value={seoForm.canonicalUrl} onChange={(e) => setSeoForm({ ...seoForm, canonicalUrl: e.target.value })} className={inputClass} />
              </div>
            </Section>

            {/* Security notice */}
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-[hsl(45_90%_52%)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold mb-2">Security Reminders</h2>
                  <ul className="text-sm text-[hsl(0_0%_55%)] space-y-1.5">
                    <li>• Change the demo admin password before going live</li>
                    <li>• Store all secrets in environment variables, never in code</li>
                    <li>• Enable HTTPS on your production domain</li>
                    <li>• The current auth uses localStorage (demo only), replace with secure HTTP-only sessions in production</li>
                    <li>• Back up your database regularly</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
