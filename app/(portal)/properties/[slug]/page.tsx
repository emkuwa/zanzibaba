import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";
import { getListingBySlug, getListingsForPublic } from "@/lib/listings-store";
import { sanitizeWhatsAppText } from "@/lib/sanitize-whatsapp-text";
import { PropertyGallery } from "@/components/PropertyGallery";
import { ListingFeatureChips } from "@/components/ListingFeatureChips";
import { listingHasFeatureChips } from "@/lib/listing-feature-labels";
import { ShareButton } from "@/components/ShareButton";
import { PropertyJsonLd, BreadcrumbJsonLd } from "@/components/seo/RealEstateJsonLd";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

const TYPE_LABELS: Record<string, string> = {
  villa: "Beachfront Villa",
  plot: "Investment Land",
  land: "Development Land",
  house: "Family Home",
  apartment: "Apartment",
  commercial: "Commercial",
};

export async function generateStaticParams() {
  const { getListingsForPublic } = await import("@/lib/listings-store");
  const list = await getListingsForPublic();
  return list.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Property not found" };
  const title = sanitizeWhatsAppText(listing.title) || listing.title;
  const desc =
    sanitizeWhatsAppText(listing.description, { keepNewlines: true }) ||
    listing.description;
  const shortDesc = desc.slice(0, 155) + (desc.length > 155 ? "…" : "");
  return {
    title: `${title} | Zanzibaba Real Estate`,
    description: shortDesc,
    alternates: { canonical: `${SITE.url}/properties/${slug}` },
    openGraph: {
      title,
      description: shortDesc,
      images: listing.images[0] ? [listing.images[0]] : [],
    },
  };
}

