"use client";

import { useState } from "react";
import { FUNNEL_SMART_MATCH } from "@/data/funnel";
import { SITE } from "@/data/site";

const optionClass =
  "rounded-sm border border-zb-border bg-white px-4 py-3 text-sm font-medium text-zb-navy transition hover:border-zb-gold hover:bg-zb-gold/5 cursor-pointer select-none";

const optionActiveClass =
  "rounded-sm border border-zb-gold bg-zb-gold/10 px-4 py-3 text-sm font-medium text-zb-navy-deep cursor-pointer select-none";

const inputClass =
  "w-full rounded-sm border border-zb-border/80 bg-white px-4 py-3 text-sm text-zb-navy placeholder:text-zb-muted/60 transition focus:border-zb-gold focus:outline-none focus:ring-1 focus:ring-zb-gold/30";

export function SmartMatch() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const steps = FUNNEL_SMART_MATCH.steps;
  const currentStep = steps[step];
  const isLastStep = step === steps.length;
  const allAnswered = steps.every((s) => answers[s.id]);

  function selectOption(option: string) {
    if (!currentStep) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id]: option }));
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        setStep(steps.length);
      }
    }, 300);
  }

  function buildWhatsAppMessage() {
    const parts = steps.map((s) => `${s.label}: ${answers[s.id] || "Not specified"}`);
    return `Hello Zanzibaba, I've completed the property matcher.\n\n${parts.join("\n")}\n\nName: ${name}\nWhatsApp: ${whatsapp}${email ? `\nEmail: ${email}` : ""}`;
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
          phone: whatsapp,
          email,
          source: "smart_match",
          qualification: answers,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
      window.open(whatsappUrl, "_blank");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <section className="section-py-sm lg:section-py bg-zb-navy-deep" id="smart-match">
        <div className="container-portal">
          <div className="mx-auto max-w-xl rounded-sm border border-zb-gold/30 bg-white/5 p-10 text-center backdrop-blur-sm">
            <p className="font-serif text-2xl text-zb-gold">Thank you</p>
            <p className="mt-3 text-sm text-white/70">
              Your requirements have been sent. Our team will be in touch shortly with matching opportunities.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-py-sm lg:section-py bg-zb-navy-deep" id="smart-match">
      <div className="container-portal">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-zb-gold">{FUNNEL_SMART_MATCH.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {FUNNEL_SMART_MATCH.title}
          </h2>
          <p className="mt-4 text-sm text-white/65 sm:text-base">
            {FUNNEL_SMART_MATCH.subtitle}
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-2xl">
          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full transition ${
                    i < step || (i === step && answers[s.id])
                      ? "bg-zb-gold"
                      : i === step
                        ? "bg-zb-gold/50"
                        : "bg-white/20"
                  }`}
                />
                {i < steps.length - 1 && (
                  <div className={`h-px w-6 ${i < step ? "bg-zb-gold" : "bg-white/10"}`} />
                )}
              </div>
            ))}
          </div>

          {isLastStep ? (
            /* Contact form after completing steps */
            <div className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-6 text-center text-sm text-white/80">
                {FUNNEL_SMART_MATCH.matchText}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="sm-name">Name</label>
                  <input
                    id="sm-name"
                    required
                    placeholder={FUNNEL_SMART_MATCH.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="sm-whatsapp">WhatsApp</label>
                  <input
                    id="sm-whatsapp"
                    required
                    placeholder={FUNNEL_SMART_MATCH.whatsappPlaceholder}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="sm-email">Email</label>
                  <input
                    id="sm-email"
                    type="email"
                    placeholder={FUNNEL_SMART_MATCH.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <p className="text-center text-xs text-red-400">
                    Something went wrong. Please WhatsApp us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !name || !whatsapp}
                  className="w-full rounded-sm bg-zb-gold py-3.5 text-sm font-bold uppercase tracking-wider text-zb-navy-deep transition hover:bg-[#d4ab55] disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : FUNNEL_SMART_MATCH.submitCta}
                </button>
                <p className="text-center text-[0.65rem] uppercase tracking-wider text-white/40">
                  {FUNNEL_SMART_MATCH.privacy}
                </p>
              </form>
            </div>
          ) : currentStep ? (
            /* Option selection step */
            <div className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
              <p className="mb-6 text-center text-sm font-medium text-white">
                {currentStep.label}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {currentStep.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => selectOption(option)}
                    className={answers[currentStep.id] === option ? optionActiveClass : optionClass}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="mt-6 text-xs text-white/50 hover:text-white/80"
                >
                  ← Back
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
