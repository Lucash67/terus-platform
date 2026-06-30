"use client";

import { Badge } from "@terus/ui";

const METRICS = [
  { label: "Alertas ativos", value: "12", trend: "+3" },
  { label: "Pedidos automáticos", value: "847", trend: "hoje" },
  { label: "Lojas monitoradas", value: "156", trend: "live" },
] as const;

const ALERTS = [
  {
    type: "warning" as const,
    title: "Ruptura detectada",
    detail: "Loja Centro · SKU #2841",
    time: "agora",
  },
  {
    type: "success" as const,
    title: "Reposição automática",
    detail: "Distribuidor Norte · 24 un.",
    time: "2 min",
  },
  {
    type: "error" as const,
    title: "Estoque crítico",
    detail: "Loja Sul · 3 SKUs",
    time: "4 min",
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
      <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand-primary/10 via-brand-primary-dim/40 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-xl border border-surface-border bg-surface-base shadow-floating">
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
              Terus Pulse · Operação ao vivo
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
                  {metric.value}
                </p>
                <p className="mt-0.5 font-mono text-caption text-brand-primary">
                  {metric.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Supply chain flow */}
          <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-4">
            <p className="mb-3 font-mono text-caption font-medium uppercase tracking-wider text-text-tertiary">
              Fluxo integrado
            </p>
            <div className="flex items-center justify-between gap-2">
              <FlowNode label="Varejo" sublabel="12 lojas" />
              <FlowConnector />
              <FlowNode label="Terus" sublabel="Inteligência" highlight />
              <FlowConnector />
              <FlowNode label="Distribuidor" sublabel="3 parceiros" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Alert feed */}
            <div className="rounded-lg border border-surface-border bg-surface-elevated-1 p-3">
              <p className="mb-2 font-mono text-caption font-medium uppercase tracking-wider text-text-tertiary">
                Alertas em tempo real
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
                Demanda vs estoque
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
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg border text-caption font-semibold sm:h-11 sm:w-11 ${
          highlight
            ? "border-brand-primary bg-brand-primary-dim text-brand-primary"
            : "border-surface-border bg-surface-base text-text-secondary"
        }`}
      >
        {label.slice(0, 1)}
      </div>
      <span className="text-caption font-medium text-text-primary">
        {label}
      </span>
      <span className="text-caption text-text-tertiary">{sublabel}</span>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="relative flex flex-1 items-center px-1">
      <div className="h-px w-full bg-surface-border" />
      <span className="hero-flow-dot absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-primary" />
    </div>
  );
}
