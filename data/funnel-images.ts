/**
 * Canonical local visuals for realestate.zanzibaba.com funnel.
 * Do not use external stock URLs — assets live under /public/images/.
 */
export const FUNNEL_IMAGES = {
  /** Fullscreen hero — Stone Town harbor golden hour */
  hero: "/images/hero/stone-town-harbor-wide.jpg",
  /** OG / social share */
  og: "/images/hero/stone-town-harbor-wide.jpg",
  /** Beach lifestyle — dhow sunset */
  beachSunset: "/images/hero-zanzibar.png",
  /** Stone Town aerial — harbor */
  stoneTownHarbor: "/images/hero/stone-town-harbor-wide.jpg",
  stoneTownPromenade: "/images/hero/stone-town-promenade.jpg",
  stoneTownFort: "/images/hero/stone-town-fort-rooftops.jpg",
  stoneTownGolden: "/images/hero/accent.jpg",
  coastalWide: "/images/hero/secondary.jpg",
  villaLuxury: "/images/hero/accent-villa-old.jpg",
  /** Off-plan / development mood */
  development: "/images/hero/primary.jpg",
} as const;

export const FUNNEL_GALLERY_IMAGES = [
  { src: FUNNEL_IMAGES.beachSunset, alt: "Turquoise beach and dhow at sunset, Zanzibar" },
  { src: FUNNEL_IMAGES.villaLuxury, alt: "Luxury beachfront villa with infinity pool in Zanzibar" },
  { src: FUNNEL_IMAGES.stoneTownHarbor, alt: "Stone Town harbor aerial at golden hour" },
  { src: FUNNEL_IMAGES.stoneTownPromenade, alt: "Stone Town seafront promenade and dhows" },
  { src: FUNNEL_IMAGES.stoneTownFort, alt: "Stone Town Old Fort rooftop architecture" },
  { src: FUNNEL_IMAGES.coastalWide, alt: "Zanzibar coastline and tropical landscape" },
] as const;
