import { SITE } from "@/data/site";

export function RealEstateJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    url: SITE.url,
    description:
      "Luxury Zanzibar investment properties — beachfront villas, off-plan developments, and curated opportunities for international investors.",
    telephone: SITE.phoneTel,
    email: SITE.email,
    areaServed: [
      { "@type": "Place", name: "Zanzibar, Tanzania" },
      { "@type": "Place", name: "Paje, Zanzibar" },
      { "@type": "Place", name: "Nungwi, Zanzibar" },
      { "@type": "Place", name: "Stone Town, Zanzibar" },
    ],
    address: SITE.offices.map((o) => ({
      "@type": "PostalAddress",
      addressLocality: o.location,
      addressCountry: "TZ",
    })),
    sameAs: [
      "https://www.facebook.com/ZanzibabaCompanyLimited",
      "https://www.instagram.com/zanzibaragroup",
      "https://www.linkedin.com/company/zanzibaba-company-limited",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Zanzibar property investment advisory",
        areaServed: "Zanzibar",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
