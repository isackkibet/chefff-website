'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { galleryImages } from '@/lib/data'

// Rotating hero order: original photo first, then the chef "people" photos,
// then the dishes — people first keeps it personal and interactive.
const heroSlides = [
  {
    id: 'hero-original',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85',
    alt: 'Elegant private dining table set by Chef Harrizona',
  },
  ...galleryImages
    .slice()
    .sort((a, b) => peopleRank(b.alt) - peopleRank(a.alt))
    .map((g) => ({ id: g.id, src: g.src, alt: g.alt })),
]

function peopleRank(alt: string) {
  return /Chef Harrizona/i.test(alt) ? 1 : 0
}

export default function HeroBackground() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [glow, setGlow] = useState({ x: 50, y: 30, visible: false })

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 2000)
    return () => clearInterval(t)
  }, [paused])

  function advance() {
    setActive((a) => (a + 1) % heroSlides.length)
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setGlow({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          visible: true,
        })
      }}
    >
      {/* Slides */}
      {heroSlides.map((img, i) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover scale-105"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Click anywhere on the background to advance the slide */}
      <button
        onClick={advance}
        className="absolute inset-0 cursor-pointer"
        aria-label="Next background photo"
      />

      {/* Dark overlay for text readability */}
      <div className="hero-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Drifting golden glow */}
      <div className="glow-anim absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Cursor-following glow — the background reacts to your pointer */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: glow.visible ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-200 ease-out"
          style={{
            left: `${glow.x}%`,
            top: `${glow.y}%`,
            background: 'radial-gradient(circle, hsl(45 90% 52% / 0.35), transparent 60%)',
          }}
        />
      </div>

      {/* Interactive image dots */}
      <div className="absolute bottom-24 inset-x-0 flex justify-center gap-2 z-10">
        {heroSlides.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.alt}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? 'w-7 bg-[hsl(45_90%_52%)] shadow-[0_0_12px_hsl(45_90%_52%)]'
                : 'w-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
