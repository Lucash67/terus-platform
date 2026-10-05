import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { ModulesSection } from "@/components/sections/modules-section";
import { PageHero } from "@/components/sections/page-hero";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Módulos Terus — Operação Integrada",
  description:
    "Alert, Order, Task e Strategy formam o ciclo da gôndola; Unitization, Production, Chain e Vitrine expandem para logística, produção, fornecedores e exposição.",
  path: "/modulos",
});

export default function ModulosPage() {
  return (
    <>
      <PageHero
        badge="Operação"
        title="Oito módulos, um só portal para"
        titleAccent="rede, loja e fornecedor"
        description="Comece pelo ciclo de detectar, executar e medir. Expanda para logística, produção própria, fornecedores e exposição quando a operação pedir."
      />
      <ModulesSection />
      <CtaSection />
    </>
  );
}