export default async function PropertyPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ open?: string }>;
}) {
  const { slug } = await params;
  const { open } = await searchParams;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const refCode = listing.refCode ?? `ZRE-${listing.id.slice(-6).toUpperCase()}`;
  const openFirstImage = open === "1";
  const displayTitle = sanitizeWhatsAppText(listing.title) || listing.title;
  const displayDescription =
    sanitizeWhatsAppText(listing.description, { keepNewlines: true }) ||
    listing.description;

  const whatsappMessage = encodeURIComponent(
    `Hello Zanzibaba, I'm interested in "${displayTitle}" (${refCode}) in ${listing.location}. Please send me more information.`
  );

  const allListings = await getListingsForPublic();
  const related = allListings
    .filter((l) => l.id !== listing.id && l.location === listing.location)
    .slice(0, 3);

  return (
    <article className="bg-white">
      <PropertyJsonLd
        listing={{
          title: displayTitle,
          description: displayDescription,
          price: listing.price,
          currency: listing.currency,
          location: listing.location,
          propertyType: listing.propertyType,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          area: listing.area,
          images: listing.images,
          refCode,
          id: listing.id,
        }}
        url={`${SITE.url}/properties/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE.url },
          { name: "Properties", url: `${SITE.url}/properties` },
          { name: displayTitle, url: `${SITE.url}/properties/${slug}` },
        ]}
      />

      {/* Hero header */}
      <section className="bg-zb-navy-deep pt-28 pb-8 sm:pt-32">
        <div className="container-portal">
          <nav className="mb-4 text-xs text-white/50" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/properties" className="hover:text-white">Properties</Link></li>
              <li aria-hidden>/</li>
              <li className="text-white/80" aria-current="page">{displayTitle}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm font-medium text-zb-gold">{listing.location}</p>
            {listing.propertyType && (
              <>
                <span className="text-white/30">·</span>
                <p className="text-sm text-white/60">{TYPE_LABELS[listing.propertyType] || listing.propertyType}</p>
              </>
            )}
          </div>
          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            {displayTitle}
          </h1>
          <p className="mt-3 font-serif text-2xl text-zb-gold">
            {formatPrice(listing.price, listing.currency)}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/60">
            {listing.bedrooms && <span>{listing.bedrooms} {listing.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>}
            {listing.bathrooms && <span>· {listing.bathrooms} {listing.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</span>}
            {listing.area && <span>· {listing.area}</span>}
          </div>
        </div>
      </section>

      {/* Gallery + Details */}
      <div className="container-portal py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <PropertyGallery listing={listing} openFirstImage={openFirstImage} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[5rem] space-y-4">
              {/* Primary enquiry actions */}
              <div className="rounded-sm border border-zb-border bg-zb-surface-warm p-5">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Enquire About This Property</h2>
                <div className="mt-4 space-y-3">
                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] py-3.5 text-sm font-semibold text-white transition hover:bg-[#20b858]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp About This Property
                  </a>
                  <Link
                    href="/tell-us"
                    className="flex w-full items-center justify-center rounded-sm border border-zb-navy py-3.5 text-sm font-semibold text-zb-navy transition hover:bg-zb-navy hover:text-white"
                  >
                    Request Details
                  </Link>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="flex w-full items-center justify-center rounded-sm border border-zb-border py-3.5 text-sm font-semibold text-zb-navy transition hover:bg-zb-surface-warm"
                  >
                    Call Us
                  </a>
                </div>
              </div>

              {/* Property details */}
              <div className="rounded-sm border border-zb-border p-5">
                <h2 className="font-serif text-lg font-semibold text-zb-navy">Property Details</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-zb-border/50 pb-3">
                    <dt className="text-zb-muted">Type</dt>
                    <dd className="font-medium text-zb-navy">{TYPE_LABELS[listing.propertyType] || listing.propertyType}</dd>
                  </div>
                  {listing.bedrooms && (
                    <div className="flex justify-between border-b border-zb-border/50 pb-3">
                      <dt className="text-zb-muted">Bedrooms</dt>
                      <dd className="font-medium text-zb-navy">{listing.bedrooms}</dd>
                    </div>
                  )}
                  {listing.bathrooms && (
                    <div className="flex justify-between border-b border-zb-border/50 pb-3">
                      <dt className="text-zb-muted">Bathrooms</dt>
                      <dd className="font-medium text-zb-navy">{listing.bathrooms}</dd>
                    </div>
                  )}
                  {listing.area && (
                    <div className="flex justify-between border-b border-zb-border/50 pb-3">
                      <dt className="text-zb-muted">Size</dt>
                      <dd className="font-medium text-zb-navy">{listing.area}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-zb-border/50 pb-3">
                    <dt className="text-zb-muted">Location</dt>
                    <dd className="font-medium text-zb-navy">{listing.location}</dd>
                  </div>
                  {listing.furnished && (
                    <div className="flex justify-between border-b border-zb-border/50 pb-3">
                      <dt className="text-zb-muted">Furnished</dt>
                      <dd className="font-medium text-zb-navy capitalize">{listing.furnished}</dd>
                    </div>
                  )}
                  <div className="flex justify-between pb-1">
                    <dt className="text-zb-muted">Reference</dt>
                    <dd className="font-medium text-zb-navy">{refCode}</dd>
                  </div>
                </dl>
              </div>

              {/* Share */}
              <div className="text-center">
                <p className="text-xs text-zb-muted">Share this property</p>
                <div className="mt-2">
                  <ShareButton title={displayTitle} sharePath={`/properties/${slug}?open=1`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-10 border-t border-zb-border pt-8 sm:mt-14">
          <h2 className="font-serif text-xl font-semibold text-zb-navy">Description</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-zb-muted">
            {displayDescription}
          </p>
        </div>

        {/* Features */}
        {listingHasFeatureChips(listing) && (
          <div className="mt-8">
            <h2 className="font-serif text-xl font-semibold text-zb-navy">Features</h2>
            <div className="mt-3">
              <ListingFeatureChips listing={listing} />
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-10 rounded-sm border border-zb-border/50 bg-zb-surface-warm p-6 text-center text-xs text-zb-muted sm:mt-14">
          Property information should be independently verified during due diligence.
          We recommend obtaining independent legal, tax, and financial advice before making property purchases.
        </div>
      </div>

      {/* Related properties */}
      {related.length > 0 && (
        <section className="border-t border-zb-border bg-zb-surface-warm py-12 sm:py-16">
          <div className="container-portal">
            <h2 className="font-serif text-2xl font-semibold text-zb-navy">
              Similar Properties in {listing.location}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => {
                const image = rel.images?.[0];
                return (
                  <Link
                    key={rel.id}
                    href={`/properties/${rel.slug}`}
                    className="group block overflow-hidden"
                  >
                    <article>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                        {image && (
                          <Image
                            src={image}
                            alt={rel.title}
                            fill
                            className="object-cover transition duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zb-navy-deep/60 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-zb-navy">
                          {rel.location}
                        </span>
                      </div>
                      <div className="pt-3">
                        <h3 className="font-serif text-base font-semibold text-zb-navy group-hover:text-zb-gold">
                          {rel.title}
                        </h3>
                        <p className="mt-1 font-serif text-sm font-semibold text-zb-gold">
                          {formatPrice(rel.price, rel.currency)}
                        </p>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
