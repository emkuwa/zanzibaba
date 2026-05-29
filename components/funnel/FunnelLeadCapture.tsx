"use client";

import { useState } from "react";
import {
  FUNNEL_LEAD,
  LEAD_BUDGET_OPTIONS,
  LEAD_INTEREST_OPTIONS,
  LEAD_TIMELINE_OPTIONS,
} from "@/data/funnel";
import { SITE } from "@/data/site";

const inputClass =
  "w-full rounded-sm border border-zb-border/80 bg-white px-4 py-3.5 text-sm text-zb-navy placeholder:text-zb-muted/70 transition focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30";

export function FunnelLeadCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [interest, setInterest] = useState("");
  const [timeline, setTimeline] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          country,
          source: "investor_lead_section",
          qualification: { budget, interest, timeline },
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section id="invest" className="relative overflow-hidden bg-zb-surface-warm py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 gradient-gold-shine" aria-hidden />
        <div className="container-portal relative z-10">
          <div className="mx-auto max-w-xl rounded-sm border border-zb-gold/30 bg-white p-10 text-center shadow-zb-xl">
            <p className="font-serif text-2xl text-zb-gold">Thank you</p>
            <p className="mt-3 text-sm text-zb-muted">
              Your consultation request is with our advisory team. We will contact you shortly.
            </p>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-primary mt-8 inline-flex"
            >
              Continue on WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="invest" className="relative overflow-hidden bg-zb-surface-warm py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 gradient-gold-shine" aria-hidden />
      <div className="container-portal relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow">{FUNNEL_LEAD.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-zb-navy sm:text-4xl">
            {FUNNEL_LEAD.title}
          </h2>
          <p className="mt-3 text-sm text-zb-muted sm:text-base">{FUNNEL_LEAD.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-luxury mx-auto mt-10 max-w-2xl rounded-sm border border-zb-border/60 p-6 shadow-zb-xl sm:p-8 lg:p-10"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="sr-only" htmlFor="lead-name">
                Full name
              </label>
              <input
                id="lead-name"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="lead-email">
                Email
              </label>
              <input
                id="lead-email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="lead-phone">
                WhatsApp
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                placeholder="WhatsApp (with country code)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="sr-only" htmlFor="lead-country">
                Country
              </label>
              <input
                id="lead-country"
                required
                placeholder="Country of residence"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="lead-budget">
                Budget range
              </label>
              <select
                id="lead-budget"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={inputClass}
              >
                <option value="">Budget range</option>
                {LEAD_BUDGET_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="sr-only" htmlFor="lead-interest">
                Investment interest
              </label>
              <select
                id="lead-interest"
                required
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className={inputClass}
              >
                <option value="">Investment interest</option>
                {LEAD_INTEREST_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="sr-only" htmlFor="lead-timeline">
                Timeline
              </label>
              <select
                id="lead-timeline"
                required
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={inputClass}
              >
                <option value="">Investment timeline</option>
                {LEAD_TIMELINE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {status === "error" && (
            <p className="mt-3 text-center text-xs text-red-600">
              Something went wrong. Please WhatsApp us directly.
            </p>
          )}

          <button type="submit" disabled={status === "loading"} className="btn-luxury-primary mt-6 w-full">
            {status === "loading" ? "Submitting…" : FUNNEL_LEAD.submit}
          </button>
          <p className="mt-3 text-center text-[0.65rem] uppercase tracking-wider text-zb-muted">
            {FUNNEL_LEAD.privacy}
          </p>
        </form>
      </div>
    </section>
  );
}
