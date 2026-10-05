"use client";

import { Badge } from "@terus/ui";

import { CountUp } from "@/components/motion/count-up";

const METRICS = [
  { label: "Alertas pendentes", value: 165, trend: "13 tipos" },
  { label: "Atividades na loja", value: 42, trend: "Alto R$" },
  { label: "Itens corrigidos", value: 318, trend: "com foto" },
] as const;

const ALERTS = [
  {
    type: "error" as const,
    title: "PER · Em ruptura",
    detail: "Mercearia · vendia e zerou",
    time: "Alto",
  },
  {
    type: "warning" as const,
    title: "PSV-QUEDA · Queda de venda",
    detail: "Bebidas · estoque em casa",
    time: "Médio",
  },
  {
    type: "success" as const,
    title: "PO · Oferta sem destaque",
    detail: "DPH · cartaz pendente",
    time: "Baixo",
  },
] as const;

const CHART_BARS = [68, 45, 82, 56, 91, 73, 88] as const;

const STATUS_STYLES = {
  warning: "bg-status-warning",
  success: "bg-status-success",
  error: "bg-status-error",
} as const;

export function HeroDashboardPreview() {
  return (
    <div
      className="hero-dashboard-float relative mx-auto w-full max-w-lg lg:max-w-none"
      aria-hidden="true"
    >
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand-primary/10 via-brand-primary/5 to-transparent blur-2xl" />

      <div className="tr-glow-ring relative overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1/80 shadow-floating backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-surface-border bg-surface-elevated-1 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-status-error/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-status-warning/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-status-success/80" />
          </div>
          <div className="flex items-center gap-2">
            <span className="hero-live-pulse h-2 w-2 rounded-full bg-status-success" />
            <span className="font-mono text-caption font-medium text-text-secondary">
              Portal Terus Varejo
            </span>
          </div>
          <Badge variant="success" className="text-caption">
            Online
          </Badge>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          {/* Metrics row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {METRICS.map((metric, index) => (
              <div
                key={metric.label}
                className="hero-metric-enter rounded-lg border border-surface-border bg-surface-elevated-1 p-3"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-caption text-text-tertiary">
                  {metric.label}
                </p>
                <p className="mt-1 font-display text-heading-md font-bold text-text-primary">
                  <CountUp value={metric.value} immediate duration={1200} />
                </p>
                <p className="mt-0.5 font-mono text-caption text-brand-primary">
                  {metric.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Supply chain hub — Terus envia para os 3 elos */}
          <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-4">
            <p className="mb-3 font-mono text-caption font-medium uppercase tracking-wider text-text-tertiary">
              Fluxo integrado
            </p>
            <HubFlow />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Alert feed */}
            <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-3">
              <p className="mb-2 font-mono text-caption font-medium uppercase tracking-wider text-text-tertiary">
                Fila por retorno em R$
              </p>
              <ul className="space-y-2">
                {ALERTS.map((alert, index) => (
                  <li
                    key={alert.title}
                    className="hero-alert-enter flex items-start gap-2 rounded-md border border-surface-border-subtle bg-surface-base p-2"
                    style={{ animationDelay: `${300 + index * 150}ms` }}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${STATUS_STYLES[alert.type]}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body-sm font-medium text-text-primary">
                        {alert.title}
                      </p>
                      <p className="truncate text-caption text-text-tertiary">
                        {alert.detail}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-caption text-text-tertiary">
                      {alert.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini chart */}
            <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-3">
              <p className="mb-2 font-mono text-caption font-medium uppercase tracking-wider text-text-tertiary">
                Venda recuperada
              </p>
              <div className="flex h-24 items-end justify-between gap-1.5 pt-2">
                {CHART_BARS.map((height, index) => (
                  <div
                    key={index}
                    className="hero-bar-grow flex-1 rounded-sm bg-brand-primary/20"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${500 + index * 80}ms`,
                    }}
                  >
                    <div
                      className="h-full w-full rounded-sm bg-brand-primary"
                      style={{ opacity: 0.4 + index * 0.08 }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between font-mono text-caption text-text-tertiary">
                <span>Seg</span>
                <span>Dom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HubFlow() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <FlowNode label="Loja" sublabel="Terus Task" />
      <FlowConnector direction="up" />

      <div className="flex w-full items-center justify-between gap-1">
        <FlowNode label="Comprador" sublabel="Alert · Order" />
        <FlowConnector direction="left" />
        <FlowNode label="Terus" sublabel="Portal" highlight />
        <FlowConnector direction="right" />
        <FlowNode label="Fornecedor" sublabel="pedido no ERP" />
      </div>
    </div>
  );
}

function FlowNode({
  label,
  sublabel,
  highlight = false,
}: {
  label: string;
  sublabel: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-caption font-semibold sm:h-11 sm:w-11 ${
          highlight
            ? "border-brand-primary bg-brand-primary-dim text-brand-primary"
            : "border-surface-border bg-surface-base text-text-secondary"
        }`}
      >
        {label.slice(0, 1)}
      </div>
      <span className="text-center text-caption font-medium text-text-primary">
        {label}
      </span>
      <span className="text-center text-caption text-text-tertiary">
        {sublabel}
      </span>
    </div>
  );
}

/** Conector com pacote saindo da Terus (hub → receptor). */
function FlowConnector({ direction }: { direction: "left" | "right" | "up" }) {
  if (direction === "up") {
    return (
      <div className="relative flex h-6 w-px items-stretch bg-surface-border">
        <span className="hero-flow-dot-up absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex min-w-[1.5rem] flex-1 items-center px-0.5">
      <div className="h-px w-full bg-surface-border" />
      <span
        className={[
          "absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-primary",
          direction === "left" ? "hero-flow-dot-left" : "hero-flow-dot-right",
        ].join(" ")}
      />
    </div>
  );
}
