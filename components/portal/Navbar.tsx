"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "./Button";

function SearchIcon({ className = "" }: { className?: string }) {
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
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const darkHero = isHome && !scrolled;

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
    `relative whitespace-nowrap px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:bg-zb-gold after:transition-transform hover:text-zb-navy xl:px-3.5 xl:text-sm ${
      pathname === href
        ? darkHero
          ? "text-white after:scale-x-100"
          : "text-zb-navy after:scale-x-100"
        : darkHero
          ? "text-white/85 after:scale-x-0 hover:text-white hover:after:scale-x-100"
          : "text-zb-ink after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        darkHero
          ? "border-b border-white/10 bg-zb-navy-deep/95 backdrop-blur-md"
          : scrolled
            ? "border-b border-zb-border/80 bg-white/98 shadow-zb-sm backdrop-blur-lg"
            : "border-b border-zb-border/60 bg-white/98 backdrop-blur-md"
      }`}
    >
      <div className="container-portal">
        <div className="grid h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-[5.5rem] sm:gap-4 lg:h-[6rem] lg:gap-8">
          <Link
            href="/"
            className="group shrink-0 transition-opacity hover:opacity-90"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src={
                darkHero
                  ? "/brand/logos-v2/reverse-white-on-navy.png"
                  : "/brand/logos-v2/primary-horizontal.png"
              }
              alt="Zanzibaba Group"
              width={320}
              height={64}
              className="h-10 w-auto sm:h-12 md:h-[3.25rem] lg:h-14"
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
                      className={`relative flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:scale-x-0 after:bg-zb-gold after:transition-transform group-hover:after:scale-x-100 xl:px-3.5 xl:text-sm ${
                        darkHero
                          ? "text-white/85 hover:text-white"
                          : "text-zb-ink hover:text-zb-navy"
                      }`}
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

          <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-5">
            <Link
              href="/solutions"
              className={`hidden h-10 w-10 items-center justify-center rounded-sm transition-colors lg:inline-flex ${
                darkHero
                  ? "text-white/90 hover:bg-white/10 hover:text-white"
                  : "text-zb-navy hover:bg-zb-surface"
              }`}
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </Link>
            <Button
              href="/contact"
              variant="navy"
              size="md"
              className={`hidden uppercase tracking-wider sm:inline-flex ${
                darkHero ? "" : ""
              }`}
            >
              Get in Touch
            </Button>
            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors sm:h-11 sm:w-11 lg:hidden ${
                darkHero
                  ? "text-white hover:bg-white/10"
                  : "text-zb-navy hover:bg-zb-surface"
              }`}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[4.5rem] z-40 bg-zb-navy-deep lg:hidden sm:top-[5.5rem]"
          >
            <nav
              className="container-portal flex h-full flex-col overflow-y-auto py-8"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((item, idx) =>
                "children" in item ? (
                  <div key={item.label} className="border-b border-white/10 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zb-gold">
                      {item.label}
                    </p>
                    <ul className="mt-3 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-sm py-3 text-lg font-medium text-white/90 transition-colors hover:text-zb-gold"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
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
                )
              )}
              <div className="mt-8">
                <Button href="/contact" variant="gold" className="w-full uppercase tracking-wider" size="lg">
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
