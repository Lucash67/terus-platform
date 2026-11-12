import { Container } from "@/components/layout/container";

export interface LegalSection {
  title: string;
  paragraphs: string[];
}

/** Documento legal com aviso explícito de versão preliminar. */
export function LegalDocument({
  title,
  version,
  sections,
}: {
  title: string;
  version: string;
  sections: LegalSection[];
}) {
  return (
    <Container className="py-16 sm:py-20">
      <article className="mx-auto max-w-3xl">
        <p className="font-mono text-caption uppercase tracking-widest text-brand-primary">
          Documento
        </p>
        <h1 className="mt-3 font-display text-display-lg font-bold text-text-primary">
          {title}
        </h1>
        <p className="mt-3 text-body-sm text-text-tertiary">Versão {version}</p>
        <div
          role="note"
          className="mt-6 rounded-lg border border-status-warning/30 bg-status-warning-dim px-4 py-3 text-body-sm text-text-primary"
        >
          Versão preliminar, em revisão jurídica. Pode ser atualizada antes do
          lançamento do cadastro online; mudanças relevantes serão comunicadas a
          quem tiver conta.
        </div>
        {sections.map((s) => (
          <section key={s.title} className="mt-10">
            <h2 className="font-display text-heading-lg font-semibold text-text-primary">
              {s.title}
            </h2>
            {s.paragraphs.map((p) => (
              <p
                key={p}
                className="mt-3 text-body-lg leading-relaxed text-text-secondary"
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>
    </Container>
  );
}
