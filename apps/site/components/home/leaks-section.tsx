import { Container } from "@/components/layout/container";
import { InView, Kicker, KineticText, SpotCard } from "@/components/motion/xp";
import { DORES } from "@/lib/constants/lp";

/** O que trata cada perda (wiki: filas do Terus Task e módulos Alert/Order). */
const FIX: Record<string, string> = {
  CAP: "Fila “Coletar Produtos e Abastecer”",
  PSV: "Fila “Verificar Presença e Exposição”",
  PO: "Fila “Destacar Ofertas”",
  SO: "Fila “Retirar Destaque de Oferta”",
  PEE: "Alerta de excesso e devolução com contagem cega",
  PMN: "Alerta de margem na mesa do comprador",
};

export function LeaksSection() {
  return (
    <section className="relative py-24 lg:py-36">
      <Container>
        <InView className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Kicker index="01" className="xp-in">
              {DORES.badge}
            </Kicker>
            <h2 className="mt-6 font-display text-display-lg font-bold tracking-tight text-text-primary sm:text-display-xl lg:text-display-2xl">
              <KineticText text={DORES.title} />
            </h2>
          </div>
          <p
            className="xp-in text-body-lg text-text-secondary lg:col-span-5"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            {DORES.description}
          </p>
        </InView>

        <InView
          as="ul"
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          threshold={0.1}
        >
          {DORES.items.map((d, i) => (
            <li
              key={d.sigla}
              className="xp-in"
              style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
            >
              <SpotCard
                tilt
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-border bg-surface-elevated-1/50 p-8 transition-colors duration-500 hover:border-brand-primary/40"
              >
                <span
                  className="xp-outline-text font-display font-bold leading-none tracking-tighter transition-all duration-500 group-hover:[-webkit-text-stroke-color:rgb(var(--brand-primary-rgb))]"
                  style={{ fontSize: "clamp(4rem, 8vw, 6.5rem)" }}
                  aria-hidden="true"
                >
                  {d.sigla}
                </span>
                <h3 className="mt-6 font-display text-heading-lg font-semibold text-text-primary">
                  {d.title}
                </h3>
                <p className="mt-3 flex-1 text-body-md text-text-secondary">
                  {d.description}
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-surface-border pt-4 font-mono text-code-sm text-brand-primary">
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  {FIX[d.sigla]}
                </p>
              </SpotCard>
            </li>
          ))}
        </InView>
      </Container>
    </section>
  );
}
