import { Container } from "@/components/layout/container";
import { VIDEOS_INSTITUCIONAIS } from "@/lib/constants/site-data";

export function InstitutionalVideosSection() {
  return (
    <section className="border-t border-surface-border">
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-caption font-semibold uppercase tracking-widest text-brand-primary">
            Institucional
          </p>
          <h2 className="mt-4 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            Conheça a Terus
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary">
            Vídeos institucionais sobre a plataforma, sua visão e o impacto
            operacional gerado para varejos e distribuidores.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS_INSTITUCIONAIS.map((video) => (
            <div
              key={video.title}
              className="rounded-lg border border-surface-border bg-surface-base p-8"
            >
              <div className="aspect-video rounded-lg bg-surface-elevated-1 flex items-center justify-center">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-body-md text-text-secondary">
                    Thumbnail em atualização
                  </p>
                )}
              </div>
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
