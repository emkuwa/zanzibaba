import { GOLD, NAVY, strokeProps } from "./constants";

export function RealEstateIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path {...strokeProps} stroke={NAVY} d="M10 48V30l6-4 6 4v18" />
      <path {...strokeProps} stroke={GOLD} d="M10 30l6-5 6 5" />
      <path {...strokeProps} stroke={NAVY} d="M20 48V24l7-5 7 5v24" />
      <path {...strokeProps} stroke={GOLD} d="M20 24l7-6 7 6" />
      <path {...strokeProps} stroke={NAVY} d="M34 48V28l6-4 6 4v20" />
      <path {...strokeProps} stroke={GOLD} d="M34 28l6-5 6 5" />
      <path {...strokeProps} stroke={NAVY} d="M44 48V20l7-5 7 5v28" />
      <path {...strokeProps} stroke={GOLD} d="M44 20l7-6 7 6" />
      <path {...strokeProps} stroke={NAVY} d="M8 48h48" />
    </svg>
  );
}
