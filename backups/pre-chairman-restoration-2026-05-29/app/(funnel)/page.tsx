import type { Metadata } from "next";
import { getListingsForPublic } from "@/lib/listings-store";
import { SITE, SEO_KEYWORDS } from "@/data/site";
import { FUNNEL_IMAGES } from "@/data/funnel-images";
import { RealEstateJsonLd } from "@/components/seo/RealEstateJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FunnelHero } from "@/components/funnel/FunnelHero";
import { FunnelLeadCapture } from "@/components/funnel/FunnelLeadCapture";
import { FunnelTrust } from "@/components/funnel/FunnelTrust";
import { FunnelWhyInvest } from "@/components/funnel/FunnelWhyInvest";
import { FunnelFeaturedListings } from "@/components/funnel/FunnelFeaturedListings";
import { FunnelOffPlanProjects } from "@/components/funnel/FunnelOffPlanProjects";
import { FunnelInvestmentAreas } from "@/components/funnel/FunnelInvestmentAreas";
import { FunnelProcess } from "@/components/funnel/FunnelProcess";
import { FunnelTestimonials } from "@/components/funnel/FunnelTestimonials";
import { FunnelFaq } from "@/components/funnel/FunnelFaq";
import { FunnelFinalCta } from "@/components/funnel/FunnelFinalCta";

export const metadata: Metadata = {
  title: "Zanzibar Investment Properties | Luxury Villas & Off-Plan",
  description:
    "Discover high-return Zanzibar investment properties — beachfront villas, off-plan developments, and luxury residences for international investors. Book your investment consultation.",
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: "Zanzibar Investment Properties | Zanzibaba Real Estate",
    description:
      "Beachfront villas, off-plan projects, and Zanzibar investment opportunities curated for foreign investors and diaspora capital.",
    images: [
      {
        url: FUNNEL_IMAGES.og,
        width: 1200,
        height: 630,
        alt: "Luxury Zanzibar property investment — beachfront and Stone Town",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zanzibar Investment Properties | Zanzibaba",
    description:
      "Luxury villas, off-plan developments, and beachfront property for sale in Zanzibar — international investor advisory.",
    images: [FUNNEL_IMAGES.og],
  },
};

export default async function HomePage() {
  const listings = await getListingsForPublic();
  const featured = listings.filter((l) => l.featured);
  const showcase = featured.length > 0 ? featured : listings.slice(0, 4);

  return (
    <>
      <RealEstateJsonLd />
      <FaqJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <FunnelHero />
      <FunnelLeadCapture />
      <FunnelTrust />
      <FunnelWhyInvest />
      <FunnelFeaturedListings listings={showcase} />
      <FunnelOffPlanProjects />
      <FunnelInvestmentAreas />
      <FunnelProcess />
      <FunnelTestimonials />
      <FunnelFaq />
      <FunnelFinalCta />
    </>
  );
}
