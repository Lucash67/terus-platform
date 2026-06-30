import { Container } from "@/components/layout/container";
import { VIDEOS_EDUCACIONAIS } from "@/lib/constants/site-data";

export function EducationalVideosSection() {
  if (VIDEOS_EDUCACIONAIS.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-surface-border bg-surface-elevated-1">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Conteúdo
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Aprenda com a Terus
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Conteúdos explicativos sobre módulos, integrações e jornadas
            operacionais.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEOS_EDUCACIONAIS.map((video) => (
            <div
              key={video.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8"
            >
              {video.thumbnail ? (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : null}
              <h3 className="mt-4 font-display text-heading-md font-semibold text-text-primary">
                {video.title}
              </h3>
              <p className="mt-2 text-body-md text-text-secondary">
                {video.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
