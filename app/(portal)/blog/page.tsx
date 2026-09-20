import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { getPublishedBlogPosts } from "@/lib/blog-store";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-types";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Zanzibar Property Blog — Buying Guides, Market Insights, Investment Tips",
  description:
    "Expert guidance on buying property in Zanzibar — area guides, price analysis, legal advice, rental income, and investment insights from local property advisors.",
  keywords: [
    "Zanzibar property blog",
    "Zanzibar buying guide",
    "Zanzibar real estate news",
    "Zanzibar investment tips",
    "Zanzibar market insights",
  ],
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: "Zanzibar Property Blog — Zanzibaba Real Estate",
    description: "Expert guidance on buying property in Zanzibar.",
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
  },
};

export default function BlogPage() {
  const posts = getPublishedBlogPosts();
  const categories = Object.entries(BLOG_CATEGORIES);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zanzibaba Real Estate Blog",
    description: "Expert guidance on buying property in Zanzibar",
    url: `${SITE.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Blog</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Zanzibar Property Blog
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Expert guidance on buying property in Zanzibar — area guides, price analysis, legal
            advice, and investment insights from local advisors.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className="rounded-sm bg-zb-navy px-3 py-1.5 text-xs font-semibold text-white"
          >
            All Posts
          </Link>
          {categories.map(([key, cat]) => (
            <Link
              key={key}
              href={`/blog?category=${key}`}
              className="rounded-sm border border-zb-border px-3 py-1.5 text-xs font-medium text-zb-muted hover:border-zb-gold/50"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-10 text-center">
            <p className="text-sm text-zb-muted">No blog posts published yet.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-sm border border-zb-border bg-white transition hover:border-zb-gold/40 hover:shadow-zb-gold-glow"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="rounded-sm bg-zb-surface-warm px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-zb-gold">
                      {BLOG_CATEGORIES[post.category]?.name || post.category}
                    </span>
                    <span className="text-[0.6rem] text-zb-muted">{post.readTime} min read</span>
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-zb-navy group-hover:text-zb-gold transition">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zb-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-zb-gold">
                    Read more
                  </span>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
