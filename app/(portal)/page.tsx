import { HomeHero } from "@/components/portal/HomeHero";
import { StatsBar } from "@/components/portal/StatsBar";
import { SolutionsGrid } from "@/components/portal/SolutionsGrid";
import { AboutSection } from "@/components/portal/AboutSection";
import { PortfolioSection } from "@/components/portal/PortfolioSection";
import { CorporateVision } from "@/components/portal/CorporateVision";
import { StrategicSectors } from "@/components/portal/StrategicSectors";
import { FlagshipProjects } from "@/components/portal/FlagshipProjects";
import { InvestmentOpportunities } from "@/components/portal/InvestmentOpportunities";
import { Partnerships } from "@/components/portal/Partnerships";
import { CorporateTimeline } from "@/components/portal/CorporateTimeline";
import { SectionAccent } from "@/components/portal/SectionAccent";
import { CtaBanner } from "@/components/portal/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatsBar />
      <SolutionsGrid />
      <SectionAccent variant="light" />
      <AboutSection />
      <SectionAccent variant="dark" />
      <PortfolioSection />
      <CorporateVision />
      <StrategicSectors />
      <FlagshipProjects />
      <SectionAccent variant="gold" />
      <InvestmentOpportunities />
      <Partnerships />
      <CorporateTimeline />
      <CtaBanner />
    </>
  );
}
