"use client";

import type { ReactNode } from "react";

const size = 16;

function Svg({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      {children}
    </svg>
  );
}

type IconDef = { label: string; svg: ReactNode };

/** Lowercase keys; match longest substring first */
const ICONS: Record<string, IconDef> = {
  "for rent": {
    label: "For rent",
    svg: (
      <Svg>
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6zm0 2.2l6 4.5V19h-1v-7H7v7H6v-9.3l6-4.5z" />
      </Svg>
    ),
  },
  rent: {
    label: "Rent",
    svg: (
      <Svg>
        <path d="M12 3L4 9v12h5v-7h6v7h5V9l-8-6z" />
      </Svg>
    ),
  },
  "for sale": {
    label: "For sale",
    svg: (
      <Svg>
        <path d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12-1h-2V7h-2v6h-2l3 4 3-4zM4 19h16v2H4v-2z" />
      </Svg>
    ),
  },
  sale: {
    label: "Sale",
    svg: (
      <Svg>
        <path d="M7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12-1h-2V7h-2v6h-2l3 4 3-4zM4 19h16v2H4v-2z" />
      </Svg>
    ),
  },
  ensuite: {
    label: "Ensuite",
    svg: (
      <Svg>
        <path d="M8 5h2v2H8V5zm0 4h2v2H8V9zm-2 4h12v2H6v-2zm2 4h8v2H8v-2zM21 3H3v2h18V3zm-2 4H5v12h14V7z" />
      </Svg>
    ),
  },
  "en-suite": {
    label: "Ensuite",
    svg: (
      <Svg>
        <path d="M8 5h2v2H8V5zm0 4h2v2H8V9zm-2 4h12v2H6v-2zm2 4h8v2H8v-2zM21 3H3v2h18V3zm-2 4H5v12h14V7z" />
      </Svg>
    ),
  },
  unfurnished: {
    label: "Unfurnished",
    svg: (
      <Svg>
        <path d="M20 9V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h16zM6 20h3v-6H6v6zm9 0h3v-6h-3v6zm-9-8v2h12v-2H6zM4 22h16v2H4v-2z" />
      </Svg>
    ),
  },
  "semi-furnished": {
    label: "Semi-furnished",
    svg: (
      <Svg>
        <path d="M4 10h16v4H4v-4zm2 6h5v4H6v-4zm7 0h5v4h-5v-4zM6 4h12v4H6V4z" />
      </Svg>
    ),
  },
  "semi furnished": {
    label: "Semi-furnished",
    svg: (
      <Svg>
        <path d="M4 10h16v4H4v-4zm2 6h5v4H6v-4zm7 0h5v4h-5v-4zM6 4h12v4H6V4z" />
      </Svg>
    ),
  },
  fence: {
    label: "Fence",
    svg: (
      <Svg>
        <path d="M4 8h2v8H4V8zm3 0h2v8H7V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zM2 18h20v2H2v-2z" />
      </Svg>
    ),
  },
  fenced: {
    label: "Fenced",
    svg: (
      <Svg>
        <path d="M4 8h2v8H4V8zm3 0h2v8H7V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zm3 0h2v8h-2V8zM2 18h20v2H2v-2z" />
      </Svg>
    ),
  },
  gated: {
    label: "Gated",
    svg: (
      <Svg>
        <path d="M6 22h12v-2H6v2zm6-18l-6 3v5c0 3.3 2.7 6 6 6s6-2.7 6-6V7l-6-3zm0 2.2l4 2v3.8c0 2.2-1.8 4-4 4s-4-1.8-4-4V8.2l4-2z" />
      </Svg>
    ),
  },
  "title documents": {
    label: "Title documents",
    svg: (
      <Svg>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </Svg>
    ),
  },
  "title deed": {
    label: "Title deed",
    svg: (
      <Svg>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </Svg>
    ),
  },
  survey: {
    label: "Survey",
    svg: (
      <Svg>
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 12h2v5H7v-5zm4-3h2v8h-2V9zm4-5h2v13h-2V4z" />
      </Svg>
    ),
  },
  "clear title": {
    label: "Clear title",
    svg: (
      <Svg>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </Svg>
    ),
  },
  documents: {
    label: "Documents",
    svg: (
      <Svg>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </Svg>
    ),
  },
  parking: {
    label: "Parking",
    svg: (
      <Svg>
        <path d="M5 3h14v2H5V3zm0 4h14v14H5V7zm2 2v10h10V9H7zm2 2h6v2H9v-2zm0 4h6v2H9v-2z" />
      </Svg>
    ),
  },
  garage: {
    label: "Garage",
    svg: (
      <Svg>
        <path d="M22 9V7l-10-4-10 4v2h20zm-18 2v10h4v-6h8v6h4V11H4zm6 10v-4h4v4h-4z" />
      </Svg>
    ),
  },
  security: {
    label: "Security",
    svg: (
      <Svg>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v7.8z" />
      </Svg>
    ),
  },
  wifi: {
    label: "Wi‑Fi",
    svg: (
      <Svg>
        <path d="M12 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-5.3-4.3l1.4 1.4c1.9-1.9 5.1-1.9 7 0l1.4-1.4c-2.7-2.7-7.1-2.7-9.8 0zm-2.8-2.8l1.4 1.4c3.5-3.5 9.1-3.5 12.6 0l1.4-1.4c-4.3-4.3-11.3-4.3-15.6 0zm-2.8-2.8l1.4 1.4c5.1-5.1 13.3-5.1 18.4 0l1.4-1.4C15.4 2.7 8.6 2.7 1.1 8.1z" />
      </Svg>
    ),
  },
  kitchen: {
    label: "Kitchen",
    svg: (
      <Svg>
        <path d="M8 5h8v4H8V5zM6 11h12v2H6v-2zm2 4h8v6H8v-6zm2 2v2h4v-2h-4z" />
      </Svg>
    ),
  },
  balcony: {
    label: "Balcony",
    svg: (
      <Svg>
        <path d="M2 20h20v2H2v-2zm2-2h4v-6H4v6zm6 0h4V8h-4v10zm6 0h4V4h-4v14z" />
      </Svg>
    ),
  },
  terrace: {
    label: "Terrace",
    svg: (
      <Svg>
        <path d="M2 20h20v2H2v-2zm2-2h4v-6H4v6zm6 0h4V8h-4v10zm6 0h4V4h-4v14z" />
      </Svg>
    ),
  },
  elevator: {
    label: "Elevator",
    svg: (
      <Svg>
        <path d="M7 3h10v18H7V3zm2 2v11h6V5H9zm3 13l2 2 2-2h-4zM12 2L10 4h4l-2-2z" />
      </Svg>
    ),
  },
  lift: {
    label: "Lift",
    svg: (
      <Svg>
        <path d="M7 3h10v18H7V3zm2 2v11h6V5H9zm3 13l2 2 2-2h-4zM12 2L10 4h4l-2-2z" />
      </Svg>
    ),
  },
  borehole: {
    label: "Borehole",
    svg: (
      <Svg>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
      </Svg>
    ),
  },
  septic: {
    label: "Septic",
    svg: (
      <Svg>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z" />
      </Svg>
    ),
  },
  water: {
    label: "Water",
    svg: (
      <Svg>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
      </Svg>
    ),
  },
  electricity: {
    label: "Electricity",
    svg: (
      <Svg>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </Svg>
    ),
  },
  "near beach": {
    label: "Near beach",
    svg: (
      <Svg>
        <path d="M15.54 10.5c.55 0 .99.45.99 1s-.44 1-.99 1H8.46c-.55 0-.99-.45-.99-1s.44-1 .99-1h7.08zM12 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm6 8H6c-1.1 0-2 .9-2 2v6h16v-6c0-1.1-.9-2-2-2z" />
      </Svg>
    ),
  },
  beach: {
    label: "Beach",
    svg: (
      <Svg>
        <path d="M15.54 10.5c.55 0 .99.45.99 1s-.44 1-.99 1H8.46c-.55 0-.99-.45-.99-1s.44-1 .99-1h7.08zM12 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 2c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm6 8H6c-1.1 0-2 .9-2 2v6h16v-6c0-1.1-.9-2-2-2z" />
      </Svg>
    ),
  },
  pool: {
    label: "Pool",
    svg: (
      <Svg>
        <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </Svg>
    ),
  },
  "swimming pool": {
    label: "Swimming pool",
    svg: (
      <Svg>
        <path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </Svg>
    ),
  },
  garden: {
    label: "Garden",
    svg: (
      <Svg>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </Svg>
    ),
  },
  furnished: {
    label: "Furnished",
    svg: (
      <Svg>
        <path d="M20 9V6c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3h16zM6 22h3v-6H6v6zm9 0h3v-6h-3v6zm-9-8v2h12v-2H6z" />
      </Svg>
    ),
  },
  "sea view": {
    label: "Sea view",
    svg: (
      <Svg>
        <path d="M2 13h3v2H2v-2zm4 2h12v2H6v-2zm-4-6h2v2H2V9zm3 2h2v2H5v-2zm2-4h2v2H7V7zm2 0h6v2H9V7zm6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-6h2v2h-2V7zm2 2h2v2h-2V9z" />
      </Svg>
    ),
  },
  "road access": {
    label: "Road access",
    svg: (
      <Svg>
        <path d="M18 4H6v2l4 4H6v2h4.5l-2.5 6h2l2.5-6H18V10h-4l4-4V4z" />
      </Svg>
    ),
  },
  quiet: {
    label: "Quiet",
    svg: (
      <Svg>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </Svg>
    ),
  },
  "air conditioning": {
    label: "Air conditioning",
    svg: (
      <Svg>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
      </Svg>
    ),
  },
  ac: {
    label: "AC",
    svg: (
      <Svg>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
      </Svg>
    ),
  },
  bedroom: {
    label: "Bedroom",
    svg: (
      <Svg>
        <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3H2v9h2v-2h16v2h2v-9h-2zm-2 0H6V7h12v3zM4 22h16v2H4v-2z" />
      </Svg>
    ),
  },
  bathroom: {
    label: "Bathroom",
    svg: (
      <Svg>
        <path d="M8 5h2v3H8V5zm4 0h2v3h-2V5zM5 9h14v2H5V9zm-2 4h18v8H3v-8zm2 2v4h14v-4H5z" />
      </Svg>
    ),
  },
  "square meter": {
    label: "m²",
    svg: (
      <Svg>
        <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm14 0h7v7h-7v-2h5v-5h-2v-2z" />
      </Svg>
    ),
  },
  sqm: {
    label: "m²",
    svg: (
      <Svg>
        <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm14 0h7v7h-7v-2h5v-5h-2v-2z" />
      </Svg>
    ),
  },
  "m²": {
    label: "m²",
    svg: (
      <Svg>
        <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm14 0h7v7h-7v-2h5v-5h-2v-2z" />
      </Svg>
    ),
  },
  plot: {
    label: "Plot",
    svg: (
      <Svg>
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7z" />
      </Svg>
    ),
  },
  land: {
    label: "Land",
    svg: (
      <Svg>
        <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7z" />
      </Svg>
    ),
  },
  corner: {
    label: "Corner",
    svg: (
      <Svg>
        <path d="M3 3h8v8H3V3zm10 10h8v8h-8v-8zM13 3h8v8h-8V3zM3 13h8v8H3v-8z" />
      </Svg>
    ),
  },
};

