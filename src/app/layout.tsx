import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import ToastProvider from '@/components/ui/ToastProvider'
import CartProvider from '@/lib/cart'
import CartDrawer from '@/components/cart/CartDrawer'

export const metadata: Metadata = {
  metadataBase: new URL('https://chefharrizona.co.ke'),
  title: {
    default: 'Chef Harrizona | Private Dining, Catering & Culinary Experiences in Nairobi',
    template: '%s | Chef Harrizona',
  },
  description:
    'Chef Harrizona offers private dining, bespoke event catering, cooking classes and weekly meal preparation across Nairobi and surrounding areas. Book your culinary experience today.',
  keywords: ['private chef Nairobi', 'event catering Kenya', 'private dining Nairobi', 'wedding catering Nairobi', 'cooking classes Nairobi', 'Chef Harrizona'],
  authors: [{ name: 'Chef Harrizona', url: 'https://chefharrizona.co.ke' }],
  creator: 'Chef Harrizona',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://chefharrizona.co.ke',
    siteName: 'Chef Harrizona',
    title: 'Chef Harrizona | Private Dining & Catering in Nairobi',
    description: 'Exceptional food. Unforgettable experiences. Private chef, event catering and culinary experiences across Nairobi.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Chef Harrizona, Private Dining & Catering' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Harrizona | Private Dining & Catering in Nairobi',
    description: 'Exceptional food. Unforgettable experiences.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <CartDrawer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
