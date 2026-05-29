import { FUNNEL_GALLERY_IMAGES, FUNNEL_IMAGES } from "@/data/funnel-images";

export const FUNNEL_HERO = {
  eyebrow: "International investors · Zanzibar",
  title: "Discover High-Return Investment Properties in Zanzibar",
  subtitle:
    "Beachfront villas, off-plan developments, investment land and luxury residences curated for international investors.",
  primaryCta: "View Investment Opportunities",
  primaryHref: "/properties",
  secondaryCta: "Book Consultation",
  secondaryHref: "/contact",
  image: FUNNEL_IMAGES.hero,
  trustLine: "Curated opportunities · Investor advisory · Island-wide access",
} as const;

export const FUNNEL_HERO_TRUST = [
  "International client advisory",
  "Off-plan & beachfront access",
  "Due diligence coordination",
] as const;

export const FUNNEL_LEAD = {
  id: "invest",
  eyebrow: "Private investor access",
  title: "Request your investment consultation",
  subtitle:
    "Share your goals and our advisory team will match you with villas, off-plan programmes and land opportunities across Zanzibar.",
  submit: "Book Investment Consultation",
  privacy: "Confidential enquiry · No obligation · Response within 24 hours",
} as const;

export const LEAD_BUDGET_OPTIONS = [
  "Under $150,000",
  "$150,000 – $350,000",
  "$350,000 – $750,000",
  "$750,000 – $1.5M",
  "$1.5M+",
] as const;

export const LEAD_INTEREST_OPTIONS = [
  "Beachfront villa",
  "Off-plan development",
  "Investment land / plot",
  "Airbnb / short-stay yield",
  "Holiday home",
  "Retirement / relocation",
  "Commercial / hospitality",
] as const;

export const LEAD_TIMELINE_OPTIONS = [
  "Ready now",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Exploring / research",
] as const;

export const FUNNEL_TRUST = {
  eyebrow: "Why investors choose us",
  title: "Institutional discipline. Island expertise.",
  subtitle:
    "A dedicated real estate advisory platform for international capital entering Zanzibar — not a generic listings portal.",
  pillars: [
    {
      value: "10+",
      label: "Years island presence",
      body: "Local relationships, title coordination, and developer introductions across Unguja.",
    },
    {
      value: "Global",
      label: "Investor support",
      body: "Remote viewings, WhatsApp advisory, and structured acquisition for diaspora and HNW buyers.",
    },
    {
      value: "Curated",
      label: "Opportunity access",
      body: "Beachfront villas, off-plan programmes, and investment land vetted for international buyers.",
    },
    {
      value: "End-to-end",
      label: "Acquisition guidance",
      body: "From first consultation through legal review, payment milestones, and handover.",
    },
  ],
} as const;

export const FUNNEL_STATS = [
  { value: "15%", label: "Target annual ROI", sub: "Indicative — not audited" },
  { value: "20+", label: "Luxury programmes", sub: "Coast & Stone Town" },
  { value: "100%", label: "Structured ownership", sub: "Leasehold pathways" },
  { value: "6", label: "Prime coast zones", sub: "Paje to Stone Town" },
] as const;

export const FUNNEL_WHY = {
  eyebrow: "Market fundamentals",
  title: "Why invest in Zanzibar",
  subtitle:
    "Indian Ocean scarcity, luxury tourism expansion, and rising international demand for beachfront assets.",
  items: [
    {
      title: "Tourism growth",
      body: "Visitor demand supports hospitality, villas, and short-stay investment along Unguja's coast.",
    },
    {
      title: "Airbnb & yield",
      body: "Premium short-stay markets in Paje, north coast, and Stone Town corridors for managed rentals.",
    },
    {
      title: "Beachfront scarcity",
      body: "Limited freehold-style frontage drives long-term value for villas and boutique developments.",
    },
    {
      title: "Luxury tourism expansion",
      body: "Five-star resorts and branded residences elevate the island's international positioning.",
    },
    {
      title: "Investment ROI",
      body: "Early off-plan entry and land banking strategies for qualified investors — subject to due diligence.",
    },
    {
      title: "Infrastructure growth",
      body: "Improved connectivity and resort investment strengthen east and north coast appeal.",
    },
  ],
} as const;

export const FUNNEL_FEATURED = {
  eyebrow: "Curated inventory",
  title: "Featured investment opportunities",
  subtitle:
    "Luxury villas, beachfront plots, and island assets with advisory support for international buyers.",
} as const;

