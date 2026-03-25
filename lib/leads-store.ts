import { promises as fs } from "fs";
import path from "path";
import type { Lead, Listing } from "@/lib/types";
import { getListingById } from "@/lib/listings-store";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "leads.json");

async function readLeads(): Promise<Lead[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function displayRef(listing: Listing): string {
  return listing.refCode ?? `ZRE-${listing.id.slice(-6).toUpperCase()}`;
}

export async function createLeadFromListing(listing: Listing): Promise<Lead> {
  const leads = await readLeads();
  const now = new Date().toISOString();
  const lead: Lead = {
    id: generateId(),
    createdAt: now,
    source: "public_whatsapp",
    listingId: listing.id,
    listingRefCode: displayRef(listing),
    listingTitle: listing.title,
    listingLocation: listing.location,
    agentName: listing.agentName,
    agentCode: listing.agentCode,
    agentWhatsApp: listing.agentWhatsApp,
  };
  leads.push(lead);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(leads, null, 2), "utf-8");
  return lead;
}

export async function getAllLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  // Newest first
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
