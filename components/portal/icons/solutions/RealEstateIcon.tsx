import { strokeProps } from "./constants";

export function RealEstateIcon({ className = "h-14 w-14 text-zb-navy" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path {...strokeProps} d="M8 48V34h9v14" />
      <path {...strokeProps} d="M19 48V36h9v12" />
      <path {...strokeProps} d="M18 36l4.5-5 4.5 5" />
      <path {...strokeProps} d="M30 48V28h9v20" />
      <path {...strokeProps} d="M29 28l4.5-6 4.5 6" />
      <path {...strokeProps} d="M41 48V22h10v26" />
      <path {...strokeProps} d="M6 48h52" />
    </svg>
  );
}
