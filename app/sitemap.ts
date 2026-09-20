import type { MetadataRoute } from "next";
import { getListingsForPublic } from "@/lib/listings-store";
import { SITE } from "@/data/site";
import { LOCATION_GUIDES } from "@/data/locations";
import { BUYER_GUIDES } from "@/data/buyer-guides";
import { PROPERTY_TYPE_GUIDES } from "@/data/property-types";
import { getPublishedBlogPosts } from "@/lib/blog-store";

const STATIC_ROUTES = [
  { path: "", priority: 1, changeFrequency: "daily" as const },
  { path: "/properties", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/locations", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/property-type", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/for", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/buying-guide", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/tell-us", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/why-zanzibar", priority: 0.75, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListingsForPublic();
  const blogPosts = getPublishedBlogPosts();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const propertyPages = listings.map((l) => ({
    url: `${SITE.url}/properties/${l.slug}`,
    lastModified: new Date(l.createdAt),
    changeFrequency: "weekly" as const,
    priority: l.featured ? 0.9 : 0.7,
  }));

  const locationPages = LOCATION_GUIDES.map((l) => ({
    url: `${SITE.url}/locations/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const buyerGuidePages = BUYER_GUIDES.map((g) => ({
    url: `${SITE.url}/for/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const propertyTypePages = PROPERTY_TYPE_GUIDES.map((t) => ({
    url: `${SITE.url}/property-type/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...propertyPages,
    ...locationPages,
    ...buyerGuidePages,
    ...propertyTypePages,
    ...blogPages,
  ];
}
