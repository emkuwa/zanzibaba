import type { Metadata } from "next";
import { getListingsForPublic } from "@/lib/listings-store";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { FUNNEL_IMAGES } from "@/data/funnel-images";
import { RealEstateJsonLd } from "@/components/seo/RealEstateJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FunnelHero } from "@/components/funnel/FunnelHero";
import { FunnelFeaturedListings } from "@/components/funnel/FunnelFeaturedListings";
import { FunnelTrust } from "@/components/funnel/FunnelTrust";
import { SmartMatch } from "@/components/funnel/SmartMatch";
import { FunnelInvestmentAreas } from "@/components/funnel/FunnelInvestmentAreas";
import { FunnelFinalCta } from "@/components/funnel/FunnelFinalCta";

export const metadata: Metadata = {
  title: "Zanzibar Property for Sale — Villas, Land & Off-Plan | Zanzibaba Real Estate",
  description:
    "Find property in Zanzibar — beachfront villas, development land, off-plan homes and selected investment opportunities. Local property advisory based in Paje and Stone Town.",
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: "Zanzibar Property for Sale | Zanzibaba Real Estate",
    description:
      "Beachfront villas, development land, and off-plan properties in Zanzibar — local property sourcing and buyer support.",
    images: [
      {
        url: FUNNEL_IMAGES.og,
        width: 1200,
        height: 630,
        alt: "Zanzibar property — beachfront villas and coastal land",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Property for Sale | Zanzibaba Real Estate",
    description:
      "Beachfront villas, land, and off-plan property in Zanzibar — local advisory based in Paje and Stone Town.",
    images: [FUNNEL_IMAGES.og],
  },
};

export default async function HomePage() {
  const listings = await getListingsForPublic();
  const featured = listings.filter((l) => l.featured);
  const showcase = featured.length > 0 ? featured : listings.slice(0, 3);

  return (
    <>
      <RealEstateJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <FunnelHero />
      <FunnelFeaturedListings listings={showcase} />
      <FunnelTrust />
      <SmartMatch />
      <FunnelInvestmentAreas />
      <FunnelFinalCta />
    </>
  );
}
