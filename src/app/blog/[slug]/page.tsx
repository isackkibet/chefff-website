import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Chef Harrizona Blog`,
    description: post.excerpt,
    openGraph: { images: [{ url: post.image }] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Blog
        </Link>
      </div>

      <article className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="gold">{post.category}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-[hsl(0_0%_45%)]">
              <Calendar size={13} aria-hidden="true" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[hsl(0_0%_45%)]">
              <Clock size={13} aria-hidden="true" /> {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 900px) 100vw, 896px"
            />
          </div>

          {/* Article body, placeholder until real content is provided */}
          <div className="prose prose-invert max-w-none text-[hsl(0_0%_65%)] leading-relaxed space-y-5">
            <p className="text-lg text-[hsl(42_30%_85%)]">{post.excerpt}</p>
            <p>
              This post is a placeholder. When real article content is provided,
              it replaces this section. The structure, metadata, SEO tags and
              image optimisation are already in place.
            </p>
            <p>
              Chef Harrizona's blog covers recipes, culinary techniques, event
              planning guides, Kenyan ingredient spotlights and personal stories
              from the kitchen. Each post is written to be genuinely useful,
              with no filler.
            </p>
            <blockquote className="border-l-4 border-[hsl(45_90%_52%)] pl-5 italic text-[hsl(42_30%_80%)]">
              "Food is more than a meal. It is an experience, a memory and a way
              of bringing people together." Chef Harrizona
            </blockquote>
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-[hsl(0_0%_18%)] flex items-center gap-4">
            <div className="relative size-14 rounded-full overflow-hidden border-2 border-[hsl(45_90%_52%/0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=120&q=80"
                alt={post.author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-[hsl(42_30%_94%)]">
                {post.author}
              </p>
              <p className="text-sm text-[hsl(0_0%_50%)]">
                Private Chef · Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">More from the Kitchen</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group flex gap-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-4 card-hover"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <Badge variant="muted" className="mb-2">
                      {r.category}
                    </Badge>
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-[hsl(45_90%_52%)] transition-colors">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
