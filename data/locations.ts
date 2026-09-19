import { FUNNEL_IMAGES } from "@/data/funnel-images";

export interface LocationGuide {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  lifestyle: string;
  beach: string;
  propertyTypes: string[];
  infrastructure: string;
  whoItSuits: string[];
  nearbyAreas: { name: string; slug: string }[];
  image: string;
}

export const LOCATION_GUIDES: LocationGuide[] = [
  {
    slug: "paje",
    name: "Paje",
    tagline: "East coast lifestyle hub",
    description:
      "Paje is one of Zanzibar's most popular east coast destinations, known for its wide white-sand beach, turquoise water, and vibrant kite-surfing scene. The area has a mix of boutique hotels, beachfront villas, and a growing café culture that attracts both visitors and residents.",
    lifestyle:
      "A lively beach town with a relaxed atmosphere. Beach bars, restaurants, and a strong international community. Popular with kite-surfers, digital nomads, and holiday-makers.",
    beach:
      "Wide, flat white-sand beach with shallow turquoise water. Strong trade winds make it one of the best kite-surfing spots in East Africa.",
    propertyTypes: ["Beachfront villas", "Holiday homes", "Apartment developments", "Land plots"],
    infrastructure:
      "Good road access to Stone Town (about 1 hour). Shops, restaurants, dive centres, and accommodation options. Growing commercial area.",
    whoItSuits: ["Holiday home buyers", "Kite-surfing enthusiasts", "Short-term rental investors", "Digital nomads"],
    nearbyAreas: [
      { name: "Jambiani", slug: "jambiani" },
      { name: "Bwejuu", slug: "bwejuu" },
      { name: "Michamvi", slug: "michamvi" },
    ],
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    slug: "jambiani",
    name: "Jambiani",
    tagline: "Authentic coastal village",
    description:
      "Jambiani is a quieter, more traditional coastal village on Zanzibar's east coast. With fewer tourists than Paje, it offers a more authentic island experience with beautiful beaches and a strong local community.",
    lifestyle:
      "Laid-back and traditional. Local fishing boats (dhows) line the beach, small restaurants serve fresh seafood, and the pace of life is slow.",
    beach:
      "Beautiful white-sand beach with coral rock formations. Less crowded than Paje, with a more natural, unspoiled feel.",
    propertyTypes: ["Beachfront villas", "Land plots", "Boutique hotel sites", "Holiday homes"],
    infrastructure:
      "About 1 hour from Stone Town. Basic shops and restaurants. Some boutique accommodation. Growing interest from developers.",
    whoItSuits: ["Lifestyle buyers", "Those seeking tranquility", "Boutique hotel developers", "Land investors"],
    nearbyAreas: [
      { name: "Paje", slug: "paje" },
      { name: "Bwejuu", slug: "bwejuu" },
      { name: "Kiwengwa", slug: "kiwengwa" },
    ],
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    slug: "bwejuu",
    name: "Bwejuu",
    tagline: "Quiet east coast",
    description:
      "Bwejuu is a peaceful village between Paje and Jambiani, offering a quieter alternative with the same beautiful east coast beach. The area is known for its traditional character and coconut palm-lined shore.",
    lifestyle:
      "Very quiet and traditional. A genuine fishing village feel with limited commercial development. Ideal for those seeking peace and authenticity.",
    beach:
      "Pristine white-sand beach with traditional dhow boats. One of the less-developed stretches of the east coast.",
    propertyTypes: ["Land plots", "Beachfront villas", "Holiday homes"],
    infrastructure:
      "Basic infrastructure. About 1 hour from Stone Town. Limited commercial facilities but accessible to Paje and Jambiani amenities.",
    whoItSuits: ["Privacy seekers", "Land investors", "Those wanting a quiet retreat"],
    nearbyAreas: [
      { name: "Paje", slug: "paje" },
      { name: "Jambiani", slug: "jambiani" },
      { name: "Michamvi", slug: "michamvi" },
    ],
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    slug: "michamvi",
    name: "Michamvi",
    tagline: "East coast tranquility",
    description:
      "Michamvi is a quiet area on the east coast, known for its beautiful beach and calm atmosphere. The area includes both beachfront and slightly elevated plots with ocean views.",
    lifestyle:
      "Very peaceful with minimal tourism development. A mix of local residents and a small expat community.",
    beach:
      "Beautiful beach with calm waters. Less wind exposure than Paje, making it suitable for swimming year-round.",
    propertyTypes: ["Land plots", "Beachfront villas", "Elevated homes"],
    infrastructure:
      "About 1–1.5 hours from Stone Town. Basic local shops. Growing interest from property developers.",
    whoItSuits: ["Those seeking peace and quiet", "Land banking", "Residential buyers"],
    nearbyAreas: [
      { name: "Paje", slug: "paje" },
      { name: "Bwejuu", slug: "bwejuu" },
      { name: "Matemwe", slug: "matemwe" },
    ],
    image: FUNNEL_IMAGES.beachSunset,
  },
  {
    slug: "matemwe",
    name: "Matemwe",
    tagline: "North-east luxury",
    description:
      "Matemwe is located on the north-east coast, close to Mnemba Island — one of Zanzibar's most exclusive private islands. The area is known for luxury villas and boutique resorts.",
    lifestyle:
      "Upscale and exclusive. Home to some of Zanzibar's most high-end resorts and private villas. Quiet with beautiful ocean views.",
    beach:
      "Long stretch of white-sand beach with views towards Mnemba Island. Calm, clear water ideal for snorkelling.",
    propertyTypes: ["Luxury villas", "Boutique resort sites", "Premium land plots"],
    infrastructure:
      "About 1.5 hours from Stone Town. Limited commercial facilities but proximity to luxury resorts provides amenities.",
    whoItSuits: ["Luxury buyers", "Resort developers", "Those seeking exclusivity"],
    nearbyAreas: [
      { name: "Nungwi", slug: "nungwi" },
      { name: "Kiwengwa", slug: "kiwengwa" },
      { name: "Michamvi", slug: "michamvi" },
    ],
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    slug: "kiwengwa",
    name: "Kiwengwa",
    tagline: "Resort corridor",
    description:
      "Kiwengwa is on the east coast, known for its resort belt and family-friendly beach. The area has a mix of international resorts, private villas, and holiday apartments.",
    lifestyle:
      "Resort-oriented with family-friendly amenities. Beach restaurants, water sports, and a mix of international visitors.",
    beach:
      "Good quality beach with resort-managed sections. Family-friendly with calmer waters.",
    propertyTypes: ["Holiday apartments", "Resort residences", "Villas", "Land plots"],
    infrastructure:
      "About 45 minutes from Stone Town. Resort facilities, restaurants, and shops available.",
    whoItSuits: ["Family holiday home buyers", "Resort residence investors", "Those wanting resort amenities"],
    nearbyAreas: [
      { name: "Matemwe", slug: "matemwe" },
      { name: "Paje", slug: "paje" },
      { name: "Stone Town", slug: "stone-town" },
    ],
    image: FUNNEL_IMAGES.coastalWide,
  },
  {
    slug: "nungwi",
    name: "Nungwi",
    tagline: "North coast luxury",
    description:
      "Nungwi is one of Zanzibar's most developed and popular beach destinations, located at the northern tip of the island. Known for its beautiful beach, nightlife, and luxury resorts.",
    lifestyle:
      "Vibrant and cosmopolitan. Beach bars, restaurants, boat trips, and a lively atmosphere. Popular with tourists and residents alike.",
    beach:
      "One of the best beaches in Zanzibar — wide, white sand with calm water. Sunset views on the western side.",
    propertyTypes: ["Luxury villas", "Beachfront homes", "Apartment developments", "Commercial properties"],
    infrastructure:
      "About 1 hour from Stone Town. Well-developed with restaurants, shops, dive centres, and full amenities.",
    whoItSuits: ["Luxury buyers", "Those wanting nightlife and amenities", "Commercial investors", "Holiday home buyers"],
    nearbyAreas: [
      { name: "Kendwa", slug: "kendwa" },
      { name: "Matemwe", slug: "matemwe" },
      { name: "Stone Town", slug: "stone-town" },
    ],
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    slug: "kendwa",
    name: "Kendwa",
    tagline: "North coast gem",
    description:
      "Kendwa is a quieter alternative to Nungwi on the north coast, known for its beautiful beach and relaxed atmosphere. The area has a mix of boutique resorts and private villas.",
    lifestyle:
      "Relaxed and less commercial than Nungwi. Beach bars, seafood restaurants, and a laid-back vibe.",
    beach:
      "Beautiful beach with calm water. Less crowded than Nungwi with a more natural feel.",
    propertyTypes: ["Villas", "Boutique resorts", "Holiday homes", "Land plots"],
    infrastructure:
      "About 1 hour from Stone Town. Basic amenities with access to Nungwi facilities.",
    whoItSuits: ["Those wanting north coast without Nungwi crowds", "Boutique resort developers", "Lifestyle buyers"],
    nearbyAreas: [
      { name: "Nungwi", slug: "nungwi" },
      { name: "Matemwe", slug: "matemwe" },
      { name: "Stone Town", slug: "stone-town" },
    ],
    image: FUNNEL_IMAGES.villaLuxury,
  },
  {
    slug: "stone-town",
    name: "Stone Town",
    tagline: "Heritage capital",
    description:
      "Stone Town is the historic heart of Zanzibar — a UNESCO World Heritage Site with winding alleys, historic buildings, and a rich cultural mix. Property here includes heritage homes, apartments, and commercial spaces.",
    lifestyle:
      "Culturally rich and historic. Markets, restaurants, cafés, and a vibrant arts scene. The commercial and cultural centre of Zanzibar.",
    beach:
      "No traditional beach within the town centre, but waterfront promenades and proximity to beaches on the island.",
    propertyTypes: ["Heritage buildings", "Apartments", "Commercial properties", "Boutique hotel sites"],
    infrastructure:
      "The most developed area in Zanzibar. Full amenities, international airport, banks, hospitals, and government offices.",
    whoItSuits: ["Cultural enthusiasts", "Commercial investors", "Boutique hotel developers", "Those wanting urban Zanzibar"],
    nearbyAreas: [
      { name: "Nungwi", slug: "nungwi" },
      { name: "Paje", slug: "paje" },
      { name: "Fumba", slug: "fumba" },
    ],
    image: FUNNEL_IMAGES.stoneTownHarbor,
  },
  {
    slug: "fumba",
    name: "Fumba",
    tagline: "Emerging south coast",
    description:
      "Fumba is a developing area on the south-west coast, known for its marina project and emerging residential developments. The area offers more affordable entry points with growth potential.",
    lifestyle:
      "Developing and emerging. The Fumba Promenade project is bringing new infrastructure and amenities to the area.",
    beach:
      "Coastal area with beach access. The marina development is creating a new waterfront destination.",
    propertyTypes: ["Off-plan developments", "Land plots", "Apartments", "Marina residences"],
    infrastructure:
      "About 45 minutes from Stone Town. Developing rapidly with new roads and the Fumba Promenade project.",
    whoItSuits: ["Early-stage investors", "Those seeking growth potential", "Budget-conscious buyers", "Off-plan buyers"],
    nearbyAreas: [
      { name: "Stone Town", slug: "stone-town" },
      { name: "Paje", slug: "paje" },
      { name: "Jambiani", slug: "jambiani" },
    ],
    image: FUNNEL_IMAGES.coastalWide,
  },
];

export function getLocationBySlug(slug: string): LocationGuide | undefined {
  return LOCATION_GUIDES.find((l) => l.slug === slug);
}
