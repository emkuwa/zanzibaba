"use client";

import { useState } from "react";
import { FUNNEL_MID_CTA } from "@/data/funnel";

export function FunnelMidCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Newsletter", phone: "-", source: "mid_cta" }),
      });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("idle");
    }
  }

  return (
    <section className="relative overflow-hidden bg-zb-navy-deep py-14 sm:py-16 lg:py-20">
      <div className="absolute inset-0 pattern-architectural opacity-30" aria-hidden />
      <div className="container-portal relative z-10 text-center">
        <h2 className="font-serif text-2xl font-semibold uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
          {FUNNEL_MID_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/75 sm:text-base">{FUNNEL_MID_CTA.body}</p>
        {status === "done" ? (
          <p className="mt-8 text-zb-gold">You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 sm:rounded-r-none focus:border-zb-gold focus:outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-sm bg-zb-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-zb-navy-deep transition hover:bg-[#d4ab55] sm:rounded-l-none disabled:opacity-60"
            >
              {status === "loading" ? "…" : "Join now"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
