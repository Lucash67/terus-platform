import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { PainSection } from "@/components/sections/pain-section";
import { PersonasSection } from "@/components/sections/personas-section";
import { RealResultsSection } from "@/components/sections/real-results-section";
import { TaskAppSection } from "@/components/sections/task-app-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Para o varejo — diretoria, comprador e loja",
  description:
    "Alertas de ruptura, excesso e margem, mesa do comprador e app da loja priorizado por R$ — conectados ao ERP que a rede já usa.",
  path: "/varejo",
});

export default function VarejoPage() {
  return (
    <>
      <PageHero
        badge="Varejo"
        title="Cada área vê o que precisa"
        titleAccent="para agir hoje"
        description="Diretoria, comprador e loja trabalham sobre o mesmo dado da rede, cada um com o próprio recorte."
      />
      <PainSection />
      <PersonasSection />
      <TaskAppSection />
      <RealResultsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
