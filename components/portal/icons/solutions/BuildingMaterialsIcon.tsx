import { strokeProps } from "./constants";

export function BuildingMaterialsIcon({
  className = "h-14 w-14 text-zb-navy",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path {...strokeProps} d="M10 40L19 31L28 40V47L19 51L10 47Z" />
      <path {...strokeProps} d="M10 40V47L19 51V44" />
      <path {...strokeProps} d="M28 40V47L19 51" />
      <path {...strokeProps} d="M34 40L43 31L52 40V47L43 51L34 47Z" />
      <path {...strokeProps} d="M34 40V47L43 51V44" />
      <path {...strokeProps} d="M52 40V47L43 51" />
      <path {...strokeProps} d="M22 20L31 11L40 20V27L31 31L22 27Z" />
      <path {...strokeProps} d="M22 20V27L31 31V24" />
      <path {...strokeProps} d="M40 20V27L31 31" />
    </svg>
  );
}
