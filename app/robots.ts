import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/login"],
      },
      // Explicitly allow AI crawlers for AEO (Answer Engine Optimization)
      {
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot"],
        allow: "/",
      },
      {
        userAgent: ["Google-Extended", "GeminiBot"],
        allow: "/",
      },
      {
        userAgent: ["ClaudeBot", "anthropic-ai"],
        allow: "/",
      },
      {
        userAgent: ["PerplexityBot"],
        allow: "/",
      },
      {
        userAgent: ["YouBot"],
        allow: "/",
      },
      {
        userAgent: ["Bingbot"],
        allow: "/",
      },
      {
        userAgent: ["Applebot", "Applebot-Extended"],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
