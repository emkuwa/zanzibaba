import { FUNNEL_IMAGES } from "@/data/funnel-images";

export const HERO_IMAGES = {
  primary: FUNNEL_IMAGES.stoneTownHarbor,
  secondary: FUNNEL_IMAGES.stoneTownPromenade,
  accent: FUNNEL_IMAGES.stoneTownFort,
} as const;

export const HERO_COPY = {
  line1: "LUXURY PROPERTY",
  line2: "IN ZANZIBAR.",
  subheadingMobile:
    "Beachfront villas, investment land, and curated listings for international buyers, diaspora investors, and developers.",
  subheadingDesktop:
    "Zanzibar real estate for foreign investors, villa buyers, Airbnb operators, and retirees — verified listings with local advisory from Paje to Stone Town.",
} as const;

export const OFFERINGS_SECTION = {
  eyebrow: "WHAT WE OFFER",
  titleMobile: "Investor pathways across Zanzibar.",
  titleDesktop: "Property, land, and investment advisory.",
  description:
    "From beachfront villas in Paje and Nungwi to Stone Town heritage homes and east-coast development plots — one dedicated real estate team for acquisition, due diligence, and handover.",
  descriptionMobile:
    "Villas, plots, Airbnb-ready homes, and retirement properties — curated for international buyers.",
} as const;

export const PORTFOLIO_ITEMS = [
  {
    id: "first-class-villa",
    title: "Coastal Villa Programme",
    description:
      "Beachfront and near-beach villa opportunities on Unguja's east coast — title review, viewing coordination, and investor-grade documentation.",
    href: "/properties",
    variant: "featured" as const,
    sector: "Residential",
    location: "Paje, Unguja",
    status: "Available",
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    id: "residential-complex",
    title: "Stone Town Residences",
    description:
      "Heritage-adjacent apartments and townhouses for buyers seeking culture, rental yield, and walkable Old Town access.",
    href: "/properties",
    variant: "card" as const,
    sector: "Residential",
    location: "Stone Town",
    status: "Select listings",
    image: FUNNEL_IMAGES.stoneTownGolden,
  },
  {
    id: "commercial-building",
    title: "Commercial & Mixed-Use",
    description:
      "Retail, hospitality, and mixed-use assets for developers expanding in Zanzibar's growth corridors.",
    href: "/properties",
    image: FUNNEL_IMAGES.development,
    variant: "photo" as const,
    sector: "Commercial",
    location: "Zanzibar City",
    status: "On request",
  },
] as const;

export const FLAGSHIP_PROJECTS = [
  ...PORTFOLIO_ITEMS,
  {
    id: "hospitality-retreat",
    title: "Airbnb & Hospitality Assets",
    description:
      "Turnkey and near-turnkey properties suited to short-stay operators — yield-focused selection with local management introductions.",
    href: "/investments",
    image: FUNNEL_IMAGES.beachSunset,
    sector: "Hospitality",
    location: "East Coast, Unguja",
    status: "Advisory",
  },
] as const;

export const ABOUT_IMAGES = {
  mobile: "/images/hero/secondary.jpg",
  desktop: "/images/hero/secondary.jpg",
} as const;

export const ABOUT_COPY = {
  eyebrow: "ABOUT US",
  headingMobile: "Your trusted Zanzibar real estate partner.",
  headingDesktop: "International standards. Local expertise.",
  bodyMobile:
    "Zanzibaba Real Estate advises foreign investors, diaspora buyers, and developers on land and property across Unguja — from verified listings to consultation and handover support.",
  bodyDesktop:
    "We specialise in Zanzibar real estate for international buyers: beachfront villas, investment property, luxury homes, and development land with transparent processes, bilingual advisory, and offices on the east coast and in Stone Town.",
} as const;

export const INVESTMENT_HIGHLIGHTS = [
  {
    title: "Verified property listings",
    description:
      "Browse land, villas, and apartments across Paje, Nungwi, Kendwa, Stone Town, and island-wide — with clear pricing and WhatsApp enquiry.",
    cta: "View properties",
    href: "/properties",
  },
  {
    title: "Private investor portal",
    description:
      "Qualified investors access deal documentation and programme metrics on our secure investor subdomain.",
    cta: "Visit investor portal",
    href: "https://invest.zanzibaba.com",
    external: true,
  },
  {
    title: "Investment consultation",
    description:
      "Book a consultation for Airbnb yield analysis, retirement relocation, or developer plot acquisition — tailored to your goals.",
    cta: "Book consultation",
    href: "/contact",
  },
] as const;

export const PARTNERSHIPS = [
  "International investors",
  "Diaspora buyers",
  "Villa & second-home buyers",
  "Airbnb operators",
  "Retirees relocating",
  "Developers & architects",
] as const;

/** @deprecated Use OFFERINGS_SECTION — kept for legacy component imports */
export const SOLUTIONS_SECTION = OFFERINGS_SECTION;

export const SOLUTION_DESKTOP_TITLES: Partial<Record<string, string>> = {};

export const REAL_ESTATE_TIMELINE = [
  { year: "2014", label: "East Coast office", detail: "Paje — coastal property advisory established" },
  { year: "2018", label: "Island-wide listings", detail: "Expanded verified property catalogue across Unguja" },
  { year: "2022", label: "Stone Town presence", detail: "Town Office, Mlandege — heritage and investor relations" },
  { year: "2026", label: "International funnel", detail: "Dedicated realestate.zanzibaba.com for global buyers" },
] as const;

/** @deprecated Use REAL_ESTATE_TIMELINE */
export const CORPORATE_TIMELINE = REAL_ESTATE_TIMELINE;

export const STRATEGIC_SECTORS = [
  {
    id: "villas",
    title: "Beachfront Villas",
    description: "Luxury villas Zanzibar buyers seek — Paje, Nungwi, and north-coast frontage.",
    icon: "building",
    href: "/properties",
  },
  {
    id: "land",
    title: "Investment Land",
    description: "Plots and development land with title coordination for international investors.",
    icon: "crane",
    href: "/properties?type=land",
  },
  {
    id: "airbnb",
    title: "Airbnb & Yield",
    description: "Short-stay ready homes and hospitality assets with yield-focused advisory.",
    icon: "compass",
    href: "/investments",
  },
  {
    id: "stone-town",
    title: "Stone Town",
    description: "Heritage apartments and character homes in Zanzibar's cultural centre.",
    icon: "globe",
    href: "/areas#stone-town",
  },
] as const;

export const VISION_PILLARS = [
  {
    title: "Verified listings",
    text: "Transparent property for sale in Zanzibar with clear enquiry paths and local diligence support.",
  },
  {
    title: "Island expertise",
    text: "Deep Unguja knowledge — Paje operations, Stone Town presence, and coast-to-coast reach.",
  },
  {
    title: "Investor discipline",
    text: "Professional communication, indicative metrics with disclaimers, and consultation-first sales.",
  },
] as const;
