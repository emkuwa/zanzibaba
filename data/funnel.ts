import { FUNNEL_GALLERY_IMAGES, FUNNEL_IMAGES } from "@/data/funnel-images";

export const FUNNEL_HERO = {
  eyebrow: "Zanzibar Property Advisory",
  title: "Exceptional Property.\nExtraordinary Zanzibar.",
  subtitle:
    "Curated villas, beachfront land, hospitality assets and off-plan opportunities for international buyers.",
  primaryCta: "Explore Properties",
  primaryHref: "/properties",
  secondaryCta: "WhatsApp an Advisor",
  secondaryHref: `https://wa.me/255716002790`,
  image: FUNNEL_IMAGES.hero,
  trustLine: "Local team in Zanzibar · Due diligence support · International buyer advisory",
} as const;

export const FUNNEL_HERO_TRUST = [
  "Based in Paje and Stone Town",
  "Founder-led advisory",
  "Buyer support from search to handover",
] as const;

export const FUNNEL_LEAD = {
  id: "invest",
  eyebrow: "Tell us what you're looking for",
  title: "Find properties that match your requirements",
  subtitle:
    "Share your goals and our local team will suggest matching opportunities across Zanzibar.",
  submit: "Find Properties for Me",
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
  eyebrow: "Your property partner",
  title: "Your Property Partner on the Ground in Zanzibar",
  subtitle:
    "Direct, local advisory for international buyers — from property sourcing and site visits to due diligence coordination and acquisition support.",
  pillars: [
    {
      value: "01",
      label: "Property Sourcing",
      body: "We search our network of agents, developers, and off-market opportunities to find properties matching your requirements.",
    },
    {
      value: "02",
      label: "Due Diligence",
      body: "Title review, legal guidance, and verification support with established local professionals.",
    },
    {
      value: "03",
      label: "Site Visits",
      body: "In-person and virtual viewings with local observation and honest area assessments.",
    },
    {
      value: "04",
      label: "Acquisition Support",
      body: "From negotiation guidance through completion coordination and handover — we remain involved throughout.",
    },
  ],
} as const;

export const FUNNEL_FOUNDER = {
  eyebrow: "Meet your advisor",
  name: "Emmanuel Mkuwa",
  title: "Founder & Managing Director",
  description:
    "Direct, local advisory for international buyers — from property sourcing and site visits to due diligence coordination and acquisition support.",
  whatsappCta: "WhatsApp Emmanuel",
  consultationCta: "Book a Private Consultation",
  image: FUNNEL_IMAGES.stoneTownGolden,
} as const;

export const FUNNEL_SMART_MATCH = {
  eyebrow: "Smart property matching",
  title: "Find Your Zanzibar Property",
  subtitle:
    "Tell us what you're looking for and we'll match you with suitable opportunities.",
  steps: [
    {
      id: "type",
      label: "What are you looking for?",
      options: ["Villa", "Land", "Hotel / Resort", "Apartment", "Commercial", "Not Sure"],
    },
    {
      id: "budget",
      label: "Investment Budget",
      options: ["Under $150K", "$150K–$300K", "$300K–$500K", "$500K–$1M", "$1M+"],
    },
    {
      id: "area",
      label: "Preferred Area",
      options: ["Paje", "Jambiani", "Nungwi", "Matemwe", "Fumba", "Other / Not Sure"],
    },
    {
      id: "objective",
      label: "Primary Objective",
      options: [
        "Lifestyle / Holiday Home",
        "Airbnb / Rental",
        "Development",
        "Hospitality Business",
        "Long-Term Investment",
      ],
    },
  ],
  matchText: "We can match you with opportunities based on your requirements.",
  namePlaceholder: "Your name",
  whatsappPlaceholder: "WhatsApp number",
  emailPlaceholder: "Email (optional)",
  submitCta: "Send My Matches on WhatsApp",
  privacy: "Confidential enquiry · No obligation · Response within 24 hours",
} as const;

export const FUNNEL_WHY = {
  eyebrow: "Property market",
  title: "Why Zanzibar property",
  subtitle:
    "A growing tourism destination with limited beachfront land and increasing international buyer interest.",
  items: [
    {
      title: "Tourism growth",
      body: "Zanzibar welcomes increasing visitor numbers each year, supporting demand for holiday rentals and hospitality properties.",
    },
    {
      title: "Short-stay potential",
      body: "Well-located properties in popular areas can generate rental income through short-term holiday platforms when professionally managed.",
    },
    {
      title: "Beachfront scarcity",
      body: "Limited coastal land with beach access drives long-term value for villa and boutique development opportunities.",
    },
    {
      title: "Luxury development",
      body: "New resorts and branded residences are expanding the island's international tourism positioning.",
    },
    {
      title: "Off-plan opportunities",
      body: "Early entry into development projects with staged payment plans — subject to developer due diligence.",
    },
    {
      title: "Infrastructure improvement",
      body: "Ongoing connectivity and resort investment strengthen east and north coast appeal for property buyers.",
    },
  ],
} as const;

export const FUNNEL_FEATURED = {
  eyebrow: "Current listings",
  title: "Featured Opportunities in Zanzibar",
  subtitle:
    "Curated properties with local advisory support — beachfront villas, development land, and investment opportunities.",
} as const;

export const FUNNEL_OFF_PLAN_SECTION = {
  eyebrow: "Off-plan",
  title: "Off-plan developments",
  subtitle:
    "Early entry pricing and staged payment plans on selected development projects — due diligence support included.",
} as const;

