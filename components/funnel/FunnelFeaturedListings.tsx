import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";
import { FUNNEL_FEATURED } from "@/data/funnel";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

function PropertyTypeLabel({ type }: { type: string }) {
  const labels: Record<string, string> = {
    villa: "Beachfront Villa",
    plot: "Investment Land",
    land: "Development Land",
    house: "Family Home",
    apartment: "Apartment",
    commercial: "Commercial",
  };
  return <>{labels[type] || type}</>;
}

export function FunnelFeaturedListings({ listings }: { listings: Listing[] }) {
  const items = listings.slice(0, 3);

  return (
    <section className="section-py-sm lg:section-py bg-white" id="featured">
      <div className="container-portal">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow">{FUNNEL_FEATURED.eyebrow}</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-zb-navy sm:text-4xl lg:text-[2.75rem]">
            {FUNNEL_FEATURED.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zb-muted sm:text-base">
            {FUNNEL_FEATURED.subtitle}
          </p>
        </header>

        <div className="mt-10 lg:mt-14">
          {items.length === 0 ? (
            <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-12 text-center">
              <p className="font-serif text-xl text-zb-navy">New properties arriving soon.</p>
              <p className="mt-2 text-sm text-zb-muted">
                Contact our team to discuss what you're looking for.
              </p>
              <a
                href="https://wa.me/255716002790"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-sm bg-zb-gold px-6 py-3 text-sm font-semibold text-zb-navy-deep"
              >
                WhatsApp an Advisor
              </a>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((listing) => {
                const image = listing.images?.[0] ?? DEFAULT_LISTING_IMAGE;
                return (
                  <li key={listing.id}>
                    <Link
                      href={`/properties/${listing.slug}`}
                      className="group block overflow-hidden"
                    >
                      <article className="flex h-full flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                          <Image
                            src={image}
                            alt={`${listing.title} — ${listing.location} property for sale in Zanzibar`}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/60 via-transparent to-transparent" />
                          <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy backdrop-blur-sm">
                            {listing.location}
                          </span>
                          {listing.propertyType && (
                            <span className="absolute right-3 top-3 rounded-sm bg-zb-navy-deep/80 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                              <PropertyTypeLabel type={listing.propertyType} />
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col pt-4">
                          <h3 className="font-serif text-lg font-semibold text-zb-navy transition-colors group-hover:text-zb-gold">
                            {listing.title}
                          </h3>
                          <p className="mt-1 font-serif text-base font-semibold text-zb-gold">
                            {formatPrice(listing.price, listing.currency)}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-zb-muted">
                            {listing.bedrooms && (
                              <span>{listing.bedrooms} {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>
                            )}
                            {listing.features?.slice(0, 2).map((f) => (
                              <span key={f} className="flex items-center gap-1">
                                <span className="text-zb-gold">·</span> {f}
                              </span>
                            ))}
                          </div>
                          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zb-navy/60 transition-colors group-hover:text-zb-gold">
                            View Property →
                          </p>
                        </div>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {items.length > 0 && (
            <div className="mt-10 text-center">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center rounded-sm border border-zb-navy px-8 py-3.5 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
              >
                View All Properties
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
