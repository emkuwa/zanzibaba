import { strokeProps } from "./constants";

export function ToursIcon({ className = "h-14 w-14 text-zb-navy" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path {...strokeProps} d="M20 52C20 42 22 32 28 22C30 18 32 14 34 10" />
      <path {...strokeProps} d="M34 10L30 4L34 8" />
      <path {...strokeProps} d="M34 10L22 6L30 10" />
      <path {...strokeProps} d="M34 10L34 2L36 8" />
      <path {...strokeProps} d="M34 10L46 6L38 10" />
      <path {...strokeProps} d="M34 10L42 14L36 12" />
      <circle {...strokeProps} cx="50" cy="12" r="7" />
      <path {...strokeProps} d="M6 48C14 44 22 50 30 46C38 42 46 50 54 46C58 44 60 48 58 50" />
      <path {...strokeProps} d="M8 52C16 48 24 54 32 50C40 46 48 54 56 50" />
    </svg>
  );
}
