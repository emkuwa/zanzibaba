import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";
import { SOLUTIONS } from "@/data/solutions";

/** Proposed handles — verify before Meta apply (SOCIAL_REBRAND_REAL_ESTATE_2026.md) */
const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ZanzibabaCompanyLimited",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zanzibaragroup",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zanzibaba-company-limited",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/solutions", label: "Our Services" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/careers", label: "Careers" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-zb-navy-deep text-white">
      <div className="absolute inset-0 pattern-architectural opacity-30" aria-hidden />
      <div className="container-portal relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/brand/logos-v2/footer-logo.png"
              alt="Zanzibaba Group"
              width={494}
              height={400}
              unoptimized
              className="h-[7.5rem] w-auto max-w-[11rem] object-contain object-left sm:h-32 sm:max-w-[12rem]"
            />
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed tracking-wide text-white/75">
              Building today, empowering tomorrow — Zanzibaba Group delivers
              real estate, materials, construction, and digital excellence throughout
              Zanzibar.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-zb-gold/50 hover:bg-zb-gold/10 hover:text-zb-gold hover:shadow-zb-gold"
                  aria-label={s.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-eyebrow">Quick Links</h3>
            <ul className="mt-7 space-y-3.5 text-sm font-light text-white/80">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors duration-300 hover:text-zb-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow">Our Services</h3>
            <ul className="mt-7 space-y-3.5 text-sm font-light text-white/80">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="transition-colors duration-300 hover:text-zb-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <Link href="/solutions" className="text-zb-gold/90 transition-colors hover:text-zb-gold">
                  All group divisions →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-eyebrow">Contact</h3>
            <ul className="mt-7 space-y-5 text-sm font-light text-white/80">
              <li>
                <span className="text-[0.65rem] font-medium uppercase tracking-editorial text-zb-gold/80">
                  Phone
                </span>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-1 block text-base font-medium text-white transition-colors duration-300 hover:text-zb-gold"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <span className="text-[0.65rem] font-medium uppercase tracking-editorial text-zb-gold/80">
                  Email
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-1 block text-base font-medium text-white transition-colors duration-300 hover:text-zb-gold"
                >
                  {SITE.email}
                </a>
              </li>
              {SITE.offices.map((o) => (
                <li key={o.name}>
                  <span className="text-[0.65rem] font-medium uppercase tracking-editorial text-zb-gold/80">
                    {o.name}
                  </span>
                  <span className="mt-1 block text-white/75">{o.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10 text-xs font-light text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/about" className="transition-colors hover:text-zb-gold">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-zb-gold">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
