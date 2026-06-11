import { CtaSection } from "@/components/sections/cta-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PositioningSection } from "@/components/sections/positioning-section";
import { StatsSection } from "@/components/sections/stats-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PositioningSection />
      <ModulesSection />
      <EcosystemSection />
      <CtaSection />
    </>
  );
}
