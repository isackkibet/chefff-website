"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Trash2, ImageOff } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import AdminGuard from "@/components/admin/AdminGuard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ImageUploader from "@/components/ui/ImageUploader";
import { type GalleryCategory } from "@/lib/data";
import { useToast } from "@/components/ui/ToastProvider";

const CATEGORIES: Exclude<GalleryCategory, "All">[] = [
  "Food",
  "Events",
  "Private Dining",
  "Weddings",
  "Behind the Scenes",
  "Chef",
];

interface GalleryRow {
  id: number;
  src: string;
  alt: string;
  caption: string | null;
  category: string;
}

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryRow[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    src: "",
    alt: "",
    caption: "",
    category: "Food" as Exclude<GalleryCategory, "All">,
  });

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (!res.ok) throw new Error();
      setImages(await res.json());
    } catch {
      toast("error", "Could not load gallery images.");
    }
  }, [toast]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  async function handleAdd() {
    if (!form.src.trim() || !form.alt.trim()) {
      toast("error", "Image URL and alt text are required.");
      return;
    }
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: form.src.trim(),
          alt: form.alt.trim(),
          caption: form.caption.trim() || undefined,
          category: form.category,
        }),
      });
      if (!res.ok) throw new Error();
      setForm({ src: "", alt: "", caption: "", category: "Food" });
      setAddOpen(false);
      toast("success", "Image added to gallery");
      await loadImages();
    } catch {
      toast("error", "Could not save the image. Please try again.");
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setDeleteId(null);
      toast("success", "Image removed");
      await loadImages();
    } catch {
      toast("error", "Could not remove the image.");
    }
  }

  const inputClass =
    "w-full rounded-xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_22%)] px-3 py-2.5 text-sm text-[hsl(42_30%_94%)] placeholder:text-[hsl(0_0%_38%)] focus:outline-none focus:border-[hsl(45_90%_52%)] transition-colors";

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminNav />
        <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">
                  Gallery Management
                </h1>
                <p className="text-sm text-[hsl(0_0%_50%)]">
                  {images.length} images
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setAddOpen(true)}
              >
                <Plus size={16} aria-hidden="true" /> Add Image
              </Button>
            </div>

            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              role="list"
            >
              {images.map((img) => (
                <div
                  key={img.id}
                  role="listitem"
                  className="group relative rounded-2xl overflow-hidden bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)]"
                >
                  <div className="relative h-44">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                      <button
                        onClick={() => setDeleteId(img.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 rounded-lg bg-[hsl(0_72%_51%)] text-white px-3 py-2 text-xs font-medium hover:bg-[hsl(0_72%_44%)]"
                        aria-label={`Delete ${img.alt}`}
                      >
                        <Trash2 size={12} aria-hidden="true" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      {img.caption && (
                        <p className="text-xs font-medium text-[hsl(42_30%_94%)] leading-snug truncate">
                          {img.caption}
                        </p>
                      )}
                      <Badge variant="muted">{img.category}</Badge>
                    </div>
                    <p className="text-xs text-[hsl(0_0%_40%)] truncate">
                      {img.alt}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="py-24 text-center">
                <ImageOff
                  size={40}
                  className="text-[hsl(0_0%_30%)] mx-auto mb-3"
                  aria-hidden="true"
                />
                <p className="text-[hsl(0_0%_40%)]">No gallery images yet.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add image modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        aria-label="Add gallery image"
        className="max-w-md"
      >
        <h2 className="font-display text-xl font-bold mb-5 pr-8">
          Add Gallery Image
        </h2>
        <div className="space-y-4">
          <div>
            <ImageUploader
              value={form.src}
              onChange={(src) => setForm({ ...form, src })}
              label="Image *"
            />
          </div>
          <div>
            <label
              htmlFor="img-alt"
              className="block text-sm font-medium mb-1.5"
            >
              Alt Text *{" "}
              <span className="text-[hsl(0_0%_45%)] font-normal">
                (for accessibility)
              </span>
            </label>
            <input
              id="img-alt"
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              className={inputClass}
              placeholder="Describe the image…"
            />
          </div>
          <div>
            <label
              htmlFor="img-caption"
              className="block text-sm font-medium mb-1.5"
            >
              Caption (optional)
            </label>
            <input
              id="img-caption"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              className={inputClass}
              placeholder="Short display caption"
            />
          </div>
          <div>
            <label
              htmlFor="img-cat"
              className="block text-sm font-medium mb-1.5"
            >
              Category *
            </label>
            <select
              id="img-cat"
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as typeof form.category,
                })
              }
              className={`${inputClass} cursor-pointer`}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {form.src && (
            <div className="relative h-36 rounded-xl overflow-hidden border border-[hsl(0_0%_20%)]">
              <Image
                src={form.src}
                alt="Preview"
                fill
                className="object-cover"
                onError={() => {}}
              />
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button variant="primary" onClick={handleAdd} className="flex-1">
              Upload Image
            </Button>
            <Button
              variant="outline"
              onClick={() => setAddOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-label="Confirm delete"
        className="max-w-sm"
      >
        <div className="text-center py-2">
          <Trash2
            size={36}
            className="text-[hsl(0_72%_65%)] mx-auto mb-4"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-lg mb-2">Remove this image?</h2>
          <p className="text-sm text-[hsl(0_0%_50%)] mb-6">
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => setDeleteId(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteId && handleDelete(deleteId)}
              className="flex-1 bg-[hsl(0_72%_51%)] text-white hover:bg-[hsl(0_72%_44%)]"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </AdminGuard>
  );
}
