import type { Listing } from "@/lib/types";

export interface FilterParams {
  q?: string | null;
  type?: string | null;
  location?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  /** "7" | "30" = added in last N days */
  date?: string | null;
}

function getListingDate(listing: Listing): number {
  const raw = listing.sourceTimestamp ?? listing.createdAt;
  const d = raw ? new Date(raw).getTime() : 0;
  return Number.isNaN(d) ? 0 : d;
}

export function filterListings(listings: Listing[], params: FilterParams): Listing[] {
  let result = [...listings];
  const query = (params.q ?? "").toLowerCase().trim();
  const type = (params.type ?? "").toLowerCase();
  const location = (params.location ?? "").toLowerCase();
  const minPrice = params.minPrice ? Number(params.minPrice) : NaN;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : NaN;
  const dateDays = params.date === "7" ? 7 : params.date === "30" ? 30 : null;
  const now = Date.now();

  if (dateDays !== null) {
    const cutoff = now - dateDays * 24 * 60 * 60 * 1000;
    result = result.filter((l) => getListingDate(l) >= cutoff);
  }

  if (query) {
    result = result.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query) ||
        l.features.some((f) => f.toLowerCase().includes(query))
    );
  }
  if (type) {
    result = result.filter((l) => l.propertyType === type);
  }
  if (location) {
    result = result.filter((l) => l.location.toLowerCase() === location);
  }
  if (!Number.isNaN(minPrice)) {
    result = result.filter((l) => l.price >= minPrice);
  }
  if (!Number.isNaN(maxPrice)) {
    result = result.filter((l) => l.price <= maxPrice);
  }
  return result;
}
