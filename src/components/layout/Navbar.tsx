'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import CartButton from '@/components/cart/CartButton'

// Primary nav — shown on desktop
const primaryLinks = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Menu',        href: '/menu' },
  { label: 'Services',    href: '/services' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Events',      href: '/events' },
  { label: 'Reviews',     href: '/reviews' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contact',     href: '/contact' },
]

// All links — used in mobile drawer
const allLinks = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Menu',        href: '/menu' },
  { label: 'Meal Kits',   href: '/meal-kits' },
  { label: 'Services',    href: '/services' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Events',      href: '/events' },
  { label: 'Reviews',     href: '/reviews' },
  { label: 'Blog',        href: '/blog' },
  { label: 'Contact',     href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false); setShopOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-[hsl(0_0%_10%/0.97)] backdrop-blur-md border-b border-[hsl(0_0%_20%)] shadow-lg'
            : 'bg-transparent',
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-[4.5rem]"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────────────── */}
          <Link
            href="/admin"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Chef Harrizona — Admin"
          >
            <Logo size={38} className="shadow-md group-hover:scale-105 transition-transform" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-base tracking-wide">
                Chef <span className="text-gold-gradient">Harrizona</span>
              </span>
              <span className="text-[10px] text-[hsl(0_0%_45%)] uppercase tracking-[0.18em]">
                Private Dining
              </span>
            </span>
          </Link>

          {/* ── Desktop links ─────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="list">
            {primaryLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative px-3 py-2 text-[13px] font-medium transition-colors rounded-lg whitespace-nowrap',
                      active
                        ? 'text-[hsl(45_90%_52%)]'
                        : 'text-[hsl(42_30%_80%)] hover:text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.05)]',
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-[hsl(45_90%_52%)]" />
                    )}
                  </Link>
                </li>
              )
            })}

            {/* Meal Kits dropdown */}
            <li className="relative">
              <button
                onClick={() => setShopOpen((v) => !v)}
                onBlur={() => setTimeout(() => setShopOpen(false), 150)}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-[13px] font-medium transition-colors rounded-lg whitespace-nowrap',
                  pathname.startsWith('/meal-kits')
                    ? 'text-[hsl(45_90%_52%)]'
                    : 'text-[hsl(42_30%_80%)] hover:text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.05)]',
                )}
                aria-expanded={shopOpen}
                aria-haspopup="true"
              >
                Shop
                <ChevronDown size={13} className={cn('transition-transform', shopOpen && 'rotate-180')} aria-hidden="true" />
              </button>

              {shopOpen && (
                <div className="absolute top-full right-0 mt-1 w-52 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_20%)] shadow-2xl overflow-hidden z-50 animate-scale-in">
                  <Link
                    href="/meal-kits"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[hsl(0_0%_16%)] transition-colors"
                  >
                    <span className="flex size-8 items-center justify-center rounded-xl bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]">
                      <ShoppingBag size={15} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-[hsl(42_30%_94%)]">Meal Kits</p>
                      <p className="text-xs text-[hsl(0_0%_45%)]">Kenyan recipes, delivered</p>
                    </div>
                  </Link>
                  <Link
                    href="/experiences"
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[hsl(0_0%_16%)] transition-colors border-t border-[hsl(0_0%_16%)]"
                  >
                    <span className="flex size-8 items-center justify-center rounded-xl bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]">
                      <UtensilsCrossed size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-[hsl(42_30%_94%)]">Experiences</p>
                      <p className="text-xs text-[hsl(0_0%_45%)]">Private dining & more</p>
                    </div>
                  </Link>
                </div>
              )}
            </li>
          </ul>

          {/* ── Right: CTA + hamburger ─────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            <CartButton />

            {/* Meal kits pill — visible on desktop */}
            <Link
              href="/meal-kits"
              className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-[hsl(45_90%_52%/0.4)] px-3 py-1.5 text-xs font-semibold text-[hsl(45_90%_52%)] hover:bg-[hsl(45_90%_52%/0.08)] transition-colors"
              aria-label="Shop Meal Kits"
            >
              <ShoppingBag size={12} aria-hidden="true" /> Meal Kits
            </Link>

            <ButtonLink href="/book" size="sm" variant="primary" className="hidden sm:inline-flex">
              Book Now
            </ButtonLink>

            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex size-10 items-center justify-center rounded-xl text-[hsl(42_30%_94%)] hover:bg-[hsl(0_0%_100%/0.08)] transition-colors"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu ───────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-30 lg:hidden transition-all duration-300',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0',
          )}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-72 bg-[hsl(0_0%_10%)] border-l border-[hsl(0_0%_20%)] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
            open ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-[hsl(0_0%_16%)]">
            <div className="flex items-center gap-2.5">
              <Logo size={30} />
              <span className="font-display font-bold text-base">
                Chef <span className="text-gold-gradient">Harrizona</span>
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-9 flex items-center justify-center rounded-lg hover:bg-[hsl(0_0%_100%/0.08)] transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-0.5" role="list">
              {allLinks.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                        active
                          ? 'bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]'
                          : 'text-[hsl(42_30%_80%)] hover:bg-[hsl(0_0%_100%/0.05)] hover:text-[hsl(42_30%_94%)]',
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label === 'Meal Kits' && (
                        <ShoppingBag size={14} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                      )}
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Book Now */}
          <div className="px-5 py-5 border-t border-[hsl(0_0%_16%)] space-y-2">
            <ButtonLink href="/book" size="md" variant="primary" className="w-full justify-center">
              Book Now
            </ButtonLink>
            <ButtonLink href="/meal-kits" size="sm" variant="outline" className="w-full justify-center">
              <ShoppingBag size={14} aria-hidden="true" /> Shop Meal Kits
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  )
}
