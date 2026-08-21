'use client'

import { useState, useEffect } from 'react'
import { Mail, Search, Eye, MailOpen, Sparkles, Copy, Check, Send } from 'lucide-react'
import AdminNav from '@/components/admin/AdminNav'
import AdminGuard from '@/components/admin/AdminGuard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useToast } from '@/components/ui/ToastProvider'

interface ContactMessage {
  id: number
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminContactPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ContactMessage | null>(null)
  const [aiReply, setAiReply] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  async function loadMessages() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/contact')
      if (!res.ok) throw new Error('Failed to load messages')
      setMessages(await res.json())
    } catch {
      toast('error', 'Could not load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadMessages() }, [])

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase()
    return !q
      || m.name.toLowerCase().includes(q)
      || m.email.toLowerCase().includes(q)
      || m.subject.toLowerCase().includes(q)
  })

  const unread = messages.filter((m) => !m.read).length

  async function markRead(id: number, read: boolean) {
    try {
      const res = await fetch('/api/admin/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read }),
      })
      if (!res.ok) throw new Error('Failed to update')
      await loadMessages()
      if (selected?.id === id) setSelected((prev) => prev ? { ...prev, read } : null)
    } catch {
      toast('error', 'Could not update message')
    }
  }

  function openDetail(m: ContactMessage) {
    setSelected(m)
    setAiReply('')
    setCopied(false)
    if (!m.read) markRead(m.id, true)
  }

  async function draftAiReply() {
    if (!selected) return
    setAiLoading(true)
    try {
      const res = await fetch('/api/admin/ai-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selected.name,
          subject: selected.subject,
          message: selected.message,
          context: 'contact',
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.reply) throw new Error(data.error ?? 'Failed to draft reply')
      setAiReply(data.reply)
    } catch {
      toast('error', 'Could not draft an AI reply')
    } finally {
      setAiLoading(false)
    }
  }

  async function copyReply() {
    if (!aiReply) return
    try {
      await navigator.clipboard.writeText(aiReply)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast('error', 'Could not copy reply')
    }
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Messages</h1>
              <p className="text-sm text-[hsl(0_0%_50%)]">
                {messages.length} total · {unread} unread
              </p>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm mb-6">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(0_0%_40%)]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or subject…"
                aria-label="Search messages"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_20%)] text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors"
              />
            </div>

            {/* List */}
            <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] overflow-hidden">
              {loading ? (
                <div className="flex justify-center py-16">
                  <LoadingSpinner size="md" />
                </div>
              ) : filtered.length === 0 ? (
                <p className="px-6 py-14 text-center text-sm text-[hsl(0_0%_45%)]">
                  No messages yet. When someone uses the Get in Touch form, their message will appear here.
                </p>
              ) : (
                <ul className="divide-y divide-[hsl(0_0%_14%)]" role="list">
                  {filtered.map((m) => (
                    <li key={m.id}>
                      <button
                        onClick={() => openDetail(m)}
                        className={`w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-[hsl(0_0%_13%)] transition-colors ${!m.read ? 'bg-[hsl(45_90%_52%/0.05)]' : ''}`}
                        aria-label={`View message from ${m.name}`}
                      >
                        <span className={`mt-0.5 size-9 shrink-0 flex items-center justify-center rounded-xl ${!m.read ? 'bg-[hsl(45_90%_52%/0.15)] text-[hsl(45_90%_52%)]' : 'bg-[hsl(0_0%_16%)] text-[hsl(0_0%_45%)]'}`}>
                          {m.read ? <MailOpen size={16} aria-hidden="true" /> : <Mail size={16} aria-hidden="true" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <p className="font-medium text-[hsl(42_30%_94%)]">{m.name}</p>
                            {!m.read && (
                              <span className="rounded-full bg-[hsl(45_90%_52%)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[hsl(0_0%_10%)]">New</span>
                            )}
                            <span className="text-xs text-[hsl(0_0%_40%)] ml-auto">
                              {new Date(m.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-sm text-[hsl(0_0%_65%)] mt-0.5">{m.subject}</p>
                          <p className="text-sm text-[hsl(0_0%_50%)] truncate mt-0.5">{m.message}</p>
                        </div>
                        <span className="mt-1 size-8 shrink-0 flex items-center justify-center rounded-lg bg-[hsl(0_0%_16%)] text-[hsl(0_0%_50%)]" aria-hidden="true">
                          <Eye size={14} />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Message detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} aria-label="Message detail" className="max-w-2xl">
        {selected && (
          <div>
            <div className="flex items-start justify-between gap-4 mb-5 pr-8">
              <div>
                <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-1">
                  {new Date(selected.createdAt).toLocaleDateString('en-KE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="font-display text-xl font-bold">{selected.subject}</h2>
                <p className="text-sm text-[hsl(0_0%_55%)] mt-1">from {selected.name}</p>
              </div>
              {!selected.read && (
                <span className="rounded-full bg-[hsl(45_90%_52%)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[hsl(0_0%_10%)]">New</span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-6 text-sm">
              {[
                { label: 'Email', value: selected.email },
                { label: 'Phone', value: selected.phone || '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-[hsl(42_30%_94%)]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_18%)] p-4">
              <p className="text-xs text-[hsl(0_0%_45%)] uppercase tracking-wide mb-2">Message</p>
              <p className="text-sm text-[hsl(42_30%_85%)] whitespace-pre-wrap leading-relaxed">{selected.message}</p>
            </div>

            {/* AI reply assistant */}
            <div className="mb-6 rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(45_90%_52%/0.25)] p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-[hsl(45_90%_52%)] flex items-center gap-1.5">
                  <Sparkles size={15} aria-hidden="true" /> AI Reply Assistant
                </p>
                <Button variant="outline" size="sm" onClick={draftAiReply} loading={aiLoading} disabled={!!aiReply}>
                  {aiReply ? 'Regenerate' : 'Draft AI Reply'}
                </Button>
              </div>

              {aiLoading && <LoadingSpinner size="sm" />}

              {aiReply && (
                <>
                  <textarea
                    value={aiReply}
                    onChange={(e) => setAiReply(e.target.value)}
                    rows={6}
                    aria-label="AI drafted reply"
                    className="w-full rounded-xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_22%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors resize-none mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm" onClick={copyReply}>
                      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                      {copied ? 'Copied' : 'Copy Reply'}
                    </Button>
                    {selected.phone && (
                      <a
                        href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=${encodeURIComponent(aiReply)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] hover:bg-[#2ee478] transition-colors"
                      >
                        <Send size={14} aria-hidden="true" /> Send via WhatsApp
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-[hsl(0_0%_18%)]">
              <Button variant="outline" size="sm" onClick={() => markRead(selected.id, !selected.read)}>
                {selected.read ? 'Mark as Unread' : 'Mark as Read'}
              </Button>
              <a
                href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(45_90%_52%)] px-4 py-2 text-sm font-semibold text-[hsl(0_0%_10%)] hover:bg-[hsl(45_95%_68%)] transition-colors"
              >
                Reply by Email
              </a>
            </div>
          </div>
        )}
      </Modal>
    </AdminGuard>
  )
}