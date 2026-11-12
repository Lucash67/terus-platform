import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ErpTickerSection } from "@/components/sections/erp-ticker-section";
import { IntegrationsEcosystemSection } from "@/components/sections/integrations-ecosystem-section";
import { PageHero } from "@/components/sections/page-hero";
import { ReliabilitySection } from "@/components/sections/reliability-section";
import { SecuritySection } from "@/components/sections/security-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Integrações e requisitos técnicos",
  description:
    "ERPs documentados (RMS, Consinco, VR Software, CISS Poder, RPInfo, API REST; Winthor, Sankhya e VitSis do lado do fornecedor), captura só leitura e sem VPN.",
  path: "/integracoes",
});

export default function IntegracoesPage() {
  return (
    <>
      <PageHero
        badge="Integrações"
        title="Conectamos ao ERP"
        titleAccent="que você já usa"
        description="Captura só leitura do banco ou da API do ERP da rede, sem VPN, e gravação do pedido no ERP do fornecedor."
      />
      <ErpTickerSection />
      <IntegrationsEcosystemSection />
      <SecuritySection />
      <ReliabilitySection />
      <CtaSection />
    </>
  );
}
