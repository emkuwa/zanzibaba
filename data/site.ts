export const SITE = {
  name: "Zanzibaba Real Estate",
  brandLine: "Local Property Advisory — Zanzibar",
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
  "Zanzibar property for sale",
  "Zanzibar villas for sale",
  "beachfront property Zanzibar",
  "property for sale Paje Zanzibar",
  "land for sale Zanzibar",
  "buy property in Zanzibar",
  "Zanzibar real estate",
  "Jambiani property for sale",
  "Nungwi property for sale",
  "Zanzibar off-plan property",
  "Zanzibar investment property",
  "Zanzibar beachfront villa",
] as const;

/** Simplified buyer-facing desktop navigation */
export const NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/areas", label: "Areas" },
  { href: "/buying-guide", label: "Buy in Zanzibar" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

/** Mobile navigation — primary links only */
export const MOBILE_NAV_LINKS = [
  { href: "/properties", label: "Properties" },
  { href: "/areas", label: "Areas" },
  { href: "/buying-guide", label: "Buy in Zanzibar" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary links for footer / deeper navigation */
export const SECONDARY_NAV_LINKS = [
  { href: "/locations", label: "Location Guides" },
  { href: "/property-type", label: "Property Types" },
  { href: "/for", label: "For Buyers" },
  { href: "/tell-us", label: "Smart Match" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
] as const;

export const PRIMARY_CTA = {
  label: "Explore Properties",
  href: "/properties",
} as const;

export const SECONDARY_CTA = {
  label: "WhatsApp an Advisor",
  href: "whatsapp",
} as const;
