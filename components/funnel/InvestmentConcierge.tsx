"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/data/site";

type Msg = { role: "bot" | "user"; text: string };

const WELCOME: Msg = {
  role: "bot",
  text: "Welcome — I'm your Zanzibar investment concierge. Are you looking to invest, buy, or rent luxury property?",
};

const REPLIES: Record<string, string> = {
  invest:
    "We advise international investors on villas, land, and hospitality assets. Use our qualification form or WhatsApp for a private consultation.",
  buy: "Browse verified listings or tell us your budget and preferred area — Paje, Nungwi, Stone Town, and more.",
  rent: "We match luxury vacation and long-term rentals for expats, nomads, and premium travellers.",
  default:
    "I can guide you on real estate, rentals, and areas across Zanzibar. Tap below to speak with our team on WhatsApp.",
};

export function InvestmentConcierge() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function reply(userText: string) {
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setTyping(true);
    const key = /invest/i.test(userText)
      ? "invest"
      : /buy|purchase|villa/i.test(userText)
        ? "buy"
        : /rent|stay|nomad|expat/i.test(userText)
          ? "rent"
          : "default";
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: REPLIES[key] }]);
      setTyping(false);
    }, 700);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-[5.75rem] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-zb-gold/40 bg-zb-navy-deep text-white shadow-zb-xl transition hover:scale-105 hover:border-zb-gold sm:bottom-6 sm:right-24"
        aria-label={open ? "Close concierge" : "Open Zanzibar AI concierge"}
      >
        <svg className="h-6 w-6 text-zb-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="fixed bottom-40 right-4 z-50 flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-sm border border-zb-border bg-white shadow-zb-xl sm:bottom-24 sm:right-24"
          >
            <header className="border-b border-zb-border bg-zb-navy-deep px-4 py-3 text-white">
              <p className="text-xs font-medium uppercase tracking-widest text-zb-gold">AI Concierge</p>
              <p className="font-serif text-lg">Zanzibar Investment Guide</p>
            </header>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[90%] rounded-sm px-3 py-2 text-sm ${
                    m.role === "bot"
                      ? "bg-zb-surface text-zb-navy"
                      : "ml-auto bg-zb-navy text-white"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="text-xs text-zb-muted animate-pulse">Concierge is typing…</div>
              )}
              <div ref={endRef} />
            </div>
            <div className="border-t border-zb-border p-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {["Invest", "Buy a villa", "Luxury rental"].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => reply(q)}
                    className="rounded-full border border-zb-border px-2.5 py-1 text-[0.65rem] font-medium text-zb-navy hover:border-zb-gold"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-sm bg-zb-gold py-2.5 text-center text-xs font-bold uppercase text-zb-navy-deep"
              >
                WhatsApp advisor
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
