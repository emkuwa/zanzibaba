import trustMetrics from "@/data/trust-metrics.json";

export function StatsBar() {
  const { metrics, disclaimer } = trustMetrics;

  return (
    <section
      className="bg-zb-navy text-white"
      aria-label="Group experience metrics"
    >
      <div className="container-portal py-10 sm:py-12">
        <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m) => (
            <li key={m.id} className="text-center">
              <p className="font-serif text-3xl font-semibold text-zb-gold sm:text-4xl">
                {m.value}
              </p>
              <p className="mt-2 text-sm font-medium tracking-wide text-white/90">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-white/50">{disclaimer}</p>
      </div>
    </section>
  );
}