const SORTED_KEYS = Object.keys(ICONS).sort((a, b) => b.length - a.length);

function IconDefault() {
  return (
    <Svg>
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </Svg>
  );
}

const BED_SVG = (
  <Svg>
    <path d="M20 10V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3H2v9h2v-2h16v2h2v-9h-2zm-2 0H6V7h12v3zM4 22h16v2H4v-2z" />
  </Svg>
);

const BATH_SVG = (
  <Svg>
    <path d="M8 5h2v3H8V5zm4 0h2v3h-2V5zM5 9h14v2H5V9zm-2 4h18v8H3v-8zm2 2v4h14v-4H5z" />
  </Svg>
);

const AREA_SVG = (
  <Svg>
    <path d="M3 3h7v2H5v5H3V3zm11 0h7v7h-2V5h-5V3zM3 14h2v5h5v2H3v-7zm14 0h7v7h-7v-2h5v-5h-2v-2z" />
  </Svg>
);

/**
 * Map a feature string to an icon + display label (label is usually the original text).
 */
export function resolveFeatureIcon(feature: string): { label: string; svg: ReactNode } {
  const trimmed = feature.trim();
  const lower = trimmed.toLowerCase();

  const exact = ICONS[lower];
  if (exact) return { label: exact.label, svg: exact.svg };

  for (const key of SORTED_KEYS) {
    if (lower.includes(key)) {
      return { label: trimmed, svg: ICONS[key].svg };
    }
  }

  const bed = trimmed.match(/^(\d+)\s*(bedroom|bedrooms|br)\b/i);
  if (bed) return { label: trimmed, svg: BED_SVG };

  const bath = trimmed.match(/^(\d+)\s*(bathroom|bathrooms|bath)\b/i);
  if (bath) return { label: trimmed, svg: BATH_SVG };

  const area = trimmed.match(/^([\d,.]+)\s*(m²|m2|sqm|sq\.?\s*m)\b/i);
  if (area) return { label: trimmed, svg: AREA_SVG };

  return { label: trimmed, svg: <IconDefault /> };
}

export function FeatureIconChip({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const { svg, label } = resolveFeatureIcon(text);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg bg-sand-100 px-2 py-1 text-xs font-medium text-sand-700 ${className}`}
      title={label}
    >
      {svg}
      <span>{label}</span>
    </span>
  );
}

export function FeatureIcons({
  features,
  className = "",
  max = 12,
}: {
  features: string[];
  className?: string;
  max?: number;
}) {
  return (
    <>
      {features.slice(0, max).map((f, i) => (
        <FeatureIconChip key={`${f}-${i}`} text={f} className={className} />
      ))}
    </>
  );
}