export const FUNNEL_OFF_PLAN_SECTION = {
  eyebrow: "Off-plan",
  title: "Luxury off-plan developments",
  subtitle:
    "Early investor pricing, staged payment plans, and appreciation potential before handover — subject to developer track record.",
} as const;

export const OFF_PLAN_PROJECTS = [
  {
    id: "anga",
    name: "Anga",
    location: "East Coast · Zanzibar",
    completion: "2026–2027",
    highlight: "Boutique coastal residences",
    paymentPlan: "Staged milestones · reservation deposit",
    roiLabel: "Early investor pricing",
    image: FUNNEL_IMAGES.development,
    href: "/contact?interest=off-plan-anga",
  },
  {
    id: "shivo",
    name: "Shivo",
    location: "North Coast",
    completion: "2027",
    highlight: "Luxury villa collection",
    paymentPlan: "Flexible instalments during construction",
    roiLabel: "Premium finish spec",
    image: FUNNEL_IMAGES.villaLuxury,
    href: "/contact?interest=off-plan-shivo",
  },
  {
    id: "the-hill",
    name: "The Hill",
    location: "Elevated coastal plot",
    completion: "2026",
    highlight: "Panoramic ocean-view homes",
    paymentPlan: "Phased payments to completion",
    roiLabel: "View premium positioning",
    image: FUNNEL_IMAGES.coastalWide,
    href: "/contact?interest=off-plan-the-hill",
  },
  {
    id: "anantara",
    name: "Anantara",
    location: "Resort corridor",
    completion: "2027–2028",
    highlight: "Branded hospitality investment",
    paymentPlan: "Developer-led schedule",
    roiLabel: "Hospitality-linked asset",
    image: FUNNEL_IMAGES.stoneTownGolden,
    href: "/contact?interest=off-plan-anantara",
  },
] as const;

export const FUNNEL_AREAS_SECTION = {
  eyebrow: "Locations",
  title: "Investment areas across Zanzibar",
  subtitle: "Match your strategy to the coast — yield, lifestyle, or heritage capital preservation.",
} as const;

/** @deprecated Use INVESTMENT_AREAS */
export const FUNNEL_REGIONS = [
  {
    id: "north",
    name: "North Coast",
    subtitle: "Nungwi · Kendwa",
    description: "Premium beachfront villas and hospitality assets with strong north-coast demand.",
    href: "/areas#nungwi",
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    id: "east",
    name: "East Coast",
    subtitle: "Paje · Jambiani",
    description: "Villa plots and Airbnb-ready homes on Unguja's sunrise coast.",
    href: "/areas#paje",
    image: FUNNEL_IMAGES.beachSunset,
  },
] as const;

export const INVESTMENT_AREAS = [
  {
    id: "paje",
    name: "Paje",
    tag: "Airbnb · kite coast",
    description: "East-coast lifestyle hub with strong short-stay demand and villa plot potential.",
    href: "/areas#paje",
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    id: "nungwi",
    name: "Nungwi",
    tag: "North coast luxury",
    description: "Premium beachfront villas and resort-adjacent investment opportunities.",
    href: "/areas#nungwi",
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    id: "jambiani",
    name: "Jambiani",
    tag: "Sunrise coast",
    description: "Relaxed beach plots and villas suited to lifestyle buyers and boutique rentals.",
    href: "/areas#jambiani",
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    id: "kiwengwa",
    name: "Kiwengwa",
    tag: "Resort belt",
    description: "Resort corridor with international tourism and branded residence exposure.",
    href: "/areas#kiwengwa",
    image: FUNNEL_IMAGES.coastalWide,
  },
  {
    id: "matemwe",
    name: "Matemwe",
    tag: "Mnemba proximity",
    description: "Exclusive north-east coast positioning for luxury villa and retreat concepts.",
    href: "/areas#matemwe",
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    id: "stone-town",
    name: "Stone Town",
    tag: "Heritage capital",
    description: "UNESCO heritage apartments and boutique assets for yield and cultural appeal.",
    href: "/areas#stone-town",
    image: FUNNEL_IMAGES.stoneTownHarbor,
  },
] as const;

export const FUNNEL_TESTIMONIALS = {
  eyebrow: "Investor confidence",
  title: "Trusted by international buyers",
  items: [
    {
      quote:
        "Clear communication, verified opportunities, and local support through closing — exactly what we needed for our first Zanzibar acquisition.",
      name: "Private investor",
      location: "United Kingdom",
    },
    {
      quote:
        "The off-plan introduction and payment structure walkthrough gave us confidence before we travelled for the final site visit.",
      name: "Diaspora buyer",
      location: "United States",
    },
    {
      quote:
        "Professional advisory on areas, budgets, and rental potential — not a pushy sales experience.",
      name: "Investment group",
      location: "UAE",
    },
  ],
} as const;

