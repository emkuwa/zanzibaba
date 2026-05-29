import Link from "next/link";
import { FUNNEL_FINAL_CTA } from "@/data/funnel";

export function FunnelFinalCta() {
  return (
    <section className="relative overflow-hidden bg-zb-navy-deep py-16 sm:py-20 lg:py-28">
      <div className="absolute inset-0 pattern-architectural opacity-40" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-br from-zb-gold/10 via-transparent to-zb-navy-deep"
        aria-hidden
      />
      <div className="container-portal relative z-10 text-center">
        <p className="text-eyebrow text-zb-gold">{FUNNEL_FINAL_CTA.eyebrow}</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
          {FUNNEL_FINAL_CTA.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm text-white/75 sm:text-base">
          {FUNNEL_FINAL_CTA.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href={FUNNEL_FINAL_CTA.primaryHref} className="btn-luxury-primary">
            {FUNNEL_FINAL_CTA.primaryCta}
          </Link>
          <Link
            href={FUNNEL_FINAL_CTA.secondaryHref}
            className="inline-flex items-center justify-center rounded-sm border border-white/70 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {FUNNEL_FINAL_CTA.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
