import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contato — falar com especialista",
  description:
    "Fale com a equipe comercial da Terus pelo WhatsApp ou registre a sua empresa no cadastro pela internet.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <PageHero
        badge="Contato"
        title="Fale com quem conhece"
        titleAccent="a sua operação"
        description="Escolha o canal. A equipe comercial da Terus retoma com você o próximo passo."
      />
      <ContactSection />
      <FaqSection />
    </>
  );
}
