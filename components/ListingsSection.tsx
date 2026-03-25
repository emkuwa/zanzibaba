import { PropertyCard } from "./PropertyCard";
import type { Listing } from "@/lib/types";

export function ListingsSection({
  listings,
  featured,
  total,
}: {
  listings: Listing[];
  featured: Listing[];
  total: number;
}) {
  const others = listings.filter((l) => !l.featured);

  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-sand-200 bg-white p-12 text-center">
        <p className="text-sand-600">No properties match your filters.</p>
        <p className="mt-1 text-sm text-sand-500">Try changing search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {featured.length > 0 && (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-sand-900">
            Featured properties
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      )}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-sand-900">
          {featured.length > 0 ? "More properties" : "All properties"}{" "}
          <span className="text-sand-500">({total})</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(featured.length > 0 ? others : listings).map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
