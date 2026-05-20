import { strokeProps } from "./constants";

export function ConstructionIcon({
  className = "h-14 w-14 text-zb-navy",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path {...strokeProps} d="M12 52h40" />
      <path {...strokeProps} d="M26 52V20" />
      <path {...strokeProps} d="M22 26l8 8M22 34l8 8M22 42l8 8M30 26l-8 8M30 34l-8 8M30 42l-8 8" />
      <path {...strokeProps} d="M26 20h32" />
      <rect {...strokeProps} x="12" y="16" width="9" height="9" rx="1" />
      <path {...strokeProps} d="M21 20h5" />
      <path {...strokeProps} d="M26 20L36 10L56 20" />
      <path {...strokeProps} d="M36 10v10" />
      <path {...strokeProps} d="M50 20v14" />
      <path {...strokeProps} d="M48 36h4" />
      <rect {...strokeProps} x="45" y="38" width="10" height="10" rx="1" />
    </svg>
  );
}
