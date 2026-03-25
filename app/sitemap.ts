import type { MetadataRoute } from "next";
import { getListingsForPublic } from "@/lib/listings-store";

const BASE = "https://realestate.zanzibaba.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListingsForPublic();
  const propertyPages = listings.map((l) => ({
    url: `${BASE}/properties/${l.slug}`,
    lastModified: new Date(l.createdAt),
    changeFrequency: "weekly" as const,
    priority: l.featured ? 0.9 : 0.7,
  }));
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...propertyPages,
  ];
}
