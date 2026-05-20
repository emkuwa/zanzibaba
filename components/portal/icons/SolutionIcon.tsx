import type { ComponentType } from "react";
import type { SolutionSlug } from "@/data/solutions";
import {
  BuildingMaterialsIcon,
  ConstructionIcon,
  DigitalMarketingIcon,
  LandscapingIcon,
  RealEstateIcon,
  SecurityIcon,
  ToursIcon,
} from "./solutions";

const icons: Record<SolutionSlug, ComponentType<{ className?: string }>> = {
  security: SecurityIcon,
  "real-estate": RealEstateIcon,
  tours: ToursIcon,
  "digital-marketing": DigitalMarketingIcon,
  construction: ConstructionIcon,
  "building-materials": BuildingMaterialsIcon,
  landscaping: LandscapingIcon,
};

export function SolutionIcon({
  slug,
  className = "h-14 w-14",
}: {
  slug: SolutionSlug;
  className?: string;
}) {
  const Icon = icons[slug];
  return <Icon className={`text-zb-navy ${className}`} />;
}
