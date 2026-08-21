'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Bell, Calendar, Mail, X } from 'lucide-react'
import { useToast } from '@/components/ui/ToastProvider'

interface BookingRow { id: number; refNumber: string; fullName: string; eventType: string; eventDate: string; status: string; createdAt: string }
interface MessageRow { id: number; name: string; subject: string; read: boolean; createdAt: string }

interface Item { kind: 'booking' | 'message'; href: string; title: string; sub: string; at: string; ref: string }

export default function AdminAlerts() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [total, setTotal] = useState(0)
  const knownRefs = useRef<Set<string>>(new Set())
  const ready = useRef(false)

  async function poll() {
    try {
      const [bookingsRes, messagesRes] = await Promise.all([
        fetch('/api/admin/bookings'),
        fetch('/api/admin/contact'),
      ])
      if (!bookingsRes.ok || !messagesRes.ok) return
      const bookings = (await bookingsRes.json()) as BookingRow[]
      const messages = (await messagesRes.json()) as MessageRow[]

      const pending = bookings.filter((b) => b.status === 'PENDING')
      const unread = messages.filter((m) => !m.read)

      const newItems: Item[] = [
        ...pending.map((b) => ({
          kind: 'booking' as const,
          href: '/admin/bookings',
          title: `Booking #${b.refNumber}`,
          sub: `${b.fullName} · ${b.eventType} · ${b.eventDate}`,
          at: b.createdAt,
          ref: `b:${b.refNumber}`,
        })),
        ...unread.map((m) => ({
          kind: 'message' as const,
          href: '/admin/contact',
          title: m.subject,
          sub: `from ${m.name}`,
          at: m.createdAt,
          ref: `m:${m.id}`,
        })),
      ]
      newItems.sort((a, b) => b.at.localeCompare(a.at))

      // Fire notifications for genuinely new items after the first load.
      if (ready.current) {
        for (const item of newItems.slice(0, 5)) {
          if (!knownRefs.current.has(item.ref)) {
            if (item.kind === 'booking') {
              toast('success', `New booking request: ${item.title}`)
              showBrowserNotification('New Booking Request', item.title, item.sub)
            } else {
              toast('success', `New message: ${item.title}`)
            }
          }
        }
      }

      knownRefs.current = new Set(newItems.slice(0, 20).map((i) => i.ref))
      ready.current = true
      setItems(newItems.slice(0, 8))
      setTotal(newItems.length)
    } catch {
      /* admin panel works even if the alert feed fails */
    }
  }

  useEffect(() => {
    const first = window.setTimeout(() => { void poll() }, 0)
    const t = window.setInterval(() => { void poll() }, 20000)
    return () => {
      window.clearTimeout(first)
      window.clearInterval(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative size-9 flex items-center justify-center rounded-xl bg-[hsl(0_0%_14%)] text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_18%)] transition-colors"
        aria-label={`Notifications (${total} new)`}
        aria-expanded={open}
      >
        <Bell size={17} aria-hidden="true" />
        {total > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[hsl(0_72%_51%)] text-[10px] font-bold text-white flex items-center justify-center">
            {total}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-11 z-50 w-80 sm:w-96 rounded-2xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_20%)] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(0_0%_16%)]">
              <p className="text-sm font-semibold">Notifications</p>
              <button
                onClick={() => setOpen(false)}
                className="size-7 flex items-center justify-center rounded-lg hover:bg-[hsl(0_0%_100%/0.08)] text-[hsl(0_0%_50%)] transition-colors"
                aria-label="Close notifications"
              >
                <X size={15} />
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[hsl(0_0%_45%)]">
                  All caught up. No new bookings or messages.
                </p>
              ) : (
                <ul className="divide-y divide-[hsl(0_0%_14%)]" role="list">
                  {items.map((item) => (
                    <li key={item.ref}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-[hsl(0_0%_14%)] transition-colors"
                      >
                        <span className={`mt-0.5 size-8 shrink-0 flex items-center justify-center rounded-lg ${item.kind === 'booking' ? 'bg-[hsl(45_90%_52%/0.15)] text-[hsl(45_90%_52%)]' : 'bg-[hsl(210_80%_56%/0.15)] text-[hsl(210_80%_70%)]'}`}>
                          {item.kind === 'booking' ? <Calendar size={15} aria-hidden="true" /> : <Mail size={15} aria-hidden="true" />}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[hsl(42_30%_94%)]">{item.title}</p>
                          <p className="text-xs text-[hsl(0_0%_55%)] truncate">{item.sub}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function showBrowserNotification(title: string, body: string, sub: string) {
  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (Notification.permission === 'granted') {
    new Notification(title, { body: `${body}\n${sub}`, icon: '/logo.jpeg' })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((p) => {
      if (p === 'granted') new Notification(title, { body: `${body}\n${sub}`, icon: '/logo.jpeg' })
    })
  }
}