'use client'

import { useState, useEffect } from 'react'
import { Search, Eye, MessageSquare, CheckCircle, XCircle, ChevronDown } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import BookingStatusBadge from '@/components/admin/BookingStatusBadge'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { adminStore, type Booking, type BookingStatus } from '@/lib/admin/store'
import { useToast } from '@/components/ui/ToastProvider'

const ALL_STATUSES: BookingStatus[] = ['PENDING', 'REVIEWING', 'QUOTED', 'CONFIRMED', 'CANCELLED', 'COMPLETED']

export default function AdminBookingsPage() {
  const { toast } = useToast()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState<BookingStatus | 'ALL'>('ALL')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Booking | null>(null)
  const [noteText, setNoteText] = useState('')
  const [quoteAmount, setQuoteAmount] = useState('')

  useEffect(() => { setBookings([...adminStore.bookings]) }, [])

  const filtered = bookings.filter((b) => {
    const matchStatus = filter === 'ALL' || b.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q || b.fullName.toLowerCase().includes(q) || b.refNumber.toLowerCase().includes(q) || b.email.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  function refresh() { setBookings([...adminStore.bookings]) }

  function updateStatus(id: string, status: BookingStatus) {
    adminStore.updateBookingStatus(id, status)
    refresh()
    toast('success', `Booking status updated to ${status}`)
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null)
  }

  function saveNote() {
    if (!selected) return
    adminStore.updateBookingNotes(selected.id, noteText)
    refresh()
    toast('success', 'Notes saved')
  }

  function saveQuote() {
    if (!selected || !quoteAmount) return
    const amount = parseFloat(quoteAmount)
    if (isNaN(amount) || amount <= 0) { toast('error', 'Enter a valid amount'); return }
    adminStore.updateBookingQuote(selected.id, amount)
    refresh()
    toast('success', `Quote of KES ${amount.toLocaleString()} sent`)
    setSelected((prev) => prev ? { ...prev, quotedAmount: amount, status: 'QUOTED' } : null)
    setQuoteAmount('')
  }

  function openDetail(b: Booking) {
    setSelected(b)
    setNoteText(b.notes ?? '')
    setQuoteAmount(b.quotedAmount?.toString() ?? '')
  }

  const counts = ALL_STATUSES.reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length
    return acc
  }, {} as Record<BookingStatus, number>)

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Bookings</h1>
              <p className="text-sm text-[hsl(0_0%_50%)]">{bookings.length} total · {counts.PENDING} pending</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(0_0%_40%)]" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, ref, email…"
                  aria-label="Search bookings"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_20%)] text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
                {(['ALL', ...ALL_STATUSES] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                      filter === s
                        ? 'bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]'
                        : 'bg-[hsl(0_0%_14%)] text-[hsl(0_0%_55%)] hover:bg-[hsl(0_0%_18%)]'
                    }`}
                  >
                    {s === 'ALL' ? 'All' : s} {s !== 'ALL' && `(${counts[s]})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="Bookings table">
                  <thead>
                    <tr className="border-b border-[hsl(0_0%_16%)]">
                      {['Ref', 'Guest', 'Event Type', 'Date', 'Guests', 'Location', 'Status', 'Actions'].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[hsl(0_0%_45%)] uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[hsl(0_0%_14%)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-5 py-12 text-center text-[hsl(0_0%_45%)]">
                          No bookings match your filters.
                        </td>
                      </tr>
                    ) : filtered.map((b) => (
                      <tr key={b.id} className="hover:bg-[hsl(0_0%_13%)] transition-colors">
                        <td className="px-5 py-3.5 font-mono text-xs text-[hsl(45_90%_52%)] whitespace-nowrap">
                          #{b.refNumber}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <p className="font-medium text-[hsl(42_30%_94%)]">{b.fullName}</p>
                          <p className="text-xs text-[hsl(0_0%_40%)]">{b.phone}</p>
                        </td>
                        <td className="px-5 py-3.5 text-[hsl(0_0%_65%)] whitespace-nowrap">{b.eventType}</td>
                        <td className="px-5 py-3.5 text-[hsl(0_0%_65%)] whitespace-nowrap">
                          {new Date(b.eventDate).toLocaleDateString('en-KE', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-5 py-3.5 text-[hsl(0_0%_65%)] text-center">{b.guestCount}</td>
                        <td className="px-5 py-3.5 text-[hsl(0_0%_65%)] whitespace-nowrap max-w-[140px] truncate">{b.location}</td>
                        <td className="px-5 py-3.5"><BookingStatusBadge status={b.status} /></td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openDetail(b)}
                              className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_60%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                              aria-label={`View booking ${b.refNumber}`}
                            >
                              <Eye size={14} />
                            </button>
                            {b.status === 'PENDING' && (
                              <button
                                onClick={() => updateStatus(b.id, 'REVIEWING')}
                                className="size-8 flex items-center justify-center rounded-lg bg-[hsl(210_80%_56%/0.15)] hover:bg-[hsl(210_80%_56%/0.25)] text-[hsl(210_80%_70%)] transition-colors"
                                aria-label="Mark as reviewing"
                                title="Mark as Reviewing"
                              >
                                <MessageSquare size={14} />
                              </button>
                            )}
                            {(b.status === 'REVIEWING' || b.status === 'QUOTED') && (
                              <button
                                onClick={() => updateStatus(b.id, 'CONFIRMED')}
                                className="size-8 flex items-center justify-center rounded-lg bg-[hsl(142_71%_45%/0.15)] hover:bg-[hsl(142_71%_45%/0.25)] text-[hsl(142_71%_55%)] transition-colors"
                                aria-label="Confirm booking"
                                title="Confirm"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                            {b.status !== 'CANCELLED' && b.status !== 'COMPLETED' && (
                              <button
                                onClick={() => updateStatus(b.id, 'CANCELLED')}
                                className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_72%_51%/0.1)] hover:bg-[hsl(0_72%_51%/0.2)] text-[hsl(0_72%_65%)] transition-colors"
                                aria-label="Cancel booking"
                                title="Cancel"
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                            {b.status === 'CONFIRMED' && (
                              <button
                                onClick={() => updateStatus(b.id, 'COMPLETED')}
                                className="text-xs px-2 py-1 rounded-lg bg-[hsl(0_0%_18%)] text-[hsl(0_0%_55%)] hover:bg-[hsl(0_0%_22%)] transition-colors"
                                aria-label="Mark as completed"
                              >
                                Done
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Booking detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} aria-label="Booking detail" className="max-w-2xl">
        {selected && (
          <div>
            <div className="flex items-start justify-between gap-4 mb-5 pr-8">
              <div>
                <p className="font-mono text-xs text-[hsl(45_90%_52%)] mb-1">#{selected.refNumber}</p>
                <h2 className="font-display text-xl font-bold">{selected.fullName}</h2>
              </div>
              <BookingStatusBadge status={selected.status} />
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm">
              {[
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone },
                { label: 'Event Type', value: selected.eventType },
                { label: 'Date', value: new Date(selected.eventDate).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
                { label: 'Time', value: selected.preferredTime },
                { label: 'Guests', value: selected.guestCount },
                { label: 'Location', value: selected.location },
                { label: 'Budget', value: selected.budgetRange || '—' },
                { label: 'Cuisine Prefs', value: selected.cuisinePrefs || '—' },
                { label: 'Dietary Reqs', value: selected.dietaryReqs || '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-[hsl(42_30%_94%)]">{String(value)}</p>
                </div>
              ))}
            </div>

            {selected.specialRequests && (
              <div className="mb-5 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)] p-3">
                <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-1">Special Requests</p>
                <p className="text-sm text-[hsl(42_30%_85%)]">{selected.specialRequests}</p>
              </div>
            )}

            {/* Quote section */}
            {(selected.status === 'REVIEWING' || selected.status === 'QUOTED' || selected.status === 'CONFIRMED') && (
              <div className="mb-5 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)] p-4">
                <p className="text-sm font-semibold mb-3">
                  {selected.quotedAmount ? `Current Quote: KES ${selected.quotedAmount.toLocaleString()}` : 'Send a Quote'}
                </p>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    placeholder="Amount in KES"
                    className="flex-1 rounded-xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_22%)] px-3 py-2 text-sm text-[hsl(42_30%_94%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
                    aria-label="Quote amount"
                  />
                  <Button variant="primary" size="sm" onClick={saveQuote}>Send Quote</Button>
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="mb-5">
              <label htmlFor="booking-notes" className="block text-sm font-semibold mb-2">Internal Notes</label>
              <textarea
                id="booking-notes"
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add notes visible only to admin…"
                className="w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_35%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors resize-none"
              />
              <Button variant="outline" size="sm" className="mt-2" onClick={saveNote}>Save Notes</Button>
            </div>

            {/* Status actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(0_0%_18%)]">
              {selected.status === 'PENDING' && (
                <Button size="sm" variant="outline" onClick={() => updateStatus(selected.id, 'REVIEWING')}>
                  Mark Reviewing
                </Button>
              )}
              {(selected.status === 'REVIEWING' || selected.status === 'QUOTED') && (
                <Button size="sm" variant="primary" onClick={() => updateStatus(selected.id, 'CONFIRMED')}>
                  Confirm Booking
                </Button>
              )}
              {selected.status === 'CONFIRMED' && (
                <Button size="sm" variant="outline" onClick={() => updateStatus(selected.id, 'COMPLETED')}>
                  Mark Completed
                </Button>
              )}
              {!['CANCELLED', 'COMPLETED'].includes(selected.status) && (
                <Button size="sm" variant="ghost" onClick={() => updateStatus(selected.id, 'CANCELLED')}
                  className="text-[hsl(0_72%_65%)] hover:bg-[hsl(0_72%_51%/0.1)]">
                  Cancel Booking
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </AdminGuard>
  )
}
