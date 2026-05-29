"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zb-surface px-6 text-center">
      <h1 className="font-serif text-3xl font-semibold text-zb-navy">Something went wrong</h1>
      <p className="mt-3 max-w-md text-zb-muted">
        The page could not load. Try again or return to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-[4px] bg-zb-navy px-6 py-3 text-sm font-medium text-white hover:bg-zb-navy-deep"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-[4px] border border-zb-border bg-white px-6 py-3 text-sm font-medium text-zb-navy hover:bg-zb-surface"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
