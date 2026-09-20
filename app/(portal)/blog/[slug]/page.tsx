import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { getBlogPostBySlug, getRelatedPosts, getPublishedBlogPosts } from "@/lib/blog-store";
import { BLOG_CATEGORIES } from "@/lib/blog-types";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export async function generateStaticParams() {
  const posts = getPublishedBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Blog post not found" };

  return {
    title: `${post.title} | Zanzibaba Blog`,
    description: post.excerpt.slice(0, 155),
    keywords: post.tags,
    alternates: { canonical: `${SITE.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/blog/${slug}`,
      siteName: SITE.name,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE.url}/blog/${slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {post.faqs && post.faqs.length > 0 && <FaqJsonLd items={post.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Blog", url: `${SITE.url}/blog` },
          { name: post.title, url: `${SITE.url}/blog/${slug}` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-8 sm:pt-32">
        <div className="container-portal">
          <nav className="mb-4 text-xs text-white/50" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-white/80" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-sm bg-zb-gold/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-zb-gold">
              {BLOG_CATEGORIES[post.category]?.name || post.category}
            </span>
            <span className="text-[0.6rem] text-white/50">{post.readTime} min read</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl max-w-3xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">{post.excerpt}</p>
          <p className="mt-2 text-xs text-white/40">
            Published: {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <article className="container-portal py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="prose-zanzibar" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-10 rounded-sm border border-zb-border bg-zb-surface-warm p-6">
              <h2 className="font-serif text-xl font-semibold text-zb-navy mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-zb-navy">{faq.q}</h3>
                    <p className="mt-1 text-sm text-zb-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="container-portal py-10 sm:py-14 border-t border-zb-border">
          <h2 className="font-serif text-2xl font-semibold text-zb-navy mb-6">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/blog/${r.slug}`}
                className="group rounded-sm border border-zb-border bg-white p-6 transition hover:border-zb-gold/40"
              >
                <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-zb-gold">
                  {BLOG_CATEGORIES[r.category]?.name || r.category}
                </span>
                <h3 className="mt-2 font-serif text-base font-semibold text-zb-navy group-hover:text-zb-gold transition">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-zb-muted line-clamp-2">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-zb-surface-warm py-10 sm:py-14">
        <div className="container-portal text-center">
          <h2 className="font-serif text-2xl font-semibold text-zb-navy">Have Questions?</h2>
          <p className="mt-3 text-sm text-zb-muted">
            Our local team can help with your specific property questions in Zanzibar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/tell-us" className="inline-flex items-center justify-center rounded-sm bg-zb-navy px-6 py-3 text-sm font-semibold text-white">
              Tell Us What You Need
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-6 py-3 text-sm font-semibold text-zb-navy">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gm, '<h3 class="font-serif text-lg font-semibold text-zb-navy mt-6 mb-2">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="font-serif text-xl font-semibold text-zb-navy mt-8 mb-3">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-zb-navy">$1</strong>')
    .replace(/\n\n/g, '</p><p class="mt-3 text-sm leading-relaxed text-zb-muted">')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[\s-]+$/.test(c))) return '';
      return `<div class="flex gap-4 text-sm py-1 border-b border-zb-border/30">${cells.map((c) => `<span class="flex-1 text-zb-muted">${c}</span>`).join('')}</div>`;
    })
    .replace(/^- \[ \] (.*$)/gm, '<div class="flex items-center gap-2 text-sm text-zb-muted mt-1"><span class="h-3 w-3 rounded border border-zb-border" aria-hidden></span>$1</div>')
    .replace(/^- (.*$)/gm, '<div class="flex items-start gap-2 text-sm text-zb-muted mt-1"><span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zb-gold" aria-hidden></span>$1</div>')
    .replace(/^(\d+)\. (.*$)/gm, '<div class="flex items-start gap-2 text-sm text-zb-muted mt-1"><span class="font-medium text-zb-gold">$1.</span>$2</div>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-2 border-zb-gold pl-4 text-sm italic text-zb-muted my-4">$1</blockquote>')
    .replace(/^(?!<[hbd])/gm, (m) => m ? `<p class="text-sm leading-relaxed text-zb-muted">${m}</p>` : m);
}
