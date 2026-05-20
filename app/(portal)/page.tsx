import { Hero } from "@/components/portal/Hero";
import { StatsBar } from "@/components/portal/StatsBar";
import { CorporateVision } from "@/components/portal/CorporateVision";
import { SolutionsGrid } from "@/components/portal/SolutionsGrid";
import { StrategicSectors } from "@/components/portal/StrategicSectors";
import { FlagshipProjects } from "@/components/portal/FlagshipProjects";
import { PortfolioShowcase } from "@/components/portal/PortfolioShowcase";
import { AboutSection } from "@/components/portal/AboutSection";
import { InvestmentOpportunities } from "@/components/portal/InvestmentOpportunities";
import { Partnerships } from "@/components/portal/Partnerships";
import { DigitalEstate } from "@/components/portal/DigitalEstate";
import { CtaBanner } from "@/components/portal/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <CorporateVision />
      <SolutionsGrid />
      <StrategicSectors />
      <FlagshipProjects />
      <PortfolioShowcase />
      <AboutSection />
      <InvestmentOpportunities />
      <Partnerships />
      <DigitalEstate />
      <CtaBanner />
    </>
  );
}
