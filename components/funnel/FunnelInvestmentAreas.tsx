import Image from "next/image";
import Link from "next/link";
import { FUNNEL_AREAS_SECTION, INVESTMENT_AREAS } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

export function FunnelInvestmentAreas() {
  return (
    <FunnelSection
      id="areas"
      eyebrow={FUNNEL_AREAS_SECTION.eyebrow}
      title={FUNNEL_AREAS_SECTION.title}
      subtitle={FUNNEL_AREAS_SECTION.subtitle}
      dark
      className="!bg-zb-navy-deep"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INVESTMENT_AREAS.map((area) => (
          <li key={area.id}>
            <Link
              href={area.href}
              className="group relative block min-h-[240px] overflow-hidden rounded-sm border border-white/10 transition hover:border-zb-gold/40 hover:shadow-zb-gold-glow"
            >
              <Image
                src={area.image}
                alt={`${area.name} — Zanzibar investment area for luxury property`}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/40 to-transparent" />
              <div className="relative flex w-full flex-col justify-end p-6">
                <span className="w-fit rounded-sm border border-zb-gold/40 bg-zb-gold/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-zb-gold">
                  {area.tag}
                </span>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-white">{area.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{area.description}</p>
                <span className="mt-4 text-xs font-bold uppercase tracking-wider text-zb-gold">
                  Explore {area.name} →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </FunnelSection>
  );
}
