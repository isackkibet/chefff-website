'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/Button'

export default function FAQClient() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="FAQ accordion">
      <div className="mx-auto max-w-3xl">
        <dl className="divide-y divide-[hsl(0_0%_16%)] rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] overflow-hidden">
          {faqItems.map((item, i) => (
            <div key={i}>
              <dt>
                <button
                  id={`faq-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[hsl(0_0%_14%)] transition-colors"
                >
                  <span className="font-medium text-[hsl(42_30%_94%)]">{item.question}</span>
                  <ChevronDown
                    size={18} aria-hidden="true"
                    className={cn('shrink-0 text-[hsl(45_90%_52%)] transition-transform duration-200', open === i && 'rotate-180')}
                  />
                </button>
              </dt>
              <dd
                id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                className={cn('overflow-hidden transition-all duration-300', open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}
              >
                <p className="px-6 pb-5 text-sm text-[hsl(0_0%_60%)] leading-relaxed">{item.answer}</p>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(45_90%_52%/0.2)] p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Still have a question?</h2>
          <p className="text-sm text-[hsl(0_0%_55%)] mb-6">Our team is happy to help with anything not covered above.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/contact" variant="primary" size="sm">Send a Message</ButtonLink>
            <ButtonLink href="https://wa.me/254768737930" variant="outline" size="sm" external>
              Chat on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
