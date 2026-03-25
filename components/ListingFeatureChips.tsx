"use client";

import type { Listing } from "@/lib/types";
import {
  buildListingFeatureLabels,
  listingHasFeatureChips,
} from "@/lib/listing-feature-labels";
import { FeatureIconChip } from "./FeatureIcons";

export function ListingFeatureChips({
  listing,
  max = 24,
  className = "",
}: {
  listing: Listing;
  max?: number;
  className?: string;
}) {
  if (!listingHasFeatureChips(listing)) return null;
  const labels = buildListingFeatureLabels(listing);
  if (labels.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {labels.slice(0, max).map((label, i) => (
        <FeatureIconChip key={`${label}-${i}`} text={label} />
      ))}
    </div>
  );
}
