import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/data/site";
import { LOCATION_GUIDES, getLocationBySlug } from "@/data/locations";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export async function generateStaticParams() {
  return LOCATION_GUIDES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: "Location not found" };

  return {
    title: `${location.name} Property for Sale — ${location.tagline} | Zanzibaba`,
    description: `${location.name}, Zanzibar — ${location.tagline}. ${location.description.slice(0, 120)}. Property types, infrastructure, and area guide from local advisors.`,
    keywords: [
      `${location.name} property for sale`,
      `${location.name} Zanzibar real estate`,
      `buy property ${location.name} Zanzibar`,
      `${location.name} beachfront villa`,
      `${location.name} land for sale`,
    ],
    alternates: { canonical: `${SITE.url}/locations/${slug}` },
    openGraph: {
      title: `${location.name} Property for Sale — Zanzibar`,
      description: location.description.slice(0, 155),
      url: `${SITE.url}/locations/${slug}`,
      siteName: SITE.name,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/locations` },
          { name: location.name, url: `${SITE.url}/locations/${slug}` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <nav className="mb-4 text-xs text-white/50" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/locations" className="hover:text-white">Locations</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white/80" aria-current="page">{location.name}</li>
            </ol>
          </nav>
          <p className="text-eyebrow text-zb-gold">{location.tagline}</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            {location.name} — Zanzibar
          </h1>
        </div>
      </section>

      <div className="container-portal py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What is {location.name} like for property buyers?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{location.description}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What is the lifestyle in {location.name}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{location.lifestyle}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What is the beach like in {location.name}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{location.beach}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What property types are available in {location.name}?</h2>
              <ul className="mt-3 space-y-2">
                {location.propertyTypes.map((type) => (
                  <li key={type} className="flex items-center gap-2 text-sm text-zb-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">What infrastructure and access does {location.name} have?</h2>
              <p className="mt-3 text-sm leading-relaxed text-zb-muted">{location.infrastructure}</p>
            </div>

            <div>
              <h2 className="font-serif text-xl font-semibold text-zb-navy">Who is {location.name} suitable for?</h2>
              <ul className="mt-3 space-y-2">
                {location.whoItSuits.map((buyer) => (
                  <li key={buyer} className="flex items-center gap-2 text-sm text-zb-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                    {buyer}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[5rem] space-y-6">
              <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Properties in {location.name}</h2>
                <p className="mt-2 text-sm text-zb-muted">
                  Browse available properties in {location.name} or tell us what you are looking for.
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href={`/properties?location=${location.name}`}
                    className="flex w-full items-center justify-center rounded-sm bg-zb-navy py-3 text-sm font-semibold text-white transition hover:bg-zb-navy-deep"
                  >
                    View Properties in {location.name}
                  </Link>
                  <Link
                    href="/tell-us"
                    className="flex w-full items-center justify-center rounded-sm border border-zb-navy py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
                  >
                    Tell Us What You Need
                  </Link>
                </div>
              </div>

              {location.nearbyAreas.length > 0 && (
                <div className="rounded-sm border border-zb-border p-6">
                  <h2 className="font-serif text-lg font-semibold text-zb-navy">Nearby Areas</h2>
                  <ul className="mt-3 space-y-2">
                    {location.nearbyAreas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          href={`/locations/${area.slug}`}
                          className="text-sm text-zb-gold hover:text-zb-gold/80"
                        >
                          {area.name} &rarr;
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
