"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { PropertyType } from "@/lib/types";

const PROPERTY_TYPES: { value: PropertyType | ""; label: string }[] = [
  { value: "", label: "All types" },
  { value: "plot", label: "Plot" },
  { value: "land", label: "Land" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
];

const LOCATIONS = [
  "",
  "Paje",
  "Nungwi",
  "Kendwa",
  "Stone Town",
  "Jambiani",
  "Bwejuu",
  "Matemwe",
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "";
  const location = searchParams.get("location") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const date = searchParams.get("date") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(qs ? `/?${qs}#listings` : "/#listings");
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-sand-200 bg-white p-3 shadow-sm">
      <label className="sr-only" htmlFor="filter-type">
        Property type
      </label>
      <select
        id="filter-type"
        value={type}
        onChange={(e) => updateFilter("type", e.target.value)}
        className="rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        aria-label="Filter by property type"
      >
        {PROPERTY_TYPES.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="filter-location">
        Location
      </label>
      <select
        id="filter-location"
        value={location}
        onChange={(e) => updateFilter("location", e.target.value)}
        className="rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        aria-label="Filter by location"
      >
        <option value="">All locations</option>
        {LOCATIONS.filter(Boolean).map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      <label className="sr-only" htmlFor="filter-date">
        Date added
      </label>
      <select
        id="filter-date"
        value={date}
        onChange={(e) => updateFilter("date", e.target.value)}
        className="rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        aria-label="Filter by date added"
      >
        <option value="">Any date</option>
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
      </select>
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor="filter-min">
          Min price (USD)
        </label>
        <input
          id="filter-min"
          type="number"
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => updateFilter("minPrice", e.target.value)}
          className="w-24 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-800 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
        <span className="text-sand-400">–</span>
        <label className="sr-only" htmlFor="filter-max">
          Max price (USD)
        </label>
        <input
          id="filter-max"
          type="number"
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => updateFilter("maxPrice", e.target.value)}
          className="w-24 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-800 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>
      {(type || location || minPrice || maxPrice || date) && (
        <button
          type="button"
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
          className="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
