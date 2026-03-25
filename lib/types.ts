export type PropertyType = "plot" | "house" | "apartment" | "villa" | "land" | "commercial";

export type TransactionType = "sale" | "rent";
export type FurnishedLevel = "furnished" | "unfurnished" | "semi";

export interface Listing {
  id: string;
  slug: string;
  /** Unique reference code for this property (e.g. ZRE-000042) */
  refCode?: string;
  title: string;
  description: string;
  /** Full pasted text from WhatsApp / parse — shown in edit form so agents keep the original copy */
  originalDescription?: string;
  price: number;
  currency: string;
  location: string;
  area?: string;
  propertyType: PropertyType;
  /** Sale or rent */
  transactionType?: TransactionType;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: FurnishedLevel;
  ensuite?: boolean;
  fenced?: boolean;
  /** Land / plot size (m²) */
  landAreaSqm?: number;
  /** Title deed / survey / legal docs */
  hasDocuments?: boolean;
  features: string[];
  images: string[];
  /** Optional video URL (YouTube, Vimeo, or direct .mp4/.webm) */
  videoUrl?: string;
  featured?: boolean;
  draft?: boolean;
  createdAt: string;
  updatedAt?: string;
  /** Optional original timestamp from external source (e.g. WhatsApp chat) */
  sourceTimestamp?: string;
  agentName?: string;
  agentWhatsApp?: string;
  agentCode?: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  source: "public_whatsapp";
  listingId: string;
  /** Human-readable property reference (e.g. ZRE-000042) */
  listingRefCode?: string;
  listingTitle: string;
  listingLocation: string;
  agentName?: string;
  agentCode?: string;
  agentWhatsApp?: string;
}
