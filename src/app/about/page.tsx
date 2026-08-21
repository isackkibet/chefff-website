import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, BookOpen, Utensils, Heart, ArrowRight, CheckCircle } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import SectionHeader from '@/components/ui/SectionHeader'
import { stats } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About Chef Harrizona | His Story, Philosophy & Culinary Journey',
  description: 'Learn about Chef Harrizona: his culinary journey, training, philosophy and passion for creating exceptional food experiences in Nairobi.',
}

const specialties = [
  'Contemporary African cuisine',
  'Classical French technique',
  'East African heritage flavours',
  'Modern tasting menus',
  'Farm-to-table cooking',
  'Plant-based fine dining',
]

const timeline = [
  { year: '2022', title: 'Intern & Casual Chef, Nairobi Safari Club', desc: 'At Swiss-Belhotel International. In charge of breakfast, pastry and à la carte, with solid experience in the salad section. Later became a casual chef.' },
  { year: '2023', title: 'Commis Chef, Guru Nanak Hospital', desc: 'Planned and executed daily menus for patients and staff, collaborating with nutritionists to produce nutritious meals.' },
  { year: '2022 – Present', title: 'Diploma in Food & Beverage Management', desc: 'A student of Nairobi Technical Training Institute, pursuing a Diploma in Food and Beverage Management in both production and service. 1st year: Credit, 2nd year: Distinction.' },
  { year: 'Present', title: 'Commis Chef, Stedmak Gardens', desc: 'Outside catering and events. Responsible for planning, preparation and production of menus during functions, events and outside caterers; assisted the head chef in food preparation, cooking and plating while keeping the kitchen clean and organised.' },
]

const values = [
  { Icon: Utensils, title: 'Quality First',       desc: 'Every ingredient is hand-selected. Nothing leaves the kitchen unless it meets an exacting standard.' },
  { Icon: Heart,    title: 'Personal Touch',       desc: 'Every menu, every event and every dish is designed specifically for the guest, never a template.' },
  { Icon: BookOpen, title: 'Continuous Learning',  desc: 'Culinary knowledge evolves. Chef Harrizona is always exploring new techniques, ingredients and traditions.' },
  { Icon: Award,    title: 'Local Pride',           desc: 'Kenyan ingredients, Kenyan stories. Elevating African cuisine on every plate.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center" aria-label="About page header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">The Chef</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Meet Chef <span className="text-gold-gradient">Harrizona</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            Food is more than a meal. It is an experience, a memory and a way of bringing people together.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Biography">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-start">
          <div className="sticky top-24">
            <div className="relative rounded-3xl overflow-hidden h-[560px]">
              <Image
                src="/chef-about-2.jpeg"
                alt="Chef Harrizona in professional chef whites, ready to cook"
                fill className="object-contain bg-[hsl(0_0%_9%)]" priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-4 text-center">
                  <p className="text-2xl font-display font-bold text-gold-gradient">{s.value}</p>
                  <p className="text-xs text-[hsl(0_0%_50%)] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">A Passion Forged in the Kitchen</h2>
            <div className="space-y-4 text-[hsl(0_0%_65%)] leading-relaxed">
              <p>
                Chef Harrizona grew up watching his grandmother cook traditional Kenyan dishes over an open fire, where every meal was a deliberate act of love. That early connection between food, family and memory became the foundation of everything he does today.
              </p>
              <p>
                After formal culinary training in classical French and continental cuisine, Harrizona spent several years working across Nairobi's most respected kitchens, absorbing technique, discipline and the importance of precision. But it was private dining, cooking directly for individuals and families in their own spaces, where he truly found his calling.
              </p>
              <p>
                Today, Chef Harrizona is known for his distinctive approach: marrying classical European technique with the bold, honest flavours of East African cuisine. The result is food that feels both elevated and deeply personal, refined without being cold and technically brilliant without losing soul.
              </p>
              <p>
                Every menu he creates starts with a conversation. What does the occasion mean to you? What flavours bring you joy? What are your guests' stories? Only then does he begin to cook.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Cuisine Specialties</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="list">
                {specialties.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-[hsl(0,3%,43%)]">
                    <CheckCircle size={16} className="shrink-0 text-[hsl(45,68%,61%)]" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <ButtonLink href="/book" variant="primary">
                Book Chef Harrizona
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[hsl(0,3%,8%)]" aria-label="Chef's philosophy and values">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Philosophy" title="How Chef Harrizona Cooks" subtitle="Four principles that guide every dish, every event and every interaction." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-6 text-center card-hover">
                <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)] mb-4">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-base mb-2">{title}</h3>
                <p className="text-sm text-[hsl(0,11%,84%)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="Culinary journey timeline">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="Journey" title="The Culinary Story" />
          <ol className="relative border-l border-[hsl(0,5%,4%)] ml-4 space-y-10" role="list">
            {timeline.map((item) => (
              <li key={item.year} className="relative pl-8">
                <span className="absolute -left-[9px] top-1 size-4 rounded-full border-2 border-[hsl(45,91%,40%)] bg-[hsl(0,8%,7%)]" aria-hidden="true" />
                <time dateTime={item.year} className="text-xs font-semibold uppercase tracking-wider text-[hsl(45,88%,26%)] mb-1 block">{item.year}</time>
                <h3 className="font-semibold text-[hsl(42_30%_94%)] mb-1">{item.title}</h3>
                <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
