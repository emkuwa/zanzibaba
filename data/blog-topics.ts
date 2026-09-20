import type { BlogCategory } from "@/lib/blog-types";

export interface BlogTopic {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  targetKeywords: string[];
  outline: string[];
  status: "pending" | "generated" | "published" | "skipped";
  scheduledFor?: string;
  generatedAt?: string;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // Buying Guide topics
  {
    id: "topic-001",
    title: "How to Verify Property Title in Zanzibar Before Buying",
    slug: "verify-property-title-zanzibar",
    category: "buying-guide",
    targetKeywords: ["verify property title Zanzibar", "title search Zanzibar", "land registry Zanzibar"],
    outline: ["Why title verification matters", "Steps to verify title", "Common title issues", "Cost of title search", "How Zanzibaba helps"],
    status: "pending",
  },
  {
    id: "topic-002",
    title: "Zanzibar Property Purchase Timeline: Week by Week",
    slug: "property-purchase-timeline-zanzibar",
    category: "buying-guide",
    targetKeywords: ["Zanzibar purchase timeline", "how long to buy property Zanzibar", "property buying process"],
    outline: ["Week 1-2: Enquiry and shortlisting", "Week 3-4: Viewing and negotiation", "Week 5-6: Legal and due diligence", "Week 7-8: Completion and registration"],
    status: "pending",
  },
  {
    id: "topic-003",
    title: "What to Know Before Buying a Beachfront Villa in Zanzibar",
    slug: "buying-beachfront-villa-zanzibar",
    category: "buying-guide",
    targetKeywords: ["beachfront villa Zanzibar", "buy villa Zanzibar", "beach property Zanzibar"],
    outline: ["Beach access rights", "Coastal erosion risks", "Construction quality", "Rental potential", "Price ranges by area"],
    status: "pending",
  },
  {
    id: "topic-004",
    title: "Zanzibar Property Viewing Guide: 20 Things to Check",
    slug: "property-viewing-guide-zanzibar",
    category: "buying-guide",
    targetKeywords: ["property viewing Zanzibar", "what to check property Zanzibar", "viewing checklist"],
    outline: ["Beach and water access", "Infrastructure checks", "Construction quality", "Legal items", "Red flags"],
    status: "pending",
  },
  {
    id: "topic-005",
    title: "Complete Guide to Building a House in Zanzibar",
    slug: "building-house-zanzibar-guide",
    category: "buying-guide",
    targetKeywords: ["build house Zanzibar", "construction Zanzibar", "building costs Zanzibar"],
    outline: ["Land purchase", "Architect selection", "Building permits", "Construction costs", "Timeline", "Common mistakes"],
    status: "pending",
  },

  // Market Insights topics
  {
    id: "topic-006",
    title: "Zanzibar Real Estate Market Report 2025: Trends and Analysis",
    slug: "zanzibar-real-estate-market-2025",
    category: "market-insights",
    targetKeywords: ["Zanzibar real estate market 2025", "Zanzibar property trends", "Zanzibar market analysis"],
    outline: ["Market overview", "Price trends by area", "Supply and demand", "Foreign buyer activity", "Outlook"],
    status: "pending",
  },
  {
    id: "topic-007",
    title: "Zanzibar Property Price Index: Which Areas Are Growing Fastest",
    slug: "zanzibar-property-price-index",
    category: "market-insights",
    targetKeywords: ["Zanzibar property prices", "price growth Zanzibar", "property value increase"],
    outline: ["Price index methodology", "Top growing areas", "Stable areas", "Emerging areas", "Investment timing"],
    status: "pending",
  },
  {
    id: "topic-008",
    title: "Off-Plan vs Completed Property in Zanzibar: Which Is Better Value",
    slug: "off-plan-vs-completed-zanzibar",
    category: "market-insights",
    targetKeywords: ["off-plan vs completed Zanzibar", "off-plan savings", "completed property Zanzibar"],
    outline: ["Price comparison", "Risk comparison", "Timeline comparison", "Quality comparison", "Recommendation by buyer type"],
    status: "pending",
  },

