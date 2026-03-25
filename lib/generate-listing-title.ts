import type { PropertyType } from "@/lib/types";

type Input = {
  text: string;
  location?: string;
  propertyType?: PropertyType | string;
  area?: string;
  /** Optional feature labels to enrich structured titles */
  features?: string[];
};

export type TitleGenerationMode = "auto" | "structured";

function toTitleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function normalizeType(propertyType?: string): string {
  const t = (propertyType ?? "").toLowerCase().trim();
  if (!t) return "Property";
  if (t === "plot") return "Plot";
  if (t === "land") return "Land";
  if (t === "house") return "House";
  if (t === "villa") return "Villa";
  if (t === "apartment") return "Apartment";
  if (t === "commercial") return "Commercial Property";
  return toTitleCase(t);
}

/** Remove emoji / pictographs so marketing headlines parse cleanly. Keeps newlines so title and description stay separate. */
function stripEmojisAndDecor(s: string): string {
  try {
    return s
      .replace(/\p{Extended_Pictographic}/gu, "")
      .replace(/\uFE0F/g, "")
      .replace(/\u200D/g, "")
      .replace(/[ \t\f\v]+/g, " ")
      .replace(/\n[ \t]*\n[ \t]*\n+/g, "\n\n")
      .trim();
  } catch {
    return s.replace(/\s+/g, " ").trim();
  }
}

/**
 * When description is one long paragraph (few newlines), find "… FOR SALE …" span.
 * Only scans the first line / title block — never merges title + description into one string.
 */
function extractMarketingHeadlineFromFullText(fullText: string): string | null {
  const normalized = stripEmojisAndDecor(fullText);
  const firstBlock =
    normalized.split(/\n\n+/)[0]?.trim() ?? normalized;
  const headlineLine = firstBlock.split(/\n+/)[0]?.trim() ?? firstBlock;
  if (!headlineLine) return null;
  const idx = headlineLine.search(/\b(FOR SALE|FOR RENT|TO LET)\b/i);
  if (idx === -1) return null;
  const start = Math.max(0, idx - 85);
  const snippet = headlineLine
    .slice(start, idx + 55)
    .replace(/\s+/g, " ")
    .trim();
  if (snippet.length < 12) return null;
  if (looksLikeDimensionFormulaTitle(snippet)) return null;
  if (looksLikeProseDescription(snippet)) return null;
  return snippet.slice(0, 120);
}

/**
 * Prefer real marketing lines like "PRIME PLOT FOR SALE – JAMBIANI" from full paste text.
 */
function extractMarketingHeadline(fullText: string): string | null {
  const fromBlock = extractMarketingHeadlineFromFullText(fullText);
  if (fromBlock) return fromBlock;

  const cleaned = stripEmojisAndDecor(fullText);
  const lines = cleaned
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const skipLine = (line: string) => {
    const t = line.trim();
    if (t.length < 8) return true;
    if (/https?:\/\//i.test(t)) return true;
    if (/^\+?\d[\d\s\-()]{8,}$/.test(t.replace(/\s/g, ""))) return true;
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(t)) return true;
    if (/^(location|plot size|total|price|usd|tsh|tzs|ksh|whatsapp|call|broker|for viewing|ramadan|special offer)/i.test(t))
      return true;
    if (/^[\d\s,.×x]+$/i.test(t) && !/[a-z]{3,}/i.test(t)) return true;
    return false;
  };

  for (const line of lines) {
    if (skipLine(line)) continue;
    if (/\b(FOR SALE|FOR RENT|TO LET|LEASE|AVAILABLE|OFFER)\b/i.test(line) && line.length <= 120) {
      if (looksLikeProseDescription(line)) continue;
      return line.replace(/\s+/g, " ").trim();
    }
  }
  for (const line of lines) {
    if (skipLine(line)) continue;
    if (/\b(PRIME|PREMIUM|LUXURY|BEACHFRONT|WATERFRONT)\b/i.test(line) && line.length <= 120) {
      if (looksLikeProseDescription(line)) continue;
      return line.replace(/\s+/g, " ").trim();
    }
  }
  for (const line of lines) {
    if (skipLine(line)) continue;
    if (looksLikeDimensionFormulaTitle(line)) continue;
    if (looksLikeProseDescription(line)) continue;
    if (/\b(PLOT|LAND|VILLA|HOUSE|APARTMENT|PROPERTY)\b/i.test(line) && line.length >= 12 && line.length <= 120) {
      return line.replace(/\s+/g, " ").trim();
    }
  }
  for (const line of lines) {
    if (skipLine(line)) continue;
    if (looksLikeDimensionFormulaTitle(line)) continue;
    if (looksLikeProseDescription(line)) continue;
    if (line.length >= 12 && line.length <= 120) return line.replace(/\s+/g, " ").trim();
  }
  return null;
}

/**
 * Long pasted descriptions that mention "for sale" but read like body copy, not a headline
 * (e.g. "This prime plot for sale in Jambiani Shungi, located just 1.5 minutes walk…").
 */
