"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageUploader from "@/components/ui/ImageUploader";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, FileText } from "lucide-react";
import AdminNav from "@/components/admin/AdminNav";
import AdminGuard from "@/components/admin/AdminGuard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { adminStore } from "@/lib/admin/store";
import { type BlogPost } from "@/lib/data";
import { useToast } from "@/components/ui/ToastProvider";

const BLOG_CATEGORIES = [
  "Chef Tips",
  "Recipes",
  "Events",
  "Culinary Stories",
  "News",
  "Draft",
];

const emptyPost = (): Omit<BlogPost, "id"> => ({
  slug: "",
  title: "",
  excerpt: "",
  image: "",
  category: "Chef Tips",
  author: "Chef Harrizona",
  date: new Date().toISOString().split("T")[0],
  readTime: 5,
});

export default function AdminBlogPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyPost());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setPosts([...adminStore.posts]);
  }, []);

  function openAdd() {
    setForm(emptyPost());
    setEditPost(null);
    setModalMode("add");
  }
  function openEdit(p: BlogPost) {
    setEditPost(p);
    setForm({ ...p });
    setModalMode("edit");
  }
  function closeModal() {
    setModalMode(null);
    setEditPost(null);
  }

  function handleSave() {
    if (!form.title.trim() || !form.excerpt.trim()) {
      toast("error", "Title and excerpt are required.");
      return;
    }
    const slug =
      form.slug.trim() ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    if (modalMode === "add") {
      const newPost: BlogPost = { ...form, id: `b${Date.now()}`, slug };
      adminStore.posts = [...adminStore.posts, newPost];
      toast("success", `"${form.title}" created`);
    } else if (editPost) {
      adminStore.posts = adminStore.posts.map((p) =>
        p.id === editPost.id ? { ...editPost, ...form, slug } : p,
      );
      toast("success", `"${form.title}" updated`);
    }
    setPosts([...adminStore.posts]);
    closeModal();
  }

  function handleDelete(id: string) {
    adminStore.deletePost(id);
    setPosts([...adminStore.posts]);
    setDeleteId(null);
    toast("success", "Post deleted");
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
                  Blog Management
                </h1>
                <p className="text-sm text-[hsl(0_0%_50%)]">
                  {posts.length} posts
                </p>
              </div>
              <Button variant="primary" size="sm" onClick={openAdd}>
                <Plus size={16} aria-hidden="true" /> New Post
              </Button>
            </div>

            <div className="space-y-3" role="list">
              {posts.map((post) => (
                <div
                  key={post.id}
                  role="listitem"
                  className="flex items-center gap-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-4"
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-[hsl(0_0%_10%)] text-[hsl(0_0%_30%)]">
                        <FileText size={20} aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant={post.category === "Draft" ? "muted" : "gold"}
                      >
                        {post.category}
                      </Badge>
                      <span className="text-xs text-[hsl(0_0%_40%)]">
                        {new Date(post.date).toLocaleDateString("en-KE", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                        &nbsp;·&nbsp;{post.readTime} min
                      </span>
                    </div>
                    <p className="font-semibold text-sm truncate text-[hsl(42_30%_94%)]">
                      {post.title}
                    </p>
                    <p className="text-xs text-[hsl(0_0%_45%)] truncate mt-0.5">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_55%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                      aria-label={`View ${post.title}`}
                    >
                      <ExternalLink size={13} aria-hidden="true" />
                    </Link>
                    <button
                      onClick={() => openEdit(post)}
                      className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_0%_16%)] hover:bg-[hsl(0_0%_20%)] text-[hsl(0_0%_55%)] hover:text-[hsl(42_30%_94%)] transition-colors"
                      aria-label={`Edit ${post.title}`}
                    >
                      <Pencil size={13} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="size-8 flex items-center justify-center rounded-lg bg-[hsl(0_72%_51%/0.1)] hover:bg-[hsl(0_72%_51%/0.2)] text-[hsl(0_72%_65%)] transition-colors"
                      aria-label={`Delete ${post.title}`}
                    >
                      <Trash2 size={13} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}

              {posts.length === 0 && (
                <div className="py-20 text-center text-[hsl(0_0%_40%)]">
                  No posts yet.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add / Edit modal */}
      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        aria-label={modalMode === "add" ? "New post" : "Edit post"}
        className="max-w-lg"
      >
        <h2 className="font-display text-xl font-bold mb-5 pr-8">
          {modalMode === "add" ? "New Blog Post" : "Edit Post"}
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="post-title"
              className="block text-sm font-medium mb-1.5"
            >
              Title *
            </label>
            <input
              id="post-title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputClass}
              placeholder="Post title…"
            />
          </div>
          <div>
            <label
              htmlFor="post-slug"
              className="block text-sm font-medium mb-1.5"
            >
              Slug{" "}
              <span className="text-[hsl(0_0%_45%)] font-normal">
                (auto-generated if empty)
              </span>
            </label>
            <input
              id="post-slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={inputClass}
              placeholder="url-friendly-slug"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="post-cat"
                className="block text-sm font-medium mb-1.5"
              >
                Category
              </label>
              <select
                id="post-cat"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`${inputClass} cursor-pointer`}
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="post-read"
                className="block text-sm font-medium mb-1.5"
              >
                Read Time (mins)
              </label>
              <input
                id="post-read"
                type="number"
                min="1"
                value={form.readTime}
                onChange={(e) =>
                  setForm({ ...form, readTime: parseInt(e.target.value) || 5 })
                }
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="post-excerpt"
              className="block text-sm font-medium mb-1.5"
            >
              Excerpt / SEO Description *
            </label>
            <textarea
              id="post-excerpt"
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className={`${inputClass} resize-none`}
              placeholder="A brief summary of the post…"
            />
          </div>
          <div>
            <ImageUploader
              value={form.image}
              onChange={(image) => setForm({ ...form, image })}
              label="Cover Image"
            />
          </div>
          <div>
            <label
              htmlFor="post-date"
              className="block text-sm font-medium mb-1.5"
            >
              Publish Date
            </label>
            <input
              id="post-date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="flex gap-3 pt-1">
            <Button variant="primary" onClick={handleSave} className="flex-1">
              Save Post
            </Button>
            <Button variant="outline" onClick={closeModal} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        aria-label="Confirm delete post"
        className="max-w-sm"
      >
        <div className="text-center py-2">
          <Trash2
            size={36}
            className="text-[hsl(0_72%_65%)] mx-auto mb-4"
            aria-hidden="true"
          />
          <h2 className="font-semibold text-lg mb-2">Delete this post?</h2>
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
