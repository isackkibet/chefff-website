import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import { blogPosts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Blog | Recipes, Chef Tips & Culinary Stories',
  description: 'Read Chef Harrizona\'s blog for recipes, culinary tips, chef stories and guides to private dining and Kenyan cuisine.',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured)
  const rest     = blogPosts.filter((p) => !p.featured)

  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center" aria-label="Blog header">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">Chef's Journal</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Recipes & <span className="text-gold-gradient">Stories</span>
          </h1>
          <div className="section-divider mx-auto mb-8" />
          <p className="text-lg text-[hsl(0_0%_65%)] leading-relaxed">
            Tips, recipes, culinary stories and guides from the kitchen of Chef Harrizona.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8" aria-label="Blog posts">
        <div className="mx-auto max-w-7xl">

          {/* Featured */}
          {featured.length > 0 && (
            <div className="mb-16">
              <SectionHeader eyebrow="Featured" title="Editor's Picks" centered={false} />
              <div className="grid lg:grid-cols-2 gap-6">
                {featured.map((post) => (
                  <article key={post.id} className="group overflow-hidden rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] card-hover">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="gold">{post.category}</Badge>
                          <span className="flex items-center gap-1 text-xs text-[hsl(0_0%_45%)]">
                            <Clock size={11} aria-hidden="true" /> {post.readTime} min read
                          </span>
                        </div>
                        <h2 className="font-display text-xl font-bold mb-2 group-hover:text-[hsl(45_90%_52%)] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-sm text-[hsl(0_0%_55%)] leading-relaxed mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-[hsl(0_0%_45%)]">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="flex items-center gap-1 text-[hsl(45_90%_52%)] font-medium">
                            Read more <ArrowRight size={12} aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* All posts */}
          {rest.length > 0 && (
            <div>
              <SectionHeader eyebrow="All Posts" title="From the Kitchen" centered={false} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {rest.map((post) => (
                  <article key={post.id} className="group flex gap-5 rounded-2xl bg-[hsl(0_0%_12%)] border border-[hsl(0_0%_18%)] p-5 card-hover">
                    <Link href={`/blog/${post.slug}`} className="flex gap-5 flex-1">
                      <div className="relative w-28 h-28 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="112px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="muted">{post.category}</Badge>
                        </div>
                        <h2 className="font-display font-semibold text-sm leading-snug mb-1 group-hover:text-[hsl(45_90%_52%)] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-xs text-[hsl(0_0%_50%)] line-clamp-2 mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-[hsl(0_0%_40%)]">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span>·</span>
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
