"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FurnishedLevel, Listing, PropertyType, TransactionType } from "@/lib/types";
import { generateListingTitle } from "@/lib/generate-listing-title";
import { DEFAULT_LISTING_IMAGE } from "@/lib/default-listing-image";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "plot", label: "Plot" },
  { value: "land", label: "Land" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
];

type ListingFormProps = {
  listing?: Listing | null;
  mode: "create" | "edit";
};

export function ListingForm({ listing, mode }: ListingFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(listing?.title ?? "");
  /** Prefer stored full paste (`originalDescription`) so edit shows the same text as WhatsApp, not only the shortened LLM copy. */
  const [description, setDescription] = useState(
    () => listing?.originalDescription ?? listing?.description ?? ""
  );
  const [price, setPrice] = useState(listing?.price?.toString() ?? "");
  const [currency, setCurrency] = useState(listing?.currency ?? "USD");
  const [location, setLocation] = useState(listing?.location ?? "");
  const [area, setArea] = useState(listing?.area ?? "");
  const [propertyType, setPropertyType] = useState<PropertyType>(
    listing?.propertyType ?? "land"
  );
  const [featuresText, setFeaturesText] = useState(
    listing?.features?.join(", ") ?? ""
  );
  const [transactionType, setTransactionType] = useState<"" | TransactionType>(() =>
    listing?.transactionType === "sale" || listing?.transactionType === "rent"
      ? listing.transactionType
      : ""
  );
  const [bedrooms, setBedrooms] = useState(() =>
    listing?.bedrooms != null ? String(listing.bedrooms) : ""
  );
  const [bathrooms, setBathrooms] = useState(() =>
    listing?.bathrooms != null ? String(listing.bathrooms) : ""
  );
  const [furnished, setFurnished] = useState<"" | FurnishedLevel>(() =>
    listing?.furnished === "furnished" ||
    listing?.furnished === "unfurnished" ||
    listing?.furnished === "semi"
      ? listing.furnished
      : ""
  );
  const [ensuite, setEnsuite] = useState(listing?.ensuite ?? false);
  const [fenced, setFenced] = useState(listing?.fenced ?? false);
  const [landAreaSqm, setLandAreaSqm] = useState(() =>
    listing?.landAreaSqm != null ? String(listing.landAreaSqm) : ""
  );
  const [hasDocuments, setHasDocuments] = useState(listing?.hasDocuments ?? false);
  const [images, setImages] = useState<string[]>(listing?.images ?? []);
  const [videoUrl, setVideoUrl] = useState(listing?.videoUrl ?? "");
  const [featured, setFeatured] = useState(listing?.featured ?? false);
  const [draft, setDraft] = useState(listing?.draft ?? false);
  const [agentName, setAgentName] = useState(listing?.agentName ?? "Zanzibaba Real Estate");
  const [agentWhatsApp, setAgentWhatsApp] = useState(
    listing?.agentWhatsApp ?? "255716002790"
  );
  const [agentCode, setAgentCode] = useState(listing?.agentCode ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [whatsappPaste, setWhatsappPaste] = useState("");
  const [parsing, setParsing] = useState(false);

  const features = featuresText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.set("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Upload failed");
        }
        const data = await res.json();
        if (data.url) newUrls.push(data.url);
      }
      if (newUrls.length) {
        setImages((prev) => [...prev, ...newUrls]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadingVideo(true);
    setError("");
    try {
      const form = new FormData();
      form.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Video upload failed");
      }
      const data = await res.json();
      if (typeof data.url === "string" && data.url) {
        setVideoUrl(data.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video upload failed");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  }

  /** No auto-thumbnails for video (YouTube static JPEGs and canvas grabs are often black; catalog uses video hero + player). */
  function resolveCoverImage(currentImages: string[], currentVideoUrl: string): string[] {
    if (currentImages.length > 0) return currentImages;
    if (currentVideoUrl.trim()) return [];
    return [DEFAULT_LISTING_IMAGE];
  }

  async function handleSubmit(e: React.FormEvent, asDraft: boolean) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      // Title first so generator never treats the opening sentence of the description as the title.
      const fixedTitle = generateListingTitle(
        {
          text: `${title}\n\n${description}`,
          location,
          propertyType,
          area,
          features,
        },
        { mode: "structured" }
      ).slice(0, 120);
      const finalImages = resolveCoverImage(images, videoUrl);
      const desc = description.trim();
      const fullPaste = whatsappPaste.trim();
      const br =
        bedrooms.trim() === ""
          ? undefined
          : (() => {
              const n = parseInt(bedrooms, 10);
              return Number.isFinite(n) && n >= 0 ? n : undefined;
            })();
      const ba =
        bathrooms.trim() === ""
          ? undefined
          : (() => {
              const n = parseInt(bathrooms, 10);
              return Number.isFinite(n) && n >= 0 ? n : undefined;
            })();
      const sqm =
        landAreaSqm.trim() === ""
          ? undefined
          : (() => {
              const n = parseFloat(landAreaSqm.replace(/,/g, ""));
              return Number.isFinite(n) && n > 0 ? n : undefined;
            })();

      const payload = {
        title: fixedTitle || title,
        description: desc,
        originalDescription: fullPaste || desc,
        price: Number(price) || 0,
        currency,
        location,
        area: area || undefined,
        propertyType,
        transactionType: transactionType === "" ? undefined : transactionType,
        bedrooms: br,
        bathrooms: ba,
        furnished: furnished === "" ? undefined : furnished,
        ensuite,
        fenced,
        landAreaSqm: sqm,
        hasDocuments,
        features,
        images: finalImages,
        videoUrl: videoUrl.trim() || undefined,
        featured,
        draft: asDraft, // button choice: Publish vs Save as draft
        agentName: agentName || undefined,
        agentWhatsApp: agentWhatsApp || undefined,
        agentCode: agentCode || undefined,
      };
      const listingId = listing?.id;
      if (listingId) {
        const res = await fetch(`/api/listings/${listingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, draft: asDraft }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to update");
        }
        router.push("/dashboard");
        router.refresh();
        return;
      }
      if (mode === "create") {
        const res = await fetch("/api/listings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to create");
        }
        await res.json();
        router.push("/dashboard");
        router.refresh();
        return;
      }
      throw new Error(
        "Cannot save: this listing is missing an id. Refresh the page or open the listing from the dashboard."
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  async function handleParseWhatsApp() {
    if (!whatsappPaste.trim()) return;
    setParsing(true);
    setError("");
    try {
      const res = await fetch("/api/parse-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: whatsappPaste }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Parse failed");
      }
      const data = await res.json() as {
        title?: string;
        description?: string;
        originalDescription?: string;
        price?: number;
        currency?: string;
        location?: string;
        area?: string;
        propertyType?: string;
        features?: string[];
        agentWhatsApp?: string;
        agentCode?: string;
        transactionType?: "sale" | "rent";
        landAreaSqm?: number;
        hasDocuments?: boolean;
      };
      setTitle(data.title ?? title);
      // Prefer cleaned description so the user sees extracted prose; full paste stays in WhatsApp box above
      {
        const cleaned =
          typeof data.description === "string" && data.description.trim()
            ? data.description.trim()
            : "";
        setDescription(cleaned || description);
      }
      setPrice(data.price != null && !Number.isNaN(Number(data.price)) ? String(data.price) : price);
      setCurrency(data.currency ?? currency);
      setLocation(data.location ?? location);
      setArea(data.area ?? area);
      setPropertyType((data.propertyType ?? propertyType) as PropertyType);
      setFeaturesText(Array.isArray(data.features) ? data.features.join(", ") : featuresText);
      if (data.transactionType === "sale" || data.transactionType === "rent") {
        setTransactionType(data.transactionType);
      }
      if (data.landAreaSqm != null && Number.isFinite(data.landAreaSqm) && data.landAreaSqm > 0) {
        setLandAreaSqm(String(data.landAreaSqm));
      }
      if (typeof data.hasDocuments === "boolean") {
        setHasDocuments(data.hasDocuments);
      }
      if (data.agentWhatsApp) {
        setAgentWhatsApp(data.agentWhatsApp);
      }
      if (data.agentCode) {
        setAgentCode(data.agentCode);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parse failed");
    } finally {
      setParsing(false);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e, false)}
      className="space-y-6 rounded-xl border border-sand-200 bg-white p-6 shadow-sm"
    >
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-brand-200 bg-brand-50/50 p-4">
        <label htmlFor="whatsapp-paste" className="block text-sm font-medium text-sand-700">
          Paste from WhatsApp (optional)
        </label>
        <p className="mt-0.5 text-xs text-sand-500">
          Paste raw property text from WhatsApp; we&apos;ll fill the form below.
        </p>
        <div className="mt-2 flex gap-2">
          <textarea
            id="whatsapp-paste"
            rows={3}
            value={whatsappPaste}
            onChange={(e) => setWhatsappPaste(e.target.value)}
            placeholder="e.g. Plot 50x100 Paje $80k, 5min beach, water & electricity..."
            className="min-w-0 flex-1 rounded-lg border border-sand-200 bg-white px-3 py-2 text-sm text-sand-900 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <button
            type="button"
            onClick={handleParseWhatsApp}
            disabled={parsing || !whatsappPaste.trim()}
            className="shrink-0 self-end rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50"
          >
            {parsing ? "Parsing…" : "Parse"}
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="title" className="block text-sm font-medium text-sand-700">
              Title *
            </label>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setTitle(
                  generateListingTitle(
                    {
                      text: `${title}\n\n${description}`,
                      location,
                      propertyType,
                      area,
                      features,
                    },
                    { mode: "structured" }
                  ).slice(0, 120)
                );
              }}
              className="rounded-md border border-sand-300 bg-white px-2.5 py-1 text-xs font-medium text-sand-700 hover:bg-sand-50"
            >
              Generate title
            </button>
          </div>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-sand-700">
            Location *
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-sand-700">
          Description *
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-sand-700">
            Price *
          </label>
          <input
            id="price"
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-sand-700">
            Currency
          </label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="USD">USD</option>
            <option value="TZS">TZS</option>
          </select>
        </div>
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-sand-700">
            Area (e.g. 50×100m)
          </label>
          <input
            id="area"
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="50×100m"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="propertyType" className="block text-sm font-medium text-sand-700">
          Property type
        </label>
        <select
          id="propertyType"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value as PropertyType)}
          className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          {PROPERTY_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-sand-200 bg-sand-50/80 p-4">
        <h3 className="text-sm font-semibold text-sand-900">Property details</h3>
        <p className="mt-1 text-xs text-sand-500">
          Rooms, land size, sale/rent, and documents appear as icon chips on the catalog and property page. Add extra tags below if needed.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label htmlFor="transactionType" className="block text-sm font-medium text-sand-700">
              Sale or rent
            </label>
            <select
              id="transactionType"
              value={transactionType}
              onChange={(e) =>
                setTransactionType(e.target.value as "" | TransactionType)
              }
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Not set</option>
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </div>
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-sand-700">
              Bedrooms
            </label>
            <input
              id="bedrooms"
              type="number"
              min={0}
              inputMode="numeric"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="e.g. 3"
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-sand-700">
              Bathrooms
            </label>
            <input
              id="bathrooms"
              type="number"
              min={0}
              inputMode="numeric"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="e.g. 2"
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div>
            <label htmlFor="furnished" className="block text-sm font-medium text-sand-700">
              Furnishing
            </label>
            <select
              id="furnished"
              value={furnished}
              onChange={(e) => setFurnished(e.target.value as "" | FurnishedLevel)}
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            >
              <option value="">Not set</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semi">Semi-furnished</option>
            </select>
          </div>
          <div>
            <label htmlFor="landAreaSqm" className="block text-sm font-medium text-sand-700">
              Land / plot (m²)
            </label>
            <input
              id="landAreaSqm"
              type="text"
              inputMode="decimal"
              value={landAreaSqm}
              onChange={(e) => setLandAreaSqm(e.target.value)}
              placeholder="e.g. 500"
              className="mt-1 w-full rounded-lg border border-sand-200 bg-white px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          <div className="flex flex-col justify-end gap-3 sm:col-span-2 lg:col-span-3">
            <span className="text-sm font-medium text-sand-700">Options</span>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-sand-800">
                <input
                  type="checkbox"
                  checked={ensuite}
                  onChange={(e) => setEnsuite(e.target.checked)}
                  className="rounded border-sand-300 text-brand-600 focus:ring-brand-500"
                />
                Ensuite
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-sand-800">
                <input
                  type="checkbox"
                  checked={fenced}
                  onChange={(e) => setFenced(e.target.checked)}
                  className="rounded border-sand-300 text-brand-600 focus:ring-brand-500"
                />
                Fenced / boundary
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-sand-800">
                <input
                  type="checkbox"
                  checked={hasDocuments}
                  onChange={(e) => setHasDocuments(e.target.checked)}
                  className="rounded border-sand-300 text-brand-600 focus:ring-brand-500"
                />
                Title / survey documents
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="features" className="block text-sm font-medium text-sand-700">
          Extra features (comma-separated)
        </label>
        <input
          id="features"
          type="text"
          value={featuresText}
          onChange={(e) => setFeaturesText(e.target.value)}
          placeholder="Water, Electricity, Near beach"
          className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-sand-700">Images</label>
        <div className="mt-2 flex flex-wrap gap-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative h-24 w-32 overflow-hidden rounded-lg border border-sand-200 bg-sand-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 rounded bg-red-600 px-1.5 py-0.5 text-xs text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-sand-300 bg-sand-50 text-sand-500 hover:border-brand-400 hover:bg-brand-50/50 hover:text-brand-600">
            <span className="text-xs">
              {uploading ? "Uploading…" : "Add images"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-medium text-sand-700">
          Video URL (optional)
        </label>
        <p className="mt-0.5 text-xs text-sand-500">
          YouTube, Vimeo, direct link, or upload — with Cloudinary env vars, files go to your Cloudinary CDN; otherwise local <code className="text-xs">/uploads/</code> (dev).
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <input
            id="videoUrl"
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/... or paste URL after upload"
            className="min-w-0 flex-1 rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 placeholder:text-sand-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <label className="inline-flex cursor-pointer items-center rounded-lg border border-sand-300 bg-white px-3 py-2 text-sm text-sand-700 hover:bg-sand-50">
            {uploadingVideo ? "Uploading..." : "Upload video"}
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg,video/quicktime"
              onChange={handleVideoUpload}
              disabled={uploadingVideo}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="agentName" className="block text-sm font-medium text-sand-700">
            Agent name
          </label>
          <input
            id="agentName"
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="agentCode" className="block text-sm font-medium text-sand-700">
            Agent code (internal)
          </label>
          <input
            id="agentCode"
            type="text"
            value={agentCode}
            onChange={(e) => setAgentCode(e.target.value)}
            placeholder="AG-SARAH"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="agentWhatsApp" className="block text-sm font-medium text-sand-700">
            Agent WhatsApp (internal only)
          </label>
          <p className="mt-0.5 text-xs text-sand-500">
            Hidden from public site; saved for office reference.
          </p>
          <input
            id="agentWhatsApp"
            type="text"
            value={agentWhatsApp}
            onChange={(e) => setAgentWhatsApp(e.target.value)}
            placeholder="255716002790"
            className="mt-1 w-full rounded-lg border border-sand-200 bg-sand-50 px-3 py-2 text-sand-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="rounded border-sand-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-sand-700">Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={draft}
            onChange={(e) => setDraft(e.target.checked)}
            className="rounded border-sand-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-sand-700">Save as draft (hidden from public)</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-sand-200 pt-6">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save & publish"}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={saving}
          className="rounded-lg border border-sand-200 bg-white px-4 py-2 font-medium text-sand-700 hover:bg-sand-50 disabled:opacity-50"
        >
          Save as draft
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-sand-200 bg-white px-4 py-2 font-medium text-sand-700 hover:bg-sand-50"
        >
          Cancel
        </button>
        {mode === "edit" && listing && (
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Delete this listing? This cannot be undone.")) return;
              setSaving(true);
              try {
                const res = await fetch(`/api/listings/${listing.id}`, {
                  method: "DELETE",
                });
                if (res.ok) {
                  router.push("/dashboard");
                  router.refresh();
                } else setError("Failed to delete");
              } catch {
                setError("Failed to delete");
              } finally {
                setSaving(false);
              }
            }}
            disabled={saving}
            className="ml-auto rounded-lg border border-red-200 bg-white px-4 py-2 font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            Delete listing
          </button>
        )}
      </div>
    </form>
  );
}
