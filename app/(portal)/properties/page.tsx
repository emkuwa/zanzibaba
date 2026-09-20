import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FilterBar } from "@/components/FilterBar";
import { getListingsForPublic } from "@/lib/listings-store";
import { filterListings } from "@/lib/filter-listings";
import { SEO_KEYWORDS, SITE } from "@/data/site";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

const TYPE_LABELS: Record<string, string> = {
  villa: "Beachfront Villa",
  plot: "Investment Land",
  land: "Development Land",
  house: "Family Home",
  apartment: "Apartment",
  commercial: "Commercial",
};

export const metadata: Metadata = {
  title: "Properties for Sale in Zanzibar — Villas, Land & Homes",
  description:
    "Browse property for sale in Zanzibar — beachfront villas, development land, apartments, and houses. Local property sourcing from Zanzibaba Real Estate in Paje and Stone Town.",
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: `${SITE.url}/properties` },
};

export default async function PropertiesPage({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const listings = await getListingsForPublic();
  const q = typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const params = {
    q: q ?? null,
    type: typeof searchParams?.type === "string" ? searchParams.type : null,
    location: typeof searchParams?.location === "string" ? searchParams.location : null,
    minPrice: typeof searchParams?.minPrice === "string" ? searchParams.minPrice : null,
    maxPrice: typeof searchParams?.maxPrice === "string" ? searchParams.maxPrice : null,
    date: typeof searchParams?.date === "string" ? searchParams.date : null,
    bedrooms: typeof searchParams?.bedrooms === "string" ? searchParams.bedrooms : null,
  };
  const filtered = filterListings(listings, params);

  return (
    <>
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Properties</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Property for Sale in Zanzibar
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Beachfront villas, development land, apartments and houses across Zanzibar — sourced with local knowledge.
          </p>
        </div>
      </section>

      <section id="listings" className="container-portal py-10 sm:py-14" aria-label="Property listings">
        <div className="sticky top-[4rem] z-10 -mx-3 bg-white/95 px-3 py-3 backdrop-blur-sm sm:-mx-5 sm:px-5">
          <Suspense fallback={<div className="h-16" />}>
            <FilterBar />
          </Suspense>
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <div className="rounded-sm border border-zb-border bg-white p-12 text-center">
              <p className="font-serif text-xl text-zb-navy">No properties match your filters</p>
              <p className="mt-2 text-sm text-zb-muted">
                Try adjusting your search or{" "}
                <a
                  href="https://wa.me/255716002790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-zb-gold hover:underline"
                >
                  WhatsApp us
                </a>{" "}
                to discuss what you're looking for.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((listing) => {
                const image = listing.images?.[0] ?? DEFAULT_LISTING_IMAGE;
                return (
                  <li key={listing.id}>
                    <Link
                      href={`/properties/${listing.slug}`}
                      className="group block overflow-hidden"
                    >
                      <article className="flex h-full flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                          <Image
                            src={image}
                            alt={`${listing.title} — ${listing.location} property for sale in Zanzibar`}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/60 via-transparent to-transparent" />
                          <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy backdrop-blur-sm">
                            {listing.location}
                          </span>
                          {listing.propertyType && (
                            <span className="absolute right-3 top-3 rounded-sm bg-zb-navy-deep/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                              {TYPE_LABELS[listing.propertyType] || listing.propertyType}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col pt-4">
                          <h2 className="font-serif text-lg font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
                            {listing.title}
                          </h2>
                          <p className="mt-1 font-serif text-base font-semibold text-zb-gold">
                            {formatPrice(listing.price, listing.currency)}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-zb-muted">
                            {listing.bedrooms && (
                              <span>{listing.bedrooms} {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>
                            )}
                            {listing.features?.slice(0, 2).map((f) => (
                              <span key={f} className="flex items-center gap-1">
                                <span className="text-zb-gold">·</span> {f}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zb-navy/60 transition-colors group-hover:text-zb-gold">
                            View Property →
                          </p>
                        </div>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-zb-border bg-zb-surface-warm py-12 sm:py-16">
        <div className="container-portal text-center">
          <p className="text-eyebrow text-zb-gold">Not finding what you need?</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-zb-navy">
            Tell us what you're looking for
          </h2>
          <p className="mt-3 mx-auto max-w-xl text-sm text-zb-muted">
            Not every property opportunity is publicly advertised. Share your requirements and our local team will help source suitable options across Zanzibar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/255716002790"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#20b858]"
            >
              WhatsApp an Advisor
            </a>
            <Link
              href="/tell-us"
              className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-6 py-3 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
            >
              Smart Property Match
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
