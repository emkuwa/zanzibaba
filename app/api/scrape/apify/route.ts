import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import { createListing } from "@/lib/listings-store";
import type { PropertyType } from "@/lib/types";

/** Map Apify dataset item (various actor schemas) to our listing fields */
function itemToListing(item: Record<string, unknown>): {
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
} {
  const asRecord = (v: unknown): Record<string, unknown> | null =>
    v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;

  const getStrFrom = (obj: Record<string, unknown> | null, key: string): string => {
    if (!obj) return "";
    const v = obj[key];
    if (typeof v === "string") return v.trim();
    if (typeof v === "number") return String(v);
    return "";
  };

  const getStr = (...paths: string[]): string => {
    for (const p of paths) {
      const parts = p.split(".");
      let cur: unknown = item;
      for (const part of parts) cur = asRecord(cur)?.[part];
      if (typeof cur === "string" && cur.trim()) return cur.trim().slice(0, 500);
    }
    return "";
  };

  const getNum = (...paths: string[]): number => {
    for (const p of paths) {
      const parts = p.split(".");
      let cur: unknown = item;
      for (const part of parts) cur = asRecord(cur)?.[part];
      if (typeof cur === "number" && !Number.isNaN(cur)) return Math.round(cur);
      if (typeof cur === "string") {
        const n = parseFloat(cur.replace(/[^0-9.-]/g, ""));
        if (!Number.isNaN(n)) return Math.round(n);
      }
    }
    return 0;
  };

  const addressObj = asRecord(item.address);
  const street = getStrFrom(addressObj, "street");
  const locality = getStrFrom(addressObj, "locality");
  const region = getStrFrom(addressObj, "region");
  const postalCode = getStrFrom(addressObj, "postalCode");
  const addressLine = [street, locality, region, postalCode].filter(Boolean).join(", ");
  const location = [locality, region].filter(Boolean).join(", ") || getStr("location", "city") || "Zanzibar";

  // Realtor-like schema: history[].listing.photos[].href and history[].listing.description.text
  const history = Array.isArray(item.history) ? (item.history as unknown[]) : [];
  const firstListing = history
    .map((h) => asRecord(h))
    .map((h) => asRecord(h?.listing))
    .find(Boolean) as Record<string, unknown> | null;

  const listingDesc = getStr("history.0.listing.description.text") || getStrFrom(asRecord(firstListing?.description), "text");

  const photosFromListing = (() => {
    const photos = Array.isArray(firstListing?.photos) ? (firstListing?.photos as unknown[]) : [];
    const urls = photos
      .map((p) => asRecord(p))
      .map((p) => (p ? p.href : null))
      .filter((u): u is string => typeof u === "string" && u.length > 0);
    return urls.slice(0, 10);
  })();

  const images = (() => {
    const raw = item.photos ?? item.images ?? item.image ?? item.picture ?? item.photo;
    if (Array.isArray(raw)) {
      const urls = raw.filter((u): u is string => typeof u === "string");
      return (photosFromListing.length ? photosFromListing : urls).slice(0, 10);
    }
    if (typeof raw === "string") return [raw];
    return photosFromListing;
  })();

  const beds = getNum("beds");
  const baths = getNum("baths_total", "baths");
  const sqft = getNum("sqft");
  const lotSqft = getNum("lot_sqft");
  const propertyTypeRaw = (getStr("type") || getStr("sub_type")).toLowerCase();
  const typeLabel = propertyTypeRaw ? propertyTypeRaw.replace(/_/g, " ") : "";

  const title =
    getStr("title", "name", "heading") ||
    (street && locality ? `${street} – ${locality}` : addressLine) ||
    "Imported listing";

  // Price: prefer list_price, then lastSoldPrice
  const price = getNum("history.0.listing.list_price", "listPrice", "salePrice", "lastSoldPrice", "price", "amount");

  const featureBits: string[] = [];
  if (beds) featureBits.push(`${beds} beds`);
  if (baths) featureBits.push(`${baths} baths`);
  if (sqft) featureBits.push(`${sqft.toLocaleString()} sqft`);
  if (lotSqft) featureBits.push(`Lot ${lotSqft.toLocaleString()} sqft`);
  if (typeLabel) featureBits.push(typeLabel);
  if (getStr("cooling")) featureBits.push(`Cooling: ${getStr("cooling")}`);
  if (getStr("heating")) featureBits.push(`Heating: ${getStr("heating")}`);
  if (getStr("fireplace")) featureBits.push("Fireplace");

  const description =
    listingDesc ||
    getStr("description", "details", "summary", "text") ||
    [addressLine, featureBits.join(" · ")].filter(Boolean).join("\n") ||
    "Imported from Apify.";

  return {
    title: title.slice(0, 120),
    description: description.slice(0, 2000),
    price,
    location: location.slice(0, 80),
    images,
  };
}

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const token = process.env.APIFY_API_TOKEN || process.env.APIFY_TOKEN;
  if (!token) {
    return new Response(
      JSON.stringify({ error: "APIFY_API_TOKEN or APIFY_TOKEN is not set in .env" }),
      { status: 503 }
    );
  }
  let body: { actorId?: string; input?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const actorId = typeof body?.actorId === "string" ? body.actorId.trim() : "";
  if (!actorId) {
    return new Response(
      JSON.stringify({ error: "actorId is required (e.g. username/actor-name)" }),
      { status: 400 }
    );
  }
  const input = body?.input && typeof body.input === "object" ? body.input : {};

  let items: Record<string, unknown>[];
  try {
    // Apify REST API (no apify-client / proxy-agent)
    const actorPath = actorId.replace(/\//g, "~");
    const url = `https://api.apify.com/v2/acts/${encodeURIComponent(actorPath)}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}&format=json`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!res.ok) {
      const errText = await res.text();
      let errMsg = `Apify API ${res.status}`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.error?.message) errMsg = errJson.error.message;
      } catch {
        if (errText) errMsg = errText.slice(0, 200);
      }
      return new Response(
        JSON.stringify({ error: errMsg }),
        { status: 502 }
      );
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      items = data;
    } else if (data && typeof data === "object") {
      const raw = (data as Record<string, unknown>).items ?? (data as Record<string, unknown>).data ?? (data as Record<string, unknown>).results;
      items = Array.isArray(raw) ? raw : [];
    } else {
      items = [];
    }
    if (items.length === 0 && data != null) {
      const hint = typeof data === "object" && data !== null && !Array.isArray(data)
        ? `object keys: ${Object.keys(data as Record<string, unknown>).join(", ")}`
        : `type: ${Array.isArray(data) ? "array" : typeof data}`;
      console.log("[Apify] 0 items. Response hint:", hint);
    }
  } catch (e) {
    console.error("Apify error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Apify run failed",
      }),
      { status: 502 }
    );
  }

  const imported: Array<{ id: string; title: string }> = [];
  const seen = new Set<string>();

  for (const item of items) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const { title, description, price, location, images } = itemToListing(row);
    if (!title || seen.has(title)) continue;
    seen.add(title);

    try {
      const listing = await createListing({
        title,
        description,
        price,
        currency: "USD",
        location,
        propertyType: "land" as PropertyType,
        features: [],
        images,
        featured: false,
        draft: true,
        agentName: "Zanzibaba Real Estate",
        agentWhatsApp: "255716002790",
      });
      imported.push({ id: listing.id, title: listing.title });
    } catch (err) {
      console.error("Create listing error:", err);
    }
  }

  const payload: { ok: boolean; totalItems: number; imported: number; listings: Array<{ id: string; title: string }>; hint?: string } = {
    ok: true,
    totalItems: items.length,
    imported: imported.length,
    listings: imported,
  };
  if (items.length === 0) {
    payload.hint = "Check the terminal where npm run dev is running for [Apify] 0 items log. Or try another actor from Apify Store.";
  }
  return Response.json(payload);
}
