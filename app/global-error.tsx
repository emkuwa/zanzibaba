"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#07245A] px-6 text-center text-white">
        <h1 className="text-2xl font-semibold">Zanzibaba Real Estate</h1>
        <p className="mt-3 max-w-md text-white/80">An unexpected error occurred.</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-[4px] bg-[#C89B3C] px-6 py-3 text-sm font-medium text-[#07245A]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
