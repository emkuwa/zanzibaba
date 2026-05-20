export const HERO_IMAGES = {
  /** Stone Town / Zanzibar harbor — warm golden-hour coastal panorama */
  primary:
    "https://images.unsplash.com/photo-1573844250598-d871b821bb88?w=2400&q=88&auto=format&fit=crop",
} as const;

export const HERO_COPY = {
  line1: "Building Today,",
  line2: "Empowering Tomorrow.",
  subheading:
    "Seven integrated solutions across real estate, materials, construction, and digital — one group, endless possibilities for investors and institutions across Zanzibar and Tanzania.",
} as const;

export const FLAGSHIP_PROJECTS = [
  {
    id: "east-coast",
    title: "East Coast Villa Programme",
    location: "Paje & Bwejuu, Unguja",
    sector: "Real Estate & Construction",
    image:
      "https://images.unsplash.com/photo-1613497453912-2f81d5d8e5af?w=1200&q=80&auto=format&fit=crop",
    description:
      "Integrated land, materials, and build delivery for coastal villa developments — investor-grade coordination from plot to handover.",
    href: "/projects",
  },
  {
    id: "stone-town",
    title: "Stone Town Heritage Corridor",
    location: "Mlandege, Stone Town",
    sector: "Urban Regeneration",
    image:
      "https://images.unsplash.com/photo-1573844250598-d871b821bb88?w=1200&q=80&auto=format&fit=crop",
    description:
      "Commercial and hospitality assets aligned with UNESCO heritage context — disciplined design, security, and digital presence.",
    href: "/projects",
  },
  {
    id: "materials-hub",
    title: "Island Materials Hub",
    location: "Paje Yard, Zanzibar",
    sector: "Building Materials",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    description:
      "Programme-scale procurement and logistics for developers across Unguja — BOQ support, bulk supply, and delivery zones.",
    href: "/solutions/building-materials",
  },
] as const;

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
    "https://images.unsplash.com/photo-1573844250598-d871b821bb88?w=1400&q=85&auto=format&fit=crop",
  secondary:
    "https://images.unsplash.com/photo-1590073242678-70ee3fc28d8b?w=800&q=80&auto=format&fit=crop",
} as const;

export const ABOUT_COPY = {
  eyebrow: "About Us",
  heading: "Building Beyond Structures. Creating Lasting Impact.",
  body:
    "Zanzibaba Group unites seven divisions under one premium brand — from Paje and Stone Town across Unguja to Tanzania-wide programmes. We deliver real estate, building materials, construction, digital marketing, tours, security, and landscaping with investor-grade discipline and local expertise.",
} as const;
