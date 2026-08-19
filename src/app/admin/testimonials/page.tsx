'use client'

import { useState, useEffect } from 'react'
import { Star, Trash2, Pin, PinOff } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { adminStore } from '@/lib/admin/store'
import { type Testimonial } from '@/lib/data'
import { useToast } from '@/components/ui/ToastProvider'

export default function AdminTestimonialsPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Testimonial[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => { setItems([...adminStore.testimonialsData]) }, [])

  function toggleFeatured(id: string) {
    adminStore.toggleFeatured(id)
    setItems([...adminStore.testimonialsData])
    toast('success', 'Featured status updated')
  }

  function handleDelete(id: string) {
    adminStore.deleteTestimonial(id)
    setItems([...adminStore.testimonialsData])
    setDeleteId(null)
    toast('success', 'Review removed')
  }

  const featured = items.filter((t) => t.featured)
  const rest = items.filter((t) => !t.featured)

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Testimonials</h1>
              <p className="text-sm text-[hsl(0_0%_50%)]">{items.length} reviews · {featured.length} featured</p>
            </div>

            <div className="rounded-xl bg-[hsl(45_90%_52%/0.06)] border border-[hsl(45_90%_52%/0.2)] px-4 py-3 mb-8">
              <p className="text-xs text-[hsl(45_90%_52%)]">
                <strong>Policy reminder:</strong> Only display genuine reviews from real guests. Never fabricate or edit the content of a customer review.
              </p>
            </div>

            {[{ title: 'Featured Reviews', data: featured }, { title: 'All Reviews', data: rest }].map(({ title, data }) => (
              data.length > 0 && (
                <div key={title} className="mb-10">
                  <h2 className="text-lg font-semibold mb-4">{title}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((t) => (
                      <div
                        key={t.id}
                        className={`rounded-2xl border p-5 ${t.featured ? 'bg-[hsl(0_0%_14%)] border-[hsl(45_90%_52%/0.3)]' : 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_18%)]'}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <StarRating rating={t.rating} size={14} />
                          {t.featured && <Badge variant="gold">Featured</Badge>}
                        </div>
                        <p className="text-sm text-[hsl(42_30%_85%)] italic leading-relaxed mb-4 line-clamp-4">"{t.text}"</p>
                        <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">{t.name}</p>
                        <p className="text-xs text-[hsl(0_0%_45%)] mb-1">{t.role} · {t.date}</p>
                        <Badge variant="muted">{t.service}</Badge>

                        <div className="flex gap-2 mt-4 pt-3 border-t border-[hsl(0_0%_16%)]">
                          <button
                            onClick={() => toggleFeatured(t.id)}
                            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_60%)] transition-colors"
                            aria-label={t.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            {t.featured ? <PinOff size={12} aria-hidden="true" /> : <Pin size={12} aria-hidden="true" />}
                            {t.featured ? 'Unfeature' : 'Feature'}
                          </button>
                          <button
                            onClick={() => setDeleteId(t.id)}
                            className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_72%_51%/0.1)] hover:bg-[hsl(0_72%_51%/0.2)] text-[hsl(0_72%_65%)] transition-colors"
                            aria-label={`Delete review from ${t.name}`}
                          >
                            <Trash2 size={13} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}

            {items.length === 0 && (
              <div className="py-24 text-center">
                <Star size={40} className="text-[hsl(0_0%_30%)] mx-auto mb-3" aria-hidden="true" />
                <p className="text-[hsl(0_0%_40%)]">No reviews yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} aria-label="Confirm delete review" className="max-w-sm">
        <div className="text-center py-2">
          <Trash2 size={36} className="text-[hsl(0_72%_65%)] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-semibold text-lg mb-2">Remove this review?</h2>
          <p className="text-sm text-[hsl(0_0%_50%)] mb-6">This will remove the review from your website.</p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
            <Button onClick={() => deleteId && handleDelete(deleteId)} className="flex-1 bg-[hsl(0_72%_51%)] text-white hover:bg-[hsl(0_72%_44%)]">Remove</Button>
          </div>
        </div>
      </Modal>
    </AdminGuard>
  )
}