  // Location Guide topics
  {
    id: "topic-009",
    title: "Michamvi Zanzibar: The Hidden Gem of the East Coast",
    slug: "michamvi-zanzibar-guide",
    category: "location-guide",
    targetKeywords: ["Michamvi Zanzibar", "Michamvi property", "Michamvi area guide"],
    outline: ["Overview", "Beach and lifestyle", "Property prices", "Infrastructure", "Who it suits"],
    status: "pending",
  },
  {
    id: "topic-010",
    title: "Fumba Zanzibar: Emerging South Coast Investment Opportunity",
    slug: "fumba-zanzibar-investment",
    category: "location-guide",
    targetKeywords: ["Fumba Zanzibar", "Fumba property", "Fumba investment"],
    outline: ["Fumba Promenade project", "Price comparison", "Growth potential", "Infrastructure development", "Investment case"],
    status: "pending",
  },
  {
    id: "topic-011",
    title: "Kiwengwa Zanzibar: Resort Belt Property Guide",
    slug: "kiwengwa-zanzibar-property-guide",
    category: "location-guide",
    targetKeywords: ["Kiwengwa Zanzibar", "Kiwengwa property", "Kiwengwa area"],
    outline: ["Area overview", "Resort presence", "Property types", "Prices", "Rental potential"],
    status: "pending",
  },
  {
    id: "topic-012",
    title: "Matemwe Zanzibar: Luxury Living Near Mnemba Island",
    slug: "matemwe-zanzibar-luxury-guide",
    category: "location-guide",
    targetKeywords: ["Matemwe Zanzibar", "Matemwe luxury property", "Matemwa area guide"],
    outline: ["Exclusive positioning", "Mnemba proximity", "Luxury developments", "Price ranges", "Who it suits"],
    status: "pending",
  },
  {
    id: "topic-013",
    title: "Stone Town Property Guide: Heritage Buildings and Apartments",
    slug: "stone-town-property-guide",
    category: "location-guide",
    targetKeywords: ["Stone Town property", "Stone Town apartment", "Stone Town heritage"],
    outline: ["UNESCO heritage", "Property types", "Price ranges", "Rental potential", "Challenges"],
    status: "pending",
  },

  // Investment topics
  {
    id: "topic-014",
    title: "Zanzibar Airbnb Investment: Realistic Yields and Management",
    slug: "zanzibar-airbnb-investment-guide",
    category: "investment",
    targetKeywords: ["Zanzibar Airbnb", "Airbnb investment Zanzibar", "short-term rental Zanzibar"],
    outline: ["Market overview", "Yield analysis by area", "Management options", "Platform strategies", "Risks"],
    status: "pending",
  },
  {
    id: "topic-015",
    title: "Zanzibar Property Investment for Beginners: Where to Start",
    slug: "zanzibar-property-investment-beginners",
    category: "investment",
    targetKeywords: ["Zanzibar investment beginner", "first property Zanzibar", "start investing Zanzibar"],
    outline: ["Why Zanzibar", "Budget planning", "Area selection", "Due diligence checklist", "First steps"],
    status: "pending",
  },
  {
    id: "topic-016",
    title: "Capital Appreciation in Zanzibar: Which Areas Will Grow Most",
    slug: "zanzibar-capital-appreciation-areas",
    category: "investment",
    targetKeywords: ["Zanzibar capital appreciation", "property value growth", "investing Zanzibar areas"],
    outline: ["Growth drivers", "Top appreciation areas", "Emerging hotspots", "Timeline expectations", "Risk factors"],
    status: "pending",
  },
  {
    id: "topic-017",
    title: "Zanzibar Property Management: Options, Costs, and Tips",
    slug: "zanzibar-property-management-guide",
    category: "investment",
    targetKeywords: ["Zanzibar property management", "property management Zanzibar", "manage property Zanzibar"],
    outline: ["Management types", "Cost comparison", "Services included", "Finding managers", "Tips for remote owners"],
    status: "pending",
  },

  // Rental topics
  {
    id: "topic-018",
    title: "Long-Term Rental Market in Zanzibar: Expat and Local Demand",
    slug: "zanzibar-long-term-rental-guide",
    category: "rental",
    targetKeywords: ["Zanzibar long-term rental", "rent apartment Zanzibar", "expat rental Zanzibar"],
    outline: ["Market overview", "Rental prices by area", "Tenant demographics", "Lease terms", "Management"],
    status: "pending",
  },
  {
    id: "topic-019",
    title: "How to Set Up Your Zanzibar Property for Airbnb Success",
    slug: "zanzibar-airbnb-setup-guide",
    category: "rental",
    targetKeywords: ["Airbnb setup Zanzibar", "furnished rental Zanzibar", "Airbnb tips Zanzibar"],
    outline: ["Furniture and decor", "Photography tips", "Pricing strategy", "Guest communication", "Maintenance"],
    status: "pending",
  },

