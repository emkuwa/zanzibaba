import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import { generateListingTitle, looksLikeProseDescription } from "@/lib/generate-listing-title";

const PROPERTY_TYPES = ["plot", "land", "house", "villa", "apartment", "commercial"] as const;

function extractPriceAndCurrency(t: string): { price: number; currency: string } {
  const usd = t.match(/USD\s*([\d][\d,]*(?:\.\d+)?)/i) ?? t.match(/\$\s*([\d][\d,]*(?:\.\d+)?)/);
  if (usd) {
    const n = parseFloat(usd[1].replace(/,/g, ""));
    if (Number.isFinite(n) && n >= 100) {
      return { price: Math.round(n), currency: "USD" };
    }
  }
  const tzs =
    t.match(/(?:Tsh|Tzs|TZS)\s*([\d][\d,]*(?:\.\d+)?)/i) ??
    t.match(/🇹🇿\s*Tsh\s*([\d][\d,]*)/i);
  if (tzs) {
    const n = parseFloat(tzs[1].replace(/,/g, ""));
    if (Number.isFinite(n) && n >= 10_000) {
      return { price: Math.round(n), currency: "TZS" };
    }
  }
  const withoutDims = t.replace(/\b\d+(?:\.\d+)?\s*[x×*]\s*\d+(?:\.\d+)?\s*m\b/gi, "");
  const loose =
    withoutDims.match(/(?:USD|usd|\$)\s*([\d][\d,]*)\s*(k|K|m|M|million)?/i) ??
    withoutDims.match(/(\d{3,})\s*(?:USD|usd|\$)/i);
  if (loose) {
    let n = parseFloat(String(loose[1]).replace(/,/g, ""));
    const mult = String(loose[2] ?? "").toLowerCase();
    if (mult === "k") n *= 1000;
    else if (mult === "m" || mult === "million") n *= 1_000_000;
    if (Number.isFinite(n) && n >= 100) {
      return { price: Math.round(n), currency: "USD" };
    }
  }
  return { price: 0, currency: "USD" };
}

