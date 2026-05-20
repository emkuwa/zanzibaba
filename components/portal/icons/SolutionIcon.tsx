import Image from "next/image";
import type { SolutionSlug } from "@/data/solutions";

const ICONS: Record<SolutionSlug, string> = {
  security: "/brand/icons/solutions/security.png",
  "real-estate": "/brand/icons/solutions/real-estate.png",
  tours: "/brand/icons/solutions/tours.png",
  "digital-marketing": "/brand/icons/solutions/digital-marketing.png",
  construction: "/brand/icons/solutions/construction.png",
  "building-materials": "/brand/icons/solutions/building-materials.png",
  landscaping: "/brand/icons/solutions/landscaping.png",
};

export function SolutionIcon({
  slug,
  className = "h-14 w-14",
}: {
  slug: SolutionSlug;
  className?: string;
}) {
  return (
    <Image
      src={ICONS[slug]}
      alt=""
      aria-hidden
      width={64}
      height={64}
      className={className}
    />
  );
}
