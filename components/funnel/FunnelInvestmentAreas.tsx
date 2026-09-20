import Image from "next/image";
import Link from "next/link";
import { INVESTMENT_AREAS, FUNNEL_AREAS_SECTION } from "@/data/funnel";

export function FunnelInvestmentAreas() {
  return (
    <section className="section-py-sm lg:section-py bg-white" id="areas">
      <div className="container-portal">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow">{FUNNEL_AREAS_SECTION.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-zb-navy sm:text-4xl lg:text-[2.75rem]">
            {FUNNEL_AREAS_SECTION.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:text-base">
            {FUNNEL_AREAS_SECTION.subtitle}
          </p>
        </header>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-14">
          {INVESTMENT_AREAS.map((area) => (
            <li key={area.id}>
              <Link
                href={area.href}
                className="group relative block aspect-[3/2] overflow-hidden rounded-sm"
              >
                <Image
                  src={area.image}
                  alt={`${area.name} — ${area.tag} property area in Zanzibar`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/80 via-zb-navy-deep/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-zb-gold/90">
                    {area.tag}
                  </p>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-white">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/70 line-clamp-2">
                    {area.description}
                  </p>
                  <span className="mt-3 text-xs font-medium uppercase tracking-wider text-white/60 transition-colors group-hover:text-zb-gold">
                    Explore Area →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
