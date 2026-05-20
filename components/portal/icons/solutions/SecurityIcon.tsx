import { strokeProps } from "./constants";

export function SecurityIcon({ className = "h-14 w-14 text-zb-navy" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        {...strokeProps}
        d="M32 6c12 5 20 8 22 9v16c0 12-9.5 20.5-22 24C9.5 51.5 10 41 10 31V15c2-1 10-4 22-9z"
      />
      <rect {...strokeProps} x="24" y="28" width="16" height="14" rx="2" />
      <path {...strokeProps} d="M27 28v-4a5 5 0 0110 0v4" />
      <circle cx="32" cy="35" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
