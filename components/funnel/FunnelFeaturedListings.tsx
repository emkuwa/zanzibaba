import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";
import { FUNNEL_FEATURED } from "@/data/funnel";
import { FunnelSection } from "./FunnelSection";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `From $${price.toLocaleString()}`;
  return `From ${price.toLocaleString()} ${currency}`;
}

export function FunnelFeaturedListings({ listings }: { listings: Listing[] }) {
  const items = listings.slice(0, 4);

  return (
    <FunnelSection
      id="featured"
      eyebrow={FUNNEL_FEATURED.eyebrow}
      title={FUNNEL_FEATURED.title}
      subtitle={FUNNEL_FEATURED.subtitle}
      className="bg-zb-surface-warm"
    >
      {items.length === 0 ? (
        <div className="rounded-sm border border-zb-border bg-white p-12 text-center text-zb-muted">
          New properties arriving soon.{" "}
          <Link href="/tell-us" className="font-semibold text-zb-gold hover:underline">
            Tell us what you're looking for
          </Link>{" "}
          and we'll notify you when matching properties become available.
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {items.map((listing) => {
            const image = listing.images?.[0] ?? DEFAULT_LISTING_IMAGE;
            return (
              <li key={listing.id}>
                <article className="group funnel-card flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image}
                      alt={`${listing.title} — ${listing.location} property for sale in Zanzibar`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/80 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy">
                      {listing.location}
                    </span>
                    {listing.featured && (
                      <span className="absolute right-4 top-4 rounded-sm bg-zb-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy-deep">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-xl font-semibold text-zb-navy">{listing.title}</h3>
                    <p className="mt-2 font-serif text-lg text-zb-gold">
                      {formatPrice(listing.price, listing.currency)}
                    </p>
                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-zb-muted">
                      {listing.description}
                    </p>
                    <Link
                      href={`/properties/${listing.slug}`}
                      className="btn-luxury-outline mt-6 w-full justify-center text-center"
                    >
                      View property
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-10 text-center">
          <Link href="/properties" className="btn-luxury-primary">
            View all properties
          </Link>
        </div>
      )}
    </FunnelSection>
  );
}
