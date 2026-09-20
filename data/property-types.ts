export interface PropertyTypeGuide {
  slug: string;
  name: string;
  pluralName: string;
  description: string;
  longDescription: string;
  priceRange: string;
  bestAreas: string[];
  keyFeatures: string[];
  whoItSuits: string[];
  faqs: { q: string; a: string }[];
}

export const PROPERTY_TYPE_GUIDES: PropertyTypeGuide[] = [
  {
    slug: "villas",
    name: "Villa",
    pluralName: "Villas",
    description: "Standalone residential properties with private gardens, often with pool and beach proximity.",
    longDescription:
      "Villas are the most sought-after property type in Zanzibar. They range from modest beachside homes to luxury beachfront estates with private pools, gardens, and direct beach access. Most modern villas in Zanzibar are built with tropical architecture — open-plan living, natural ventilation, and indoor-outdoor flow.",
    priceRange: "$200,000 – $2,000,000+",
    bestAreas: ["Paje", "Nungwi", "Kendwa", "Jambiani", "Matemwe"],
    keyFeatures: [
      "Private garden and outdoor space",
      "Often includes swimming pool",
      "Beach proximity or beachfront",
      "Tropical architectural design",
      "Staff quarters (in larger villas)",
      "Secure compound with walls",
    ],
    whoItSuits: ["Holiday home buyers", "Families", "Retirees", "Luxury lifestyle seekers"],
    faqs: [
      {
        q: "How much does a villa cost in Zanzibar?",
        a: "Villas in Zanzibar range from $200,000 for basic beachside properties to $2,000,000+ for luxury beachfront estates. The average mid-range villa in popular areas like Paje costs $400,000 to $800,000.",
      },
    ],
  },
  {
    slug: "land",
    name: "Land",
    pluralName: "Land Plots",
    description: "Vacant land plots for building custom properties or for investment and development.",
    longDescription:
      "Land purchases in Zanzibar offer the lowest entry points and allow buyers to build to their specifications. Plots range from small residential plots to large development sites. Due diligence is essential — title verification, zoning, access rights, and utility availability must be confirmed.",
    priceRange: "$20,000 – $400,000",
    bestAreas: ["Jambiani", "Bwejuu", "Michamvi", "Fumba", "Paje outskirts"],
    keyFeatures: [
      "Lowest entry price for property in Zanzibar",
      "Custom building opportunity",
      "Capital appreciation potential",
      "Various sizes available (eighth acre to multiple acres)",
      "Beach proximity varies by plot",
    ],
    whoItSuits: ["Budget buyers", "Developers", "Long-term investors", "Custom builders"],
    faqs: [
      {
        q: "How much does land cost in Zanzibar?",
        a: "Land in Zanzibar ranges from $20,000 in emerging areas like Fumba to $400,000+ for premium beachfront plots in Nungwi. Most residential plots in popular areas cost $30,000 to $150,000.",
      },
    ],
  },
  {
    slug: "apartments",
    name: "Apartment",
    pluralName: "Apartments",
    description: "Units in multi-story buildings, often in developments with shared amenities.",
    longDescription:
      "Apartments in Zanzibar are found in both modern developments and converted heritage buildings. They offer lower maintenance than villas and are popular with investors seeking rental income. Modern developments often include shared pools, security, and management services.",
    priceRange: "$60,000 – $400,000",
    bestAreas: ["Stone Town", "Paje", "Nungwi", "Kiwengwa"],
    keyFeatures: [
      "Lower maintenance than villas",
      "Shared amenities (pool, security)",
      "Often in managed developments",
      "Good for rental income",
      "Modern construction standards",
    ],
    whoItSuits: ["Investors", "Solo buyers", "Holiday home seekers", "Budget-conscious buyers"],
    faqs: [
      {
        q: "Are apartments a good investment in Zanzibar?",
        a: "Apartments in popular tourist areas can generate solid rental income through short-term lets. They offer lower entry prices and easier management than villas. Yields of 5-10% are common in well-located developments.",
      },
    ],
  },
  {
    slug: "off-plan",
    name: "Off-Plan",
    pluralName: "Off-Plan Properties",
    description: "Properties purchased during construction at a discount, with staged payment terms.",
    longDescription:
      "Off-plan purchases in Zanzibar involve buying during or before construction, typically at 10-25% below completed property prices. Payment is staged across construction milestones. This approach suits buyers who can wait 12-24 months for completion and want modern specifications at a lower price.",
    priceRange: "$150,000 – $1,500,000",
    bestAreas: ["Paje", "Nungwi", "Fumba", "Jambiani"],
    keyFeatures: [
      "10-25% below completed property prices",
      "Modern design and specifications",
      "Customization options during construction",
      "Staged payment terms",
      "New building with warranty",
    ],
    whoItSuits: ["Value-focused buyers", "Investors seeking capital appreciation", "Patient buyers"],
    faqs: [
      {
        q: "How much can I save buying off-plan in Zanzibar?",
        a: "Off-plan purchases typically cost 10-25% less than equivalent completed properties. On a $500,000 villa, this could mean savings of $50,000 to $125,000.",
      },
    ],
  },
  {
    slug: "beachfront",
    name: "Beachfront",
    pluralName: "Beachfront Properties",
    description: "Properties with direct beach access or beachfront positioning.",
    longDescription:
      "Beachfront properties in Zanzibar represent the premium tier of the market. These properties offer direct beach access, ocean views, and the strongest rental income potential. Beachfront positioning varies — some properties are literally on the sand while others are across a road or path.",
    priceRange: "$300,000 – $3,000,000+",
    bestAreas: ["Nungwi", "Paje", "Matemwe", "Kendwa", "Jambiani"],
    keyFeatures: [
      "Direct beach access",
      "Ocean views",
      "Strong rental income potential",
      "Premium positioning",
      "Capital appreciation potential",
    ],
    whoItSuits: ["Luxury buyers", "Investors seeking premium returns", "Lifestyle buyers"],
    faqs: [
      {
        q: "How much do beachfront properties cost in Zanzibar?",
        a: "Beachfront properties in Zanzibar range from $300,000 for properties in emerging areas to $3,000,000+ for luxury beachfront estates in premium locations like Nungwi.",
      },
    ],
  },
];
