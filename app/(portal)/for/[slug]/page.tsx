import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { BUYER_GUIDES } from "@/data/buyer-guides";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export async function generateStaticParams() {
  return BUYER_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = BUYER_GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.title,
    description: guide.description,
    keywords: [
      `${guide.title} Zanzibar`,
      `property for ${guide.subtitle}`,
      `buy property Zanzibar ${guide.slug}`,
    ],
    alternates: { canonical: `${SITE.url}/for/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE.url}/for/${slug}`,
      siteName: SITE.name,
    },
  };
}

export default async function BuyerGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = BUYER_GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  const buyerSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: guide.title,
    description: guide.description,
    url: `${SITE.url}/for/${slug}`,
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyerSchema) }}
      />
      {guide.faqs.length > 0 && <FaqJsonLd items={guide.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "For Buyers", url: `${SITE.url}/for` },
          { name: guide.title, url: `${SITE.url}/for/${slug}` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <nav className="mb-4 text-xs text-white/50" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white/80" aria-current="page">{guide.title}</li>
            </ol>
          </nav>
          <div className="text-4xl mb-3">{guide.icon}</div>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
            {guide.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            {guide.subtitle}
          </p>
        </div>
      </section>

      <div className="container-portal py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{guide.description}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Key Information</h2>
              <ul className="mt-3 space-y-2">
                {guide.keyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-zb-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Property Types Available</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.propertyTypes.map((type) => (
                  <span key={type} className="rounded-sm border border-zb-border px-3 py-1.5 text-xs font-medium text-zb-navy">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Recommended Areas</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.areas.map((area) => (
                  <Link
                    key={area}
                    href={`/locations/${area.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-sm border border-zb-gold/30 bg-zb-gold/5 px-3 py-1.5 text-xs font-medium text-zb-gold hover:bg-zb-gold/10"
                  >
                    {area}
                  </Link>
                ))}
              </div>
            </div>

            {guide.faqs.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-zb-navy">Frequently Asked Questions</h2>
                <div className="mt-3 space-y-4">
                  {guide.faqs.map((faq, i) => (
                    <div key={i} className="rounded-sm border border-zb-border p-4">
                      <h3 className="text-sm font-semibold text-zb-navy">{faq.q}</h3>
                      <p className="mt-2 text-sm text-zb-muted">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[5rem] space-y-6">
              <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Budget Range</h2>
                <p className="mt-2 text-lg font-semibold text-zb-gold">{guide.budgetRange}</p>
                <p className="mt-1 text-xs text-zb-muted">Typical for this buyer type</p>
              </div>

              <div className="rounded-sm border border-zb-border bg-white p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Next Steps</h2>
                <p className="mt-2 text-sm text-zb-muted">
                  Tell us what you are looking for and our local team will suggest matching opportunities.
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href="/tell-us"
                    className="flex w-full items-center justify-center rounded-sm bg-zb-navy py-3 text-sm font-semibold text-white transition hover:bg-zb-navy-deep"
                  >
                    {guide.cta}
                  </Link>
                  <Link
                    href="/properties"
                    className="flex w-full items-center justify-center rounded-sm border border-zb-navy py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
                  >
                    Browse Properties
                  </Link>
                </div>
              </div>

              <div className="rounded-sm border border-zb-border p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Related Guides</h2>
                <ul className="mt-3 space-y-2">
                  {BUYER_GUIDES.filter((g) => g.slug !== slug)
                    .slice(0, 3)
                    .map((g) => (
                      <li key={g.slug}>
                        <Link href={`/for/${g.slug}`} className="text-sm text-zb-gold hover:text-zb-gold/80">
                          {g.icon} {g.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
