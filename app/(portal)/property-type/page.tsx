import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/site";
import { PROPERTY_TYPE_GUIDES } from "@/data/property-types";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Property Types for Sale in Zanzibar — Villas, Land, Apartments",
  description:
    "Browse all property types available in Zanzibar — beachfront villas, land plots, apartments, off-plan developments, and beachfront properties. Prices, areas, and guides.",
  keywords: [
    "Zanzibar property types",
    "villas for sale Zanzibar",
    "land for sale Zanzibar",
    "apartments Zanzibar",
    "off-plan Zanzibar",
  ],
  alternates: { canonical: `${SITE.url}/property-type` },
  openGraph: {
    title: "Property Types for Sale in Zanzibar",
    description: "Browse all property types available in Zanzibar.",
    url: `${SITE.url}/property-type`,
    siteName: SITE.name,
  },
};

export default function PropertyTypesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Property Types", url: `${SITE.url}/property-type` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Property Types</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Property Types for Sale in Zanzibar
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Explore all property types available in Zanzibar — from beachfront villas to development land.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROPERTY_TYPE_GUIDES.map((type) => (
            <Link
              key={type.slug}
              href={`/property-type/${type.slug}`}
              className="group rounded-sm border border-zb-border bg-white p-6 transition hover:border-zb-gold/40 hover:shadow-zb-gold-glow"
            >
              <h2 className="font-serif text-lg font-semibold text-zb-navy group-hover:text-zb-gold transition">
                {type.pluralName}
              </h2>
              <p className="mt-2 text-sm text-zb-muted line-clamp-2">{type.description}</p>
              <p className="mt-3 text-xs font-semibold text-zb-gold">{type.priceRange}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {type.bestAreas.slice(0, 3).map((area) => (
                  <span key={area} className="text-[0.6rem] text-zb-muted">{area}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
