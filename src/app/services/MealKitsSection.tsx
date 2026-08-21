import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Users, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { mealKits, type MealKit } from "@/lib/data";

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`${rating} out of 5 stars`} role="img">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`size-3.5 ${i < Math.round(rating) ? "fill-[hsl(45_90%_52%)] text-[hsl(45_90%_52%)]" : "fill-none text-[hsl(0_0%_30%)]"}`}
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs font-semibold text-[hsl(45_90%_52%)]">
        {rating}
      </span>
      <span className="text-xs text-[hsl(0_0%_45%)]">({count})</span>
    </div>
  );
}

function DifficultyDot({ difficulty }: { difficulty: MealKit["difficulty"] }) {
  const color = {
    Easy: "bg-[hsl(142_71%_45%)]",
    Beginner: "bg-[hsl(142_71%_45%)]",
    Intermediate: "bg-[hsl(38_92%_50%)]",
  }[difficulty];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-[hsl(0_0%_55%)]">
      <span className={`size-1.5 rounded-full ${color}`} aria-hidden="true" />
      {difficulty}
    </span>
  );
}

export default function MealKitsSection() {
  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[hsl(0_0%_8%)]"
      aria-label="Authentic Kenyan meal kits"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Harrizona Cullinaries"
          title="Authentic Kenyan Meal Kits"
          subtitle="Bring Chef Harrizona's expertise to your kitchen. Fresh ingredients, traditional recipes, and step-by-step guidance delivered to your door."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {mealKits.map((kit) => {
            const discount = Math.round(
              ((kit.originalPrice - kit.price) / kit.originalPrice) * 100,
            );
            return (
              <article
                key={kit.id}
                role="listitem"
                className="group flex flex-col overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={kit.image}
                    alt={kit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {kit.badge && (
                      <span className="rounded-full bg-[hsl(45_90%_52%)] px-2.5 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                        {kit.badge}
                      </span>
                    )}
                    <span className="rounded-full bg-[hsl(0_72%_51%)] px-2.5 py-0.5 text-xs font-bold text-white">
                      -{discount}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <StarRating rating={kit.rating} count={kit.reviews} />
                  <h2 className="mt-2 font-display font-semibold text-base leading-snug mb-1">
                    {kit.name}
                  </h2>
                  <p className="text-xs text-[hsl(0_0%_55%)] leading-relaxed mb-3 line-clamp-2 flex-1">
                    {kit.shortDesc}
                  </p>

                  <div className="flex items-center gap-3 mb-3 text-xs text-[hsl(0_0%_50%)]">
                    <span className="flex items-center gap-1">
                      <Users size={12} aria-hidden="true" /> {kit.serves}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} aria-hidden="true" /> {kit.time}
                    </span>
                    <DifficultyDot difficulty={kit.difficulty} />
                  </div>

                  <div className="space-y-1 mb-4">
                    {kit.features.slice(0, 2).map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-1.5 text-xs text-[hsl(0_0%_55%)]"
                      >
                        <Check
                          size={11}
                          className="shrink-0 text-[hsl(45_90%_52%)]"
                          aria-hidden="true"
                        />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[hsl(0_0%_16%)]">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-[hsl(45_90%_52%)]">
                        KSh {kit.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-[hsl(0_0%_40%)] line-through">
                        KSh {kit.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <AddToCartButton item={kit} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/meal-kits"
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(45_90%_52%/0.4)] px-6 py-3 text-sm font-semibold text-[hsl(45_90%_52%)] hover:bg-[hsl(45_90%_52%/0.1)] transition-colors"
          >
            Browse All Meal Kits <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
