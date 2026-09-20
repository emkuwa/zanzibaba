"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, PRIMARY_CTA, SITE } from "@/data/site";

export function FunnelNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(!isHome);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mounted) return;
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, isHome]);

  const isLight = solid;
  const linkClass = (href: string) =>
    `text-xs font-medium tracking-wide transition-colors xl:text-sm ${
      pathname === href ? "text-zb-gold" : isLight ? "text-zb-ink hover:text-zb-navy" : "text-white/90 hover:text-zb-gold"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isLight
          ? "border-b border-zb-border/80 bg-white/95 shadow-zb-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-portal flex min-h-[4.25rem] items-center justify-between gap-4 py-3 lg:min-h-[4.75rem]">
        <Link href="/" className="shrink-0 leading-none" aria-label={`${SITE.name} home`}>
          <span
            className={`block font-serif text-2xl font-semibold tracking-wide ${
              isLight ? "text-zb-navy" : "text-white"
            }`}
          >
            Zanzibaba
          </span>
          <span className="block text-[0.6rem] font-medium uppercase tracking-[0.32em] text-zb-gold">
            Real Estate
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={PRIMARY_CTA.href}
            className={`hidden rounded-sm px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition sm:inline-flex ${
              isLight
                ? "bg-zb-navy text-white hover:bg-zb-navy-deep"
                : "bg-zb-gold text-zb-navy-deep hover:bg-[#d4ab55]"
            }`}
          >
            {PRIMARY_CTA.label}
          </Link>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center lg:hidden ${
              isLight ? "text-zb-navy" : "text-zb-gold"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-zb-navy-deep lg:hidden"
          >
            <nav className="container-portal flex flex-col py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/10 py-3 text-base font-medium text-white hover:text-zb-gold"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={PRIMARY_CTA.href}
                className="mt-4 inline-flex justify-center rounded-sm bg-zb-gold py-3.5 text-sm font-bold uppercase tracking-wider text-zb-navy-deep"
              >
                {PRIMARY_CTA.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
