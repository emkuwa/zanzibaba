import { strokeProps } from "./constants";

export function DigitalMarketingIcon({
  className = "h-14 w-14 text-zb-navy",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <rect {...strokeProps} x="8" y="12" width="44" height="30" rx="2" />
      <path {...strokeProps} d="M22 46h20M32 42v4" />
      <path {...strokeProps} d="M16 38V34M22 38V28M28 38V32M34 38V24" />
      <path {...strokeProps} d="M38 34l6-8 6-8 6-8" />
      <path {...strokeProps} d="M48 10h6v6" />
    </svg>
  );
}
