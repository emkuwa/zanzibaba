"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/data/site";
import { Button } from "./Button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 border-b border-zb-border/60 bg-white/95 backdrop-blur-md">
      <div className="container-portal flex h-[4.25rem] items-center justify-between gap-4">
        <Link href="/" className="shrink-0" aria-label={`${SITE.name} home`}>
          <Image
            src="/brand/logos/navbar-compact.svg"
            alt="Zanzibaba Group"
            width={200}
            height={40}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((item) =>
            "children" in item ? (
              <div key={item.label} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-zb-ink hover:text-zb-navy"
                  aria-expanded={solutionsOpen}
                  aria-haspopup="true"
                  onClick={() => setSolutionsOpen((v) => !v)}
                  onMouseEnter={() => setSolutionsOpen(true)}
                >
                  {item.label}
                  <svg className="h-4 w-4 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute left-0 top-full min-w-[240px] pt-2 ${solutionsOpen ? "block" : "hidden"} group-hover:block`}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <ul className="rounded-sm border border-zb-border bg-white py-2 shadow-zb-md">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-zb-ink hover:bg-zb-surface hover:text-zb-navy"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-zb-navy"
                    : "text-zb-ink hover:text-zb-navy"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="text-sm font-medium text-zb-muted hover:text-zb-navy whitespace-nowrap"
          >
            {SITE.phone}
          </a>
          <Button href="/contact" variant="primary" size="sm">
            Get in Touch
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-zb-navy hover:bg-zb-surface"
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

      {open && (
        <div className="lg:hidden border-t border-zb-border bg-white">
          <nav className="container-portal flex flex-col gap-1 py-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) =>
              "children" in item ? (
                <div key={item.label} className="py-2">
                  <p className="px-2 text-xs font-semibold uppercase tracking-widest text-zb-muted">
                    {item.label}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block rounded-sm px-2 py-2 text-sm font-medium text-zb-ink hover:bg-zb-surface"
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
                  className="rounded-sm px-2 py-2.5 text-sm font-medium text-zb-ink hover:bg-zb-surface"
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="mt-2 px-2 py-2 text-sm font-medium text-zb-navy"
            >
              {SITE.phone}
            </a>
            <div className="mt-4 px-2">
              <Button href="/contact" variant="primary" className="w-full">
                Get in Touch
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
