import { NAVY, strokeProps } from "./constants";

export function ToursIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M18 52 C18 42 20 32 26 22 C28 18 30 14 32 10"
      />
      <path {...strokeProps} stroke={NAVY} d="M32 10 L26 4 L32 8" />
      <path {...strokeProps} stroke={NAVY} d="M32 10 L20 8 L28 12" />
      <path {...strokeProps} stroke={NAVY} d="M32 10 L32 2 L34 8" />
      <path {...strokeProps} stroke={NAVY} d="M32 10 L44 8 L36 12" />
      <path {...strokeProps} stroke={NAVY} d="M32 10 L40 14 L34 12" />
      <circle {...strokeProps} stroke={NAVY} cx="48" cy="12" r="6" />
      <path {...strokeProps} stroke={NAVY} d="M6 50 C14 46 22 52 30 48 C38 44 46 52 54 48 C58 46 60 50 58 52" />
      <path {...strokeProps} stroke={NAVY} d="M8 54 C16 50 24 56 32 52 C40 48 48 56 56 52" />
    </svg>
  );
}
