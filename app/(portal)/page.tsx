import { Hero } from "@/components/portal/Hero";
import { StatsBar } from "@/components/portal/StatsBar";
import { SolutionsGrid } from "@/components/portal/SolutionsGrid";
import { AboutSection } from "@/components/portal/AboutSection";
import { FlagshipProjects } from "@/components/portal/FlagshipProjects";
import { CtaBanner } from "@/components/portal/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <SolutionsGrid />
      <AboutSection />
      <FlagshipProjects />
      <CtaBanner />
    </>
  );
}
