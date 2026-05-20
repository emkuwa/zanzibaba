import { GOLD, NAVY, strokeProps } from "./constants";

export function ConstructionIcon({
  className = "h-14 w-14",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path {...strokeProps} stroke={NAVY} d="M18 48V16" />
      <path {...strokeProps} stroke={NAVY} d="M18 16h30" />
      <path {...strokeProps} stroke={NAVY} d="M48 16v6" />
      <path {...strokeProps} stroke={GOLD} d="M18 22l30-6" />
      <path {...strokeProps} stroke={GOLD} d="M44 22v14" />
      <path {...strokeProps} stroke={GOLD} d="M44 36h4" />
      <rect
        {...strokeProps}
        stroke={NAVY}
        x="38"
        y="40"
        width="12"
        height="8"
        rx="1"
      />
    </svg>
  );
}
