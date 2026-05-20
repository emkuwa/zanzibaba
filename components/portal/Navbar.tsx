"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MOBILE_NAV_LINKS, NAV_LINKS, SITE } from "@/data/site";
import { Button } from "./Button";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.72 1.012a12.042 12.042 0 01-5.516-5.516l1.012-.72c.363-.271.527-.733.417-1.173L6.963 4.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = (href: string) =>
    `relative whitespace-nowrap px-2.5 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-px after:origin-left after:bg-zb-gold after:transition-transform hover:text-zb-navy xl:px-3 xl:text-sm ${
      pathname === href
        ? "text-zb-navy after:scale-x-100"
        : "text-zb-ink after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-all duration-300 ${
        scrolled ? "border-zb-border/80 shadow-zb-sm" : "border-zb-border/60"
      }`}
    >
      <div className="container-portal">
        <div className="grid h-[5rem] grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-[6rem] sm:gap-4 lg:h-[6.5rem] lg:gap-6">
          <Link
            href="/"
            className="group shrink-0 transition-opacity hover:opacity-90"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/logos-v2/navbar-compact.png"
              alt="Zanzibaba Group"
              width={240}
              height={64}
              className="h-12 w-auto sm:h-14 lg:hidden"
              priority
            />
            <Image
              src="/brand/logos-v2/primary-horizontal.png"
              alt=""
              aria-hidden
              width={380}
              height={64}
              className="hidden h-16 w-auto xl:h-[4.5rem] lg:block"
              priority
            />
          </Link>

          <nav className="hidden justify-center lg:flex" aria-label="Main navigation">
            <ul className="flex items-center gap-0.5">
              {NAV_LINKS.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="group relative">
                    <button
                      type="button"
                      className="relative flex items-center gap-1 px-2.5 py-2 text-[0.8125rem] font-medium tracking-wide text-zb-ink transition-colors after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-zb-gold after:transition-transform hover:text-zb-navy group-hover:after:scale-x-100 xl:px-3 xl:text-sm"
                      aria-expanded={solutionsOpen}
                      aria-haspopup="true"
                      onClick={() => setSolutionsOpen((v) => !v)}
                      onMouseEnter={() => setSolutionsOpen(true)}
                    >
                      {item.label}
                      <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`absolute left-1/2 top-full min-w-[260px] -translate-x-1/2 pt-3 ${solutionsOpen ? "block" : "hidden"} group-hover:block`}
                      onMouseLeave={() => setSolutionsOpen(false)}
                    >
                      <ul className="rounded-sm border border-zb-border bg-white py-2 shadow-zb-lg">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-5 py-2.5 text-sm font-normal text-zb-ink transition-colors hover:bg-zb-surface hover:text-zb-navy"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className={navLinkClass(item.href)}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-5">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hidden items-center gap-2 text-sm font-medium text-zb-navy transition-colors hover:text-zb-gold lg:inline-flex"
            >
              <PhoneIcon className="h-5 w-5 text-zb-gold" />
              <span className="whitespace-nowrap">{SITE.phone}</span>
            </a>
            <Button
              href="/contact"
              variant="navy"
              size="md"
              className="hidden lg:inline-flex"
            >
              Get in Touch
              <span aria-hidden>→</span>
            </Button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-zb-gold transition-colors hover:bg-zb-gold/10 sm:h-11 sm:w-11 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[5rem] z-40 bg-zb-navy-deep lg:hidden sm:top-[6rem]"
          >
            <nav className="container-portal flex h-full flex-col overflow-y-auto py-8" aria-label="Mobile navigation">
              {MOBILE_NAV_LINKS.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-4 text-lg font-medium text-white transition-colors hover:text-zb-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Button href="/contact" variant="gold" className="w-full" size="lg">
                  Get in Touch
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
