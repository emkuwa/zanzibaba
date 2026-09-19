import { SITE } from "@/data/site";

const ORG_ID = `${SITE.url}/#organization`;

export function RealEstateJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: "Zanzibaba",
    legalName: SITE.legalName,
    url: SITE.url,
    description:
      "Zanzibaba Real Estate is a local property advisory in Zanzibar helping international buyers find, evaluate, and purchase beachfront villas, development land, off-plan homes, and investment property. Offices in Paje and Stone Town, Zanzibar.",
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "USD, TZS",
    paymentAccepted: "Cash, Bank Transfer",
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.262,
      longitude: 39.543,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Zanzibar, Tanzania" },
      { "@type": "Place", name: "Paje, Zanzibar" },
      { "@type": "Place", name: "Nungwi, Zanzibar" },
      { "@type": "Place", name: "Kendwa, Zanzibar" },
      { "@type": "Place", name: "Jambiani, Zanzibar" },
      { "@type": "Place", name: "Bwejuu, Zanzibar" },
      { "@type": "Place", name: "Matemwe, Zanzibar" },
      { "@type": "Place", name: "Kiwengwa, Zanzibar" },
      { "@type": "Place", name: "Stone Town, Zanzibar" },
      { "@type": "Place", name: "Fumba, Zanzibar" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Zanzibar Property Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Search and Sourcing",
            description: "Matching buyer requirements with properties across Zanzibar including beachfront villas, land plots, off-plan developments, and apartments.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Viewing Coordination",
            description: "Arranging in-person and virtual property viewings across all areas of Zanzibar.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Due Diligence Support",
            description: "Coordinating title searches, legal review, and property verification with local professionals.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Buyer Education",
            description: "Guidance on foreign ownership rules, lease structures, purchase process, and transaction costs in Zanzibar.",
          },
        },
      ],
    },
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
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        alternateName: "Zanzibaba",
        legalName: SITE.legalName,
        url: SITE.url,
        description:
          "Zanzibaba Real Estate is a local property advisory based in Paje and Stone Town, Zanzibar. The company helps international buyers find, evaluate, and purchase property in Zanzibar with local knowledge and professional support.",
        telephone: SITE.phoneTel,
        email: SITE.email,
        logo: `${SITE.url}/brand/og-zanzibaba-real-estate.png`,
        image: `${SITE.url}/brand/og-zanzibaba-real-estate.png`,
        address: SITE.offices.map((o) => ({
          "@type": "PostalAddress",
          addressLocality: o.location,
          addressCountry: "TZ",
        })),
        areaServed: [
          { "@type": "Place", name: "Zanzibar, Tanzania" },
          { "@type": "Place", name: "Paje" },
          { "@type": "Place", name: "Nungwi" },
          { "@type": "Place", name: "Stone Town" },
        ],
        sameAs: [
          "https://www.facebook.com/ZanzibabaCompanyLimited",
          "https://www.instagram.com/zanzibaragroup",
          "https://www.linkedin.com/company/zanzibaba-company-limited",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description:
          "Zanzibaba Real Estate — local property advisory for Zanzibar. Beachfront villas, development land, off-plan homes, and investment property for sale in Zanzibar.",
        publisher: { "@id": ORG_ID },
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
        datePublished: "2024-01-01T00:00:00+03:00",
        dateModified: new Date().toISOString(),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "h2", ".faq-answer"],
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

export function FaqJsonLd({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function PropertyJsonLd({
  listing,
  url,
}: {
  listing: {
    title: string;
    description: string;
    price: number;
    currency: string;
    location: string;
    propertyType: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    images: string[];
    refCode?: string;
    id: string;
  };
  url: string;
}) {
  const refCode = listing.refCode ?? `ZRE-${listing.id.slice(-6).toUpperCase()}`;
  const title = listing.title;
  const desc = listing.description?.slice(0, 500) || title;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: desc,
    url,
    sku: refCode,
    brand: {
      "@type": "Organization",
      name: SITE.name,
    },
    seller: {
      "@id": `${SITE.url}/#organization`,
    },
    category: listing.propertyType,
    additionalProperty: [],
  };

  if (listing.images?.length > 0) {
    jsonLd.image = listing.images;
  }

  if (listing.price > 0) {
    jsonLd.offers = {
      "@type": "Offer",
      priceCurrency: listing.currency || "USD",
      price: listing.price,
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE.url}/#organization` },
      url,
    };
  }

  const props = jsonLd.additionalProperty as { "@type": string; name: string; value: string | number }[];
  if (listing.bedrooms) props.push({ "@type": "PropertyValue", name: "Bedrooms", value: listing.bedrooms });
  if (listing.bathrooms) props.push({ "@type": "PropertyValue", name: "Bathrooms", value: listing.bathrooms });
  if (listing.area) props.push({ "@type": "PropertyValue", name: "Area", value: listing.area });
  props.push({ "@type": "PropertyValue", name: "Location", value: listing.location });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
