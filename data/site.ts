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

/** Desktop header + mobile drawer — flat links per Chairman mockup */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Our Services" },
  { href: "/projects", label: "Projects" },
  { href: "/projects", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;