function extractLandAreaSqm(t: string): number | undefined {
  const m =
    t.match(/(?:Total|Area)[:\s]*([\d][\d,]*)\s*(?:sqm|SQ\.?M|m²|m2)\b/i) ??
    t.match(/([\d][\d,]*)\s*(?:sqm|SQ\.?M|m²|m2)\b/i);
  if (!m) return undefined;
  const n = parseFloat(m[1].replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return undefined;
  return Math.round(n);
}

function extractTransactionType(t: string): "sale" | "rent" | undefined {
  if (/\bfor\s+rent\b|\bkodi\b|\brental\b/i.test(t)) return "rent";
  if (/\bfor\s+sale\b|\bsale\b|\bplot\s+for\s+sale\b/i.test(t)) return "sale";
  return undefined;
}

function extractLocationFromPaste(t: string): string {
  const line = t.match(/Location:\s*([^\n(]+)/i);
  if (line?.[1]) return line[1].trim().slice(0, 80);
  const locations = [
    "Paje", "Nungwi", "Kendwa", "Stone Town", "Jambiani", "Bwejuu", "Matemwe",
    "Zanzibar", "Michamvi", "Kizimkazi", "Uroa", "Makunduchi", "Kiwengwa",
  ];
  for (const loc of locations) {
    if (new RegExp(loc, "i").test(t)) return loc;
  }
  return "";
}

function extractAgent(text: string): { agentWhatsApp: string | null; agentCode: string | null } {
  // Keep digits and plus, replace everything else with space to separate numbers
  const digits = text.replace(/[^\d+]/g, " ");
  // Look for Tanzanian-style numbers: either +255XXXXXXXXX or 0XXXXXXXXX
  const phoneMatch = digits.match(/(\+?255\s*\d[\d\s]{7,9}|0\s*\d[\d\s]{8,9})/);
  if (!phoneMatch) return { agentWhatsApp: null, agentCode: null };

  const normalized = phoneMatch[1].replace(/\D/g, "");

  // Basic sanity check: reject obviously invalid short matches like "02"
  // Tanzanian mobile numbers should be 10 digits locally (0XXXXXXXXX)
  // or 12 digits in international format (255XXXXXXXXX)
  if (normalized.length !== 10 && normalized.length !== 12) {
    return { agentWhatsApp: null, agentCode: null };
  }

  // Normalize local 0-prefix to E.164-style (255XXXXXXXXX)
  const e164 = normalized.startsWith("0") ? `255${normalized.slice(1)}` : normalized;

  let agentCode: string | null = null;
  // Known agents
  if (e164 === "255787583193") agentCode = "KIM";
  if (e164 === "255682783876") agentCode = "SAID";

  return { agentWhatsApp: e164, agentCode };
}

function fallbackParse(text: string): {
  title: string;
  description: string;
  originalDescription: string;
  price: number;
  currency: string;
  location: string;
  area: string;
  propertyType: string;
  features: string[];
  agentWhatsApp: string | null;
  agentCode: string | null;
  transactionType?: "sale" | "rent";
  landAreaSqm?: number;
  hasDocuments?: boolean;
} {
  const t = text.trim();
  const { price, currency } = extractPriceAndCurrency(t);
  let location = extractLocationFromPaste(t);
  const landAreaSqm = extractLandAreaSqm(t);
  const transactionType = extractTransactionType(t);

  // Area: 50x100, 30×40m, 50*100 (plot dimensions — not the same as total sqm)
  const areaMatch = t.match(/(\d+(?:\.\d+)?)\s*[x×*]\s*(\d+(?:\.\d+)?)\s*(?:m|meters?|Meter)?/i);
  let area = "";
  if (areaMatch) area = `${areaMatch[1]}×${areaMatch[2]}m`;

  const features: string[] = [];
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
    "documents",
    "hotel",
    "airbnb",
    "resort",
  ];
  for (const w of featureWords) {
    if (new RegExp(w.replace(/\s+/g, "\\s*"), "i").test(t)) features.push(w);
  }
  if (/\bdocuments?\b/i.test(t) || /\bfull\s+documents?\b/i.test(t)) {
    if (!features.includes("documents")) features.push("documents");
  }

  let propertyType = "land";
  if (/\b(plot|ploti)\b/i.test(t)) propertyType = "plot";
  else if (/\b(villa|house|home|nyumba)\b/i.test(t)) propertyType = "villa";
  else if (/\b(apartment|flat)\b/i.test(t)) propertyType = "apartment";

  const hasDocuments =
    /\b(full\s+)?documents?\b/i.test(t) ||
    /\btitle\b/i.test(t) ||
    /\btransfer\b.*\blawyer\b/i.test(t);

  const agentInfo = extractAgent(t);

  const title = generateListingTitle(
    {
      text: t,
      location: location || "Zanzibar",
      propertyType,
      area,
      features,
    },
    { mode: "structured" }
  ).slice(0, 120);

  const description = [
    `${propertyType === "plot" ? "Plot" : "Property"} in ${location || "Zanzibar"}.`,
    area ? `Dimensions about ${area}.` : "",
    landAreaSqm ? `Total about ${landAreaSqm.toLocaleString()} m².` : "",
    price > 0 ? `Asking ${currency} ${price.toLocaleString()}.` : "",
    hasDocuments ? "Seller mentions title / government documents." : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    description: description.slice(0, 2000),
    originalDescription: t.slice(0, 12000),
    price,
    currency,
    location: location || "Zanzibar",
    area,
    propertyType,
    features: features.length ? features : [],
    agentWhatsApp: agentInfo.agentWhatsApp,
    agentCode: agentInfo.agentCode,
    transactionType,
    landAreaSqm,
    hasDocuments: hasDocuments || undefined,
  };
}

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }
  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  if (!text) {
    return new Response(JSON.stringify({ error: "text is required" }), { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a real estate assistant. Extract structured data from raw property descriptions (e.g. from WhatsApp).
Return ONLY valid JSON with these keys:
- title (short marketing headline, no emojis)
- description (one clean paragraph, no emojis)
- price (number) — use USD amount if both USD and TZS are listed, unless only TZS is given
- currency: "USD" or "TZS"
- location (short place name, e.g. "Jambiani")
- area (e.g. "50×50m" for plot dimensions, or "")
- landAreaSqm (number or null) — total land size in square metres if stated (e.g. 2500 from "2,500 SQM")
- propertyType (one of: plot, land, house, villa, apartment, commercial)
- transactionType: "sale" or "rent" or null
- hasDocuments (boolean) — true if title deed / government documents / survey mentioned
- features (array of strings, e.g. ["Electricity", "Near beach", "Road access"])
If a Tanzanian phone number appears (e.g. starting with 0 or +255), include it as agentWhatsApp (digits only, no spaces). Optionally include agentCode if you can infer a short code from the name, but it's not required.
No markdown, no explanation, only the JSON object.`,
            },
            {
              role: "user",
              content: text,
            },
          ],
          temperature: 0.2,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("OpenAI error:", err);
        return Response.json(fallbackParse(text));
      }
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content?.trim();
      if (content) {
        const parsed = JSON.parse(content.replace(/^```json?\s*|\s*```$/g, ""));
        const agentInfo = extractAgent(text);
        const featuresArr = Array.isArray(parsed.features)
          ? parsed.features.map(String).slice(0, 20)
          : [];
        const generatedTitle = generateListingTitle(
          {
            text,
            location: String(parsed.location ?? ""),
            propertyType: PROPERTY_TYPES.includes(parsed.propertyType) ? parsed.propertyType : "land",
            area: String(parsed.area ?? ""),
            features: featuresArr,
          },
          { mode: "structured" }
        );
        const llmTitle = String(parsed.title ?? "").trim();
        const badLlmTitle =
          /https?:\/\//i.test(llmTitle) ||
          llmTitle.length < 8 ||
          looksLikeProseDescription(llmTitle);
        const title = badLlmTitle ? generatedTitle : llmTitle;
        const tx =
          parsed.transactionType === "sale" || parsed.transactionType === "rent"
            ? parsed.transactionType
            : undefined;
        const landSq =
          typeof parsed.landAreaSqm === "number" && Number.isFinite(parsed.landAreaSqm)
            ? Math.round(parsed.landAreaSqm)
            : typeof parsed.landAreaSqm === "string"
              ? Math.round(parseFloat(String(parsed.landAreaSqm).replace(/,/g, "")))
              : undefined;
        const landAreaSqm =
          landSq != null && !Number.isNaN(landSq) && landSq > 0 ? landSq : undefined;
        const hasDocs =
          typeof parsed.hasDocuments === "boolean" ? parsed.hasDocuments : undefined;

        return Response.json({
          title: title.slice(0, 120),
          description: String(parsed.description ?? text).slice(0, 2000),
          originalDescription: text.slice(0, 12000),
          price: Number(parsed.price) || 0,
          currency: parsed.currency === "TZS" ? "TZS" : "USD",
          location: String(parsed.location ?? "").slice(0, 80),
          area: String(parsed.area ?? "").slice(0, 30),
          propertyType: PROPERTY_TYPES.includes(parsed.propertyType) ? parsed.propertyType : "land",
          features: Array.isArray(parsed.features) ? parsed.features.map(String).slice(0, 20) : [],
          transactionType: tx,
          landAreaSqm,
          hasDocuments: hasDocs,
          agentWhatsApp: agentInfo.agentWhatsApp ?? (parsed.agentWhatsApp ? String(parsed.agentWhatsApp).replace(/\D/g, "") : null),
          agentCode: agentInfo.agentCode ?? (parsed.agentCode ? String(parsed.agentCode) : null),
        });
      }
    } catch (e) {
      console.error("Parse error:", e);
    }
  }
  return Response.json(fallbackParse(text));
}
