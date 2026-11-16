import { Reveal } from "@/components/motion/reveal";
import {
  CAMADA_INTEGRACAO,
  CAMADA_INTEGRACAO_HEADER,
} from "@/lib/constants/site-data";

function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <path
        d="M2 6l3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErpRow({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="mr-1 font-mono text-caption uppercase tracking-widest text-text-tertiary">
        {label}
      </span>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-md border border-surface-border bg-surface-base px-2.5 py-1 font-mono text-caption font-medium text-text-primary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/** As três camadas da tecnologia Terus, ligadas por um fluxo de dados animado. */
export function TechLayersPanel() {
  const header = CAMADA_INTEGRACAO_HEADER;

  return (
    <div className="tr-glow-ring relative mt-20 overflow-hidden rounded-3xl border border-brand-primary/30 bg-surface-elevated-1 px-6 py-12 shadow-premium sm:px-10 lg:px-14 lg:py-16">
      <div
        className="tr-grid-bg pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand-primary/20 blur-3xl"
        aria-hidden="true"
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary-dim px-3 py-1 font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
          <span className="hero-live-pulse h-1.5 w-1.5 rounded-full bg-brand-primary" />
          {header.badge}
        </p>
        <h3 className="mt-5 font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
          {header.title}
        </h3>
        <p className="mt-4 text-body-lg text-text-secondary">
          {header.description}
        </p>
      </Reveal>

      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute inset-x-[16%] top-[3.25rem] hidden h-px bg-gradient-to-r from-brand-primary/10 via-brand-primary/60 to-brand-primary/10 lg:block"
          aria-hidden="true"
        >
          {[0, 1.2].map((delay) => (
            <span
              key={delay}
              className="absolute -top-1 h-2 w-10 -translate-x-1/2 rounded-full bg-brand-primary shadow-glow animate-[hero-flow-right_2.4s_linear_infinite] motion-reduce:hidden"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>

        <ol className="relative grid gap-6 lg:grid-cols-3 lg:gap-8">
          {CAMADA_INTEGRACAO.map((layer, index) => (
            <Reveal
              key={layer.name}
              as="li"
              variant="scale"
              delay={120 + index * 140}
              className="group relative"
            >
              {index > 0 ? (
                <span
                  className="pointer-events-none absolute -top-6 left-1/2 block h-6 w-px overflow-hidden bg-brand-primary/30 lg:hidden"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 h-2 w-px bg-brand-primary animate-[hero-flow-up_1.6s_linear_infinite] motion-reduce:hidden" />
                </span>
              ) : null}

              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface-base p-7 shadow-elevated transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-brand-primary/50 group-hover:shadow-glow-sm">
                <span
                  className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[7rem] font-bold leading-none text-brand-primary/5 transition-colors duration-300 group-hover:text-brand-primary/10"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-primary/50 bg-brand-primary-dim font-mono text-body-sm font-bold text-brand-primary shadow-glow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-caption font-semibold uppercase tracking-widest text-brand-primary">
                    {layer.role}
                  </span>
                </div>

                <h4 className="relative mt-6 font-display text-display-lg font-bold leading-none text-text-primary">
                  {layer.name}
                </h4>
                <p className="relative mt-3 font-display text-heading-md font-semibold text-text-primary">
                  {layer.headline}
                </p>
                <p className="relative mt-2 text-body-sm text-text-secondary">
                  {layer.description}
                </p>

                <div className="relative mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary-dim px-4 py-3">
                  <p className="font-display text-heading-lg font-bold leading-tight text-brand-primary">
                    {layer.stat.value}
                  </p>
                  <p className="mt-0.5 font-mono text-caption uppercase tracking-wider text-text-secondary">
                    {layer.stat.label}
                  </p>
                </div>

                <ul className="relative mt-6 space-y-3">
                  {layer.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex gap-3 text-body-sm text-text-primary"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary text-surface-base">
                        <CheckIcon />
                      </span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal
        delay={200}
        className="relative mt-12 space-y-3 border-t border-surface-border pt-8"
      >
        <ErpRow label="ERP da rede" items={header.retailErps} />
        <ErpRow label="ERP do fornecedor" items={header.supplierErps} />
      </Reveal>
    </div>
  );
}
