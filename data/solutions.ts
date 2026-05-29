import { FUNNEL_IMAGES } from "@/data/funnel-images";

export type SolutionSlug =
  | "real-estate"
  | "building-materials"
  | "construction"
  | "digital-marketing"
  | "tours"
  | "security"
  | "landscaping";

export interface Solution {
  slug: SolutionSlug;
  title: string;
  shortDescription: string;
  description: string;
  logo: string;
  heroImage: string;
  externalUrl?: string;
  highlights: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    shortDescription: "Land, plots, and investment property across Unguja.",
    description:
      "Zanzibaba Real Estate connects investors and buyers with curated land and property opportunities — from Paje and the east coast to Stone Town and beyond. Programme-scale due diligence, transparent listings, and local expertise.",
    logo: "/brand/icons/solutions/real-estate.png",
    heroImage: FUNNEL_IMAGES.villaLuxury,
    externalUrl: "https://realestate.zanzibaba.com",
    highlights: [
      "Curated land & villa plots",
      "Investment advisory",
      "Local title & compliance coordination",
    ],
  },
  {
    slug: "building-materials",
    title: "Building Materials",
    shortDescription: "Programme-scale procurement, BOQ quoting, island delivery.",
    description:
      "Our materials division supplies cement, steel, aggregates, and finish materials to developers and contractors across Zanzibar — with BOQ support, indicative programme metrics, and reliable island logistics.",
    logo: "/brand/icons/solutions/building-materials.png",
    heroImage: FUNNEL_IMAGES.development,
    externalUrl: "https://materials.zanzibaba.com",
    highlights: [
      "BOQ & material list quoting",
      "Bulk & programme supply",
      "Island-wide delivery zones",
    ],
  },
  {
    slug: "construction",
    title: "Construction Services",
    shortDescription: "Residential, commercial, and resort-scale delivery.",
    description:
      "From groundworks to handover, our construction teams deliver investor-grade builds with disciplined project controls, quality materials integration, and transparent milestone reporting.",
    logo: "/brand/icons/solutions/construction.png",
    heroImage: FUNNEL_IMAGES.development,
    externalUrl: "https://construction.zanzibaba.com",
    highlights: [
      "Design-build coordination",
      "Resort & villa programmes",
      "Materials–build integration",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital & Marketing",
    shortDescription: "Brand, web, and growth for the Zanzibar economy.",
    description:
      "The Zanzibaba Digital Agency stewards the group's multi-subdomain estate — premium portals, SEO, analytics, and campaign creative aligned with Chairman brand standards.",
    logo: "/brand/icons/solutions/digital-marketing.png",
    heroImage: FUNNEL_IMAGES.stoneTownGolden,
    externalUrl: "https://digital.zanzibaba.com",
    highlights: [
      "Multi-portal stewardship",
      "Investor-grade creative",
      "Analytics & SEO programmes",
    ],
  },
  {
    slug: "tours",
    title: "Tours & Experiences",
    shortDescription: "Authentic Zanzibar journeys for discerning travellers.",
    description:
      "Curated tours, transfers, and experiences that showcase Stone Town heritage, spice routes, and the island's coast — delivered with hospitality standards that reflect the Zanzibaba brand.",
    logo: "/brand/icons/solutions/tours.png",
    heroImage: FUNNEL_IMAGES.beachSunset,
    externalUrl: "https://tours.zanzibaba.com",
    highlights: [
      "Stone Town & spice tours",
      "Coastal & dhow experiences",
      "Corporate & VIP itineraries",
    ],
  },
  {
    slug: "security",
    title: "Security Systems",
    shortDescription: "Integrated protection for assets and developments.",
    description:
      "CCTV, access control, and perimeter solutions for villas, resorts, and commercial sites — designed for coastal environments and managed with professional monitoring options.",
    logo: "/brand/icons/solutions/security.png",
    heroImage: FUNNEL_IMAGES.stoneTownFort,
    externalUrl: "https://security.zanzibaba.com",
    highlights: [
      "CCTV & access control",
      "Resort & estate packages",
      "Maintenance programmes",
    ],
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    shortDescription: "Tropical landscapes that complete the investment story.",
    description:
      "Native planting, irrigation, hardscape, and maintenance for villas and hospitality sites — executed with materials synergy from our construction and materials divisions.",
    logo: "/brand/icons/solutions/landscaping.png",
    heroImage: FUNNEL_IMAGES.coastalWide,
    externalUrl: "https://landscaping.zanzibaba.com",
    highlights: [
      "Resort & villa planting",
      "Irrigation & hardscape",
      "Ongoing grounds care",
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
