import Image from "next/image";
import Link from "next/link";
import type { Solution } from "@/data/solutions";
import { Card } from "./Card";

interface SolutionCardProps {
  solution: Solution;
}

export function SolutionCard({ solution }: SolutionCardProps) {
  const href = solution.externalUrl ?? `/solutions/${solution.slug}`;
  const external = Boolean(solution.externalUrl);

  return (
    <Card as="article" className="group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-zb-md">
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex h-full flex-col p-6 sm:p-8"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-zb-surface">
          <Image
            src={solution.logo}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            aria-hidden
          />
        </div>
        <h3 className="font-serif text-xl font-semibold text-zb-navy group-hover:text-zb-gold transition-colors">
          {solution.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zb-muted">
          {solution.shortDescription}
        </p>
        <span className="mt-6 text-sm font-medium text-zb-navy group-hover:text-zb-gold transition-colors">
          Explore →
        </span>
      </Link>
    </Card>
  );
}
