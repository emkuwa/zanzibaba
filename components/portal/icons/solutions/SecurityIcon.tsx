import { GOLD, NAVY, strokeProps } from "./constants";

export function SecurityIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 9c10 4 16 7 18 8v14c0 11-8 18-18 22-10-4-18-11-18-22V17c2-1 8-4 18-8z"
      />
      <rect
        {...strokeProps}
        stroke={GOLD}
        x="26"
        y="28"
        width="12"
        height="10"
        rx="1.5"
      />
      <path
        {...strokeProps}
        stroke={GOLD}
        d="M28 28v-3a4 4 0 018 0v3"
      />
      <circle cx="32" cy="33" r="1.5" fill={GOLD} stroke="none" />
    </svg>
  );
}
