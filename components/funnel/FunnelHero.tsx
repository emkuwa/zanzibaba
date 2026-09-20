import Image from "next/image";
import Link from "next/link";
import { FUNNEL_HERO, FUNNEL_HERO_TRUST } from "@/data/funnel";

export function FunnelHero() {
  return (
    <section className="relative isolate -mt-[4rem] overflow-hidden bg-zb-navy-deep pt-[4rem] sm:-mt-[4.5rem] sm:pt-[4.5rem]">
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
      <div className="absolute inset-0 bg-zb-navy-deep/70" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/95 via-zb-navy-deep/75 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep via-zb-navy-deep/30 to-transparent"
        aria-hidden
      />

      <div className="container-portal relative z-10 flex min-h-[min(88svh,840px)] flex-col justify-center py-20 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
            {FUNNEL_HERO.title.split("\n").map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:text-xl">
            {FUNNEL_HERO.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={FUNNEL_HERO.primaryHref}
              className="inline-flex items-center justify-center rounded-sm bg-zb-gold px-8 py-4 text-sm font-bold uppercase tracking-wider text-zb-navy-deep transition hover:bg-[#d4ab55]"
            >
              {FUNNEL_HERO.primaryCta}
            </Link>
            <a
              href={FUNNEL_HERO.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm border border-white/40 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              {FUNNEL_HERO.secondaryCta}
            </a>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
            {FUNNEL_HERO.trustLine}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {FUNNEL_HERO_TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                <span className="h-1 w-1 shrink-0 rounded-full bg-zb-gold/70" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