export const OFF_PLAN_PROJECTS = [
  {
    id: "anga",
    name: "Anga",
    location: "East Coast · Zanzibar",
    completion: "2026–2027",
    highlight: "Boutique coastal residences",
    paymentPlan: "Staged milestones · reservation deposit",
    roiLabel: "Early entry pricing",
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
    roiLabel: "Premium finish specification",
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
    roiLabel: "Elevated positioning",
    image: FUNNEL_IMAGES.coastalWide,
    href: "/contact?interest=off-plan-the-hill",
  },
  {
    id: "anantara",
    name: "Anantara",
    location: "Resort corridor",
    completion: "2027–2028",
    highlight: "Branded hospitality residences",
    paymentPlan: "Developer-led schedule",
    roiLabel: "Resort-adjacent location",
    image: FUNNEL_IMAGES.stoneTownGolden,
    href: "/contact?interest=off-plan-anantara",
  },
] as const;

export const FUNNEL_AREAS_SECTION = {
  eyebrow: "Locations",
  title: "Explore Zanzibar",
  subtitle: "Each area offers a different character — from lively east coast to quiet north-east and heritage Stone Town.",
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
  eyebrow: "Buyer feedback",
  title: "What buyers say about working with us",
  items: [
    {
      quote:
        "Clear communication, local knowledge, and support through the buying process — exactly what we needed for our Zanzibar property purchase.",
      name: "Private buyer",
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
        "Professional guidance on areas, budgets, and rental potential — not a pushy sales experience.",
      name: "Property buyer",
      location: "UAE",
    },
  ],
} as const;

export const FUNNEL_PROCESS = {
  eyebrow: "How it works",
  title: "Your property search pathway",
  steps: [
    {
      step: "01",
      title: "Enquire",
      body: "Tell us what you're looking for — budget, location, property type, and timeline.",
    },
    {
      step: "02",
      body: "We shortlist matching properties and arrange viewings — in person or virtually.",
      title: "Discover",
    },
    {
      step: "03",
      title: "Verify",
      body: "Title review, legal guidance, and due diligence support with local professionals.",
    },
    {
      step: "04",
      title: "Acquire",
      body: "Completion coordination, handover, and ongoing support where needed.",
    },
  ],
} as const;

export const FUNNEL_FAQ = [
  {
    q: "Can foreigners buy property in Zanzibar?",
    a: "International buyers typically acquire through approved leasehold and investment structures. We coordinate legal review and guide you through compliant pathways.",
  },
  {
    q: "What are the best areas to buy in Zanzibar?",
    a: "Paje, Nungwi, Jambiani, Kiwengwa, Matemwe, and Stone Town each offer different characteristics — we help you find the right match based on your goals and budget.",
  },
  {
    q: "Is Zanzibar good for holiday rental income?",
    a: "Well-located properties in popular areas can generate rental income through short-term platforms when professionally managed. Returns vary by location, property type, and market conditions.",
  },
  {
    q: "How do off-plan purchases work?",
    a: "Early entry pricing, staged payments, and handover timelines vary by developer. We introduce buyers to vetted programmes and support due diligence throughout.",
  },
  {
    q: "Can I buy a villa in Zanzibar remotely?",
    a: "Yes — virtual tours, media packs, and WhatsApp advisory are available before on-island viewings. Many buyers complete the process remotely with legal representation.",
  },
  {
    q: "What budget do I need?",
    a: "Entry points range from investment land to luxury villas and off-plan residences. Share your range in the enquiry form and we will suggest matching options.",
  },
  {
    q: "Do you work with diaspora buyers?",
    a: "We work with individual buyers, families, and groups seeking beachfront, off-plan, and lifestyle properties across Zanzibar.",
  },
] as const;

export const FUNNEL_FINAL_CTA = {
  eyebrow: "Start your property search",
  title: "Your Zanzibar property search starts here.",
  subtitle:
    "Whether you're looking for a beachfront villa, investment land, or an off-plan opportunity — our local team is ready to help.",
  primaryCta: "View Properties",
  primaryHref: "/properties",
  secondaryCta: "WhatsApp an Advisor",
  secondaryHref: `https://wa.me/255716002790`,
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
  title: "Not finding what you're looking for?",
  body: "Not every property opportunity is publicly advertised. Tell us what you're looking for and our local team can help source suitable options across Zanzibar.",
  button: "Submit Your Requirements",
} as const;

export const FUNNEL_PROPERTY_TYPES = {
  title: "Property types",
  items: [
    { title: "Beachfront villas", body: "Villas with ocean views and beach access.", href: "/properties" },
    { title: "Land & plots", body: "Development land and building plots.", href: "/properties?type=land" },
    { title: "Off-plan", body: "New-build properties with payment plans.", href: "#off-plan" },
  ],
} as const;

export const FUNNEL_RENTALS = {
  title: "Holiday rental areas",
  subtitle: "Popular locations for short-term stays and holiday lets.",
  items: [
    { title: "Luxury vacation villas", body: "Private holiday rentals.", image: FUNNEL_IMAGES.villaLuxury },
    { title: "Long-term living", body: "Residential options.", image: FUNNEL_IMAGES.stoneTownPromenade },
    { title: "Coastal lifestyle", body: "Beach proximity.", image: FUNNEL_IMAGES.stoneTownHarbor },
  ],
} as const;
