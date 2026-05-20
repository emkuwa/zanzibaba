import { GOLD, NAVY, strokeProps } from "./constants";

export function LandscapingIcon({
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
      <path {...strokeProps} stroke={NAVY} d="M32 44V28" />
      <path
        {...strokeProps}
        stroke={GOLD}
        d="M32 28c-8-6-14-4-14 2s6 10 14 4"
      />
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 24c-6-8-12-6-12 0s6 8 12 2"
      />
      <path
        {...strokeProps}
        stroke={GOLD}
        d="M32 20c8-6 14-4 14 2s-6 10-14 4"
      />
      <path {...strokeProps} stroke={NAVY} d="M10 50c8-4 16-4 24 0s16 4 24 0" />
      <path
        {...strokeProps}
        stroke={NAVY}
        strokeOpacity={0.45}
        d="M8 54c10-2 20-2 30 0s20 2 30 0"
      />
    </svg>
  );
}
