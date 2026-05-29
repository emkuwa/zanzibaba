export type InvestorOffering = {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: "/brand/icons/solutions/real-estate.png";
};

export const INVESTOR_OFFERINGS: InvestorOffering[] = [
  {
    slug: "beachfront-villas",
    title: "Beachfront Villas",
    description:
      "Luxury villas Zanzibar buyers trust — Paje, Nungwi, Kendwa, and east-coast coastlines with title coordination.",
    href: "/properties?type=villa",
    icon: "/brand/icons/solutions/real-estate.png",
  },
  {
    slug: "investment-land",
    title: "Investment Land & Plots",
    description:
      "Property for sale in Zanzibar with clear boundaries — plots suited to villas, boutique hotels, or phased development.",
    href: "/properties?type=land",
    icon: "/brand/icons/solutions/real-estate.png",
  },
  {
    slug: "airbnb-yield",
    title: "Airbnb & Short-Stay",
    description:
      "Zanzibar investment property selected for rental yield — near-beach homes and apartments with management introductions.",
    href: "/investments",
    icon: "/brand/icons/solutions/real-estate.png",
  },
  {
    slug: "retirement-homes",
    title: "Retirement & Relocation",
    description:
      "Quiet coastal homes and Stone Town residences for retirees and diaspora families seeking island lifestyle.",
    href: "/contact",
    icon: "/brand/icons/solutions/real-estate.png",
  },
  {
    slug: "developer-plots",
    title: "Developer Programmes",
    description:
      "Larger parcels and commercial angles for master planners expanding in Unguja's growth corridors.",
    href: "/contact",
    icon: "/brand/icons/solutions/real-estate.png",
  },
  {
    slug: "stone-town",
    title: "Stone Town Heritage",
    description:
      "Character properties and apartments in UNESCO-adjacent districts — culture, yield, and walkable living.",
    href: "/areas#stone-town",
    icon: "/brand/icons/solutions/real-estate.png",
  },
];
