export const SITE = {
  name: "Zanzibaba Group",
  legalName: "Zanzibaba Company Limited",
  url: "https://zanzibaba.com",
  email: "info@zanzibaba.com",
  phone: "+255 716 002 790",
  phoneLocal: "0716 002 790",
  phoneTel: "+255716002790",
  whatsapp: "255716002790",
  offices: [
    { name: "Paje Yard", location: "Paje, Zanzibar" },
    { name: "Mlandege Stone Town", location: "Stone Town, Zanzibar" },
  ],
} as const;

export const SUBDOMAINS = {
  materials: "https://materials.zanzibaba.com",
  invest: "https://invest.zanzibaba.com",
  zanzicore: "https://zanzicore.zanzibaba.com",
  admin: "https://admin.zanzibaba.com",
} as const;

const SOLUTION_CHILDREN = [
  { href: "/solutions", label: "All Solutions" },
  { href: "/solutions/real-estate", label: "Real Estate" },
  { href: "/solutions/building-materials", label: "Building Materials" },
  { href: "/solutions/construction", label: "Construction Services" },
  { href: "/solutions/digital-marketing", label: "Digital & Marketing" },
  { href: "/solutions/tours", label: "Tours & Experiences" },
  { href: "/solutions/security", label: "Security Systems" },
  { href: "/solutions/landscaping", label: "Landscaping" },
] as const;

/** Desktop header navigation */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { label: "Our Solutions", children: SOLUTION_CHILDREN },
  { href: "/projects", label: "Projects" },
  { href: "/investments", label: "Investments" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** Flat links for mobile drawer */
export const MOBILE_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/solutions", label: "Our Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/investments", label: "Investments" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact Us" },
] as const;
