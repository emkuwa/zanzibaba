import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "./Button";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1590073242678-70ee3fc28d8b?w=2400&q=85&auto=format&fit=crop";

interface HeroProps {
  title?: ReactNode;
  subtitle?: string;
  image?: string;
  compact?: boolean;
  children?: ReactNode;
}

export function Hero({
  title,
  subtitle,
  image = HERO_IMAGE,
  compact = false,
  children,
}: HeroProps) {
  const minH = compact ? "min-h-[42vh]" : "min-h-[88vh]";

  return (
    <section className={`relative flex ${minH} items-center overflow-hidden bg-zb-navy-deep`}>
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zb-navy-deep/95 via-zb-navy/80 to-zb-navy-deep/40"
        aria-hidden
      />
      <div className="container-portal relative z-10 py-24 sm:py-32">
        {children ?? (
          <>
            <h1 className="max-w-4xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title ?? (
                <>
                  <span className="text-white">BUILDING TODAY,</span>
                  <br />
                  <span className="text-zb-gold">EMPOWERING TOMORROW.</span>
                </>
              )}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                {subtitle}
              </p>
            )}
            {!compact && !children && (
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/solutions" variant="primary" size="lg">
                  Our Solutions
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Get in Touch
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
