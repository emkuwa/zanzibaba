import type { PropertyType } from "@/lib/types";
import { generateListingTitle } from "@/lib/generate-listing-title";

const PROPERTY_TYPES = ["plot", "land", "house", "villa", "apartment", "commercial"] as const;

export type ParsedWhatsAppListing = {
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  area: string;
  propertyType: PropertyType;
  features: string[];
  agentWhatsApp: string | null;
  agentCode: string | null;
};

function cleanLines(raw: string[]): string[] {
  const systemPatterns = [
    /^<media omitted>/i,
    /^<media omitted>$/i,
    /joined using a group link/i,
    /requested to join/i,
    /added .* to the group/i,
    /left$/i,
    /changed the subject/i,
    /changed this group's icon/i,
  ];
  return raw.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    return !systemPatterns.some((re) => re.test(trimmed));
  });
}

function extractAgent(text: string): { agentWhatsApp: string | null; agentCode: string | null } {
  const digits = text.replace(/[^\d+]/g, " ");
  const phoneMatch = digits.match(/(\+?255\s*\d[\d\s]{7,9}|0\s*\d[\d\s]{8,9})/);
  if (!phoneMatch) return { agentWhatsApp: null, agentCode: null };

  const normalized = phoneMatch[1].replace(/\D/g, "");
  if (normalized.length !== 10 && normalized.length !== 12) {
    return { agentWhatsApp: null, agentCode: null };
  }

  const e164 = normalized.startsWith("0") ? `255${normalized.slice(1)}` : normalized;

  let agentCode: string | null = null;
  if (e164 === "255787583193") agentCode = "KIM";
  if (e164 === "255682783876") agentCode = "SAID";

  return { agentWhatsApp: e164, agentCode };
}

export function parseWhatsAppFallback(text: string): ParsedWhatsAppListing {
  const t = text.trim();
  const rawLines = t.split(/\n+/).map((s) => s.trim());
  const lines = cleanLines(rawLines);
  const description = lines.join("\n").slice(0, 2000);
  let price = 0;
  let currency: "USD" | "TZS" = "USD";
  let location = "";
  let area = "";
  const features: string[] = [];

  const locations = [
    "Paje",
    "Nungwi",
    "Kendwa",
    "Stone Town",
    "Jambiani",
    "Bwejuu",
    "Matemwe",
    "Zanzibar",
    "Michamvi",
    "Kizimkazi",
    "Uroa",
    "Kiwengwa",
  ];

  // Price: prefer patterns with explicit currency to avoid dates like "15/12/2025"
  const currencyPattern =
    /(?:USD|usd|\$|tsh|TZS|tzs)\s*(\d+(?:\.\d+)?)\s*(k|K|m|M|million|Million)?/i;
  const wordPattern =
    /\b(price|rent|sale|selling)\b[^0-9]{0,10}(\d+(?:\.\d+)?)(\s*(k|K|m|M|million|Million))?/i;

  let priceMatch: RegExpMatchArray | null = t.match(currencyPattern);
  let numberIndex = priceMatch?.index ?? -1;

  if (!priceMatch) {
    const m2 = t.match(wordPattern);
    if (m2) {
      priceMatch = [m2[0], m2[2], m2[4]] as unknown as RegExpMatchArray;
      numberIndex = m2.index ?? -1;
    }
  }

  if (priceMatch) {
    let n = parseFloat(priceMatch[1]);
    const mult = (priceMatch[2] || "").toLowerCase();
    if (mult === "k") n *= 1000;
    else if (mult === "m" || mult === "million") n *= 1_000_000;
    // Ignore obviously tiny or date-like numbers
    if (n >= 100 || numberIndex > -1) {
      price = Math.round(n);
      if (/tsh|tzs|TZS/i.test(t)) currency = "TZS";
      else currency = "USD";
    }
  }

  for (const loc of locations) {
    if (new RegExp(loc, "i").test(t)) {
      location = loc;
      break;
    }
  }
  if (!location && lines.length > 1) location = lines[1].slice(0, 80);

  const areaMatch = t.match(/(\d+)\s*[x×*]\s*(\d+)\s*(m|meters?)?/i);
  if (areaMatch) area = `${areaMatch[1]}×${areaMatch[2]}m`;

  const featureWords = [
    "beach",
    "water",
    "electricity",
    "furnished",
    "pool",
    "sea view",
    "clear title",
    "road access",
    "near beach",
    "quiet",
    "garden",
  ];
  for (const w of featureWords) {
    if (new RegExp(w.replace(/\s+/g, "\\s*"), "i").test(t)) features.push(w);
  }

  let propertyType: PropertyType = "land";
  if (/\b(plot|ploti)\b/i.test(t)) propertyType = "plot";
  else if (/\b(villa|house|home|nyumba)\b/i.test(t)) propertyType = "villa";
  else if (/\b(apartment|flat)\b/i.test(t)) propertyType = "apartment";

  const agentInfo = extractAgent(t);
  const title =
    generateListingTitle(
      {
        text: t,
        location: location || "Zanzibar",
        propertyType,
        area,
        features,
      },
      { mode: "structured" }
    ).slice(0, 120) || "Property listing";

  return {
    title,
    description,
    price,
    currency,
    location: location || "Zanzibar",
    area,
    propertyType,
    features,
    agentWhatsApp: agentInfo.agentWhatsApp,
    agentCode: agentInfo.agentCode,
  };
}

