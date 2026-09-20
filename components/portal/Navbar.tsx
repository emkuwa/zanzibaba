"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MOBILE_NAV_LINKS, NAV_LINKS, SITE } from "@/data/site";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
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
    `relative whitespace-nowrap px-3 py-1.5 text-[0.8125rem] font-medium tracking-wide transition-colors after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:origin-left after:rounded-full after:bg-zb-gold after:transition-transform hover:text-zb-navy ${
      pathname === href
        ? "text-zb-navy after:scale-x-100"
        : "text-zb-ink/80 after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-zb-border/60 shadow-zb-sm" : "border-zb-border/30"
      }`}
    >
      <div className="container-portal">
        <div className="grid min-h-[4rem] grid-cols-[auto_1fr_auto] items-center gap-3 py-2 sm:min-h-[4.5rem] lg:min-h-[5rem]">
          <Link
            href="/"
            className="group shrink-0 transition-opacity hover:opacity-90"
            aria-label={`${SITE.name} home`}
          >
            <Image
              src="/brand/logos-v2/navbar-logo.png"
              alt={SITE.name}
              width={590}
              height={208}
              unoptimized
              className="h-10 w-auto max-w-[10rem] object-contain object-left sm:h-11 sm:max-w-[11rem] lg:hidden"
              priority
            />
            <Image
              src="/brand/logos-v2/navbar-logo.png"
              alt=""
              aria-hidden
              width={590}
              height={208}
              unoptimized
              className="hidden h-11 w-auto max-w-[12rem] object-contain object-left lg:block xl:h-[2.75rem] xl:max-w-[13rem]"
              priority
            />
          </Link>

          <nav className="hidden justify-center lg:flex" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={navLinkClass(item.href)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-sm bg-[#25D366]/10 px-3 py-2 text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/20 xl:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">Speak to Advisor</span>
            </a>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20b858] lg:px-5"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-zb-navy transition-colors hover:bg-zb-navy/5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16M4 18h16" />
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
            className="fixed inset-0 top-[4rem] z-40 bg-white sm:top-[4.5rem] lg:hidden"
          >
            <nav className="container-portal flex h-full flex-col overflow-y-auto py-6" aria-label="Mobile navigation">
              {MOBILE_NAV_LINKS.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-zb-border/50 py-4 text-lg font-medium text-zb-navy transition-colors hover:text-zb-gold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 space-y-3">
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] py-3.5 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp an Advisor
                </a>
                <Link
                  href="/tell-us"
                  className="flex items-center justify-center rounded-sm border border-zb-navy py-3.5 text-sm font-semibold text-zb-navy"
                >
                  Smart Property Match
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
