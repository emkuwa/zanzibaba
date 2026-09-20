export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  image?: string;
  faqs?: { q: string; a: string }[];
}

export type BlogCategory =
  | "buying-guide"
  | "market-insights"
  | "location-guide"
  | "investment"
  | "lifestyle"
  | "legal"
  | "rental";

export const BLOG_CATEGORIES: Record<BlogCategory, { name: string; description: string }> = {
  "buying-guide": {
    name: "Buying Guide",
    description: "Step-by-step guidance for purchasing property in Zanzibar",
  },
  "market-insights": {
    name: "Market Insights",
    description: "Current market conditions, pricing trends, and analysis",
  },
  "location-guide": {
    name: "Location Guides",
    description: "Detailed guides to Zanzibar's coastal areas and neighborhoods",
  },
  investment: {
    name: "Investment",
    description: "Rental yields, ROI analysis, and investment strategies",
  },
  lifestyle: {
    name: "Lifestyle",
    description: "Living in Zanzibar — culture, expat life, and daily living",
  },
  legal: {
    name: "Legal & Tax",
    description: "Ownership structures, taxes, and legal requirements",
  },
  rental: {
    name: "Rental Income",
    description: "Short-term and long-term rental strategies and management",
  },
};
