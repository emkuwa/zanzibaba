"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set("q", query.trim());
      else params.delete("q");
      const qs = params.toString();
      router.push(qs ? `/?${qs}#listings` : "/#listings");
      router.refresh();
    },
    [query, router, searchParams]
  );

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl gap-2 rounded-xl border border-sand-200 bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2"
    >
      <label htmlFor="search-properties" className="sr-only">
        Search properties by keyword
      </label>
      <input
        id="search-properties"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by location, feature..."
        className="min-w-0 flex-1 rounded-lg border-0 bg-transparent px-4 py-2.5 text-sand-900 placeholder:text-sand-400 focus:outline-none focus:ring-0"
        autoComplete="off"
      />
      <button
        type="submit"
        className="rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700 focus-ring"
      >
        Search
      </button>
    </form>
  );
}
