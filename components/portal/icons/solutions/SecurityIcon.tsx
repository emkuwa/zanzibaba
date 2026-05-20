import { NAVY, strokeProps } from "./constants";

export function SecurityIcon({ className = "h-14 w-14" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M32 8c11 4.5 17.5 7.5 19 8.5v15c0 11.5-8.5 19-19 23-10.5-4-19-11.5-19-23V16.5C14.5 15.5 21 12.5 32 8z"
      />
      <rect {...strokeProps} stroke={NAVY} x="25" y="30" width="14" height="12" rx="2" />
      <path
        {...strokeProps}
        stroke={NAVY}
        d="M27.5 30v-3.5a4.5 4.5 0 019 0V30"
      />
      <circle cx="32" cy="36" r="1.75" fill={NAVY} stroke="none" />
    </svg>
  );
}
