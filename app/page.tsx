import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { FilterBar } from "@/components/FilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { ListingsSection } from "@/components/ListingsSection";
import { getListingsForPublic } from "@/lib/listings-store";
import { filterListings } from "@/lib/filter-listings";

export default async function HomePage({
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
      <Hero />
      <section id="listings" className="container-tight py-12">
        <div className="sticky top-0 z-10 -mx-3 bg-white/95 px-3 py-2 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
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
