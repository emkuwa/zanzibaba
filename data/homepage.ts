export const HERO_IMAGES = {
  /** Stone Town / Zanzibar golden-hour aerial (local) */
  primary: "/images/hero/primary.jpg",
  /** Coastal town aerial alternate (local) */
  secondary: "/images/hero/secondary.jpg",
  accent: "/images/hero/accent.jpg",
} as const;

export const HERO_COPY = {
  line1: "BUILDING TODAY,",
  line2: "EMPOWERING TOMORROW.",
  subheadingMobile:
    "A diversified Zanzibar group delivering real estate, materials, construction, and digital excellence throughout Zanzibar.",
  subheadingDesktop:
    "One group. Seven solutions. Endless possibilities. Delivering excellence across real estate, construction, technology, and lifestyle services.",
} as const;

export const SOLUTIONS_SECTION = {
  eyebrow: "OUR SOLUTIONS",
  titleMobile: "Seven divisions. One ecosystem.",
  titleDesktop: "Seven Solutions. One Commitment to Excellence.",
  description:
    "From land acquisition and materials supply to construction, digital marketing, tours, security, and landscaping — integrated capabilities under one accountable group.",
} as const;

/** Desktop card titles (mobile uses solutions.ts titles) */
export const SOLUTION_DESKTOP_TITLES: Partial<Record<string, string>> = {
  "digital-marketing": "Digital & Marketing Solutions",
};

export const PORTFOLIO_ITEMS = [
  {
    id: "first-class-villa",
    title: "First Class Villa Programme",
    description:
      "Integrated land, materials, and build delivery for coastal villa developments — investor-grade coordination from plot to handover.",
    href: "/projects",
    variant: "featured" as const,
    sector: "Residential",
    location: "Paje, Unguja",
    status: "In Development",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&q=85&auto=format&fit=crop",
  },
  {
    id: "residential-complex",
    title: "New Residential Complex",
    description:
      "Multi-unit residential development with modern amenities and sustainable design across Unguja.",
    href: "/projects",
    variant: "card" as const,
    sector: "Residential",
    location: "Stone Town",
    status: "Planning",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: "commercial-building",
    title: "Commercial Building",
    description:
      "Mixed-use commercial programme with construction, security, and digital brand stewardship.",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
    variant: "photo" as const,
    sector: "Commercial",
    location: "Zanzibar City",
    status: "Active",
  },
] as const;

export const FLAGSHIP_PROJECTS = [
  ...PORTFOLIO_ITEMS,
  {
    id: "hospitality-retreat",
    title: "Coastal Hospitality Retreat",
    description:
      "Boutique resort coordination — tours, security, landscaping, and digital presence under one group mandate.",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=85&auto=format&fit=crop",
    sector: "Hospitality",
    location: "East Coast, Unguja",
    status: "Indicative",
  },
] as const;

export const CORPORATE_TIMELINE = [
  { year: "2014", label: "Founded in Zanzibar", detail: "Paje Yard operations established" },
  { year: "2018", label: "Seven divisions unified", detail: "Group brand and integrated delivery model" },
  { year: "2022", label: "Stone Town presence", detail: "Mlandege office — corporate & investor relations" },
  { year: "2026", label: "Island-wide growth", detail: "Zanzibar-wide programmes and digital estate" },
] as const;

export const ABOUT_IMAGES = {
  /** Mobile: Zanzibar coastal promenade aerial */
  mobile: "/images/hero/secondary.jpg",
  /** Desktop: framed coastal town aerial */
  desktop: "/images/hero/secondary.jpg",
} as const;

export const ABOUT_COPY = {
  eyebrow: "ABOUT US",
  headingMobile: "Rooted in Zanzibar. Built for tomorrow.",
  headingDesktop: "Building Beyond Structures. Creating Lasting Impact.",
  bodyMobile:
    "Zanzibaba Group unites seven divisions under one premium brand — from Paje and Stone Town across Unguja. We deliver real estate, building materials, construction, digital marketing, tours, security, and landscaping with investor-grade discipline and local expertise.",
  bodyDesktop:
    "Zanzibaba Group is a diversified Zanzibar conglomerate delivering integrated real estate, construction, materials, digital, tours, security, and landscaping — with investor-grade discipline from Paje Yard and Stone Town throughout Zanzibar.",
} as const;

export const STRATEGIC_SECTORS = [
  {
    id: "property",
    title: "Property & Development",
    description:
      "Land, villas, and commercial assets — from acquisition through delivery with integrated construction and materials.",
    icon: "building",
    href: "/solutions/real-estate",
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Build",
    description:
      "Construction programmes, materials supply, and landscaping — one accountable ecosystem for island-scale delivery.",
    icon: "crane",
    href: "/solutions/construction",
  },
  {
    id: "hospitality",
    title: "Hospitality & Experiences",
    description:
      "Tours, security, and digital brand stewardship for resorts, estates, and discerning travellers.",
    icon: "compass",
    href: "/solutions/tours",
  },
  {
    id: "digital",
    title: "Digital & Corporate",
    description:
      "Multi-portal estate, investor communications, and growth marketing aligned with group brand standards.",
    icon: "globe",
    href: "/solutions/digital-marketing",
  },
] as const;

export const INVESTMENT_HIGHLIGHTS = [
  {
    title: "Real Estate Programmes",
    description:
      "Curated land and villa opportunities across Unguja — transparent listings and local compliance coordination.",
    cta: "Explore Real Estate",
    href: "/solutions/real-estate",
  },
  {
    title: "Private Investor Portal",
    description:
      "Qualified investors access deal documentation and programme metrics on our secure subdomain.",
    cta: "Visit Investor Portal",
    href: "https://invest.zanzibaba.com",
    external: true,
  },
  {
    title: "Materials & Construction",
    description:
      "Integrated BOQ, supply, and build for developers seeking single-accountability delivery.",
    cta: "Building Materials",
    href: "/solutions/building-materials",
  },
] as const;

export const PARTNERSHIPS = [
  "Developers & Master Planners",
  "International Investors",
  "Hospitality Operators",
  "Government & Institutions",
  "Architects & Design Studios",
  "Materials Suppliers",
] as const;

export const VISION_PILLARS = [
  {
    title: "Integrated Delivery",
    text: "Seven divisions under one group — reducing friction from land to landscape, materials to marketing.",
  },
  {
    title: "Island Expertise",
    text: "Deep Unguja knowledge: Paje operations, Stone Town presence, and island-wide reach across Zanzibar.",
  },
  {
    title: "Investor Discipline",
    text: "Transparent milestones, indicative metrics with clear disclaimers, and professional programme controls.",
  },
] as const;
