"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/lib/types";
import type { DashboardRole } from "@/lib/auth";
import { CardVideoPreview } from "@/components/CardVideoPreview";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

function getEffectiveDate(listing: Listing): Date {
  const tryDates: Array<string | undefined> = [listing.sourceTimestamp, listing.createdAt];
  for (const value of tryDates) {
    if (!value) continue;
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return new Date(0);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function DashboardListings({
  listings,
  role = "agent",
}: {
  listings: Listing[];
  role?: DashboardRole;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<"all" | "7" | "30">("all");

  function toggleSelected(id: string, checked: boolean) {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  }

  const sorted = [...listings].sort((a, b) => {
    const aTime = getEffectiveDate(a).getTime();
    const bTime = getEffectiveDate(b).getTime();
    return bTime - aTime;
  });

  const agents = Array.from(
    new Set(sorted.map((l) => l.agentName).filter((n): n is string => Boolean(n)))
  );
  const locations = Array.from(
    new Set(sorted.map((l) => l.location).filter((n): n is string => Boolean(n)))
  );

  const now = new Date();

  const filtered = sorted.filter((l) => {
    const effectiveDate = getEffectiveDate(l);
    const diffDays = (now.getTime() - effectiveDate.getTime()) / (1000 * 60 * 60 * 24);

    if (statusFilter === "draft" && !l.draft) return false;
    if (statusFilter === "published" && l.draft) return false;

    if (agentFilter !== "all" && l.agentName !== agentFilter) return false;

    if (
      locationFilter.trim() &&
      !l.location.toLowerCase().includes(locationFilter.trim().toLowerCase())
    ) {
      return false;
    }

    if (dateFilter === "7" && diffDays > 7) return false;
    if (dateFilter === "30" && diffDays > 30) return false;

    return true;
  });

  if (listings.length === 0) {
    return (
      <div className="rounded-xl border border-sand-200 bg-white p-8 text-center">
        <p className="text-sand-600">No listings yet.</p>
        <Link
          href="/dashboard/listings/new"
          className="mt-3 inline-block text-brand-600 hover:text-brand-700 font-medium"
        >
          Add your first listing →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="sticky top-14 z-10 -mx-3 bg-sand-100 px-3 pb-2 pt-1">
        <div className="flex flex-wrap gap-3 rounded-lg border border-sand-200 bg-white px-3 py-2 text-xs text-sand-700">
        <div className="flex items-center gap-1">
          <span className="font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded border border-sand-200 bg-sand-50 px-2 py-1"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Agent:</span>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="rounded border border-sand-200 bg-sand-50 px-2 py-1"
          >
            <option value="all">All</option>
            {agents.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Location:</span>
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            list="dashboard-locations"
            placeholder="Any"
            className="w-32 rounded border border-sand-200 bg-sand-50 px-2 py-1"
          />
          <datalist id="dashboard-locations">
            {locations.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Date:</span>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as typeof dateFilter)}
            className="rounded border border-sand-200 bg-sand-50 px-2 py-1"
          >
            <option value="all">All time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
        {role === "admin" && (
          <button
            type="button"
            onClick={() =>
              setSelectedIds(
                filtered.map((l) => l.id)
              )
            }
            className="ml-auto rounded border border-sand-300 bg-sand-50 px-2 py-1 text-xs font-medium text-sand-700 hover:bg-sand-100"
          >
            Select all (filtered)
          </button>
        )}
        </div>
      </div>
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-xs text-sand-800">
          <span>
            {selectedIds.length} selected.
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                const selected = filtered.filter((l) => selectedIds.includes(l.id));
                const slugs = selected.map((l) => l.slug).filter(Boolean);
                if (slugs.length === 0) return;
                const base = typeof window !== "undefined" ? window.location.origin : "";
                const url = slugs.length === 1
                  ? `${base}/properties/${slugs[0]}?open=1`
                  : `${base}/share?p=${slugs.join(",")}`;
                const text = slugs.length === 1
                  ? `Check this property: ${url}`
                  : `Check these properties: ${url}`;
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
              }}
              className="rounded-md border border-green-300 bg-green-600 px-3 py-1 font-medium text-white hover:bg-green-700"
            >
              Share via WhatsApp
            </button>
            {role === "admin" && (
              <>
            <button
              type="button"
              onClick={async () => {
                const draftIds = selectedIds.filter((id) => {
                  const l = filtered.find((x) => x.id === id);
                  return l?.draft;
                });
                if (draftIds.length === 0) return;
                await Promise.all(
                  draftIds.map((id) =>
                    fetch(`/api/listings/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ draft: false }),
                    })
                  )
                );
                window.location.reload();
              }}
              className="rounded-md border border-brand-300 bg-brand-600 px-3 py-1 font-medium text-white hover:bg-brand-700"
            >
              Publish selected
            </button>
            <button
              type="button"
              onClick={async () => {
                if (
                  !confirm(
                    `Delete ${selectedIds.length} selected listing(s)? This cannot be undone.`
                  )
                ) {
                  return;
                }
                await Promise.all(
                  selectedIds.map((id) =>
                    fetch(`/api/listings/${id}`, { method: "DELETE" })
                  )
                );
                window.location.reload();
              }}
              className="rounded-md border border-red-300 bg-white px-3 py-1 font-medium text-red-700 hover:bg-red-100"
            >
              Delete selected
            </button>
              </>
            )}
          </div>
        </div>
      )}
      {selectedIds.length > 0 && (
        <div className="rounded-lg border border-sand-200 bg-sand-50/50 px-3 py-1.5 text-xs text-sand-600">
          Tip: Use &quot;Share via WhatsApp&quot; to send property link(s) to your client. They will see the listing with the first image opened.
        </div>
      )}
      <ul className="space-y-3">
        {filtered.map((l) => (
          <li
            key={l.id}
            className="flex flex-wrap items-center gap-4 rounded-xl border border-sand-200 bg-white p-4 shadow-sm sm:flex-nowrap"
          >
            <div className="flex items-center gap-2">
              {role === "admin" && (
                <input
                  type="checkbox"
                  aria-label={`Select ${l.title}`}
                  checked={selectedIds.includes(l.id)}
                  onChange={(e) => toggleSelected(l.id, e.target.checked)}
                  className="h-4 w-4 rounded border-sand-300 text-brand-600 focus:ring-brand-500"
                />
              )}
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                {l.images[0] ? (
                  <Image
                    src={l.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                ) : l.videoUrl?.trim() ? (
                  <>
                    <CardVideoPreview
                      videoUrl={l.videoUrl.trim()}
                      title={l.title}
                      imageSizes="112px"
                      compact
                    />
                    <span
                      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
                      aria-hidden
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white shadow-md ring-2 ring-white/35">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7-11-7z" />
                        </svg>
                      </span>
                    </span>
                    <span className="pointer-events-none absolute bottom-1 left-1 z-10 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                      Video
                    </span>
                  </>
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-sand-400">
                    No image
                  </span>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-base font-semibold leading-snug text-sand-900">{l.title}</p>
              <p className="text-sm text-sand-600">
                {l.location} · {formatPrice(l.price, l.currency)}
                {l.draft && (
                  <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs text-amber-800">
                    Draft
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-xs text-sand-500">
                Ref: {l.refCode ?? l.id.slice(-6).toUpperCase()} ·{" "}
                {dateFormatter.format(getEffectiveDate(l))}
                {l.agentName ? ` · Agent: ${l.agentName}` : ""}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const base = typeof window !== "undefined" ? window.location.origin : "";
                  const url = `${base}/properties/${l.slug}?open=1`;
                  const text = `Check this property: ${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Share
              </button>
              <Link
                href={`/properties/${l.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-sand-200 px-3 py-1.5 text-sm text-sand-700 hover:bg-sand-50"
              >
                View
              </Link>
              <Link
                href={`/dashboard/listings/${l.id}/edit`}
                className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-700"
              >
                Edit
              </Link>
              {l.draft && (
                <button
                  type="button"
                  onClick={async () => {
                    await fetch(`/api/listings/${l.id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ draft: false }),
                    });
                    window.location.reload();
                  }}
                  className="rounded-lg border border-green-300 bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
                >
                  Publish
                </button>
              )}
              {role === "admin" && (
                <button
                  type="button"
                  onClick={async () => {
                    if (
                      !confirm(
                        "Delete this listing? This cannot be undone."
                      )
                    )
                      return;
                    await fetch(`/api/listings/${l.id}`, { method: "DELETE" });
                    window.location.reload();
                  }}
                  className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
