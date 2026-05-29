"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  AREA_OPTIONS,
  BUDGET_OPTIONS,
  BUYING_FOR_OPTIONS,
  INTENT_OPTIONS,
  LIFESTYLE_OPTIONS,
  LOOKING_FOR_OPTIONS,
  MONTHLY_BUDGET_OPTIONS,
  PERSONALIZED_TIPS,
  PREFER_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  RENTAL_TYPE_OPTIONS,
  STAY_DURATION_OPTIONS,
  TIMELINE_OPTIONS,
  getPathForIntent,
  type LeadPath,
  type QualificationAnswers,
} from "@/lib/qualification";
import { SITE } from "@/data/site";

type StepKey =
  | "intent"
  | "lookingFor"
  | "buyingFor"
  | "propertyType"
  | "area"
  | "budget"
  | "prefer"
  | "timeline"
  | "rentalType"
  | "stayDuration"
  | "monthlyBudget"
  | "lifestyle"
  | "contact"
  | "success";

function OptionGrid({
  options,
  onSelect,
}: {
  options: readonly string[] | ReadonlyArray<{ readonly id: string; readonly label: string }>;
  onSelect: (value: string) => void;
}) {
  const items = options.map((o) =>
    typeof o === "string" ? { id: o, label: o } : o
  );
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(item.id)}
          className="rounded-sm border border-zb-border bg-white px-4 py-3 text-left text-sm font-medium text-zb-navy transition hover:border-zb-gold/50 hover:bg-zb-surface hover:shadow-zb-sm"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function QualificationFunnel() {
  const [step, setStep] = useState<StepKey>("intent");
  const [path, setPath] = useState<LeadPath>("purchase");
  const [tip, setTip] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Partial<QualificationAnswers>>({});

  const purchaseSteps: StepKey[] = [
    "intent",
    "lookingFor",
    "buyingFor",
    "propertyType",
    "area",
    "budget",
    "prefer",
    "timeline",
    "contact",
  ];
  const rentalSteps: StepKey[] = [
    "intent",
    "rentalType",
    "stayDuration",
    "monthlyBudget",
    "lifestyle",
    "contact",
  ];
  const activeSteps = path === "rental" ? rentalSteps : purchaseSteps;
  const stepIndex = activeSteps.indexOf(step);
  const progress = step === "success" ? 100 : Math.round(((stepIndex + 1) / activeSteps.length) * 100);

  const stepTitle = useMemo(() => {
    switch (step) {
      case "intent":
        return "What brings you to Zanzibar?";
      case "lookingFor":
        return "What are you looking for in Zanzibar?";
      case "buyingFor":
        return "Are you buying for?";
      case "propertyType":
        return "What type of property interests you?";
      case "area":
        return "Preferred area in Zanzibar?";
      case "budget":
        return "What is your estimated budget?";
      case "prefer":
        return "Would you prefer?";
      case "timeline":
        return "When are you planning to invest?";
      case "rentalType":
        return "What type of rental are you looking for?";
      case "stayDuration":
        return "How long will you stay?";
      case "monthlyBudget":
        return "What is your monthly budget?";
      case "lifestyle":
        return "Preferred lifestyle?";
      case "contact":
        return "Almost done — your details";
      case "success":
        return "Thank you";
      default:
        return "";
    }
  }, [step]);

  function goNext(next: StepKey, patch: Partial<QualificationAnswers>, message?: string) {
    setAnswers((a) => ({ ...a, ...patch }));
    setTip(message ?? null);
    setStep(next);
  }

  function handleIntent(id: string, label: string) {
    const p = getPathForIntent(id);
    setPath(p);
    const tipMsg =
      PERSONALIZED_TIPS[label] ??
      PERSONALIZED_TIPS[INTENT_OPTIONS.find((o) => o.id === id)?.label ?? ""] ??
      null;
    goNext(
      p === "rental" ? "rentalType" : "lookingFor",
      { intent: label, path: p },
      tipMsg ?? undefined
    );
  }

  async function submitContact(contact: {
    name: string;
    email: string;
    phone: string;
    country: string;
  }) {
    setSubmitting(true);
    const full: QualificationAnswers = {
      ...answers,
      ...contact,
      path,
      intent: answers.intent ?? "",
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      country: contact.country,
    };
    const qualification: Record<string, string> = {};
    for (const [k, v] of Object.entries(full)) {
      if (v != null && String(v).trim()) qualification[k] = String(v);
    }
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          country: contact.country,
          source: "qualification_funnel",
          qualification,
        }),
      });
      setStep("success");
    } catch {
      setTip("Could not submit — please WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="qualify" className="relative overflow-hidden bg-zb-surface-warm py-14 sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(200,155,60,0.08),transparent_55%)]" aria-hidden />
      <div className="container-portal relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow">Smart qualification</p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-zb-navy sm:text-3xl lg:text-4xl">
            Tell us what you&apos;re looking for
          </h2>
          <p className="mt-3 text-sm text-zb-muted sm:text-base">
            Invest, buy, or rent — we match international buyers and luxury renters with the right
            Zanzibar opportunities.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-sm border border-zb-border bg-white shadow-zb-xl">
          {step !== "success" && (
            <div className="border-b border-zb-border bg-zb-surface px-6 py-4">
              <div className="mb-2 flex justify-between text-xs font-medium text-zb-muted">
                <span>Step {stepIndex + 1} of {activeSteps.length}</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-zb-border">
                <motion.div
                  className="h-full bg-zb-gold"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-serif text-xl font-semibold text-zb-navy">{stepTitle}</h3>
                {tip && step !== "contact" && (
                  <p className="mt-3 rounded-sm border border-zb-gold/25 bg-zb-gold/5 px-4 py-3 text-sm text-zb-navy">
                    {tip}
                  </p>
                )}

                <div className="mt-6">
                  {step === "intent" && (
                    <OptionGrid options={INTENT_OPTIONS} onSelect={(id) => {
                      const label = INTENT_OPTIONS.find((o) => o.id === id)?.label ?? id;
                      handleIntent(id, label);
                    }} />
                  )}
                  {step === "lookingFor" && (
                    <OptionGrid
                      options={LOOKING_FOR_OPTIONS}
                      onSelect={(v) =>
                        goNext("buyingFor", { lookingFor: v }, PERSONALIZED_TIPS[v])
                      }
                    />
                  )}
                  {step === "buyingFor" && (
                    <OptionGrid
                      options={BUYING_FOR_OPTIONS}
                      onSelect={(v) => goNext("propertyType", { buyingFor: v })}
                    />
                  )}
                  {step === "propertyType" && (
                    <OptionGrid
                      options={PROPERTY_TYPE_OPTIONS}
                      onSelect={(v) => goNext("area", { propertyType: v })}
                    />
                  )}
                  {step === "area" && (
                    <OptionGrid options={AREA_OPTIONS} onSelect={(v) => goNext("budget", { area: v })} />
                  )}
                  {step === "budget" && (
                    <OptionGrid options={BUDGET_OPTIONS} onSelect={(v) => goNext("prefer", { budget: v })} />
                  )}
                  {step === "prefer" && (
                    <OptionGrid options={PREFER_OPTIONS} onSelect={(v) => goNext("timeline", { prefer: v })} />
                  )}
                  {step === "timeline" && (
                    <OptionGrid options={TIMELINE_OPTIONS} onSelect={(v) => goNext("contact", { timeline: v })} />
                  )}
                  {step === "rentalType" && (
                    <OptionGrid options={RENTAL_TYPE_OPTIONS} onSelect={(v) => goNext("stayDuration", { rentalType: v })} />
                  )}
                  {step === "stayDuration" && (
                    <OptionGrid options={STAY_DURATION_OPTIONS} onSelect={(v) => goNext("monthlyBudget", { stayDuration: v })} />
                  )}
                  {step === "monthlyBudget" && (
                    <OptionGrid options={MONTHLY_BUDGET_OPTIONS} onSelect={(v) => goNext("lifestyle", { monthlyBudget: v })} />
                  )}
                  {step === "lifestyle" && (
                    <OptionGrid options={LIFESTYLE_OPTIONS} onSelect={(v) => goNext("contact", { lifestyle: v })} />
                  )}
                  {step === "contact" && (
                    <ContactStep onSubmit={submitContact} loading={submitting} />
                  )}
                  {step === "success" && (
                    <SuccessStep />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactStep({
  onSubmit,
  loading,
}: {
  onSubmit: (c: { name: string; email: string; phone: string; country: string }) => void;
  loading: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, email, phone, country });
      }}
    >
      <input
        required
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-sm border border-zb-border px-4 py-3 text-sm focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
      />
      <input
        required
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-sm border border-zb-border px-4 py-3 text-sm focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
      />
      <input
        required
        type="tel"
        placeholder="WhatsApp / phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full rounded-sm border border-zb-border px-4 py-3 text-sm focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
      />
      <input
        required
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full rounded-sm border border-zb-border px-4 py-3 text-sm focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm bg-zb-navy py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-zb-navy-deep disabled:opacity-60"
      >
        {loading ? "Sending…" : "Submit & get matched"}
      </button>
    </form>
  );
}

function SuccessStep() {
  return (
    <div className="text-center py-4">
      <p className="font-serif text-2xl text-zb-gold">You&apos;re on our priority list</p>
      <p className="mt-3 text-sm text-zb-muted">
        Our advisory team will contact you shortly. Leads are sent to {SITE.email}.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex justify-center rounded-sm bg-zb-gold px-6 py-3 text-sm font-bold text-zb-navy-deep"
        >
          Continue on WhatsApp
        </a>
        <Link
          href="/properties"
          className="inline-flex justify-center rounded-sm border border-zb-navy px-6 py-3 text-sm font-semibold text-zb-navy"
        >
          Browse properties
        </Link>
      </div>
    </div>
  );
}
