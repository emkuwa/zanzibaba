import { HomeHero } from "@/components/portal/HomeHero";
import { StatsBar } from "@/components/portal/StatsBar";
import { SolutionsGrid } from "@/components/portal/SolutionsGrid";
import { AboutSection } from "@/components/portal/AboutSection";
import { PortfolioSection } from "@/components/portal/PortfolioSection";
import { CtaBanner } from "@/components/portal/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBar />
      <SolutionsGrid />
      <AboutSection />
      <PortfolioSection />
      <CtaBanner />
    </>
  );
}
