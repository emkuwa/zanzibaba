import Image from "next/image";
import Link from "next/link";
import { SITE, SUBDOMAINS } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/solutions", label: "Solutions" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-zb-border bg-zb-navy-deep text-white">
      <div className="container-portal py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/brand/logos/reverse-white-on-navy.svg"
              alt="Zanzibaba Group"
              width={220}
              height={48}
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Building today, empowering tomorrow — a diversified Zanzibar group
              delivering real estate, materials, construction, and digital
              excellence across Tanzania.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-zb-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {mainLinks.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-zb-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-zb-gold">
              Digital Estate
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href={SUBDOMAINS.materials} className="hover:text-zb-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  Building Materials
                </a>
              </li>
              <li>
                <a href={SUBDOMAINS.invest} className="hover:text-zb-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  Investment Portal
                </a>
              </li>
              <li>
                <a href={SUBDOMAINS.zanzicore} className="hover:text-zb-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  ZanziCore Operations
                </a>
              </li>
              <li>
                <a href={SUBDOMAINS.admin} className="hover:text-zb-gold transition-colors" target="_blank" rel="noopener noreferrer">
                  Admin Dashboard
                </a>
              </li>
              <li>
                <Link href="/listings" className="hover:text-zb-gold transition-colors">
                  Property Listings
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-zb-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-zb-gold transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-zb-gold transition-colors">
                  {SITE.phone}
                </a>
                <span className="text-white/50"> · </span>
                <span>{SITE.phoneLocal}</span>
              </li>
              {SITE.offices.map((o) => (
                <li key={o.name}>
                  <span className="font-medium text-white">{o.name}</span>
                  <br />
                  {o.location}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.legalName}. All rights reserved.</p>
          <p>Indicative metrics on this site are not audited financials.</p>
        </div>
      </div>
    </footer>
  );
}
