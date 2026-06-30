import { CtaSection } from "@/components/sections/cta-section";
import { InstitutionalContentSection } from "@/components/sections/institutional-content-section";
import { EducationalContentSection } from "@/components/sections/educational-content-section";
import { ModulesContentSection } from "@/components/sections/modules-content-section";
import { CasesResultsSection } from "@/components/sections/cases-results-section";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Conteúdos | Terus Platform",
  description:
    "Materiais sobre operação, monitoramento, automação e inteligência operacional para varejos e distribuidores.",
};

export default function ConteudosPage() {
  return (
    <>
      <section className="border-t border-surface-border bg-surface-elevated-1">
        <Container className="py-20 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Conteúdo
            </p>
            <h1 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              Conhecimento operacional Terus
            </h1>
            <p className="mt-4 text-body-lg text-text-secondary">
              Pilares da plataforma, módulos integrados e cases com resultados
              validados — tudo o que você precisa para entender a jornada
              operacional Terus.
            </p>
          </div>
        </Container>
      </section>

      <InstitutionalContentSection />
      <EducationalContentSection />
      <ModulesContentSection />
      <CasesResultsSection />
      <CtaSection />
    </>
  );
}
