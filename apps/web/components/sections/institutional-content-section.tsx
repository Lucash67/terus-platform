import { Container } from "@/components/layout/container";
import { CONTEUDOS_INSTITUCIONAIS } from "@/lib/constants/site-data";

export function InstitutionalContentSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Conheça a Terus
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Estrutura preparada para exibir conteúdos institucionais sobre a
            empresa, sua visão e a proposta de valor da plataforma.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CONTEUDOS_INSTITUCIONAIS.map((content) => (
            <div
              key={content.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8"
            >
              <div className="aspect-video rounded-lg bg-surface-elevated-1 flex items-center justify-center">
                {content.thumbnail ? (
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-body-md text-text-secondary">
                    Thumbnail em atualização
                  </p>
                )}
              </div>
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                {content.title}
              </h3>
              <p className="mt-2 text-body-md text-text-secondary">
                {content.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
