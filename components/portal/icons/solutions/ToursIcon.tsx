import { GOLD, NAVY, strokeProps } from "./constants";

export function ToursIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <circle cx="48" cy="16" r="7" stroke={GOLD} strokeWidth={2} />
      <path
        {...strokeProps}
        stroke={GOLD}
        d="M48 9v2M48 21v2M41 16h2M53 16h2M43.5 11.5l1.4 1.4M52.1 20.1l1.4 1.4M43.5 20.5l1.4-1.4M52.1 11.9l1.4-1.4"
      />
      <path {...strokeProps} stroke={NAVY} d="M18 48V30" />
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M18 30c-6-2-10 0-12 4M18 26c4-6 10-8 14-4M18 34c6 2 12 0 14-4"
      />
      <path {...strokeProps} stroke={NAVY} d="M8 50c6-3 12-3 18 0s12 3 18 0s12-3 18 0" />
      <path
        {...strokeProps}
        stroke={NAVY}
        strokeOpacity={0.45}
        d="M6 54c8-2 16-2 24 0s16 2 24 0"
      />
    </svg>
  );
}
