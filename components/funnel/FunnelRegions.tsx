import Image from "next/image";
import Link from "next/link";
import { FUNNEL_REGIONS } from "@/data/funnel";

export function FunnelRegions() {
  return (
    <section className="bg-zb-surface-warm section-py-sm lg:section-py">
      <div className="container-portal">
        <h2 className="text-center font-serif text-2xl font-semibold text-zb-navy sm:text-3xl">
          Explore by region
        </h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {FUNNEL_REGIONS.map((region) => (
            <article
              key={region.id}
              className="group relative min-h-[280px] overflow-hidden rounded-sm sm:min-h-[320px]"
            >
              <Image
                src={region.image}
                alt={region.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/95 via-zb-navy-deep/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zb-gold">{region.subtitle}</p>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-white">{region.name}</h3>
                <p className="mt-2 max-w-md text-sm text-white/80">{region.description}</p>
                <Link
                  href={region.href}
                  className="mt-5 inline-flex w-fit rounded-sm border border-zb-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zb-gold transition hover:bg-zb-gold hover:text-zb-navy-deep"
                >
                  Explore region
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
