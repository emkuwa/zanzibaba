"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

export function LeadCaptureForm({ className = "" }: { className?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, source: "hero_form" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("done");
      setName("");
      setEmail("");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        className={`rounded-sm border border-zb-gold/40 bg-zb-navy-deep/95 p-6 text-center text-white backdrop-blur-sm ${className}`}
      >
        <p className="font-serif text-lg text-zb-gold">Thank you</p>
        <p className="mt-2 text-sm text-white/80">
          Our advisory team will contact you shortly. You can also message us on WhatsApp.
        </p>
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          className="mt-4 inline-block text-sm font-medium text-zb-gold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-sm border border-zb-gold/35 bg-zb-navy-deep/90 p-5 shadow-zb-xl backdrop-blur-md sm:p-6 ${className}`}
    >
      <p className="text-center font-serif text-lg font-semibold text-white sm:text-xl">
        Request investor consultation
      </p>
      <p className="mt-1 text-center text-xs text-white/65">Exclusive offers · No obligation</p>
      <div className="mt-5 space-y-3">
        <input
          type="text"
          name="name"
          required
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-sm border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-zb-gold/60 focus:outline-none focus:ring-1 focus:ring-zb-gold/40"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-zb-gold/60 focus:outline-none focus:ring-1 focus:ring-zb-gold/40"
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone (with country code)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-sm border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/45 focus:border-zb-gold/60 focus:outline-none focus:ring-1 focus:ring-zb-gold/40"
        />
      </div>
      {status === "error" && (
        <p className="mt-2 text-center text-xs text-red-300">
          Something went wrong. Please try WhatsApp or call us directly.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-sm bg-zb-gold py-3.5 text-sm font-bold uppercase tracking-wider text-zb-navy-deep transition hover:bg-[#d4ab55] disabled:opacity-60"
      >
        {status === "loading" ? "Submitting…" : "Submit now"}
      </button>
    </form>
  );
}
