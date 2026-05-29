import { FUNNEL_STATS } from "@/data/funnel";

export function FunnelStats() {
  return (
    <section className="border-y border-zb-gold/15 bg-zb-navy-deep" aria-label="Investment highlights">
      <div className="container-portal py-8 sm:py-10 lg:py-12">
        <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {FUNNEL_STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`text-center ${
                i < FUNNEL_STATS.length - 1
                  ? "lg:border-r lg:border-zb-gold/25 lg:pr-8"
                  : ""
              }`}
            >
              <p className="font-serif text-3xl font-semibold text-zb-gold sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm font-medium text-white">{stat.label}</p>
              <p className="mt-1 text-[0.65rem] text-white/50">{stat.sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
