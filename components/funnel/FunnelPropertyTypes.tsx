import Link from "next/link";
import { FUNNEL_PROPERTY_TYPES } from "@/data/funnel";

export function FunnelPropertyTypes() {
  return (
    <section className="bg-zb-navy-deep py-14 text-white sm:py-20">
      <div className="container-portal">
        <h2 className="text-center font-serif text-2xl font-semibold sm:text-3xl">
          {FUNNEL_PROPERTY_TYPES.title}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FUNNEL_PROPERTY_TYPES.items.map((item) => (
            <li
              key={item.title}
              className="rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-zb-gold/40"
            >
              <h3 className="font-serif text-lg font-semibold text-zb-gold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{item.body}</p>
              <Link href={item.href} className="mt-4 inline-block text-sm font-medium text-white hover:text-zb-gold">
                Learn more →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
