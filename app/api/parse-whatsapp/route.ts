import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import { generateListingTitle, looksLikeProseDescription } from "@/lib/generate-listing-title";

const PROPERTY_TYPES = ["plot", "land", "house", "villa", "apartment", "commercial"] as const;

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
} {
  const t = text.trim();
  const lines = t.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  let description = t.slice(0, 500);
  let price = 0;
  let currency = "USD";
  let location = "";
  let area = "";
  const features: string[] = [];
  const locations = [
    "Paje", "Nungwi", "Kendwa", "Stone Town", "Jambiani", "Bwejuu", "Matemwe",
    "Zanzibar", "Michamvi", "Kizimkazi", "Uroa", "Nungwi Beach", "Kiwengwa"
  ];

  // Price: 80000, $50k, 50M TZS, USD 100000, tsh 80M
  const priceMatch = t.match(/(?:USD|usd|\$|tsh|TZS|tzs)?\s*(\d+(?:\.\d+)?)\s*(k|K|m|M|million|Million)?/i)
    ?? t.match(/(\d{2,})\s*(?:USD|usd|\$|tsh|TZS)/i);
  if (priceMatch) {
    let n = parseFloat(priceMatch[1]);
    const mult = (priceMatch[2] || "").toLowerCase();
    if (mult === "k") n *= 1000;
    else if (mult === "m" || mult === "million") n *= 1_000_000;
    price = Math.round(n);
    if (/tsh|tzs|TZS/i.test(t)) currency = "TZS";
    else currency = "USD";
  }

  for (const loc of locations) {
    if (new RegExp(loc, "i").test(t)) {
      location = loc;
      break;
    }
  }
  if (!location && lines.length > 1) location = lines[1].slice(0, 50);

  // Area: 50x100, 30×40m, 50*100
  const areaMatch = t.match(/(\d+)\s*[x×*]\s*(\d+)\s*(m|meters?)?/i);
  if (areaMatch) area = `${areaMatch[1]}×${areaMatch[2]}m`;

  // Features: beach, water, electricity, furnished, etc.
  const featureWords = [
    "beach", "water", "electricity", "furnished", "pool", "sea view",
    "clear title", "road access", "near beach", "quiet", "garden"
  ];
  for (const w of featureWords) {
    if (new RegExp(w.replace(/\s+/g, "\\s*"), "i").test(t)) features.push(w);
  }

  // Property type from keywords
  let propertyType = "land";
  if (/\b(plot|ploti)\b/i.test(t)) propertyType = "plot";
  else if (/\b(villa|house|home|nyumba)\b/i.test(t)) propertyType = "villa";
  else if (/\b(apartment|flat)\b/i.test(t)) propertyType = "apartment";

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

  return {
    title,
    description,
    originalDescription: t.slice(0, 12000),
    price,
    currency,
    location: location || "Zanzibar",
    area,
    propertyType,
    features: features.length ? features : [],
    agentWhatsApp: agentInfo.agentWhatsApp,
    agentCode: agentInfo.agentCode,
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
Return ONLY valid JSON with these keys: title (short), description (clean paragraph), price (number), currency (USD or TZS), location (place name in Zanzibar), area (e.g. "50×100m" or ""), propertyType (one of: plot, land, house, villa, apartment, commercial), features (array of strings, e.g. ["Water", "Electricity", "Near beach"]).
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
