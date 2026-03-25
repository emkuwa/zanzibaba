import { promises as fs } from "fs";
import path from "path";
import type { Listing } from "@/lib/types";
import { listings as seedListings } from "@/data/listings";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";

/** Empty images stay empty when the listing has a video (no beach placeholder). */
function ensureListingImages(
  images: string[] | undefined,
  videoUrl?: string | null
): string[] {
  if (images && images.length > 0) {
    if (
      videoUrl?.trim() &&
      images.length === 1 &&
      images[0] === DEFAULT_LISTING_IMAGE
    ) {
      return [];
    }
    return images;
  }
  if (videoUrl?.trim()) return [];
  return [DEFAULT_LISTING_IMAGE];
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "listings.json");

async function readListings(): Promise<Listing[]> {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : seedListings;
  } catch {
    return seedListings;
  }
}

export async function getAllListings(): Promise<Listing[]> {
  const list = await readListings();
  return list.map((l) => ({ ...l, images: ensureListingImages(l.images, l.videoUrl) }));
}

export async function getListingsForPublic(): Promise<Listing[]> {
  const all = await readListings();
  return all
    .filter((l) => !l.draft)
    .map((l) => ({ ...l, images: ensureListingImages(l.images, l.videoUrl) }));
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const all = await readListings();
  const found = all.find((l) => l.slug === slug);
  if (!found) return null;
  return { ...found, images: ensureListingImages(found.images, found.videoUrl) };
}

export async function getListingById(id: string): Promise<Listing | null> {
  const all = await readListings();
  const found = all.find((l) => l.id === id);
  if (!found) return null;
  return { ...found, images: ensureListingImages(found.images, found.videoUrl) };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

/** Next unique ref code ZRE-000001, ZRE-000002, ... */
function nextRefCode(existing: Listing[]): string {
  let max = 0;
  for (const l of existing) {
    if (l.refCode && /^ZRE-(\d+)$/i.test(l.refCode)) {
      const n = parseInt(l.refCode.replace(/^ZRE-/i, ""), 10);
      if (n > max) max = n;
    }
  }
  const next = max + 1;
  return `ZRE-${String(next).padStart(6, "0")}`;
}

export async function createListing(
  input: Omit<Listing, "id" | "slug" | "refCode" | "createdAt" | "updatedAt">
): Promise<Listing> {
  const list = await readListings();
  const baseSlug = slugify(input.title);
  let slug = baseSlug;
  let n = 0;
  while (list.some((l) => l.slug === slug)) {
    n += 1;
    slug = `${baseSlug}-${n}`;
  }
  const now = new Date().toISOString();
  const refCode = nextRefCode(list);
  const listing: Listing = {
    ...input,
    images: ensureListingImages(input.images, input.videoUrl),
    id: generateId(),
    slug,
    refCode,
    createdAt: now,
    updatedAt: now,
  };
  list.push(listing);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return listing;
}

export async function updateListing(
  id: string,
  updates: Partial<Omit<Listing, "id" | "slug" | "createdAt">>
): Promise<Listing | null> {
  const list = await readListings();
  const idx = list.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  const mergedVideo = updates.videoUrl !== undefined ? updates.videoUrl : list[idx].videoUrl;
  const updated: Listing = {
    ...list[idx],
    ...updates,
    images:
      updates.images !== undefined
        ? ensureListingImages(updates.images, mergedVideo)
        : ensureListingImages(list[idx].images, mergedVideo),
    updatedAt: new Date().toISOString(),
  };
  list[idx] = updated;
  await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), "utf-8");
  return updated;
}

export async function deleteListing(id: string): Promise<boolean> {
  const list = await readListings();
  const filtered = list.filter((l) => l.id !== id);
  if (filtered.length === list.length) return false;
  await fs.writeFile(FILE_PATH, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}
