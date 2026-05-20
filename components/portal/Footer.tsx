import Image from "next/image";
import Link from "next/link";
import { SITE, SUBDOMAINS } from "@/data/site";

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zanzibaba",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.127 0 2.062 2.062 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/zanzibaba",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${SITE.whatsapp}`,
    icon: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    ),
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/solutions", label: "Solutions" },
    { href: "/projects", label: "Projects" },
    { href: "/investments", label: "Investments" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-zb-navy-deep text-white">
      <div className="container-portal py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Image
              src="/brand/logos-v2/reverse-white-on-navy.png"
              alt="Zanzibaba Group"
              width={200}
              height={120}
              className="h-24 w-auto sm:h-28"
            />
            <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/70">
              Building today, empowering tomorrow — a diversified Zanzibar group
              delivering real estate, materials, construction, and digital
              excellence across Tanzania.
            </p>
            <div className="mt-8 flex gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-white/70 transition-all hover:border-zb-gold/50 hover:bg-zb-gold/10 hover:text-zb-gold"
                  aria-label={s.label}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-eyebrow">Company</h3>
            <ul className="mt-6 space-y-3 text-sm font-light text-white/80">
              {mainLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-zb-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-eyebrow">Digital Estate</h3>
            <ul className="mt-6 space-y-3 text-sm font-light text-white/80">
              <li>
                <a
                  href={SUBDOMAINS.materials}
                  className="transition-colors hover:text-zb-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Building Materials
                </a>
              </li>
              <li>
                <a
                  href={SUBDOMAINS.invest}
                  className="transition-colors hover:text-zb-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Investment Portal
                </a>
              </li>
              <li>
                <a
                  href={SUBDOMAINS.zanzicore}
                  className="transition-colors hover:text-zb-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ZanziCore Operations
                </a>
              </li>
              <li>
                <a
                  href={SUBDOMAINS.admin}
                  className="transition-colors hover:text-zb-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin Dashboard
                </a>
              </li>
              <li>
                <Link href="/listings" className="transition-colors hover:text-zb-gold">
                  Property Listings
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-eyebrow">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm font-light text-white/80">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-base text-white transition-colors hover:text-zb-gold"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="text-base text-white transition-colors hover:text-zb-gold"
                >
                  {SITE.phone}
                </a>
                <span className="block mt-1 text-white/50">{SITE.phoneLocal}</span>
              </li>
              {SITE.offices.map((o) => (
                <li key={o.name} className="pt-2">
                  <span className="font-medium text-white">{o.name}</span>
                  <br />
                  <span className="text-white/65">{o.location}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-10 text-xs font-light text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>Indicative metrics on this site are not audited financials.</p>
        </div>
      </div>
    </footer>
  );
}
