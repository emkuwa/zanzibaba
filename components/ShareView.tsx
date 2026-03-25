"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";
import { ListingFeatureChips } from "./ListingFeatureChips";
import { listingHasFeatureChips } from "@/lib/listing-feature-labels";

function formatPrice(price: number, currency: string) {
  if (!price || price <= 0) return "Price on request";
  if (currency === "USD") return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} ${currency}`;
}

export function ShareView({ listings }: { listings: Listing[] }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const firstListing = listings[0];
  const firstImage = firstListing?.images?.[0];

  useEffect(() => {
    if (firstImage) setLightboxOpen(true);
  }, [firstImage]);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "";
  const shareText = listings.length === 1
    ? `Check this property: ${shareUrl}`
    : `Check these properties: ${shareUrl}`;

  function copyLink() {
    if (typeof navigator === "undefined") return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function openWhatsApp() {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {lightboxOpen && firstImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-h-[90vh] max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={firstImage}
              alt={firstListing?.title ?? "Property"}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
              unoptimized={firstImage.startsWith("data:") || firstImage.startsWith("blob:")}
            />
          </div>
        </div>
      )}

      <header className="border-b border-sand-200 bg-white">
        <div className="container-tight flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold text-brand-700">
            Zanzibaba Real Estate
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg border border-sand-200 px-3 py-2 text-sm font-medium text-sand-700 hover:bg-sand-50"
            >
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button
              type="button"
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Share via WhatsApp
            </button>
          </div>
        </div>
      </header>

      <div className="container-tight py-8">
        <h1 className="text-2xl font-bold text-sand-900">
          {listings.length === 1 ? "Property shared with you" : "Properties shared with you"}
        </h1>
        <p className="mt-1 text-sand-600">
          {listings.length === 1
            ? "Click the image or link below to view full details."
            : "Click any property to view full details."}
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link href={`/properties/${listing.slug}?open=1`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
                  {listing.images[0] ? (
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      className="object-cover transition hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : listing.videoUrl?.trim() ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand-200 to-sand-300">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path d="M8 5v14l11-7-11-7z" />
                        </svg>
                      </span>
                      <span className="text-xs font-medium text-sand-600">Video</span>
                    </div>
                  ) : (
                    <Image
                      src={DEFAULT_LISTING_IMAGE}
                      alt={listing.title}
                      fill
                      className="object-cover transition hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <span className="absolute right-3 top-3 rounded-lg bg-white/95 px-2 py-1 text-xs font-medium text-sand-700 capitalize shadow">
                    {listing.propertyType}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-brand-600">{listing.location}</p>
                  <h2
                    className="mt-1 line-clamp-4 break-words font-semibold text-sand-900"
                    title={listing.title}
                  >
                    {listing.title}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-sand-900">
                    {formatPrice(listing.price, listing.currency)}
                  </p>
                  {listingHasFeatureChips(listing) && (
                    <div className="mt-2">
                      <ListingFeatureChips listing={listing} />
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
