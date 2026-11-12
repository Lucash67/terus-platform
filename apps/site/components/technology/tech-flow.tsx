/** Diagrama from → componente → to, com fluxo animado (CSS; respeita reduced-motion). */
export function TechFlow({
  from,
  name,
  to,
}: {
  from: string;
  name: string;
  to: string;
}) {
  const node =
    "rounded-xl border border-surface-border bg-surface-elevated-1 px-4 py-3 text-center text-body-sm font-medium text-text-secondary";
  return (
    <div
      className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
      aria-label={`${from} → ${name} → ${to}`}
    >
      <div className={node}>{from}</div>
      <span
        className="flow-track hidden h-px flex-1 bg-surface-border sm:block"
        aria-hidden="true"
      />
      <span
        className="flow-track flow-track-vertical mx-auto h-6 w-px bg-surface-border sm:hidden"
        aria-hidden="true"
      />
      <div className="rounded-xl border border-brand-primary/50 bg-brand-primary-dim px-5 py-3 text-center font-display text-heading-md font-semibold text-brand-primary shadow-glow-sm">
        {name}
      </div>
      <span
        className="flow-track hidden h-px flex-1 bg-surface-border sm:block"
        aria-hidden="true"
      />
      <span
        className="flow-track flow-track-vertical mx-auto h-6 w-px bg-surface-border sm:hidden"
        aria-hidden="true"
      />
      <div className={node}>{to}</div>
    </div>
  );
}
