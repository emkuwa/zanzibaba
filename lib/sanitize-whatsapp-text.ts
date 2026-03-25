/**
 * Sanitize title/description that may contain WhatsApp paste artifacts:
 * - WhatsApp group invite links (chat.whatsapp.com/...)
 * - Leading "DD/MM/YYYY, HH:MM am/pm - Sender name:" lines
 */

const WHATSAPP_INVITE_REGEX =
  /https?:\/\/(?:www\.)?(?:chat\.)?whatsapp\.com\/[^\s\]\)]+/gi;

/** e.g. "05/03/2026, 11:01 pm - Dalali2 Kimu Said paje Kimu Jambiani:" */
const LEADING_TIMESTAMP_SENDER_REGEX =
  /^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*,\s*\d{1,2}\s*:\s*\d{2}\s*(?:am|pm|AM|PM)\s*-\s*[^:\n]+:\s*/i;

/**
 * For titles we collapse whitespace to a single line.
 * For descriptions pass keepNewlines: true to preserve paragraph breaks.
 */
export function sanitizeWhatsAppText(
  text: string,
  options?: { keepNewlines?: boolean }
): string {
  if (!text || typeof text !== "string") return "";
  let out = text.replace(WHATSAPP_INVITE_REGEX, "").trim();
  out = out.replace(LEADING_TIMESTAMP_SENDER_REGEX, "").trim();
  if (options?.keepNewlines) {
    out = out.replace(/\n{3,}/g, "\n\n").trim();
  } else {
    out = out.replace(/\s+/g, " ").trim();
  }
  return out;
}
