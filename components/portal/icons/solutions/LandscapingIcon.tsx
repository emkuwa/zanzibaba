import { strokeProps } from "./constants";

export function LandscapingIcon({
  className = "h-14 w-14 text-zb-navy",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path {...strokeProps} d="M32 52V32" />
      <path {...strokeProps} d="M32 32C27 24 27 14 32 8C37 14 37 24 32 32Z" />
      <path {...strokeProps} d="M32 32V10" />
      <path {...strokeProps} d="M32 36C22 34 14 28 10 22C18 26 26 32 32 36Z" />
      <path {...strokeProps} d="M32 36L14 24" />
      <path {...strokeProps} d="M32 36C42 34 50 28 54 22C46 26 38 32 32 36Z" />
      <path {...strokeProps} d="M32 36L50 24" />
      <path {...strokeProps} d="M6 52C16 46 24 48 32 52C40 56 48 54 58 52" />
      <path {...strokeProps} d="M10 56C18 52 26 54 34 56C42 58 50 56 58 54" />
    </svg>
  );
}
