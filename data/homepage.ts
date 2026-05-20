export const HERO_IMAGES = {
  /** Luxury modern architecture at dusk */
  primary:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=88&auto=format&fit=crop",
} as const;

export const HERO_COPY = {
  line1: "BUILDING TODAY,",
  line2: "EMPOWERING TOMORROW.",
  subheading:
    "Seven integrated solutions across real estate, materials, construction, and digital — one group, endless possibilities for investors and institutions across Zanzibar and Tanzania.",
} as const;

export const PORTFOLIO_ITEMS = [
  {
    id: "first-class-villa",
    title: "First Class Villa Programme",
    description:
      "Integrated land, materials, and build delivery for coastal villa developments — investor-grade coordination from plot to handover.",
    href: "/projects",
    variant: "featured" as const,
  },
  {
    id: "residential-complex",
    title: "New Residential Complex",
    description:
      "Multi-unit residential development with modern amenities and sustainable design across Unguja.",
    href: "/projects",
    variant: "card" as const,
  },
  {
    id: "commercial-building",
    title: "Commercial Building",
    description:
      "Mixed-use commercial programme with construction, security, and digital brand stewardship.",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    variant: "photo" as const,
  },
] as const;

/** @deprecated Use PORTFOLIO_ITEMS — kept for legacy components */
export const FLAGSHIP_PROJECTS = PORTFOLIO_ITEMS;

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
    text: "Deep Unguja knowledge: Paje operations, Stone Town presence, and Tanzania-wide reach.",
  },
  {
    title: "Investor Discipline",
    text: "Transparent milestones, indicative metrics with clear disclaimers, and professional programme controls.",
  },
] as const;

export const ABOUT_IMAGES = {
  primary:
    "https://images.unsplash.com/photo-1511818966892-7c031c556a9e?w=1400&q=85&auto=format&fit=crop",
} as const;

export const ABOUT_COPY = {
  heading: "Building Beyond Structures. Creating Lasting Impact.",
  body:
    "Zanzibaba Group unites seven divisions under one premium brand — from Paje and Stone Town across Unguja to Tanzania-wide programmes. We deliver real estate, building materials, construction, digital marketing, tours, security, and landscaping with investor-grade discipline and local expertise.",
} as const;
