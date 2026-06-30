import { Container } from "@/components/layout/container";
import { CtaButtons } from "@/components/conversion/cta-buttons";

const SECURITY_GOVERNANCE_ITEMS = [
  {
    title: "Certificações de Segurança",
    description:
      "Programa de certificações em andamento — controles técnicos de segurança já implementados na arquitetura.",
  },
  {
    title: "Compliance e Governança",
    description:
      "Políticas de acesso, auditoria imutável e segregação de ambientes por tenant.",
  },
  {
    title: "SLA e Disponibilidade",
    description:
      "Infraestrutura projetada para operações 24/7 com monitoramento contínuo de saúde.",
  },
  {
    title: "Proteção de Dados",
    description:
      "Conformidade LGPD by design — credenciais exclusivamente via Vault, sem exposição em logs.",
  },
];

export function SecurityGovernanceSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Segurança e Governança
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Credibilidade enterprise
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Estrutura de segurança e governança enterprise — certificações
            formais em processo de validação, com controles técnicos já
            implementados na arquitetura.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_GOVERNANCE_ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8 text-center"
            >
              <h3 className="font-display text-heading-md font-semibold text-brand-primary">
                {item.title}
              </h3>
              <p className="mt-4 text-body-md text-text-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <CtaButtons className="mt-12" />
      </Container>
    </section>
  );
}
