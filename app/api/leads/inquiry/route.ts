import { NextRequest, NextResponse } from "next/server";
import { createInvestorInquiry } from "@/lib/leads-store";
import { sendInquiryEmail } from "@/lib/send-inquiry-email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const country = String(body.country ?? "").trim();
    const source = String(body.source ?? "website").trim();
    const qualification =
      body.qualification && typeof body.qualification === "object"
        ? (body.qualification as Record<string, string>)
        : undefined;

    if (!email && !phone) {
      return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
    }

    await createInvestorInquiry({ name, email, phone, country, source, qualification });

    const emailResult = await sendInquiryEmail({
      name,
      email,
      phone,
      country,
      source,
      qualification,
    });

    return NextResponse.json({ ok: true, emailSent: emailResult.sent });
  } catch (e) {
    console.error("Investor inquiry failed", e);
    return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
  }
}
