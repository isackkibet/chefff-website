import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { InstagramIcon, FacebookIcon, YoutubeIcon, TikTokIcon } from '@/components/ui/SocialIcons'
import { brand } from '@/lib/data'
import Logo from '@/components/ui/Logo'

const quickLinks = [
  { label: 'Home',      href: '/' },
  { label: 'About',     href: '/about' },
  { label: 'Menu',      href: '/menu' },
  { label: 'Services',  href: '/services' },
  { label: 'Meal Kits', href: '/meal-kits' },
  { label: 'Gallery',   href: '/gallery' },
  { label: 'Events',    href: '/events' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contact',   href: '/contact' },
]

const serviceLinks = [
  { label: 'Private Dining',   href: '/services/private-chef' },
  { label: 'Wedding Catering', href: '/services/wedding-catering' },
  { label: 'Corporate Events', href: '/services/corporate-catering' },
  { label: 'Cooking Classes',  href: '/services/cooking-classes' },
  { label: 'Meal Kits',        href: '/meal-kits' },
]

const legalLinks = [
  { label: 'Privacy Policy',       href: '/privacy-policy' },
  { label: 'Terms & Conditions',   href: '/terms' },
  { label: 'Cancellation Policy',  href: '/cancellation-policy' },
]

export default function Footer() {
  return (
    <footer className="bg-[hsl(0_0%_7%)] border-t border-[hsl(0_0%_16%)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group" aria-label="Chef Harrizona home">
              <Logo size={40} />
              <span className="font-display font-bold text-xl">
                Chef <span className="text-gold-gradient">Harrizona</span>
              </span>
            </Link>
            <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed mb-6 max-w-xs">
              {brand.description}
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: brand.instagram,  Icon: InstagramIcon },
                { label: 'TikTok',    href: brand.tiktok,     Icon: TikTokIcon },
                { label: 'Facebook',  href: brand.facebook,   Icon: FacebookIcon },
                { label: 'YouTube',   href: brand.youtube,    Icon: YoutubeIcon },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-[hsl(0_0%_22%)] text-[hsl(0_0%_55%)] hover:border-[hsl(45_90%_52%)] hover:text-[hsl(45_90%_52%)] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-[hsl(42_30%_94%)] mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-[hsl(42_30%_94%)] mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[hsl(42_30%_94%)] mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3" role="list">
              <li>
                <a href={`tel:${brand.phone}`} className="flex items-center gap-2.5 text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                  <Phone size={15} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-2.5 text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                  <Mail size={15} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                  {brand.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[hsl(0_0%_55%)]">
                <MapPin size={15} className="shrink-0 mt-0.5 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                {brand.serviceArea}
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[hsl(0_0%_55%)]">
                <Clock size={15} className="shrink-0 text-[hsl(45_90%_52%)]" aria-hidden="true" />
                {brand.businessHours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[hsl(0_0%_14%)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(0_0%_40%)]">
            © {new Date().getFullYear()} Chef Harrizona. All rights reserved.
          </p>
          <ul className="flex items-center gap-4 flex-wrap justify-center" role="list">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-[hsl(0_0%_40%)] hover:text-[hsl(45_90%_52%)] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="text-xs text-[hsl(0_0%_25%)] hover:text-[hsl(0_0%_45%)] transition-colors"
                aria-label="Admin login"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
