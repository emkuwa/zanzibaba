import { NextRequest } from "next/server";
import { getListingById } from "@/lib/listings-store";
import { createLeadFromListing } from "@/lib/leads-store";
import type { Listing } from "@/lib/types";

function displayRef(listing: Listing): string {
  return listing.refCode ?? `ZRE-${listing.id.slice(-6).toUpperCase()}`;
}

function formatPrice(price: number, currency: string): string {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

/** Prefilled WhatsApp message so admin sees property + agent and can forward to the right agent */
function buildPrefilledMessage(listing: Listing): string {
  const ref = displayRef(listing);
  const price = formatPrice(listing.price, listing.currency);
  const lines = [
    "Hi Zanzibaba, I'm interested in this property:",
    "",
    `Ref: ${ref}`,
    `Title: ${listing.title}`,
    `Location: ${listing.location}`,
    `Price: ${price}`,
    ...(listing.area ? [`Area: ${listing.area}`] : []),
    ...(listing.agentName || listing.agentCode
      ? ["", `Agent: ${listing.agentName ?? ""}${listing.agentCode ? ` (${listing.agentCode})` : ""}"]
      : []),
  ];
  return lines.join("\n");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listingId");

  if (!listingId) {
    return new Response("Missing listingId", { status: 400 });
  }

  const listing = await getListingById(listingId);
  if (!listing) {
    return new Response("Listing not found", { status: 404 });
  }

  try {
    await createLeadFromListing(listing);
  } catch (e) {
    console.error("Failed to create lead", e);
  }

  const companyWhats = process.env.COMPANY_WHATSAPP || "255716002790";
  const waNumber = companyWhats.replace(/\D/g, "");
  const text = buildPrefilledMessage(listing);
  const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  return Response.redirect(whatsappUrl, 307);
}

