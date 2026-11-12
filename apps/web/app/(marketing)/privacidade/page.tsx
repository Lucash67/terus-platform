import type { Metadata } from "next";

import { LegalDocument } from "@/components/sections/legal-document";
import { LEGAL_VERSION, PRIVACY_SECTIONS } from "@/lib/constants/legal";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidade",
  description:
    "Como a Terus trata os dados pessoais do site e do cadastro online (LGPD).",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <LegalDocument
      title="Política de Privacidade"
      version={LEGAL_VERSION}
      sections={PRIVACY_SECTIONS}
    />
  );
}
