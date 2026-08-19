import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Get in Touch with Chef Harrizona',
  description: 'Contact Chef Harrizona for enquiries about private dining, catering, cooking classes and events in Nairobi.',
}

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Contact page header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Let's Talk</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Get in <span className="text-gold-gradient">Touch</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            Have a question, an upcoming event or simply want to learn more? Send a message and Chef Harrizona will respond within 24 hours.
          </p>
        </div>
      </section>
      <ContactClient />
    </>
  )
}
