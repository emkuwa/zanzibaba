import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import {
  getAllListings,
  getListingsForPublic,
  createListing,
} from "@/lib/listings-store";
import type { FurnishedLevel, PropertyType, TransactionType } from "@/lib/types";
import { generateListingTitle } from "@/lib/generate-listing-title";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";

function parseBody(body: unknown): Partial<{
  title: string;
  description: string;
  originalDescription: string;
  price: number;
  currency: string;
  location: string;
  area: string;
  propertyType: PropertyType;
  features: string[];
  images: string[];
  videoUrl: string;
  featured: boolean;
  draft: boolean;
  agentName: string;
  agentWhatsApp: string;
  agentCode: string;
  transactionType: TransactionType;
  bedrooms: number;
  bathrooms: number;
  furnished: FurnishedLevel;
  ensuite: boolean;
  fenced: boolean;
  landAreaSqm: number;
  hasDocuments: boolean;
}> {
  if (!body || typeof body !== "object") return {};
  const b = body as Record<string, unknown>;
  return {
    title: typeof b.title === "string" ? b.title : undefined,
    description: typeof b.description === "string" ? b.description : undefined,
    price: typeof b.price === "number" ? b.price : Number(b.price),
    currency: typeof b.currency === "string" ? b.currency : "USD",
    location: typeof b.location === "string" ? b.location : undefined,
    area: typeof b.area === "string" ? b.area : undefined,
    propertyType: (typeof b.propertyType === "string" ? b.propertyType : undefined) as PropertyType | undefined,
    features: Array.isArray(b.features) ? b.features.filter((x): x is string => typeof x === "string") : [],
    images: Array.isArray(b.images) ? b.images.filter((x): x is string => typeof x === "string") : [],
    videoUrl: typeof b.videoUrl === "string" ? b.videoUrl.trim() || undefined : undefined,
    featured: Boolean(b.featured),
    draft: Boolean(b.draft),
    agentName: typeof b.agentName === "string" ? b.agentName : undefined,
    agentWhatsApp: typeof b.agentWhatsApp === "string" ? b.agentWhatsApp : undefined,
    agentCode: typeof b.agentCode === "string" ? b.agentCode : undefined,
    originalDescription:
      typeof b.originalDescription === "string" ? b.originalDescription : undefined,
    transactionType:
      b.transactionType === "sale" || b.transactionType === "rent"
        ? b.transactionType
        : undefined,
    bedrooms: parseOptionalNonNegInt(b.bedrooms),
    bathrooms: parseOptionalNonNegInt(b.bathrooms),
    furnished:
      b.furnished === "furnished" || b.furnished === "unfurnished" || b.furnished === "semi"
        ? b.furnished
        : undefined,
    ensuite: typeof b.ensuite === "boolean" ? b.ensuite : undefined,
    fenced: typeof b.fenced === "boolean" ? b.fenced : undefined,
    landAreaSqm: parseOptionalPositiveNumber(b.landAreaSqm),
    hasDocuments: typeof b.hasDocuments === "boolean" ? b.hasDocuments : undefined,
  };
}

function parseOptionalNonNegInt(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.floor(n);
}

function parseOptionalPositiveNumber(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return n;
}

export async function GET(request: NextRequest) {
  const isAgent = await hasAgentSession();
  const list = isAgent ? await getAllListings() : await getListingsForPublic();
  if (!isAgent) {
    return Response.json(
      list.map((item) => {
        const { agentWhatsApp, originalDescription: _o, ...rest } = item;
        return rest;
      })
    );
  }
  return Response.json(list);
}

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  const body = await request.json().catch(() => ({}));
  const parsed = parseBody(body);
  if (!parsed.title || parsed.price == null) {
    return new Response(
      JSON.stringify({ error: "title and price are required" }),
      { status: 400 }
    );
  }
  const title = generateListingTitle(
    {
      text: `${parsed.title ?? ""}\n\n${parsed.description ?? ""}`,
      location: parsed.location ?? "",
      propertyType: parsed.propertyType ?? "land",
      area: parsed.area ?? "",
      features: parsed.features ?? [],
    },
    { mode: "structured" }
  ).slice(0, 120);
  const hasVideo = Boolean(parsed.videoUrl?.trim());
  const images =
    parsed.images && parsed.images.length > 0
      ? parsed.images
      : hasVideo
        ? []
        : [DEFAULT_LISTING_IMAGE];
  const listing = await createListing({
    title: title || parsed.title,
    description: parsed.description ?? "",
    originalDescription: parsed.originalDescription?.trim() || undefined,
    price: parsed.price,
    currency: parsed.currency ?? "USD",
    location: parsed.location ?? "",
    area: parsed.area,
    propertyType: parsed.propertyType ?? "land",
    transactionType: parsed.transactionType,
    bedrooms: parsed.bedrooms,
    bathrooms: parsed.bathrooms,
    furnished: parsed.furnished,
    ensuite: parsed.ensuite,
    fenced: parsed.fenced,
    landAreaSqm: parsed.landAreaSqm,
    hasDocuments: parsed.hasDocuments,
    features: parsed.features ?? [],
    images,
    videoUrl: parsed.videoUrl,
    featured: parsed.featured ?? false,
    draft: parsed.draft ?? false,
    agentName: parsed.agentName,
    agentWhatsApp: parsed.agentWhatsApp,
    agentCode: parsed.agentCode,
  });
  return Response.json(listing);
}