export function looksLikeProseDescription(line: string): boolean {
  const t = line.trim();
  if (t.length < 40) return false;
  if (/^(This|A|The|We|Our|It)\s+(prime\s+)?(plot|land|house|villa|property|apartment|residential)\b/i.test(t)) {
    return true;
  }
  if (/\blocated (just |on the border of|in [A-Za-z]+ and )\b/i.test(t)) return true;
  if (/\bminutes?\s+walk from the beach\b/i.test(t)) return true;
  if (/\boffers a (size|very good location)\b/i.test(t)) return true;
  if (/\bIt (has|comes with) full documents\b/i.test(t)) return true;
  if (/\bsuitable for (modern|residential)\b/i.test(t)) return true;
  return false;
}

/** Auto-generated "50×50m Plot – Jambiani" style — skip when hunting for marketing headlines */
function looksLikeDimensionFormulaTitle(line: string): boolean {
  const t = line.trim();
  if (/\b(FOR SALE|FOR RENT|PRIME|PREMIUM|OFFER|SPECIAL|AVAILABLE)\b/i.test(t)) return false;
  if (/^\d+\s*[×x×*]\s*\d+/i.test(t) && /\b(plot|land|house|villa)\b/i.test(t)) return true;
  return false;
}

function locationAppearsInHeadline(headline: string, location: string): boolean {
  const h = headline.toLowerCase();
  for (const part of location
    .toLowerCase()
    .split(/[\s,]+/)
    .filter((p) => p.length >= 3)) {
    if (h.includes(part)) return true;
  }
  return false;
}

function firstUsefulLine(text: string): string {
  const stripped = stripEmojisAndDecor(text);
  const lines = stripped
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  for (const line of lines) {
    if (/https?:\/\//i.test(line)) continue;
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}\s*,/i.test(line)) continue;
    if (/^\+?\d[\d\s-]{8,}$/.test(line)) continue;
    if (looksLikeDimensionFormulaTitle(line)) continue;
    return line;
  }
  for (const line of lines) {
    if (/https?:\/\//i.test(line)) continue;
    if (/^\d{1,2}\/\d{1,2}\/\d{2,4}\s*,/i.test(line)) continue;
    if (/^\+?\d[\d\s-]{8,}$/.test(line)) continue;
    return line;
  }
  return lines[0] ?? "";
}

/** When text is `title\\n\\ndescription`, only scan the title block for auto mode — never the first line of the description. */
function firstUsefulLinePreferTitleBlock(text: string): string {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter(Boolean);
  for (const block of blocks) {
    const line = firstUsefulLine(block);
    if (!line) continue;
    if (line.length >= 8 && line.length <= 120 && !looksLikeProseDescription(line)) {
      return line;
    }
  }
  return firstUsefulLine(text);
}

function buildStructuredTitle(input: Input): string {
  const fromHeadline = extractMarketingHeadline(input.text);
  const loc = input.location?.trim();
  if (fromHeadline && !looksLikeProseDescription(fromHeadline)) {
    if (loc && !locationAppearsInHeadline(fromHeadline, loc)) {
      return `${fromHeadline} – ${toTitleCase(loc)}`.slice(0, 120);
    }
    return fromHeadline.slice(0, 120);
  }

  const typeText = normalizeType(input.propertyType);
  const area = input.area?.trim();
  const feat = input.features?.map((f) => f.trim()).filter(Boolean) ?? [];

  let core = typeText;
  if (area) {
    core = `${area} ${typeText}`;
  }
  if (loc) {
    core = `${core} – ${toTitleCase(loc)}`;
  } else {
    core = `${core} – Zanzibar`;
  }

  let out = core.replace(/\s+/g, " ").trim();
  if (out.length < 16 && feat[0]) {
    out = `${out} · ${feat[0]}`;
  }
  return out.slice(0, 120);
}

export function generateListingTitle(
  input: Input,
  options?: { mode?: TitleGenerationMode }
): string {
  if (options?.mode === "structured") {
    return buildStructuredTitle(input);
  }

  const headlineEarly = extractMarketingHeadline(input.text);
  if (
    headlineEarly &&
    headlineEarly.length >= 12 &&
    !looksLikeProseDescription(headlineEarly)
  ) {
    return headlineEarly.slice(0, 120);
  }

  const cleanLine = firstUsefulLinePreferTitleBlock(input.text)
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/(\+?255|0)\d[\d\s-]{7,}/g, "")
    .replace(/[|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // If the line already looks like a valid title, keep it (not auto dimension+plot+location only).
  if (
    cleanLine &&
    cleanLine.length >= 8 &&
    cleanLine.length <= 90 &&
    !/^(ok|hello|hi|this is my number|call me)$/i.test(cleanLine) &&
    !looksLikeDimensionFormulaTitle(cleanLine) &&
    !looksLikeProseDescription(cleanLine)
  ) {
    return cleanLine;
  }

  return buildStructuredTitle(input);
}
