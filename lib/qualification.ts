export type LeadPath = "purchase" | "rental";

export const INTENT_OPTIONS = [
  { id: "investment", label: "Property Investment", path: "purchase" as const },
  { id: "holiday-home", label: "Buying a Holiday Home", path: "purchase" as const },
  { id: "luxury-rental", label: "Luxury Vacation Rental", path: "rental" as const },
  { id: "long-term-rental", label: "Long-Term Rental", path: "rental" as const },
  { id: "airbnb", label: "Airbnb Investment", path: "purchase" as const },
  { id: "retirement", label: "Retirement Living", path: "purchase" as const },
  { id: "commercial", label: "Commercial Opportunity", path: "purchase" as const },
] as const;

export const LOOKING_FOR_OPTIONS = [
  "Holiday Home",
  "Investment Property",
  "Off-Plan Property",
  "Beachfront Land",
  "Airbnb Investment",
  "Commercial Property",
  "Retirement Home",
] as const;

export const BUYING_FOR_OPTIONS = ["Investment", "Holiday Use", "Both"] as const;

export const PROPERTY_TYPE_OPTIONS = ["Villa", "Apartment", "Land", "Hotel", "Commercial"] as const;

export const AREA_OPTIONS = [
  "Paje",
  "Nungwi",
  "Jambiani",
  "Kiwengwa",
  "Matemwe",
  "Kendwa",
  "Stone Town",
  "Fumba",
] as const;

export const BUDGET_OPTIONS = [
  "Under $50k",
  "$50k–$150k",
  "$150k–$500k",
  "$500k+",
] as const;

export const PREFER_OPTIONS = ["Ready Property", "Off-Plan Opportunity", "Both"] as const;

export const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 3 months",
  "Within 6 months",
  "Researching only",
] as const;

export const RENTAL_TYPE_OPTIONS = [
  "Beachfront Villa",
  "Apartment",
  "Boutique Hotel",
  "Private House",
  "Luxury Penthouse",
] as const;

export const STAY_DURATION_OPTIONS = [
  "1–2 weeks",
  "1 month",
  "3 months",
  "6+ months",
] as const;

export const MONTHLY_BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$10,000",
  "$10,000+",
] as const;

export const LIFESTYLE_OPTIONS = [
  "Quiet beachfront",
  "Luxury resort atmosphere",
  "Digital nomad friendly",
  "Nightlife & restaurants",
  "Family friendly",
] as const;

export const PERSONALIZED_TIPS: Record<string, string> = {
  "Off-Plan Property":
    "Excellent choice — off-plan opportunities in Zanzibar often provide strong appreciation potential before completion.",
  "Airbnb Investment":
    "Strong pick — short-stay demand along the east and north coast supports well-managed Airbnb programmes.",
  "Luxury Vacation Rental":
    "We will match you with premium villas and concierge-ready stays across Unguja.",
  "Long-Term Rental":
    "Ideal for expats and remote workers — we advise on areas, connectivity, and monthly rental inventory.",
  "Property Investment":
    "Our team supports international investors with verified listings and structured acquisition guidance.",
};

export type QualificationAnswers = {
  intent: string;
  path: LeadPath;
  lookingFor?: string;
  buyingFor?: string;
  propertyType?: string;
  area?: string;
  budget?: string;
  prefer?: string;
  timeline?: string;
  rentalType?: string;
  stayDuration?: string;
  monthlyBudget?: string;
  lifestyle?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

export function getPathForIntent(intentId: string): LeadPath {
  const found = INTENT_OPTIONS.find((o) => o.id === intentId);
  return found?.path ?? "purchase";
}
