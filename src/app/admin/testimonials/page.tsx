'use client'

import { useState, useEffect } from 'react'
import { Star, Trash2, CheckCircle, XCircle } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useToast } from '@/components/ui/ToastProvider'

interface CustomerReview {
  id: string
  name: string
  service: string
  rating: number
  review: string
  approved: boolean
  created_at: string
}

export default function AdminTestimonialsPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<CustomerReview[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function loadReviews() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reviews')
      if (!res.ok) throw new Error('Failed to load reviews')
      setItems(await res.json())
    } catch {
      toast('error', 'Could not load reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadReviews() }, [])

  async function setApproved(id: string, approved: boolean) {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, approved }),
      })
      if (!res.ok) throw new Error('Failed to update')
      await loadReviews()
      toast('success', approved ? 'Review approved, now live on the site' : 'Review unapproved, hidden from the site')
    } catch {
      toast('error', 'Could not update review')
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      await loadReviews()
      setDeleteId(null)
      toast('success', 'Review removed')
    } catch {
      toast('error', 'Could not delete review')
    }
  }

  const pending = items.filter((r) => !r.approved)
  const approved = items.filter((r) => r.approved)

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Reviews</h1>
              <p className="text-sm text-[hsl(0_0%_50%)]">
                {items.length} submitted · {pending.length} awaiting approval · {approved.length} live on the site
              </p>
            </div>

            <div className="rounded-xl bg-[hsl(45_90%_52%/0.06)] border border-[hsl(45_90%_52%/0.2)] px-4 py-3 mb-8">
              <p className="text-xs text-[hsl(45_90%_52%)]">
                <strong>How it works:</strong> Reviews submitted by guests land here as <em>pending</em>. Approve them to publish on the Reviews page, or delete anything inappropriate.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-24">
                <LoadingSpinner size="md" />
              </div>
            ) : (
              <>
                {[{ title: `Pending Approval (${pending.length})`, data: pending }, { title: `Approved and Live (${approved.length})`, data: approved }].map(({ title, data }) => (
                  data.length > 0 && (
                    <div key={title} className="mb-10">
                      <h2 className="text-lg font-semibold mb-4">{title}</h2>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((r) => (
                          <div
                            key={r.id}
                            className={`rounded-2xl border p-5 ${r.approved ? 'bg-[hsl(0_0%_12%)] border-[hsl(0_0%_18%)]' : 'bg-[hsl(45_90%_52%/0.05)] border-[hsl(45_90%_52%/0.35)]'}`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <StarRating rating={r.rating} size={14} />
                              <Badge variant={r.approved ? 'gold' : 'muted'}>{r.approved ? 'Live' : 'Pending'}</Badge>
                            </div>
                            <p className="text-sm text-[hsl(42_30%_85%)] italic leading-relaxed mb-4 line-clamp-4">"{r.review}"</p>
                            <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">{r.name}</p>
                            <p className="text-xs text-[hsl(0_0%_45%)] mb-1">{r.service} · {formatDate(r.created_at)}</p>

                            <div className="flex gap-2 mt-4 pt-3 border-t border-[hsl(0_0%_16%)]">
                              <button
                                onClick={() => setApproved(r.id, !r.approved)}
                                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-colors ${
                                  r.approved
                                    ? 'bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_60%)]'
                                    : 'bg-[hsl(142_71%_45%/0.15)] hover:bg-[hsl(142_71%_45%/0.25)] text-[hsl(142_71%_55%)]'
                                }`}
                              >
                                {r.approved ? <XCircle size={12} aria-hidden="true" /> : <CheckCircle size={12} aria-hidden="true" />}
                                {r.approved ? 'Unapprove' : 'Approve & Publish'}
                              </button>
                              <button
                                onClick={() => setDeleteId(r.id)}
                                className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_72%_51%/0.1)] hover:bg-[hsl(0_72%_51%/0.2)] text-[hsl(0_72%_65%)] transition-colors"
                                aria-label={`Delete review from ${r.name}`}
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
                    <p className="text-[hsl(0_0%_40%)]">No reviews submitted yet. When guests review your service, they will appear here.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Delete confirm */}
      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} aria-label="Confirm delete review" className="max-w-sm">
        <div className="text-center py-2">
          <Trash2 size={36} className="text-[hsl(0_72%_65%)] mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-semibold text-lg mb-2">Remove this review?</h2>
          <p className="text-sm text-[hsl(0_0%_50%)] mb-6">This will permanently delete the review.</p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setDeleteId(null)} className="flex-1">Cancel</Button>
            <Button onClick={() => deleteId && handleDelete(deleteId)} className="flex-1 bg-[hsl(0_72%_51%)] text-white hover:bg-[hsl(0_72%_44%)]">Remove</Button>
          </div>
        </div>
      </Modal>
    </AdminGuard>
  )
}