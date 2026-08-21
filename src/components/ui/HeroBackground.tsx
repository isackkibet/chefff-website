"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

// Rotating hero order: original photo first, then the chef "people" photos,
// then the dishes, people first keeps it personal and interactive.
const heroSlides = [
  {
    id: "hero-corporate",
    src: "/corporate-catering.jpeg",
    alt: "Elegant corporate catering buffet",
  },
  {
    id: "hero-original",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85",
    alt: "Elegant private dining table set by Chef Harrizona",
  },
  ...galleryImages
    .slice()
    .sort((a, b) => peopleRank(b.alt) - peopleRank(a.alt))
    .map((g) => ({ id: g.id, src: g.src, alt: g.alt })),
];

function peopleRank(alt: string) {
  return /Chef Harrizona/i.test(alt) ? 1 : 0;
}

export default function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % heroSlides.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Slides */}
      {heroSlides.map((img, i) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === active ? "opacity-100" : "opacity-0"}`}
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

      {/* Dark overlay for text readability */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Interactive image dots */}
      <div className="absolute bottom-24 inset-x-0 flex justify-center gap-2 z-10 pointer-events-auto">
        {heroSlides.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActive(i)}
            aria-label={`Show ${img.alt}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-7 bg-[hsl(45_90%_52%)]"
                : "w-2 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
