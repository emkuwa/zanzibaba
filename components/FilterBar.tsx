"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { PropertyType } from "@/lib/types";

const PROPERTY_TYPES: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "All types" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "land", label: "Land" },
  { value: "apartment", label: "Apartment" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

const LOCATIONS = [
  "Paje",
  "Jambiani",
  "Bwejuu",
  "Michamvi",
  "Matemwe",
  "Kiwengwa",
  "Nungwi",
  "Kendwa",
  "Stone Town",
  "Fumba",
];

const BEDROOMS = ["", "1", "2", "3", "4", "5+"];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const location = searchParams.get("location") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const bedrooms = searchParams.get("bedrooms") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/properties?${qs}` : "/properties");
    router.refresh();
  };

  const hasFilters = type || location || minPrice || maxPrice || bedrooms;

  return (
    <div className="rounded-sm border border-zb-border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[140px] flex-1 sm:flex-none">
          <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="filter-type">
            Property type
          </label>
          <select
            id="filter-type"
            value={type}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full rounded-sm border border-zb-border bg-white px-3 py-2.5 text-sm text-zb-navy focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
          >
            {PROPERTY_TYPES.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[140px] flex-1 sm:flex-none">
          <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="filter-location">
            Location
          </label>
          <select
            id="filter-location"
            value={location}
            onChange={(e) => updateFilter("location", e.target.value)}
            className="w-full rounded-sm border border-zb-border bg-white px-3 py-2.5 text-sm text-zb-navy focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
          >
            <option value="">All locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-[100px] flex-1 sm:flex-none">
          <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="filter-bedrooms">
            Bedrooms
          </label>
          <select
            id="filter-bedrooms"
            value={bedrooms}
            onChange={(e) => updateFilter("bedrooms", e.target.value)}
            className="w-full rounded-sm border border-zb-border bg-white px-3 py-2.5 text-sm text-zb-navy focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
          >
            {BEDROOMS.map((b) => (
              <option key={b || "any"} value={b}>
                {b ? `${b}+` : "Any"}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-2">
          <div className="w-28">
            <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="filter-min">
              Min price
            </label>
            <input
              id="filter-min"
              type="number"
              placeholder="$ Min"
              value={minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              className="w-full rounded-sm border border-zb-border bg-white px-3 py-2.5 text-sm text-zb-navy placeholder:text-zb-muted/60 focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
            />
          </div>
          <span className="pb-2.5 text-zb-muted">–</span>
          <div className="w-28">
            <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="filter-max">
              Max price
            </label>
            <input
              id="filter-max"
              type="number"
              placeholder="$ Max"
              value={maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              className="w-full rounded-sm border border-zb-border bg-white px-3 py-2.5 text-sm text-zb-navy placeholder:text-zb-muted/60 focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
            />
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              router.push("/properties");
              router.refresh();
            }}
            className="pb-2.5 text-sm font-medium text-zb-gold hover:text-zb-gold/80"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
