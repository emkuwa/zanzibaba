import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingBySlug } from "@/lib/listings-store";
import { sanitizeWhatsAppText } from "@/lib/sanitize-whatsapp-text";
import { PropertyGallery } from "@/components/PropertyGallery";
import { ListingFeatureChips } from "@/components/ListingFeatureChips";
import { listingHasFeatureChips } from "@/lib/listing-feature-labels";
import { ShareButton } from "@/components/ShareButton";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

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
    title,
    description: shortDesc,
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

  return (
    <article className="container-tight py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/#listings"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to catalog
        </Link>
        <nav className="text-sm text-sand-600" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-600">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/#listings" className="hover:text-brand-600">Properties</Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-sand-900" aria-current="page">{displayTitle}</li>
          </ol>
        </nav>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertyGallery listing={listing} openFirstImage={openFirstImage} />
        </div>
        <div>
          <p className="text-sm font-medium text-brand-600">{listing.location}</p>
          <h1 className="mt-1 break-words text-2xl font-bold text-sand-900 sm:text-3xl">
            {displayTitle}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-sand-900">
            {formatPrice(listing.price, listing.currency)}
          </p>
          {listing.area && (
            <p className="mt-1 text-sand-600">Plot/land: {listing.area}</p>
          )}
          <p className="mt-2 inline-block rounded-lg bg-sand-200 px-2.5 py-1 text-sm font-medium text-sand-700 capitalize">
            {listing.propertyType}
          </p>
          <p className="mt-2 text-xs text-sand-500">Ref: {refCode}</p>

          <div className="mt-4">
            <p className="text-xs font-medium text-sand-500">Share this property</p>
            <div className="mt-1.5">
              <ShareButton
                title={displayTitle}
                sharePath={`/properties/${slug}?open=1`}
              />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-sand-200 bg-sand-50/50 p-4">
            <h2 className="font-semibold text-sand-900">Contact Zanzibaba</h2>
            {listing.agentName && (
              <p className="mt-1 text-sm text-sand-600">
                Agent: {listing.agentName}
                {listing.agentCode ? ` (${listing.agentCode})` : null}
              </p>
            )}
            <a
              href={`/api/leads/whatsapp?listingId=${encodeURIComponent(listing.id)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-sand-900">Description</h2>
        <p className="mt-2 whitespace-pre-line text-sand-700 leading-relaxed">
          {displayDescription}
        </p>
      </div>

      {listingHasFeatureChips(listing) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-sand-900">Features</h2>
          <div className="mt-2">
            <ListingFeatureChips listing={listing} />
          </div>
        </div>
      )}

      <div className="mt-10 border-t border-sand-200 pt-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#listings"
          className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
        >
          <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to catalog
        </Link>
        <ShareButton
          title={displayTitle}
          sharePath={`/properties/${slug}?open=1`}
        />
      </div>
    </article>
  );
}
