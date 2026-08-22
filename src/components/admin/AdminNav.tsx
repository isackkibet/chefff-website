'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, Calendar, UtensilsCrossed, Image, Star,
  FileText, Settings, LogOut, Menu, X, Mail, Video,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'
import AdminAlerts from '@/components/admin/AdminAlerts'

const navItems = [
  { label: 'Dashboard',    href: '/admin/dashboard',     Icon: LayoutDashboard },
  { label: 'Bookings',     href: '/admin/bookings',      Icon: Calendar },
  { label: 'Messages',     href: '/admin/contact',       Icon: Mail },
  { label: 'Menu',         href: '/admin/menu',          Icon: UtensilsCrossed },
  { label: 'Gallery',      href: '/admin/gallery',       Icon: Image },
  { label: 'Media',        href: '/admin/media',         Icon: Video },
  { label: 'Testimonials', href: '/admin/testimonials',  Icon: Star },
  { label: 'Blog',         href: '/admin/blog',          Icon: FileText },
  { label: 'Settings',     href: '/admin/settings',      Icon: Settings },
]

// Primary items always visible in the phone bottom tab bar.
const bottomItems = [
  { label: 'Home',   shortLabel: 'Home',   href: '/admin/dashboard',    Icon: LayoutDashboard },
  { label: 'Bookings',   shortLabel: 'Booking',   href: '/admin/bookings',     Icon: Calendar },
  { label: 'Messages',   shortLabel: 'Msgs',      href: '/admin/contact',      Icon: Mail },
  { label: 'Testimonials', shortLabel: 'Reviews', href: '/admin/testimonials', Icon: Star },
]

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between gap-2 px-5 h-16 border-b border-[hsl(0_0%_18%)]">
        <div className="flex items-center gap-2.5">
          <Logo size={32} />
          <div>
            <p className="font-display font-bold text-sm leading-none">Chef Harrizona</p>
            <p className="text-[10px] text-[hsl(45_90%_52%)] uppercase tracking-widest">Admin</p>
          </div>
        </div>
        <AdminAlerts />
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
        <ul className="space-y-1" role="list">
          {navItems.map(({ label, href, Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                    active
                      ? 'bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]'
                      : 'text-[hsl(0_0%_60%)] hover:bg-[hsl(0_0%_100%/0.05)] hover:text-[hsl(42_30%_94%)]',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[hsl(0_0%_18%)] pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[hsl(0_0%_55%)] hover:bg-[hsl(0_72%_51%/0.1)] hover:text-[hsl(0_72%_65%)] transition-colors"
        >
          <LogOut size={17} aria-hidden="true" />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 xl:w-64 flex-col bg-[hsl(0_0%_8%)] border-r border-[hsl(0_0%_16%)] h-screen sticky top-0">
        <NavContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 flex items-center justify-between px-4 bg-[hsl(0_0%_8%)] border-b border-[hsl(0_0%_16%)]">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span className="font-display font-bold text-sm">Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <AdminAlerts />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="size-9 flex items-center justify-center rounded-lg text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.08)] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60]" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <aside className="absolute top-0 left-0 w-72 max-w-[85vw] h-full bg-[hsl(0_0%_8%)] border-r border-[hsl(0_0%_16%)] flex flex-col">
            <NavContent />
          </aside>
        </div>
      )}

      {/* Mobile bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[hsl(0_0%_8%/0.97)] backdrop-blur-md border-t border-[hsl(0_0%_16%)] pb-[env(safe-area-inset-bottom)]"
        aria-label="Admin quick navigation"
      >
        <ul className="grid grid-cols-5" role="list">
          {bottomItems.map(({ shortLabel, href, Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors',
                    active
                      ? 'text-[hsl(45_90%_52%)]'
                      : 'text-[hsl(0_0%_55%)] hover:text-[hsl(42_30%_94%)]',
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={20} aria-hidden="true" />
                  {shortLabel}
                </Link>
              </li>
            )
          })}
          <li>
            <button
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              className="w-full flex flex-col items-center gap-1 py-2 text-[10px] font-medium text-[hsl(0_0%_55%)] hover:text-[hsl(42_30%_94%)] transition-colors"
            >
              <Menu size={20} aria-hidden="true" />
              More
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}
