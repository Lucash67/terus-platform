import type { Metadata } from "next";

import { Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Agendar Demonstração | Terus Platform",
  description:
    "Agende uma demonstração da Terus Platform e conheça como transformar sua operação de supply chain.",
};

export default function SolicitarDemoPage() {
  return (
    <>
      <PageHero
        badge="Demonstração"
        title="Agende uma demonstração da Terus Platform"
        description="A operação comercial da plataforma está em fase de estruturação. Em breve será possível solicitar demonstrações diretamente pelo ambiente Terus."
      />

      <section>
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-body-lg text-text-secondary">
              Enquanto estruturamos nossa operação comercial, você pode explorar
              a plataforma para entender como a Terus transforma a jornada
              operacional de seus clientes.
            </p>
            <Button className="mt-8" size="lg" asChild>
              <a
                href="https://wa.me/558596290044?text=Olá, gostaria de conhecer a Terus Platform e agendar uma demonstração."
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar com a equipe
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
