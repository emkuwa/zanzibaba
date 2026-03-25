import Image from "next/image";
import { Suspense } from "react";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section
      className="relative isolate min-h-[min(70vh,560px)] overflow-hidden px-4 py-20 sm:py-28"
      aria-label="Find your property in Zanzibar"
    >
      <Image
        src="/images/hero-zanzibar.png"
        alt="Sunrise over turquoise water with a dhow and palm-lined beach in Zanzibar"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Dark gradient so headline and search stay readable on bright sky and sand */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60"
        aria-hidden
      />
      <div className="container-tight relative z-10">
        <h1 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
          Find land & property in Zanzibar
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-white/95 drop-shadow-sm">
          Plots, villas, and homes in Paje, Nungwi, Kendwa and across the island. Your trusted partner for real estate in Zanzibar.
        </p>
        <div className="mx-auto mt-8 flex justify-center">
          <Suspense fallback={<div className="h-12 w-full max-w-xl rounded-xl bg-white/10" />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
