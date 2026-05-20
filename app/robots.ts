import type { MetadataRoute } from "next";

const BASE = "https://zanzibaba.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard/"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
