import { NAVY, strokeProps } from "./constants";

export function RealEstateIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      {/* Building 1 — short, flat roof */}
      <path {...strokeProps} stroke={NAVY} d="M10 50V36h10v14" />
      {/* Building 2 — medium, peaked roof */}
      <path {...strokeProps} stroke={NAVY} d="M22 50V38h10v12" />
      <path {...strokeProps} stroke={NAVY} d="M21 38l6-6 6 6" />
      {/* Building 3 — tall, peaked roof */}
      <path {...strokeProps} stroke={NAVY} d="M34 50V32h10v18" />
      <path {...strokeProps} stroke={NAVY} d="M33 32l6-7 6 7" />
      {/* Building 4 — tallest, flat roof */}
      <path {...strokeProps} stroke={NAVY} d="M46 50V24h10v26" />
      {/* Shared base extending past edges */}
      <path {...strokeProps} stroke={NAVY} d="M4 50h56" />
    </svg>
  );
}
