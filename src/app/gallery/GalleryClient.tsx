"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { type GalleryCategory, type GalleryImage } from "@/lib/data";

interface GalleryVideo {
  publicId: string;
  url: string;
  duration: number | null;
}

type Filter = GalleryCategory | "Videos";

const baseCategories: GalleryCategory[] = [
  "All",
  "Food",
  "Events",
  "Private Dining",
  "Weddings",
  "Behind the Scenes",
  "Chef",
];

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [activeCategory, setActiveCategory] = useState<Filter>("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const categories: Filter[] =
    videos.length > 0 ? [...baseCategories, "Videos"] : baseCategories;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/media")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setVideos(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered =
    activeCategory === "All"
      ? images
      : activeCategory === "Videos"
        ? []
        : images.filter((img) => img.category === activeCategory);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setLightboxIdx(null);
    document.body.style.overflow = "";
  };
  const prev = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null,
    );
  const next = () =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % filtered.length : null));

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Gallery">
      <div className="mx-auto max-w-7xl">
        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="tablist"
          aria-label="Gallery categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]"
                  : "bg-[hsl(0_0%_14%)] text-[hsl(0_0%_65%)] hover:bg-[hsl(0_0%_18%)] hover:text-[hsl(42_30%_94%)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Full grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="list"
        >
          {filtered.map((img, idx) => (
            <button
              key={img.id}
              role="listitem"
              onClick={() => openLightbox(idx)}
              className="relative aspect-square w-full overflow-hidden rounded-xl block group cursor-pointer focus-visible:ring-2 focus-visible:ring-[hsl(45_90%_52%)] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_10%)]"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-3">
                {img.caption && (
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.caption}
                  </span>
                )}
              </div>
            </button>
          ))}

          {activeCategory === "Videos" ||
          (activeCategory === "All" && videos.length > 0)
            ? videos.map((video) => (
                <div
                  key={video.publicId}
                  role="listitem"
                  className="relative aspect-square w-full overflow-hidden rounded-xl bg-black"
                >
                  <video
                    src={video.url}
                    controls
                    preload="metadata"
                    playsInline
                    className="absolute inset-0 size-full object-cover"
                    aria-label="Chef Harrizona video"
                  />
                </div>
              ))
            : null}
        </div>

        {filtered.length === 0 && activeCategory !== "Videos" && (
          <p className="py-16 text-center text-[hsl(0_0%_45%)]">
            No photos in this category yet.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={filtered[lightboxIdx]?.alt}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 size-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <div className="relative w-screen h-screen">
            <Image
              src={filtered[lightboxIdx].src}
              alt={filtered[lightboxIdx].alt}
              fill
              className="object-contain p-4 sm:p-10"
              sizes="100vw"
              priority
            />
            {filtered[lightboxIdx].caption && (
              <p className="absolute bottom-6 inset-x-0 text-center text-sm text-white/70 px-4">
                {filtered[lightboxIdx].caption}
              </p>
            )}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 size-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <p
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-sm text-white/50"
            aria-live="polite"
          >
            {lightboxIdx + 1} / {filtered.length}
          </p>
        </div>
      )}
    </section>
  );
}