  // Legal topics
  {
    id: "topic-020",
    title: "Zanzibar Property Law Changes 2025: What Buyers Need to Know",
    slug: "zanzibar-property-law-changes-2025",
    category: "legal",
    targetKeywords: ["Zanzibar property law 2025", "property regulations Zanzibar", "legal changes Zanzibar"],
    outline: ["Recent regulatory changes", "Impact on foreign buyers", "Compliance requirements", "Legal resources"],
    status: "pending",
  },
  {
    id: "topic-021",
    title: "Zanzibar Property Taxes Explained: Complete Guide for 2025",
    slug: "zanzibar-property-taxes-2025",
    category: "legal",
    targetKeywords: ["Zanzibar property taxes", "tax on property Zanzibar", "transfer tax Zanzibar"],
    outline: ["Purchase taxes", "Ongoing taxes", "Rental income tax", "Tax planning tips", "Professional advice"],
    status: "pending",
  },
  {
    id: "topic-022",
    title: "Inheritance and Succession for Zanzibar Property Owners",
    slug: "zanzibar-property-inheritance",
    category: "legal",
    targetKeywords: ["Zanzibar property inheritance", "succession planning Zanzibar", "property after death"],
    outline: ["Inheritance laws", "Succession planning", "Company structures", "Will requirements", "Family considerations"],
    status: "pending",
  },

  // Lifestyle topics
  {
    id: "topic-023",
    title: "Zanzibar Expat Community: Where to Live and Socialize",
    slug: "zanzibar-expat-community-guide",
    category: "lifestyle",
    targetKeywords: ["Zanzibar expat community", "expat life Zanzibar", "where to live Zanzibar"],
    outline: ["Expat areas", "Social scene", "Networking", "Activities", "Community resources"],
    status: "pending",
  },
  {
    id: "topic-024",
    title: "Healthcare in Zanzibar: What Expats and Retirees Need to Know",
    slug: "zanzibar-healthcare-guide",
    category: "lifestyle",
    targetKeywords: ["Zanzibar healthcare", "hospitals Zanzibar", "medical care Zanzibar"],
    outline: ["Hospitals and clinics", "Insurance requirements", "Common health concerns", "Evacuation options", "Pharmacies"],
    status: "pending",
  },
  {
    id: "topic-025",
    title: "Cost of Living in Zanzibar 2025: Monthly Budget Breakdown",
    slug: "zanzibar-cost-of-living-2025",
    category: "lifestyle",
    targetKeywords: ["Zanzibar cost of living", "living costs Zanzibar", "monthly budget Zanzibar"],
    outline: ["Accommodation costs", "Food and dining", "Transport", "Utilities", "Entertainment", "Total budget"],
    status: "pending",
  },
  {
    id: "topic-026",
    title: "Best Restaurants and Cafes in Zanzibar: A Food Guide",
    slug: "zanzibar-restaurants-cafes-guide",
    category: "lifestyle",
    targetKeywords: ["Zanzibar restaurants", "Zanzibar food", "best cafes Zanzibar"],
    outline: ["Stone Town dining", "Beach restaurants", "Local cuisine", "International options", "Price ranges"],
    status: "pending",
  },
  {
    id: "topic-027",
    title: "Kite Surfing in Zanzibar: Best Spots and Beachfront Living",
    slug: "zanzibar-kitesurfing-beachfront",
    category: "lifestyle",
    targetKeywords: ["kite surfing Zanzibar", "Paje kite surfing", "beachfront kitesurfing"],
    outline: ["Best kite spots", "Season and conditions", "Schools and gear", "Beachfront property near spots", "Community"],
    status: "pending",
  },

  // Comparison topics
  {
    id: "topic-028",
    title: "Zanzibar vs Bali: Which Is Better for Property Investment",
    slug: "zanzibar-vs-bali-property",
    category: "market-insights",
    targetKeywords: ["Zanzibar vs Bali", "Bali vs Zanzibar investment", "which is better Zanzibar Bali"],
    outline: ["Price comparison", "Rental yields", "Lifestyle comparison", "Infrastructure", "Recommendation"],
    status: "pending",
  },
  {
    id: "topic-029",
    title: "Zanzibar vs Mainland Tanzania: Property Investment Comparison",
    slug: "zanzibar-vs-mainland-tanzania-property",
    category: "market-insights",
    targetKeywords: ["Zanzibar vs Dar es Salaam", "Tanzania property investment", "Zanzibar mainland comparison"],
    outline: ["Market differences", "Price comparison", "Rental yields", "Infrastructure", "Recommendation by goal"],
    status: "pending",
  },
  {
    id: "topic-030",
    title: "Zanzibar vs Kenya Coast: Beach Property Investment Comparison",
    slug: "zanzibar-vs-kenya-coast-property",
    category: "market-insights",
    targetKeywords: ["Zanzibar vs Kenya coast", "Diani vs Zanzibar", "Kenya Zanzibar property"],
    outline: ["Price comparison", "Rental yields", "Beach quality", "Infrastructure", "Investment potential"],
    status: "pending",
  },
];
