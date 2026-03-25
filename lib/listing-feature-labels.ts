import type { Listing } from "./types";

/** True if structured fields or free-text features should show the features row */
export function listingHasFeatureChips(listing: Listing): boolean {
  const hasStruct =
    listing.transactionType != null ||
    (listing.bedrooms != null && listing.bedrooms > 0) ||
    (listing.bathrooms != null && listing.bathrooms > 0) ||
    listing.furnished != null ||
    listing.ensuite === true ||
    listing.fenced === true ||
    (listing.landAreaSqm != null && listing.landAreaSqm > 0) ||
    listing.hasDocuments === true;
  return hasStruct || (listing.features?.length ?? 0) > 0;
}

/**
 * Ordered labels for icon chips: structured fields first, then free-text features (deduped).
 */
export function buildListingFeatureLabels(listing: Listing): string[] {
  const out: string[] = [];

  if (listing.transactionType === "rent") out.push("For rent");
  else if (listing.transactionType === "sale") out.push("For sale");

  if (listing.bedrooms != null && listing.bedrooms > 0) {
    out.push(
      `${listing.bedrooms} bedroom${listing.bedrooms === 1 ? "" : "s"}`
    );
  }
  if (listing.bathrooms != null && listing.bathrooms > 0) {
    out.push(
      `${listing.bathrooms} bathroom${listing.bathrooms === 1 ? "" : "s"}`
    );
  }

  if (listing.furnished === "furnished") out.push("Furnished");
  else if (listing.furnished === "unfurnished") out.push("Unfurnished");
  else if (listing.furnished === "semi") out.push("Semi-furnished");

  if (listing.ensuite) out.push("Ensuite");
  if (listing.fenced) out.push("Fenced");

  if (listing.landAreaSqm != null && listing.landAreaSqm > 0) {
    out.push(`${listing.landAreaSqm.toLocaleString()} m²`);
  }
  if (listing.hasDocuments) out.push("Title documents");

  const seen = new Set(out.map((s) => s.toLowerCase()));

  for (const raw of listing.features ?? []) {
    const t = raw.trim();
    if (!t) continue;
    const norm = t.toLowerCase();
    if (seen.has(norm)) continue;

    if (listing.bedrooms != null && listing.bedrooms > 0) {
      const m = t.match(/^(\d+)\s*(bedroom|bedrooms|br)\b/i);
      if (m && Number(m[1]) === listing.bedrooms) continue;
    }
    if (listing.bathrooms != null && listing.bathrooms > 0) {
      const m = t.match(/^(\d+)\s*(bathroom|bathrooms|bath)\b/i);
      if (m && Number(m[1]) === listing.bathrooms) continue;
    }

    seen.add(norm);
    out.push(t);
  }

  return out;
}
