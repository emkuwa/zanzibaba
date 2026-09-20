import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { PROPERTY_TYPE_GUIDES } from "@/data/property-types";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export async function generateStaticParams() {
  return PROPERTY_TYPE_GUIDES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = PROPERTY_TYPE_GUIDES.find((t) => t.slug === slug);
  if (!guide) return { title: "Property type not found" };

  return {
    title: `${guide.pluralName} for Sale in Zanzibar — Prices, Areas, Guide`,
    description: guide.description,
    keywords: [
      `${guide.name.toLowerCase()} for sale Zanzibar`,
      `buy ${guide.name.toLowerCase()} Zanzibar`,
      `Zanzibar ${guide.name.toLowerCase()} prices`,
      `${guide.pluralName.toLowerCase()} Zanzibar`,
    ],
    alternates: { canonical: `${SITE.url}/property-type/${slug}` },
    openGraph: {
      title: `${guide.pluralName} for Sale in Zanzibar`,
      description: guide.description,
      url: `${SITE.url}/property-type/${slug}`,
      siteName: SITE.name,
    },
  };
}

export default async function PropertyTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = PROPERTY_TYPE_GUIDES.find((t) => t.slug === slug);
  if (!guide) notFound();

  const typeSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${guide.pluralName} for Sale in Zanzibar`,
    description: guide.description,
    url: `${SITE.url}/property-type/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(typeSchema) }}
      />
      {guide.faqs.length > 0 && <FaqJsonLd items={guide.faqs} />}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Properties", url: `${SITE.url}/properties` },
          { name: guide.pluralName, url: `${SITE.url}/property-type/${slug}` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <nav className="mb-4 text-xs text-white/50" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/properties" className="hover:text-white">Properties</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white/80" aria-current="page">{guide.pluralName}</li>
            </ol>
          </nav>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            {guide.pluralName} for Sale in Zanzibar
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            {guide.description}
          </p>
        </div>
      </section>

      <div className="container-portal py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What are {guide.pluralName.toLowerCase()} in Zanzibar?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{guide.longDescription}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Key Features</h2>
              <ul className="mt-3 space-y-2">
                {guide.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zb-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Best Areas for {guide.pluralName}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.bestAreas.map((area) => (
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

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Who are {guide.pluralName.toLowerCase()} suitable for?</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {guide.whoItSuits.map((buyer) => (
                  <span key={buyer} className="rounded-sm border border-zb-border px-3 py-1.5 text-xs font-medium text-zb-navy">
                    {buyer}
                  </span>
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
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Price Range</h2>
                <p className="mt-2 text-lg font-semibold text-zb-gold">{guide.priceRange}</p>
                <p className="mt-1 text-xs text-zb-muted">Typical for {guide.pluralName.toLowerCase()} in Zanzibar</p>
              </div>

              <div className="rounded-sm border border-zb-border bg-white p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Find {guide.pluralName}</h2>
                <div className="mt-4 space-y-3">
                  <Link
                    href={`/properties?type=${guide.name}`}
                    className="flex w-full items-center justify-center rounded-sm bg-zb-navy py-3 text-sm font-semibold text-white transition hover:bg-zb-navy-deep"
                  >
                    Browse {guide.pluralName}
                  </Link>
                  <Link
                    href="/tell-us"
                    className="flex w-full items-center justify-center rounded-sm border border-zb-navy py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
                  >
                    Tell Us What You Need
                  </Link>
                </div>
              </div>

              <div className="rounded-sm border border-zb-border p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Other Property Types</h2>
                <ul className="mt-3 space-y-2">
                  {PROPERTY_TYPE_GUIDES.filter((t) => t.slug !== slug).map((t) => (
                    <li key={t.slug}>
                      <Link href={`/property-type/${t.slug}`} className="text-sm text-zb-gold hover:text-zb-gold/80">
                        {t.pluralName}
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
