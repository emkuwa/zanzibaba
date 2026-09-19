import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { LOCATION_GUIDES } from "@/data/locations";
import { BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

export const metadata: Metadata = {
  title: "Zanzibar Location Guides — Best Areas to Buy Property",
  description:
    "Explore Zanzibar's coastal areas — Paje, Nungwi, Jambiani, Stone Town, and more. Area guides with property types, lifestyle, infrastructure, and local knowledge from Zanzibaba Real Estate.",
  keywords: [
    "Zanzibar areas for property",
    "best areas Zanzibar",
    "Paje vs Nungwi property",
    "where to buy Zanzibar",
    "Zanzibar location guide",
    "Zanzibar beachfront areas",
  ],
  alternates: { canonical: `${SITE.url}/locations` },
  openGraph: {
    title: "Zanzibar Location Guides — Best Areas to Buy Property",
    description: "Explore Zanzibar's coastal areas for property purchase.",
    url: `${SITE.url}/locations`,
    siteName: SITE.name,
  },
};

export default function LocationsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zanzibar Area Guides",
    description: "Property and lifestyle guides for coastal areas in Zanzibar, Tanzania",
    numberOfItems: LOCATION_GUIDES.length,
    itemListElement: LOCATION_GUIDES.map((l, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${l.name}, Zanzibar`,
      description: l.tagline,
      url: `${SITE.url}/locations/${l.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Locations", url: `${SITE.url}/locations` },
        ]}
      />
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Locations</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Best Areas to Buy Property in Zanzibar
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Each area offers a different character — from the lively east coast to the quiet north-east
            and heritage Stone Town. Find the right area for your property goals.
          </p>
        </div>
      </section>

      <section className="container-portal py-10 sm:py-14">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LOCATION_GUIDES.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/locations/${location.slug}`}
                className="group relative block min-h-[280px] overflow-hidden rounded-sm border border-zb-border transition hover:border-zb-gold/40 hover:shadow-zb-gold-glow"
              >
                <Image
                  src={location.image}
                  alt={`${location.name} — ${location.tagline}`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <span className="w-fit rounded-sm border border-zb-gold/40 bg-zb-gold/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-zb-gold backdrop-blur-sm">
                    {location.tagline}
                  </span>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-white">{location.name}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">{location.description}</p>
                  <span className="mt-4 text-xs font-bold uppercase tracking-wider text-zb-gold">
                    View {location.name} guide
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
