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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 127,
      bestRating: 5,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function GlobalRealEstateSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: "Zanzibar investment properties for international investors — beachfront villas, off-plan developments, and luxury real estate.",
        publisher: { "@type": "Organization", name: SITE.name },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE.url}/properties?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE.url}#webpage`,
        url: SITE.url,
        dateModified: new Date().toISOString(),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".hero-heading", ".property-description", ".faq-answer"],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
