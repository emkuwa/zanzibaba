"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DEFAULT_ACTOR = "whitewalk/real-estate-scraper";
const DEFAULT_INPUT = '{"locations": ["New York, NY"], "maxItems": 10}';

export function DashboardApifyImport() {
  const router = useRouter();
  const [actorId, setActorId] = useState(DEFAULT_ACTOR);
  const [inputJson, setInputJson] = useState(DEFAULT_INPUT);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function handleImport() {
    setLoading(true);
    setMessage(null);
    let input: Record<string, unknown> = {};
    try {
      input = JSON.parse(inputJson || "{}");
    } catch {
      setMessage({ type: "err", text: "Invalid JSON in Actor input" });
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/scrape/apify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actorId: actorId.trim() || DEFAULT_ACTOR, input }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errMsg = data.error ?? (res.status === 503 ? "Set APIFY_API_TOKEN in .env and restart the server." : "Import failed");
        setMessage({ type: "err", text: errMsg });
        return;
      }
      const total = data.totalItems ?? 0;
      const imported = data.imported ?? 0;
      const hint = data.hint ?? "";
      setMessage({
        type: "ok",
        text: total === 0
          ? `Actor finished but returned 0 items. Try another location or actor.${hint ? ` ${hint}` : ""}`
          : `Actor returned ${total} item(s); ${imported} imported as drafts. Review and edit in the list below.`,
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
      <h2 className="text-lg font-semibold text-sand-900">Import from Apify</h2>
      <p className="mt-1 text-sm text-sand-600">
        Run an Apify Actor and import its dataset as draft listings. Set{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">APIFY_API_TOKEN</code> (or{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">APIFY_TOKEN</code>) in{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">.env</code>. Use any real estate actor (e.g.{" "}
        <code className="rounded bg-sand-100 px-1 text-xs">whitewalk/real-estate-scraper</code>).
      </p>
      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="block text-xs font-medium text-sand-600">Actor ID</span>
          <input
            type="text"
            value={actorId}
            onChange={(e) => setActorId(e.target.value)}
            placeholder="username/actor-name"
            className="mt-0.5 w-full max-w-md rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sm text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-medium text-sand-600">Actor input (JSON, required for this actor: locations)</span>
          <textarea
            rows={3}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='{"locations": ["City, State"], "maxItems": 10}'
            className="mt-0.5 w-full max-w-md font-mono text-xs rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </label>
        <button
          type="button"
          onClick={handleImport}
          disabled={loading}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? "Running actor & importing…" : "Run actor & import as drafts"}
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
