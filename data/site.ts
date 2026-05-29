export const SITE = {
  name: "Zanzibaba Real Estate",
  brandLine: "Zanzibar Investment Properties",
  legalName: "Zanzibaba Company Limited",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://projects.zanzibaba.com",
  email: "info@zanzibaba.com",
  phone: "+255 716 002 790",
  phoneLocal: "0716 002 790",
  phoneTel: "+255716002790",
  whatsapp: "255716002790",
  offices: [
    { name: "East Coast Office", location: "Paje, Zanzibar" },
    { name: "Town Office", location: "Mlandege, Zanzibar" },
  ],
} as const;

export const SUBDOMAINS = {
  invest: "https://invest.zanzibaba.com",
  realEstate: "https://realestate.zanzibaba.com",
  projects: "https://projects.zanzibaba.com",
  investmentGateway: "https://investment.zanzibaba.com",
} as const;

export const SEO_KEYWORDS = [
  "Zanzibar real estate",
  "Zanzibar investment properties",
  "property for sale in Zanzibar",
  "luxury villas Zanzibar",
  "beachfront property Zanzibar",
  "offplan projects Zanzibar",
  "Zanzibar investment opportunities",
  "best places to invest in Zanzibar",
  "Zanzibar Airbnb investment",
  "buy villa in Zanzibar",
  "Zanzibar offplan investment",
  "luxury property investment Zanzibar",
  "Zanzibar beachfront villa",
  "foreign property investment Zanzibar",
] as const;

/** Investor funnel navigation — no corporate divisions */
export const FUNNEL_NAV_LINKS = [
  { href: "/properties", label: "Opportunities" },
  { href: "/investments", label: "Investments" },
  { href: "/areas", label: "Areas" },
  { href: "/why-zanzibar", label: "Why Zanzibar" },
] as const;

/** Desktop header navigation (portal + legacy) */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  ...FUNNEL_NAV_LINKS,
  { href: "/contact", label: "Contact" },
] as const;

export const MOBILE_NAV_LINKS = NAV_LINKS;

export const PRIMARY_CTA = {
  label: "Book Investment Consultation",
  href: "/contact",
} as const;

export const SECONDARY_CTA = {
  label: "View Investment Opportunities",
  href: "/properties",
} as const;
