'use client'

import { usePathname } from 'next/navigation'

// Hides the public-site chrome (Navbar, Footer, cart, WhatsApp button)
// on /admin routes so the admin panel gets the full screen on phones.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return <>{children}</>
}
