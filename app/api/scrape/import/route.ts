import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import { createListing } from "@/lib/listings-store";
import type { PropertyType } from "@/lib/types";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const apiKey = process.env.OUTSCRAPER_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OUTSCRAPER_API_KEY is not set in .env" }),
      { status: 503 }
    );
  }
  let body: { query?: string; limit?: number };
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const query = typeof body?.query === "string" ? body.query.trim() : "real estate Zanzibar";
  const limit = Math.min(Math.max(Number(body?.limit) || 10, 1), 50);

  let results: Array<Record<string, unknown>>;
  try {
    const Outscraper = (await import("outscraper")).default;
    const client = new Outscraper(apiKey);
    const data = await client.googleMapsSearch([query], limit, "en", "tz", 0, false, null, false);
    const raw = Array.isArray(data) ? data : Array.isArray((data as { data?: unknown })?.data) ? (data as { data: unknown[] }).data : [];
    results = raw.flat().filter((r) => r && typeof r === "object");
  } catch (e) {
    console.error("Outscraper error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Scrape failed",
      }),
      { status: 502 }
    );
  }

  const imported: Array<{ id: string; title: string }> = [];
  const seen = new Set<string>();

  for (const row of results) {
    const name = String(row?.name ?? row?.title ?? "Imported listing").trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    const address = [row?.full_address, row?.address].filter(Boolean).join(" ") || "";
    const city = String(row?.city ?? row?.location ?? "Zanzibar").trim();
    const phone = row?.phone ? String(row.phone) : "";
    const description = [name, address, city, phone].filter(Boolean).join(". ");
    const location = city || (address.slice(0, 50)) || "Zanzibar";
    const slugBase = slugify(name);
    const existingSlug = slugBase; // createListing will uniquify

    try {
      const listing = await createListing({
        title: name.slice(0, 120),
        description: description.slice(0, 2000) || "Imported from Outscraper.",
        price: 0,
        currency: "USD",
        location: location.slice(0, 80),
        propertyType: "land" as PropertyType,
        features: [],
        images: [],
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

  return Response.json({
    ok: true,
    imported: imported.length,
    listings: imported,
  });
}
