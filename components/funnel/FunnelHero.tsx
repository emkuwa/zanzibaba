import Image from "next/image";
import Link from "next/link";
import { FUNNEL_HERO, FUNNEL_HERO_TRUST } from "@/data/funnel";
import { SITE } from "@/data/site";

export function FunnelHero() {
  return (
    <section className="relative isolate -mt-[4.75rem] overflow-hidden bg-zb-navy-deep pt-[4.75rem]">
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={FUNNEL_HERO.image}
          alt="Zanzibar beachfront property — coastal villas and ocean views"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-zb-navy-deep/75" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/95 via-zb-navy-deep/80 to-zb-navy-deep/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep via-zb-navy-deep/20 to-transparent"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex min-h-[min(92svh,920px)] flex-col justify-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="inline-block rounded-sm border border-zb-gold/40 bg-zb-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zb-gold backdrop-blur-md">
            {FUNNEL_HERO.eyebrow}
          </p>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
            {FUNNEL_HERO.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {FUNNEL_HERO.subtitle}
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-zb-gold/90">
            {FUNNEL_HERO.trustLine}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={FUNNEL_HERO.primaryHref} className="btn-luxury-primary">
              {FUNNEL_HERO.primaryCta}
            </Link>
            <Link href={FUNNEL_HERO.secondaryHref} className="btn-luxury-outline">
              {FUNNEL_HERO.secondaryCta}
            </Link>
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-ghost"
            >
              WhatsApp us
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-8">
            {FUNNEL_HERO_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-zb-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
