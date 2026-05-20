"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "./Button";

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = (href: string) =>
    `relative whitespace-nowrap px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:bg-zb-gold after:transition-transform hover:text-zb-navy xl:px-3.5 xl:text-sm ${
      pathname === href
        ? "text-zb-navy after:scale-x-100"
        : "text-zb-ink after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-zb-border/80 bg-white/98 shadow-zb-sm backdrop-blur-lg"
          : "border-b border-zb-border/60 bg-white/98 backdrop-blur-md"
      }`}
    >
      <div className="container-portal">
        <div className="grid h-[5.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 sm:h-[6rem] lg:gap-8">
          <Link
            href="/"
            className="group shrink-0 transition-opacity hover:opacity-90"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/logos/primary-horizontal.svg"
              alt="Zanzibaba Group"
              width={320}
              height={64}
              className="h-12 w-auto sm:h-[3.25rem] md:h-14 lg:h-[3.75rem]"
              priority
            />
          </Link>

          <nav
            className="hidden justify-center lg:flex"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-0.5 xl:gap-1">
              {NAV_LINKS.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="group relative">
                    <button
                      type="button"
                      className="relative flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-medium tracking-wide text-zb-ink transition-colors hover:text-zb-navy after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-zb-gold after:transition-transform group-hover:after:scale-x-100 xl:px-3.5 xl:text-sm"
                      aria-expanded={solutionsOpen}
                      aria-haspopup="true"
                      onClick={() => setSolutionsOpen((v) => !v)}
                      onMouseEnter={() => setSolutionsOpen(true)}
                    >
                      {item.label}
                      <svg
                        className="h-3 w-3 opacity-60"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
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

          <div className="flex items-center justify-end gap-4 sm:gap-5 lg:gap-6">
            <a
              href={`tel:${SITE.phoneTel}`}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-medium text-zb-navy transition-colors hover:text-zb-gold lg:inline-flex"
            >
              <PhoneIcon className="h-4 w-4 shrink-0 text-zb-gold" />
              {SITE.phone}
            </a>
            <Button href="/contact" variant="navy" size="md" className="hidden sm:inline-flex">
              Get in Touch
              <span aria-hidden>→</span>
            </Button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-zb-navy transition-colors hover:bg-zb-surface lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-zb-border bg-white lg:hidden"
          >
            <nav className="container-portal flex flex-col gap-1 py-6" aria-label="Mobile navigation">
              {NAV_LINKS.map((item) =>
                "children" in item ? (
                  <div key={item.label} className="py-3">
                    <p className="px-3 text-eyebrow text-zb-muted">{item.label}</p>
                    <ul className="mt-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-sm px-3 py-3 text-base font-normal text-zb-ink transition-colors hover:bg-zb-surface"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-sm px-3 py-3.5 text-base font-medium text-zb-ink transition-colors hover:bg-zb-surface"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-4 flex items-center gap-2 px-3 py-3 text-base font-medium text-zb-navy"
              >
                <PhoneIcon className="h-5 w-5 text-zb-gold" />
                {SITE.phone}
              </a>
              <div className="mt-6 px-3">
                <Button href="/contact" variant="navy" className="w-full" size="lg">
                  Get in Touch
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
