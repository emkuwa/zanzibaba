import { NextRequest } from "next/server";
import { hasAgentSession, isAdminSession, getSessionRole, getSessionAgentCode } from "@/lib/auth";
import {
  getListingById,
  updateListing,
  deleteListing,
} from "@/lib/listings-store";
import type { FurnishedLevel, PropertyType, TransactionType } from "@/lib/types";

function parseBody(body: unknown): Record<string, unknown> {
  if (!body || typeof body !== "object") return {};
  return body as Record<string, unknown>;
}

function parseOptInt(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.floor(n);
}

function parseOptLand(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAgent = await hasAgentSession();
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  if (!isAgent) {
    const { agentWhatsApp, originalDescription: _o, ...safe } = listing;
    return Response.json(safe);
  }
  return Response.json(listing);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  const role = await getSessionRole();
  if (role === "agent") {
    const sessionCode = await getSessionAgentCode();
    const listingCode = (listing.agentCode ?? "").toLowerCase();
    if (!sessionCode || listingCode !== sessionCode.toLowerCase()) {
      return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
    }
  }
  const body = parseBody(await request.json().catch(() => ({})));
  const updates: Parameters<typeof updateListing>[1] = {};
  if (typeof body.title === "string") updates.title = body.title;
  if (typeof body.description === "string") updates.description = body.description;
  if (typeof body.originalDescription === "string") {
    updates.originalDescription = body.originalDescription.trim() || undefined;
  }
  if (typeof body.price === "number") updates.price = body.price;
  if (typeof body.currency === "string") updates.currency = body.currency;
  if (typeof body.location === "string") updates.location = body.location;
  if (typeof body.area === "string") updates.area = body.area;
  if (typeof body.propertyType === "string") updates.propertyType = body.propertyType as PropertyType;
  if (Array.isArray(body.features)) updates.features = body.features.filter((x): x is string => typeof x === "string");
  if (Array.isArray(body.images)) {
    updates.images = body.images.filter((x): x is string => typeof x === "string");
  }
  if (typeof body.videoUrl === "string") updates.videoUrl = body.videoUrl.trim() || undefined;
  if (typeof body.featured === "boolean") updates.featured = body.featured;
  if (typeof body.draft === "boolean") updates.draft = body.draft;
  if (typeof body.agentName === "string") updates.agentName = body.agentName;
  if (typeof body.agentWhatsApp === "string") updates.agentWhatsApp = body.agentWhatsApp;
  if (typeof body.agentCode === "string") updates.agentCode = body.agentCode;
  if (typeof body.refCode === "string") updates.refCode = body.refCode;

  if ("transactionType" in body) {
    const v = body.transactionType;
    if (v === "sale" || v === "rent") updates.transactionType = v as TransactionType;
    else updates.transactionType = undefined;
  }
  if ("bedrooms" in body) updates.bedrooms = parseOptInt(body.bedrooms);
  if ("bathrooms" in body) updates.bathrooms = parseOptInt(body.bathrooms);
  if ("furnished" in body) {
    const v = body.furnished;
    if (v === "furnished" || v === "unfurnished" || v === "semi") updates.furnished = v as FurnishedLevel;
    else updates.furnished = undefined;
  }
  if ("ensuite" in body) updates.ensuite = typeof body.ensuite === "boolean" ? body.ensuite : undefined;
  if ("fenced" in body) updates.fenced = typeof body.fenced === "boolean" ? body.fenced : undefined;
  if ("landAreaSqm" in body) updates.landAreaSqm = parseOptLand(body.landAreaSqm);
  if ("hasDocuments" in body) {
    updates.hasDocuments = typeof body.hasDocuments === "boolean" ? body.hasDocuments : undefined;
  }

  const updated = await updateListing(id, updates);
  return Response.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isLoggedIn = await hasAgentSession();
  const isAdmin = await isAdminSession();
  if (!isLoggedIn || !isAdmin) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteListing(id);
  if (!ok) {
    return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
  }
  return new Response(null, { status: 204 });
}
