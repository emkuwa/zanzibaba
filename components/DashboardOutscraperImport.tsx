"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardOutscraperImport() {
  const router = useRouter();
  const [query, setQuery] = useState("real estate Zanzibar");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function handleImport() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/scrape/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() || "real estate Zanzibar", limit }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "Import failed" });
        return;
      }
      setMessage({
        type: "ok",
        text: `Imported ${data.imported ?? 0} listing(s) as drafts. Review and edit in the list below.`,
      });
      router.refresh();
    } catch {
      setMessage({ type: "err", text: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-8 rounded-xl border border-sand-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-sand-900">Import from Outscraper</h2>
      <p className="mt-1 text-sm text-sand-600">
        Search Google Maps via Outscraper and add results as draft listings. Set{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">OUTSCRAPER_API_KEY</code> in{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">.env</code>.
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="block text-xs font-medium text-sand-600">Search query</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="real estate Zanzibar"
            className="mt-0.5 w-64 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-sand-600">Max results</span>
          <input
            type="number"
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) || 10)}
            className="mt-0.5 w-20 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </label>
        <button
          type="button"
          onClick={handleImport}
          disabled={loading}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "Importing…" : "Import as drafts"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-sm ${message.type === "ok" ? "text-green-700" : "text-red-700"}`}
          role="alert"
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
