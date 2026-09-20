import Link from "next/link";
import { FUNNEL_FINAL_CTA } from "@/data/funnel";

export function FunnelFinalCta() {
  return (
    <section className="section-py-sm lg:section-py bg-zb-surface-warm">
      <div className="container-portal text-center">
        <p className="text-eyebrow">{FUNNEL_FINAL_CTA.eyebrow}</p>
        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-zb-navy sm:text-4xl">
          {FUNNEL_FINAL_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-zb-muted sm:text-base">
          {FUNNEL_FINAL_CTA.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={FUNNEL_FINAL_CTA.primaryHref}
            className="inline-flex items-center justify-center rounded-sm bg-zb-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-zb-navy-deep transition hover:bg-[#d4ab55]"
          >
            {FUNNEL_FINAL_CTA.primaryCta}
          </Link>
          <a
            href={FUNNEL_FINAL_CTA.secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-8 py-3.5 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
          >
            {FUNNEL_FINAL_CTA.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
