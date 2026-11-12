import type { Metadata } from "next";

import { LegalDocument } from "@/components/sections/legal-document";
import { LEGAL_VERSION, TERMS_SECTIONS } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Termos de Uso",
  description: "Condições de uso do site e do cadastro online da Terus.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <LegalDocument
      title="Termos de Uso"
      version={LEGAL_VERSION}
      sections={TERMS_SECTIONS}
    />
  );
}
