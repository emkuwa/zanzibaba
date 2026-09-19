import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { FilterBar } from "@/components/FilterBar";
import { ListingsSection } from "@/components/ListingsSection";
import { getListingsForPublic } from "@/lib/listings-store";
import { filterListings } from "@/lib/filter-listings";
import { SEO_KEYWORDS, SITE } from "@/data/site";

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
  const featured = filtered.filter((l) => l.featured);

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
        <div className="sticky top-[4.25rem] z-10 -mx-3 bg-white/95 px-3 py-3 backdrop-blur-sm sm:-mx-5 sm:px-5">
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
                <Link href="/tell-us" className="font-semibold text-zb-gold hover:underline">
                  tell us what you're looking for
                </Link>{" "}
                and we'll notify you when matching properties become available.
              </p>
            </div>
          ) : (
            <ListingsSection
              listings={filtered}
              featured={featured}
              total={filtered.length}
            />
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
          <Link href="/tell-us" className="btn-luxury-primary mt-8 inline-flex">
            Submit Your Requirements
          </Link>
        </div>
      </section>
    </>
  );
}
