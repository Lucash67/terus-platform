import { CtaSection } from "@/components/sections/cta-section";
import { InstitutionalContentSection } from "@/components/sections/institutional-content-section";
import { EducationalContentSection } from "@/components/sections/educational-content-section";
import { ModulesContentSection } from "@/components/sections/modules-content-section";
import { CasesResultsSection } from "@/components/sections/cases-results-section";

export const metadata = {
  title: "Conteúdos | Terus Platform",
  description:
    "Vídeos, materiais e conteúdos sobre operação, monitoramento, automação e inteligência operacional para varejos e distribuidores.",
};

export default function ConteudosPage() {
  return (
    <>
      <section className="border-t border-surface-border bg-surface-elevated-1">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:py-24">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Conteúdo
          </p>
          <h1 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Aprenda com a Terus
          </h1>
          <p className="mt-4 text-body-lg text-text-secondary">
            Uma biblioteca preparada para reunir vídeos, materiais
            institucionais, conteúdos educacionais e resultados operacionais da
            Terus Platform.
          </p>
        </div>
      </section>

      <InstitutionalContentSection />
      <EducationalContentSection />
      <ModulesContentSection />
      <CasesResultsSection />
      <CtaSection />
    </>
  );
}
