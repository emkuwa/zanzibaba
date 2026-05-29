import { Suspense } from "react";
import type { Metadata } from "next";
import { FilterBar } from "@/components/FilterBar";
import { ListingsSection } from "@/components/ListingsSection";
import { Hero } from "@/components/portal/Hero";
import { getListingsForPublic } from "@/lib/listings-store";
import { filterListings } from "@/lib/filter-listings";
import { SEO_KEYWORDS } from "@/data/site";

export const metadata: Metadata = {
  title: "Properties for Sale in Zanzibar",
  description:
    "Browse Zanzibar real estate — beachfront villas, investment land, apartments, and luxury property for sale. Verified listings from Zanzibaba Real Estate.",
  keywords: [...SEO_KEYWORDS],
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
  };
  const filtered = filterListings(listings, params);
  const featured = filtered.filter((l) => l.featured);

  return (
    <>
      <Hero
        compact
        title={<span className="text-white">Properties in Zanzibar</span>}
        subtitle="Beachfront villas, investment plots, and luxury homes for international buyers and diaspora investors."
      />
      <section id="listings" className="container-portal py-12" aria-label="Property listings">
        <div className="sticky top-[4.25rem] z-10 -mx-3 bg-white/95 px-3 py-2 backdrop-blur-sm">
          <Suspense fallback={<div className="h-12" />}>
            <FilterBar />
          </Suspense>
        </div>
        <div className="mt-6">
          <ListingsSection
            listings={filtered}
            featured={featured}
            total={filtered.length}
          />
        </div>
      </section>
    </>
  );
}
