import { FUNNEL_STATS, FUNNEL_TRUST } from "@/data/funnel";

export function FunnelTrust() {
  return (
    <section className="border-y border-zb-gold/15 bg-zb-navy-deep" aria-label="Investor trust indicators">
      <div className="container-portal py-10 sm:py-12">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {FUNNEL_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`text-center ${i < FUNNEL_STATS.length - 1 ? "lg:border-r lg:border-zb-gold/20 lg:pr-8" : ""}`}
            >
              <p className="font-serif text-3xl font-semibold text-zb-gold sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white">{stat.label}</p>
              <p className="mt-1 text-[0.65rem] text-white/50">{stat.sub}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 bg-zb-navy-deep/95 py-14 sm:py-20 lg:py-24">
        <div className="container-portal">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow text-zb-gold">{FUNNEL_TRUST.eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
              {FUNNEL_TRUST.title}
            </h2>
            <p className="mt-4 text-sm text-white/70 sm:text-base">{FUNNEL_TRUST.subtitle}</p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {FUNNEL_TRUST.pillars.map((pillar) => (
              <li
                key={pillar.label}
                className="funnel-card-dark rounded-sm border border-white/10 p-6 transition hover:border-zb-gold/35"
              >
                <p className="font-serif text-3xl font-semibold text-zb-gold">{pillar.value}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-white">
                  {pillar.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
