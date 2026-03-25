import { NextRequest } from "next/server";
import { hasAgentSession } from "@/lib/auth";
import { createListing } from "@/lib/listings-store";
import type { PropertyType } from "@/lib/types";
import { parseWhatsAppFallback } from "@/lib/whatsapp-fallback";

type ChatMessage = {
  timestamp: string;
  sender: string;
  text: string;
};

// Support multiple WhatsApp export formats (Android/iOS, different locales):
// 11/03/2026, 19:21 - Name: Message
// 11/03/26, 19:21 - Name: Message
// 11/03/2026, 19:21 pm - Name: Message
// 11.03.2026, 19:21 - Name: Message
const MESSAGE_REGEX =
  /^(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}),?\s+(\d{1,2}:\d{2})(?:\s*[apAP][mM])?\s+[-–]\s+([^:]+):\s+(.+)$/;

function normalizeTimestamp(datePart: string, timePart: string): string {
  // Assume day-first (dd/mm/yyyy or dd.mm.yyyy)
  const sep = datePart.includes("/") ? "/" : datePart.includes(".") ? "." : "-";
  const [dStr, mStr, yStr] = datePart.split(sep);
  const day = Number(dStr);
  const month = Number(mStr) - 1;
  let year = Number(yStr);
  if (year < 100) year += 2000;
  const [hStr, minStr] = timePart.split(":");
  const hours = Number(hStr);
  const minutes = Number(minStr);
  const d = new Date(Date.UTC(year, month, day, hours, minutes));
  return d.toISOString();
}

function parseWhatsAppChat(text: string): ChatMessage[] {
  const lines = text.split(/\r?\n/);
  const messages: ChatMessage[] = [];
  let current: ChatMessage | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const m = line.match(MESSAGE_REGEX);
    if (m) {
      if (current) messages.push(current);
      const iso = normalizeTimestamp(m[1], m[2]);
      current = {
        timestamp: iso,
        sender: m[3].trim(),
        text: m[4].trim(),
      };
    } else if (current) {
      current.text += `\n${line}`;
    }
  }
  if (current) messages.push(current);
  return messages;
}

function looksLikeListing(text: string): boolean {
  const t = text.toLowerCase();
  if (!/[0-9]/.test(t)) return false;

  const hasPricePattern = /(?:usd|tsh|tzs|\$)\s*\d|(\d+\s*(k|m|million))/.test(t);
  const hasPropertyWord = /\b(plot|villa|house|apartment|flat|land|room|rent|sale|for rent|for sale)\b/.test(
    t
  );

  return hasPricePattern || hasPropertyWord;
}

export async function POST(request: NextRequest) {
  const isAgent = await hasAgentSession();
  if (!isAgent) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "file is required (.txt export)" }), {
      status: 400,
    });
  }

  const content = await file.text();
  let messages = parseWhatsAppChat(content);

  // Fallback: if regex parsing fails completely, treat big text blocks separated by blank lines as "messages"
  if (messages.length === 0) {
    const blocks = content
      .split(/\n{2,}/)
      .map((b) => b.trim())
      .filter((b) => b.length > 0);
    messages = blocks.map((b, idx) => ({
      timestamp: `block-${idx}`,
      sender: "Unknown",
      text: b,
    }));
  }

  const candidates = messages.filter((m) => looksLikeListing(m.text));

  const created: Array<{ id: string; title: string }> = [];

  for (const msg of candidates) {
    const fallback = parseWhatsAppFallback(msg.text);
    let parsed = fallback;

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
Return ONLY valid JSON with these keys: title (short), description (clean paragraph), price (number), currency (USD or TZS), location (place name in Zanzibar), area (e.g. "50×100m" or ""), propertyType (one of: plot, land, house, villa, apartment, commercial), features (array of strings, e.g. ["Water", "Electricity", "Near beach"]).`,
              },
              { role: "user", content: msg.text },
            ],
            temperature: 0.2,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const content = data?.choices?.[0]?.message?.content?.trim();
          if (content) {
            const parsedJson = JSON.parse(
              content.replace(/^```json?\s*|\s*```$/g, "")
            );
            parsed = {
              ...fallback,
              title:
                String(parsedJson.title ?? fallback.title).slice(0, 120) ||
                fallback.title,
              description:
                String(parsedJson.description ?? fallback.description).slice(
                  0,
                  2000
                ) || fallback.description,
              price: Number(parsedJson.price) || fallback.price,
              currency:
                parsedJson.currency === "TZS" || /tsh|tzs/i.test(msg.text)
                  ? "TZS"
                  : "USD",
              location:
                String(parsedJson.location ?? fallback.location).slice(0, 80) ||
                fallback.location,
              area:
                String(parsedJson.area ?? fallback.area).slice(0, 30) ||
                fallback.area,
              propertyType: fallback.propertyType,
              features: Array.isArray(parsedJson.features)
                ? parsedJson.features.map(String).slice(0, 20)
                : fallback.features,
              agentWhatsApp: fallback.agentWhatsApp,
              agentCode: fallback.agentCode,
            };
          }
        }
      } catch (e) {
        console.error("WhatsApp import OpenAI error", e);
      }
    }

    try {
      const listing = await createListing({
        title: parsed.title.slice(0, 120),
        description: parsed.description,
        price: parsed.price,
        currency: parsed.currency,
        location: parsed.location.slice(0, 80),
        area: parsed.area || undefined,
        propertyType: (parsed.propertyType as PropertyType) ?? "land",
        features: parsed.features,
        images: [],
        featured: false,
        draft: true,
        agentName: "Zanzibaba Real Estate",
        agentWhatsApp: parsed.agentWhatsApp ?? undefined,
        agentCode: parsed.agentCode ?? undefined,
        sourceTimestamp: msg.timestamp,
      });
      created.push({ id: listing.id, title: listing.title });
    } catch (e) {
      console.error("Failed to create listing from WhatsApp chat message", e);
    }
  }

  return Response.json({
    ok: true,
    totalMessages: messages.length,
    candidateMessages: candidates.length,
    createdDrafts: created.length,
    listings: created,
  });
}

