import { NextResponse } from "next/server";
import { SITE } from "@/data/site";

export const runtime = "nodejs";

const properties = [
  {
    name: "Beachfront Plot 50×100m – Paje",
    type: "Plot",
    location: "Paje, Zanzibar",
    price: "$85,000",
    description: "Prime beachfront plot in Paje, 50×100m, 5 minutes walk to the beach. Water and electricity available. Clear title, ready for development.",
    url: `${SITE.url}/properties/beachfront-plot-paje-50x100`,
  },
  {
    name: "Luxury Villa with Pool – Nungwi",
    type: "Villa",
    location: "Nungwi, Zanzibar",
    price: "$420,000",
    description: "Stunning 4-bedroom villa with private pool in Nungwi. Modern finish, sea view, fully furnished. Walking distance to Nungwi beach.",
    url: `${SITE.url}/properties/luxury-villa-nungwi`,
  },
  {
    name: "Residential Plot 30×40m – Kendwa",
    type: "Plot",
    location: "Kendwa, Zanzibar",
    price: "$45,000",
    description: "Quiet residential plot in Kendwa, 30×40m. Water and electricity at the road. Safe area, suitable for family home or guesthouse.",
    url: `${SITE.url}/properties/residential-plot-kendwa-30x40`,
  },
];

export async function GET() {
  return NextResponse.json(
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${SITE.name} — Investment Properties`,
      description: "Curated Zanzibar investment properties — beachfront villas, off-plan developments, and luxury real estate for international investors.",
      url: SITE.url,
      numberOfItems: properties.length,
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "RealEstateListing",
          name: property.name,
          description: property.description,
          url: property.url,
          offering: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
            addressCountry: "TZ",
          },
        },
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Type": "application/json",
      },
    }
  );
}
