import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/cta-section";
import { PageHero } from "@/components/sections/page-hero";
import { RedeTerusSection } from "@/components/sections/rede-terus-section";
import { SupplierBridgeSection } from "@/components/sections/supplier-bridge-section";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Para indústrias e distribuidores",
  description:
    "Portal do Fornecedor: alertas e sell-out dos seus SKUs em cada rede e pedidos do varejo gravados direto no seu ERP (Winthor, Sankhya, VitSis).",
  path: "/industria-distribuidores",
});

export default function IndustriaDistribuidoresPage() {
  return (
    <>
      <PageHero
        badge="Indústria e distribuidores"
        title="Seus produtos dentro de cada gôndola"
        titleAccent="e o pedido direto no seu ERP"
        description="O Portal do Fornecedor mostra alertas e sell-out dos seus SKUs em cada varejo parceiro e recebe os pedidos aprovados."
      />
      <SupplierBridgeSection />
      <RedeTerusSection />
      <CtaSection />
    </>
  );
}
