import type { SolutionSlug } from "@/data/solutions";

/** Where the live department site is hosted (audited from zanzibaba.com, May 2026). */
export type DepartmentHost = "Netlify" | "Vercel" | "Cloudflare" | "Unknown";

export type DepartmentPortal = {
  slug: SolutionSlug | "investment-gateway" | "investor-portal";
  title: string;
  /** URL linked from legacy https://zanzibaba.com/ */
  legacyUrl: string;
  host: DepartmentHost;
  /** Route on this group site (zanzibaba.com replacement) */
  localRoute: string;
  /** Known gaps vs new group brand / UX */
  gaps: string[];
  /** Live subdomain portal — opens until division is merged into this app */
  portalUrl?: string;
};

/**
 * Department map: legacy zanzibaba.com → this site → live subdomain portals.
 * Source: https://zanzibaba.com/ (React SPA on Netlify, May 2026).
 */
export const DEPARTMENT_PORTALS: DepartmentPortal[] = [
  {
    slug: "real-estate",
    title: "Zanzibaba Real Estate",
    legacyUrl: "https://realestate.zanzibaba.com",
    portalUrl: "https://realestate.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/real-estate",
    gaps: [
      "Separate subdomain; listings also on this codebase at /listings",
      "Legacy purple/gold palette on older subsites — not group navy/gold v2",
    ],
  },
  {
    slug: "building-materials",
    title: "Building Materials Supplier",
    legacyUrl: "https://materials.zanzibaba.com",
    portalUrl: "https://materials.zanzibaba.com",
    host: "Vercel",
    localRoute: "/solutions/building-materials",
    gaps: [
      "Modern Next.js on Vercel — closest to target stack",
      "WhatsApp-quote flow; not yet unified auth with group dashboard",
    ],
  },
  {
    slug: "construction",
    title: "Construction Services",
    legacyUrl: "https://construction.zanzibaba.com",
    portalUrl: "https://construction.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/construction",
    gaps: [
      "Static Vite-style SPA; Tailwind via CDN",
      "Off-brand colors (#5A2A82 purple); no shared group header/footer",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital & Marketing Solutions",
    legacyUrl: "https://digital.zanzibaba.com",
    portalUrl: "https://digital.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/digital-marketing",
    gaps: [
      "Static landing; Tailwind CDN, legacy purple palette",
      "No case-study CMS tied to group /news",
    ],
  },
  {
    slug: "tours",
    title: "Zanzibaba Tours",
    legacyUrl: "https://tours.zanzibaba.com",
    portalUrl: "https://tours.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/tours",
    gaps: [
      "Separate tour booking stack; SEO competes with group homepage",
      "No shared contact/leads pipeline with group CRM",
    ],
  },
  {
    slug: "security",
    title: "Security Systems",
    legacyUrl: "https://security.zanzibaba.com",
    portalUrl: "https://security.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/security",
    gaps: [
      "Brochure site only; no quote/configurator",
      "Legacy branding; Cloudflare static host",
    ],
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    legacyUrl: "https://landscaping.zanzibaba.com",
    portalUrl: "https://landscaping.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/solutions/landscaping",
    gaps: [
      "Static SPA; minimal portfolio integration with /projects",
      "Off-brand styling vs group portal",
    ],
  },
  {
    slug: "investment-gateway",
    title: "Zanzibar Investment Gateway (ZIC)",
    legacyUrl: "https://investment.zanzibaba.com",
    portalUrl: "https://investment.zanzibaba.com",
    host: "Cloudflare",
    localRoute: "/investments",
    gaps: [
      "Business setup / licensing — separate from private investor portal",
      "Linked as “ZIC” on old homepage; easy to confuse with invest.zanzibaba.com",
    ],
  },
  {
    slug: "investor-portal",
    title: "Private Investor Portal",
    legacyUrl: "https://invest.zanzibaba.com",
    portalUrl: "https://invest.zanzibaba.com",
    host: "Vercel",
    localRoute: "/investments",
    gaps: [
      "Auth-gated deals; not linked from all division footers",
      "Canonical repo: zanzibaba-investment-portal",
    ],
  },
];

/** Legacy main site (to be replaced by this app on zanzibaba.com). */
export const LEGACY_GROUP_SITE = {
  url: "https://zanzibaba.com",
  host: "Netlify" as DepartmentHost,
  gaps: [
    "React SPA with Tailwind CDN + aistudiocdn imports — not production-grade",
    "Off-brand purple (#5A2A82) vs group navy/gold v2",
    "Logo hosted on imgur; department cards link out to subdomains only",
    "No unified listings, dashboard, or shared design system",
  ],
};

export function getDepartmentBySlug(
  slug: string
): DepartmentPortal | undefined {
  return DEPARTMENT_PORTALS.find((d) => d.slug === slug);
}

export function getDepartmentBySolutionSlug(
  slug: SolutionSlug
): DepartmentPortal | undefined {
  return DEPARTMENT_PORTALS.find((d) => d.slug === slug);
}

export function getPortalUrlForSolution(slug: SolutionSlug): string | undefined {
  return getDepartmentBySolutionSlug(slug)?.portalUrl;
}

/** Short paths on the new group site → solution detail pages */
export const DEPARTMENT_SHORT_ROUTES: Record<string, string> = {
  "/real-estate": "/solutions/real-estate",
  "/materials": "/solutions/building-materials",
  "/building-materials": "/solutions/building-materials",
  "/construction": "/solutions/construction",
  "/digital": "/solutions/digital-marketing",
  "/digital-marketing": "/solutions/digital-marketing",
  "/tours": "/solutions/tours",
  "/security": "/solutions/security",
  "/landscaping": "/solutions/landscaping",
  "/invest": "/investments",
  "/investment": "/investments",
  "/zic": "/investments",
};
