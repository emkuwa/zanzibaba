import { GOLD, NAVY, strokeProps } from "./constants";

export function DigitalMarketingIcon({
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
      <rect
        {...strokeProps}
        stroke={NAVY}
        x="10"
        y="14"
        width="44"
        height="30"
        rx="2"
      />
      <path {...strokeProps} stroke={NAVY} d="M22 48h20M32 44v4" />
      <path {...strokeProps} stroke={NAVY} d="M20 38V30M28 38V26M36 38V32" />
      <path
        {...strokeProps}
        stroke={GOLD}
        d="M42 36l6-6M42 30h6v6"
      />
    </svg>
  );
}
