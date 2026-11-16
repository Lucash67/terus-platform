import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ErpTickerSection } from "@/components/sections/erp-ticker-section";
import { IntegrationsEcosystemSection } from "@/components/sections/integrations-ecosystem-section";
import { PageHero } from "@/components/sections/page-hero";
import { PersonasSection } from "@/components/sections/personas-section";
import { SupplierBridgeSection } from "@/components/sections/supplier-bridge-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Ecossistema: varejo, loja e fornecedor",
  description:
    "Rede, loja, indústria e distribuidor olhando para o mesmo problema — do alerta na gôndola ao pedido gravado no ERP do fornecedor.",
  path: "/ecossistema",
});

export default function EcossistemaPage() {
  return (
    <>
      <PageHero
        badge="Ecossistema"
        title="Varejo e fornecedor"
        titleAccent="olhando para o mesmo problema"
        description="A rede encontra o problema, a loja corrige e o fornecedor recebe o pedido direto no ERP dele — cada um com a sua visão do mesmo dado."
      />
      <SupplierBridgeSection />
      <PersonasSection />
      <IntegrationsEcosystemSection />
      <ErpTickerSection />
      <CtaSection />
    </>
  );
}
