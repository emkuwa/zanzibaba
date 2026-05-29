import nodemailer from "nodemailer";
import { SITE } from "@/data/site";
import type { QualificationAnswers } from "@/lib/qualification";

function formatAnswers(answers: Record<string, string | undefined>): string {
  return Object.entries(answers)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

export async function sendInquiryEmail(payload: {
  name: string;
  email: string;
  phone: string;
  source: string;
  country?: string;
  qualification?: QualificationAnswers | Record<string, string | undefined>;
}): Promise<{ sent: boolean; reason?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEAD_EMAIL_TO ?? SITE.email;

  const qualLines =
    payload.qualification && typeof payload.qualification === "object"
      ? formatAnswers(payload.qualification as Record<string, string | undefined>)
      : "";

  const text = [
    `New lead — realestate.zanzibaba.com`,
    `Source: ${payload.source}`,
    ``,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.country ? `Country: ${payload.country}` : "",
    ``,
    qualLines ? `Qualification:\n${qualLines}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!host || !user || !pass) {
    console.info("[lead-email] SMTP not configured — lead saved only.\n", text);
    return { sent: false, reason: "smtp_not_configured" };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? `"Zanzibaba Real Estate" <${user}>`,
    to,
    replyTo: payload.email || undefined,
    subject: `[ZRE Lead] ${payload.name} — ${payload.source}`,
    text,
  });

  return { sent: true };
}
