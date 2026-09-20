export interface BuyerGuide {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  keyPoints: string[];
  propertyTypes: string[];
  areas: string[];
  budgetRange: string;
  cta: string;
  faqs: { q: string; a: string }[];
}

export const BUYER_GUIDES: BuyerGuide[] = [
  {
    slug: "uk-buyers",
    title: "Zanzibar Property for UK Buyers",
    subtitle: "British buyers purchasing property in Zanzibar",
    description:
      "UK buyers are among the most active international purchasers in Zanzibar. This guide covers ownership structures, tax implications, currency considerations, and the purchase process specifically for British citizens.",
    icon: "🇬🇧",
    keyPoints: [
      "UK citizens can purchase through leasehold structures",
      "No currency restrictions on USD or GBP transactions",
      "UK tax obligations on overseas property income",
      "Time zone difference of +3 hours (EAT vs GMT)",
      "Direct flights available via major airlines",
    ],
    propertyTypes: ["Beachfront villas", "Off-plan developments", "Holiday homes"],
    areas: ["Paje", "Nungwi", "Stone Town"],
    budgetRange: "$250,000 – $1,500,000",
    cta: "Speak with UK Buyer Advisor",
    faqs: [
      {
        q: "Can UK citizens buy property in Zanzibar?",
        a: "Yes, UK citizens can acquire property in Zanzibar through approved leasehold structures. The standard lease terms are 33, 66, or 99 years with renewal options.",
      },
      {
        q: "Do I need to visit Zanzibar to buy property?",
        a: "While not required, we recommend at least one viewing trip. Virtual tours and remote purchases with legal representation are possible.",
      },
    ],
  },
  {
    slug: "uae-buyers",
    title: "Zanzibar Property for UAE Buyers",
    subtitle: "Dubai and UAE-based buyers investing in Zanzibar",
    description:
      "UAE-based buyers are attracted to Zanzibar for lifestyle and investment diversification. This guide covers the purchase process, payment options, and lifestyle benefits for buyers from Dubai, Abu Dhabi, and other UAE emirates.",
    icon: "🇦🇪",
    keyPoints: [
      "No income tax in UAE simplifies pre-purchase planning",
      "USD transactions align with AED peg",
      "Growing direct flight connections",
      "Similar climate — tropical lifestyle",
      "Strong investment diversification opportunity",
    ],
    propertyTypes: ["Luxury villas", "Investment land", "Off-plan developments"],
    areas: ["Nungwi", "Matemwe", "Paje"],
    budgetRange: "$300,000 – $2,000,000+",
    cta: "Speak with UAE Buyer Advisor",
    faqs: [
      {
        q: "Is Zanzibar property a good investment for UAE buyers?",
        a: "Zanzibar offers lifestyle benefits and potential capital appreciation. Rental yields in popular areas can range from 6 to 12 percent annually when professionally managed.",
      },
    ],
  },
  {
    slug: "diaspora-buyers",
    title: "Zanzibar Property for Diaspora Buyers",
    subtitle: "Tanzanian and East African diaspora purchasing property",
    description:
      "Diaspora buyers from Tanzania, Kenya, Uganda, and the broader East African community have cultural connections to Zanzibar. This guide covers purchase options, inheritance considerations, and community-specific guidance.",
    icon: "🌍",
    keyPoints: [
      "Cultural familiarity with Zanzibar",
      "Potential for freehold through local citizenship",
      "Inheritance and succession planning",
      "Family home and retirement options",
      "Community networks and local knowledge",
    ],
    propertyTypes: ["Family homes", "Residential land", "Apartments", "Villas"],
    areas: ["Stone Town", "Paje", "Jambiani", "Fumba"],
    budgetRange: "$50,000 – $500,000",
    cta: "Speak with Diaspora Advisor",
    faqs: [
      {
        q: "Can Tanzanian diaspora buy freehold property in Zanzibar?",
        a: "Tanzanian citizens may have different ownership options than foreign nationals. The pathway depends on citizenship status and specific property type.",
      },
    ],
  },
  {
    slug: "retirees",
    title: "Zanzibar Property for Retirees",
    subtitle: "Retirement and relocation property in Zanzibar",
    description:
      "Zanzibar offers an affordable tropical retirement lifestyle. This guide covers cost of living, healthcare, visa requirements, and the best areas for retirees looking to relocate or purchase a holiday home.",
    icon: "🌴",
    keyPoints: [
      "Affordable cost of living compared to Western countries",
      "Warm tropical climate year-round",
      "Growing healthcare facilities",
      "Relaxed island lifestyle",
      "Large international retiree community",
    ],
    propertyTypes: ["Villas with gardens", "Apartments", "Single-story homes"],
    areas: ["Paje", "Jambiani", "Kendwa", "Stone Town"],
    budgetRange: "$100,000 – $600,000",
    cta: "Speak with Retirement Advisor",
    faqs: [
      {
        q: "Is Zanzibar good for retirement?",
        a: "Zanzibar offers affordable living, warm climate, and relaxed lifestyle. Healthcare is improving but limited for serious conditions. Many retirees split time between Zanzibar and their home country.",
      },
    ],
  },
  {
    slug: "investors",
    title: "Zanzibar Property for Investors",
    subtitle: "Rental income and capital appreciation strategies",
    description:
      "Investment property in Zanzibar can generate rental income and capital appreciation. This guide covers yield analysis, area selection, management options, and risk factors for investment-focused buyers.",
    icon: "📈",
    keyPoints: [
      "Rental yields of 6-12% in popular areas",
      "Capital appreciation potential in emerging areas",
      "Short-term and long-term rental options",
      "Professional management available",
      "Portfolio diversification opportunity",
    ],
    propertyTypes: ["Beachfront villas", "Off-plan developments", "Commercial property"],
    areas: ["Paje", "Nungwi", "Stone Town", "Kendwa"],
    budgetRange: "$150,000 – $2,000,000+",
    cta: "Speak with Investment Advisor",
    faqs: [
      {
        q: "What rental yields can I expect in Zanzibar?",
        a: "Rental yields vary by location, property type, and management quality. Popular areas like Paje and Nungwi can achieve 6-12% annually for short-term rentals when professionally managed.",
      },
    ],
  },
];
