import Image from "next/image";
import Link from "next/link";
import { FUNNEL_RENTALS } from "@/data/funnel";

export function FunnelRentals() {
  return (
    <section id="rentals" className="bg-white py-14 sm:py-20">
      <div className="container-portal">
        <div className="max-w-2xl">
          <p className="text-eyebrow">Luxury living</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-zb-navy sm:text-3xl">
            {FUNNEL_RENTALS.title}
          </h2>
          <p className="mt-3 text-zb-muted">{FUNNEL_RENTALS.subtitle}</p>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUNNEL_RENTALS.items.map((item) => (
            <li
              key={item.title}
              className="group overflow-hidden rounded-sm border border-zb-border bg-zb-surface shadow-zb-card transition hover:-translate-y-1 hover:shadow-zb-card-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-serif text-lg font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="p-5 text-sm leading-relaxed text-zb-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            href="#qualify"
            className="inline-flex rounded-sm bg-zb-navy px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-zb-navy-deep"
          >
            Get luxury rental options
          </Link>
        </div>
      </div>
    </section>
  );
}
