import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";
import { Reveal } from "@/components/motion/reveal";
import { ModuleCard } from "@/components/sections/module-card";
import { MODULES, type ModuleGroup } from "@/lib/constants/modules";

const MODULE_GROUPS: { id: ModuleGroup; label: string }[] = [
  { id: "core", label: "Essenciais · o ciclo da gôndola" },
  { id: "expansao", label: "Expansão · logística, produção e espaço" },
];

interface ModulesSectionProps {
  title?: string;
  description?: string;
}

export function ModulesSection({
  title = "Comece pelo essencial. Expanda quando quiser.",
  description = "Quatro módulos formam o ciclo de detectar, executar e medir. Os outros quatro levam a Terus para a logística, a produção, os fornecedores e a exposição.",
}: ModulesSectionProps) {
  return (
    <section className="section-rhythm relative overflow-hidden">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="max-w-2xl">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
              Módulos Terus
            </p>
            <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
              {title}
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary">
              {description}
            </p>
          </div>
        </Reveal>

        {MODULE_GROUPS.map((group) => (
          <div key={group.id} className="mt-12">
            <p className="font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
              {group.label}
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MODULES.filter((module) => module.group === group.id).map(
                (module, index) => (
                  <Reveal
                    key={module.slug}
                    variant="scale"
                    delay={Math.min(index * 70, 490)}
                    className="h-full"
                  >
                    <ModuleCard
                      module={module}
                      withMedia={group.id === "core"}
                    />
                  </Reveal>
                ),
              )}
            </div>
          </div>
        ))}

        <Reveal delay={120} className="mt-16 text-center">
          <p className="text-body-lg text-text-secondary">
            Os módulos são contratados conforme a operação. Todos usam a mesma
            integração e o mesmo portal — para a rede, a loja e o fornecedor.
          </p>
          <CtaButtons className="mt-8" />
        </Reveal>
      </Container>
    </section>
  );
}