export const FUNNEL_PROCESS = {
  eyebrow: "How it works",
  title: "Your investment pathway",
  steps: [
    {
      step: "01",
      title: "Consult",
      body: "Book a consultation to align budget, timeline, and investment strategy.",
    },
    {
      step: "02",
      title: "Select",
      body: "Shortlist villas, off-plan programmes, or land with curated introductions.",
    },
    {
      step: "03",
      title: "Verify",
      body: "Title review, structure selection, and compliant acquisition with counsel.",
    },
    {
      step: "04",
      title: "Acquire",
      body: "Completion coordination, handover, and ongoing investor support.",
    },
  ],
} as const;

export const FUNNEL_FAQ = [
  {
    q: "Can foreigners invest in property in Zanzibar?",
    a: "International buyers typically acquire through approved leasehold and investment structures. We coordinate legal review and compliant pathways.",
  },
  {
    q: "What are the best places to invest in Zanzibar?",
    a: "Paje, Nungwi, Jambiani, Kiwengwa, Matemwe, and Stone Town each offer distinct yield and lifestyle profiles — we advise based on your goals.",
  },
  {
    q: "Is Zanzibar good for Airbnb investment?",
    a: "Tourism demand supports short-stay programmes when properties are well located and professionally managed. Yields are indicative, not guaranteed.",
  },
  {
    q: "How do off-plan investments work?",
    a: "Early pricing, staged payments, and handover timelines vary by developer. We introduce qualified buyers to vetted programmes with due diligence support.",
  },
  {
    q: "Can I buy a luxury villa in Zanzibar remotely?",
    a: "Yes — virtual tours, media packs, and WhatsApp advisory are standard before on-island viewings.",
  },
  {
    q: "What budget do I need to start?",
    a: "Entry points vary from investment land to luxury villas and off-plan residences. Share your range in the consultation form for matched opportunities.",
  },
  {
    q: "Do you support diaspora and group investors?",
    a: "We work with individual buyers, families, and investment groups seeking beachfront, off-plan, and yield-focused assets.",
  },
] as const;

export const FUNNEL_FINAL_CTA = {
  eyebrow: "Begin your acquisition",
  title: "Secure your place in Zanzibar's next chapter",
  subtitle:
    "Book a private consultation with our investment advisory team — beachfront villas, off-plan programmes, and curated land opportunities.",
  primaryCta: "Book Investment Consultation",
  primaryHref: "/contact",
  secondaryCta: "View Investment Opportunities",
  secondaryHref: "/properties",
} as const;

/** @deprecated Use FUNNEL_GALLERY in new layouts */
export const FUNNEL_GALLERY = {
  title: "Island portfolio",
  images: FUNNEL_GALLERY_IMAGES,
} as const;

/** @deprecated Legacy component exports — use OFF_PLAN_PROJECTS */
export const FUNNEL_OFF_PLAN = {
  title: FUNNEL_OFF_PLAN_SECTION.title,
  body: FUNNEL_OFF_PLAN_SECTION.subtitle,
  bullets: ["Flexible payment milestones", "Early investor pricing", "Appreciation before handover"],
} as const;

export const FUNNEL_MID_CTA = {
  title: "Join the investor list",
  body: "Receive curated Zanzibar investment opportunities and off-plan programme updates.",
  button: "Join now",
} as const;

export const FUNNEL_PROPERTY_TYPES = {
  title: "Property types",
  items: [
    { title: "Luxury villas", body: "Beachfront villas for lifestyle and yield.", href: "/properties" },
    { title: "Investment land", body: "Plots for development.", href: "/properties?type=land" },
    { title: "Off-plan", body: "Early entry programmes.", href: "#off-plan" },
  ],
} as const;

export const FUNNEL_RENTALS = {
  title: FUNNEL_WHY.items[1]?.title ?? "Airbnb & yield",
  subtitle: "Premium short-stay and long-term advisory.",
  items: [
    { title: "Luxury vacation villas", body: "Curated rentals.", image: FUNNEL_IMAGES.villaLuxury },
    { title: "Long-term living", body: "Expat housing.", image: FUNNEL_IMAGES.stoneTownPromenade },
    { title: "Digital nomad", body: "Coastal lifestyle.", image: FUNNEL_IMAGES.stoneTownHarbor },
  ],
} as const;
