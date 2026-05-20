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
    { name: "Mlandege Town Office", location: "Stone Town, Zanzibar" },
  ],
} as const;

export const SUBDOMAINS = {
  materials: "https://materials.zanzibaba.com",
  invest: "https://invest.zanzibaba.com",
  zanzicore: "https://zanzicore.zanzibaba.com",
  admin: "https://admin.zanzibaba.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    label: "Our Solutions",
    children: [
      { href: "/solutions", label: "All Solutions" },
      { href: "/solutions/real-estate", label: "Real Estate" },
      { href: "/solutions/building-materials", label: "Building Materials" },
      { href: "/solutions/construction", label: "Construction Services" },
      { href: "/solutions/digital-marketing", label: "Digital & Marketing" },
      { href: "/solutions/tours", label: "Tours & Experiences" },
      { href: "/solutions/security", label: "Security Systems" },
      { href: "/solutions/landscaping", label: "Landscaping" },
    ],
  },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact Us" },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
] as const;
