"use client";

import { useState } from "react";
import Image from "next/image";
import { ChefHat, Info } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { ButtonLink } from "@/components/ui/Button";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { menuItems, type MenuItem, type DietaryTag } from "@/lib/data";

type Category = "All" | MenuItem["category"];

const categories: Category[] = [
  "All",
  "Starters",
  "Mains",
  "Desserts",
  "Drinks",
  "Chef Specials",
];

const dietaryOptions: DietaryTag[] = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Dairy Free",
  "Contains Nuts",
  "Spicy",
];

function DietaryBadge({ tag }: { tag: DietaryTag }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[hsl(0_0%_100%/0.08)] px-2 py-0.5 text-xs text-[hsl(0_0%_65%)]">
      {tag}
    </span>
  );
}

export default function MenuClient() {
  const [category, setCategory] = useState<Category>("All");
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const filtered = menuItems.filter((item) => {
    const catMatch = category === "All" || item.category === category;
    const dietMatch =
      dietary.length === 0 || dietary.every((d) => item.dietary.includes(d));
    return catMatch && dietMatch && item.available;
  });

  function toggleDietary(tag: DietaryTag) {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag],
    );
  }

  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Menu items">
      <div className="mx-auto max-w-7xl">
        {/* Category filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-6"
          role="tablist"
          aria-label="Menu categories"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                category === cat
                  ? "bg-[hsl(45_90%_52%)] text-[hsl(0_0%_10%)]"
                  : "bg-[hsl(0_0%_14%)] text-[hsl(0_0%_65%)] hover:bg-[hsl(0_0%_18%)] hover:text-[hsl(42_30%_94%)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary filter */}
        <div
          className="flex flex-wrap gap-2 justify-center mb-10"
          role="group"
          aria-label="Dietary filters"
        >
          {dietaryOptions.map((label) => (
            <button
              key={label}
              onClick={() => toggleDietary(label)}
              aria-pressed={dietary.includes(label)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border ${
                dietary.includes(label)
                  ? "border-[hsl(45_90%_52%)] bg-[hsl(45_90%_52%/0.12)] text-[hsl(45_90%_52%)]"
                  : "border-[hsl(0_0%_22%)] text-[hsl(0_0%_55%)] hover:border-[hsl(0_0%_35%)]"
              }`}
            >
              {label}
            </button>
          ))}
          {dietary.length > 0 && (
            <button
              onClick={() => setDietary([])}
              className="text-xs text-[hsl(0_0%_45%)] hover:text-[hsl(42_30%_94%)] transition-colors px-2"
            >
              Clear filters
            </button>
          )}
        </div>

        <p
          className="text-sm text-[hsl(0_0%_45%)] text-center mb-8"
          aria-live="polite"
          aria-atomic="true"
        >
          Showing {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
        </p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[hsl(0_0%_45%)] text-lg">
              No dishes match your current filters.
            </p>
            <button
              onClick={() => {
                setCategory("All");
                setDietary([]);
              }}
              className="mt-4 text-[hsl(45_90%_52%)] hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="list"
          >
            {filtered.map((dish) => (
              <article
                key={dish.id}
                role="listitem"
                className="group overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {dish.chefPick && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[hsl(45_90%_52%)] px-2.5 py-0.5 text-xs font-bold text-[hsl(0_0%_10%)]">
                      <ChefHat size={11} aria-hidden="true" /> Chef's Pick
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display font-semibold text-sm leading-snug">
                      {dish.name}
                    </h3>
                    <Badge variant="gold">{dish.category}</Badge>
                  </div>
                  <p className="text-xs text-[hsl(0_0%_55%)] leading-relaxed mb-3 line-clamp-2 flex-1">
                    {dish.description}
                  </p>
                  {dish.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {dish.dietary.map((d) => (
                        <DietaryBadge key={d} tag={d} />
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-[hsl(0_0%_16%)]">
                    <span className="font-bold text-[hsl(45_90%_52%)]">
                      KES {dish.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => setSelected(dish)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(42_30%_85%)] hover:text-[hsl(45_90%_52%)] transition-colors"
                      aria-label={`View details for ${dish.name}`}
                    >
                      <Info size={13} aria-hidden="true" /> Details
                    </button>
                  </div>
                  <div className="mt-3">
                    <AddToCartButton
                      item={{
                        id: dish.id,
                        name: dish.name,
                        price: dish.price,
                        image: dish.image,
                      }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Dish detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        aria-label={selected ? `Details for ${selected.name}` : undefined}
        className="max-w-lg"
      >
        {selected && (
          <div>
            <div className="relative h-56 rounded-xl overflow-hidden mb-5">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-display text-xl font-bold">
                {selected.name}
              </h2>
              <span className="font-bold text-lg text-[hsl(45_90%_52%)] shrink-0">
                KES {selected.price.toLocaleString()}
              </span>
            </div>
            <Badge variant="gold" className="mb-3">
              {selected.category}
            </Badge>
            <p className="text-sm text-[hsl(0_0%_65%)] leading-relaxed mb-4">
              {selected.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="font-semibold text-[hsl(42_30%_94%)] mb-1">
                  Ingredients
                </p>
                <p className="text-[hsl(0_0%_55%)]">
                  {selected.ingredients.join(", ")}
                </p>
              </div>
              {selected.allergens.length > 0 && (
                <div>
                  <p className="font-semibold text-[hsl(42_30%_94%)] mb-1">
                    Allergens
                  </p>
                  <p className="text-[hsl(0_72%_65%)]">
                    {selected.allergens.join(", ")}
                  </p>
                </div>
              )}
            </div>
            {selected.dietary.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.dietary.map((d) => (
                  <DietaryBadge key={d} tag={d} />
                ))}
              </div>
            )}
            <ButtonLink
              href="/book"
              variant="primary"
              className="w-full justify-center"
            >
              Book a Private Experience with this Dish
            </ButtonLink>
          </div>
        )}
      </Modal>
    </section>
  );
}
