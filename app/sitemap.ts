import type { MetadataRoute } from "next";
import { getListingsForPublic } from "@/lib/listings-store";
import { SITE } from "@/data/site";

const STATIC_ROUTES = [
  "",
  "/properties",
  "/investments",
  "/areas",
  "/why-zanzibar",
  "/about",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListingsForPublic();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/properties" ? 0.95 : 0.8,
  }));

  const propertyPages = listings.map((l) => ({
    url: `${SITE.url}/properties/${l.slug}`,
    lastModified: new Date(l.createdAt),
    changeFrequency: "weekly" as const,
    priority: l.featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...propertyPages];
}
