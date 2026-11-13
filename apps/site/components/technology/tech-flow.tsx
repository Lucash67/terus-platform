/** Diagrama origem → componente → destino, com trilha animada (CSS; respeita reduced-motion). */
function Node({
  role,
  label,
  highlight = false,
}: {
  role: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "relative flex flex-col items-center gap-1 rounded-2xl border border-brand-primary/60 bg-brand-primary-dim px-6 py-5 text-center shadow-glow-sm"
          : "flex flex-col items-center gap-1 rounded-2xl border border-surface-border bg-surface-elevated-1 px-4 py-4 text-center"
      }
    >
      <span className="font-mono text-caption uppercase tracking-widest text-text-tertiary">
        {role}
      </span>
      <span
        className={
          highlight
            ? "font-display text-heading-lg font-bold text-brand-primary"
            : "text-body-md font-semibold text-text-primary"
        }
      >
        {label}
      </span>
    </div>
  );
}

function Track() {
  return (
    <>
      <span
        className="flow-track hidden h-0.5 min-w-8 flex-1 rounded-full bg-surface-border sm:block"
        aria-hidden="true"
      />
      <span
        className="flow-track flow-track-vertical mx-auto h-8 w-0.5 rounded-full bg-surface-border sm:hidden"
        aria-hidden="true"
      />
    </>
  );
}

export function TechFlow({
  from,
  name,
  to,
}: {
  from: string;
  name: string;
  to: string;
}) {
  return (
    <figure
      className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
      aria-label={`Fluxo: ${from}, depois ${name}, depois ${to}`}
    >
      <Node role="Recebe de" label={from} />
      <Track />
      <Node role="Componente" label={name} highlight />
      <Track />
      <Node role="Entrega para" label={to} />
    </figure>
  );
}
