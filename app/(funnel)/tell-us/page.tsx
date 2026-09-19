"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

const inputClass =
  "w-full rounded-sm border border-zb-border/80 bg-white px-4 py-3.5 text-sm text-zb-navy placeholder:text-zb-muted/70 transition focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30";

const LOCATIONS = [
  "Paje",
  "Jambiani",
  "Bwejuu",
  "Michamvi",
  "Matemwe",
  "Kiwengwa",
  "Nungwi",
  "Kendwa",
  "Stone Town",
  "Fumba",
  "No preference",
];

const PROPERTY_TYPES = [
  "Villa",
  "Beachfront Villa",
  "Land / Plot",
  "Apartment",
  "House",
  "Hotel / Resort",
  "Commercial",
  "Off-plan",
  "No preference",
];

const PURPOSES = [
  "Holiday Home",
  "Permanent Residence",
  "Rental Investment",
  "Land / Development",
  "Hotel / Hospitality",
  "Other",
];

const TIMELINES = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Researching",
];

const BUDGETS = [
  "Under $100,000",
  "$100,000 – $250,000",
  "$250,000 – $500,000",
  "$500,000 – $1,000,000",
  "$1,000,000+",
  "Prefer not to say",
];

export default function TellUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [budget, setBudget] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [purpose, setPurpose] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function toggleArrayItem(arr: string[], item: string, setter: (v: string[]) => void) {
    setter(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
  }

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
          source: "tell_us_form",
          qualification: {
            budget,
            locations: locations.join(", "),
            propertyTypes: propertyTypes.join(", "),
            purpose,
            timeline,
            message,
          },
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
      <section className="relative overflow-hidden bg-zb-surface-warm py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 gradient-gold-shine" aria-hidden />
        <div className="container-portal relative z-10">
          <div className="mx-auto max-w-xl rounded-sm border border-zb-gold/30 bg-white p-10 text-center shadow-zb-xl">
            <p className="font-serif text-2xl text-zb-gold">Thank you</p>
            <p className="mt-4 text-sm leading-relaxed text-zb-muted">
              Your requirements have been received. The Zanzibaba team will review your enquiry
              and suggest matching opportunities within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-primary inline-flex"
              >
                Continue on WhatsApp
              </a>
              <a href="/properties" className="btn-luxury-outline inline-flex">
                Browse Properties
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-zb-navy-deep pt-28 pb-12 sm:pt-32 sm:pb-16">
        <div className="container-portal">
          <p className="text-eyebrow text-zb-gold">Tell us what you need</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Find Properties That Match Your Requirements
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70 sm:text-base">
            Share your goals and our local team will suggest matching opportunities across Zanzibar.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zb-surface-warm py-14 sm:py-20 lg:py-24">
        <div className="absolute inset-0 gradient-gold-shine" aria-hidden />
        <div className="container-portal relative z-10">
          <form
            onSubmit={handleSubmit}
            className="glass-luxury mx-auto max-w-2xl rounded-sm border border-zb-border/60 p-6 shadow-zb-xl sm:p-8 lg:p-10"
          >
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Your Details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="tu-name">
                      Full name *
                    </label>
                    <input
                      id="tu-name"
                      required
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="tu-email">
                      Email *
                    </label>
                    <input
                      id="tu-email"
                      type="email"
                      required
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="tu-phone">
                      WhatsApp *
                    </label>
                    <input
                      id="tu-phone"
                      type="tel"
                      required
                      placeholder="With country code"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="tu-country">
                      Country of residence *
                    </label>
                    <input
                      id="tu-country"
                      required
                      placeholder="e.g. United Kingdom, UAE, USA"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-zb-border/50 pt-6">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">What You're Looking For</h2>
                <div className="mt-4 space-y-5">
                  <div>
                    <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted">
                      Budget range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select budget range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted">
                      Preferred locations (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {LOCATIONS.map((loc) => (
                        <button
                          key={loc}
                          type="button"
                          onClick={() => toggleArrayItem(locations, loc, setLocations)}
                          className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
                            locations.includes(loc)
                              ? "border-zb-gold bg-zb-gold/10 text-zb-gold"
                              : "border-zb-border text-zb-muted hover:border-zb-gold/50"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted">
                      Property type (select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleArrayItem(propertyTypes, t, setPropertyTypes)}
                          className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition ${
                            propertyTypes.includes(t)
                              ? "border-zb-gold bg-zb-gold/10 text-zb-gold"
                              : "border-zb-border text-zb-muted hover:border-zb-gold/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted">
                        Purpose
                      </label>
                      <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select purpose</option>
                        {PURPOSES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted">
                        Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select timeline</option>
                        {TIMELINES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[0.65rem] font-medium uppercase tracking-wider text-zb-muted" htmlFor="tu-message">
                      Additional details (optional)
                    </label>
                    <textarea
                      id="tu-message"
                      rows={4}
                      placeholder="Tell us anything else about what you're looking for..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            {status === "error" && (
              <p className="mt-4 text-center text-xs text-red-600">
                Something went wrong. Please try again or WhatsApp us directly.
              </p>
            )}

            <button type="submit" disabled={status === "loading"} className="btn-luxury-primary mt-8 w-full">
              {status === "loading" ? "Submitting…" : "Find Properties for Me"}
            </button>
            <p className="mt-3 text-center text-[0.65rem] uppercase tracking-wider text-zb-muted">
              Confidential enquiry · No obligation · Response within 24 hours
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
