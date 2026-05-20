import type { MetadataRoute } from "next";
import { getListingsForPublic } from "@/lib/listings-store";
import { SOLUTIONS } from "@/data/solutions";

const BASE = "https://zanzibaba.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/solutions",
  "/projects",
  "/investments",
  "/news",
  "/careers",
  "/listings",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListingsForPublic();
  const now = new Date();

  const staticPages = STATIC_ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const solutionPages = SOLUTIONS.map((s) => ({
    url: `${BASE}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const propertyPages = listings.map((l) => ({
    url: `${BASE}/properties/${l.slug}`,
    lastModified: new Date(l.createdAt),
    changeFrequency: "weekly" as const,
    priority: l.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...solutionPages, ...propertyPages];
}
