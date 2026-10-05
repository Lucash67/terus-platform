import type { ReactNode } from "react";
import { cn } from "@terus/ui";

import type { ModuleSlug } from "@/lib/constants/modules";

interface ModulePreviewProps {
  slug: ModuleSlug;
  className?: string;
}

export function ModulePreview({ slug, className }: ModulePreviewProps) {
  return (
    <div
      className={cn(
        "module-preview relative overflow-hidden rounded-xl border border-surface-border bg-surface-elevated-1 shadow-elevated",
        className,
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-surface-border bg-surface-base px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-status-error/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-status-warning/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-status-success/60" />
        <span className="ml-2 font-mono text-caption uppercase tracking-widest text-text-tertiary">
          terus · {slug}
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-caption uppercase tracking-widest text-status-success">
          <span className="hero-live-pulse inline-block h-1.5 w-1.5 rounded-full bg-status-success" />
          live
        </span>
      </div>
      <div className="relative p-4 sm:p-6">
        <div
          className="tr-grid-bg pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />
        <div className="relative">{PREVIEWS[slug]}</div>
      </div>
    </div>
  );
}

function PreviewShell({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

function PreviewBar({
  height = "h-8",
  width = "w-full",
  delay = 0,
}: {
  height?: string;
  width?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-md bg-gradient-to-r from-brand-primary/15 to-brand-secondary/10",
        height,
        width,
        "module-preview-bar",
      )}
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

const PREVIEWS: Record<ModuleSlug, ReactNode> = {
  alert: (
    <PreviewShell>
      <div className="flex items-center justify-between">
        <PreviewBar height="h-4" width="w-24" />
        <span className="rounded-full bg-status-error-dim px-2 py-0.5 text-caption font-medium text-status-error">
          pendentes
        </span>
      </div>
      {[
        { label: "PER · Produtos em ruptura", time: "38", type: "error" },
        { label: "PRR · Risco de ruptura", time: "52", type: "warning" },
        { label: "PMN · Margem negativa", time: "11", type: "error" },
        { label: "PEE · Excesso de estoque", time: "64", type: "success" },
      ].map((alert) => (
        <div
          key={alert.label}
          className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-base px-3 py-2.5"
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                alert.type === "error" && "bg-status-error",
                alert.type === "warning" && "bg-status-warning",
                alert.type === "success" && "bg-status-success",
              )}
            />
            <span className="text-caption text-text-secondary">
              {alert.label}
            </span>
          </div>
          <span className="font-mono text-caption text-text-tertiary">
            {alert.time}
          </span>
        </div>
      ))}
    </PreviewShell>
  ),
  strategy: (
    <PreviewShell>
      <div className="grid grid-cols-3 gap-2">
        {["Meta", "Vendas", "vs. ano ant."].map((kpi, i) => (
          <div
            key={kpi}
            className="rounded-lg border border-surface-border bg-surface-base p-2 text-center"
          >
            <p className="text-caption text-text-tertiary">{kpi}</p>
            <p className="font-display text-body-sm font-bold text-brand-primary">
              {["Loja", "Seção", "YoY"][i]}
            </p>
          </div>
        ))}
      </div>
      <div className="flex h-24 items-end gap-1.5 pt-2">
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-brand-primary/30 module-preview-bar"
            style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>
    </PreviewShell>
  ),
  order: (
    <PreviewShell>
      <PreviewBar height="h-4" width="w-32" />
      {[
        { sku: "Pedido #1842", qty: "24 itens", status: "Aprovado" },
        { sku: "Pedido #2901", qty: "12 itens", status: "Em análise" },
        { sku: "Pedido #3310", qty: "48 itens", status: "Faturado" },
      ].map((row) => (
        <div
          key={row.sku}
          className="flex items-center justify-between rounded-lg border border-surface-border bg-surface-base px-3 py-2"
        >
          <span className="font-mono text-caption text-text-secondary">
            {row.sku}
          </span>
          <span className="text-caption text-text-tertiary">{row.qty}</span>
          <span className="rounded bg-brand-primary-dim px-1.5 py-0.5 text-caption text-brand-primary">
            {row.status}
          </span>
        </div>
      ))}
    </PreviewShell>
  ),
  task: (
    <PreviewShell>
      {[
        { task: "Verificar presença · Mercearia", priority: "Alto R$" },
        { task: "Coletar e abastecer · Bebidas", priority: "Médio R$" },
        { task: "Destacar oferta · DPH", priority: "Baixo R$" },
      ].map((item) => (
        <div
          key={item.task}
          className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-base px-3 py-2.5"
        >
          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand-primary/40">
            <span className="h-2 w-2 rounded-sm bg-brand-primary/60" />
          </span>
          <span className="flex-1 text-caption text-text-secondary">
            {item.task}
          </span>
          <span className="text-caption text-text-tertiary">
            {item.priority}
          </span>
        </div>
      ))}
    </PreviewShell>
  ),
  unitization: (
    <TimelinePreview
      entries={[
        { action: "Gaiola #0412 separada", actor: "CD" },
        { action: "Remetida para a loja", actor: "Expedição" },
        { action: "Recebida na loja · contagem cega", actor: "Terus Task" },
      ]}
    />
  ),
  production: (
    <TimelinePreview
      entries={[
        { action: "Pedido da loja calculado · Padaria", actor: "Loja" },
        { action: "Ordem de produção liberada", actor: "Centro" },
        { action: "Transferência para a loja", actor: "Expedição" },
      ]}
    />
  ),
  chain: (
    <StatGridPreview
      stats={[
        { label: "Atendimento", value: "Score A", ok: true },
        { label: "Prazo", value: "No prazo", ok: true },
        { label: "Integração", value: "OK", ok: true },
        { label: "Ruptura", value: "Atenção", ok: false },
      ]}
    />
  ),
  vitrine: (
    <PreviewShell>
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-8 rounded-sm border border-surface-border module-preview-bar",
              i % 5 === 2 ? "bg-status-warning/20" : "bg-brand-primary/15",
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>
      <PreviewBar height="h-2" width="w-2/3" delay={200} />
    </PreviewShell>
  ),
};

function TimelinePreview({
  entries,
}: {
  entries: { action: string; actor: string }[];
}) {
  return (
    <PreviewShell>
      <PreviewBar height="h-3" width="w-28" delay={0} />
      {entries.map((entry) => (
        <div
          key={entry.action}
          className="flex items-start gap-2 border-l-2 border-brand-primary/30 pl-3"
        >
          <div>
            <p className="text-caption text-text-secondary">{entry.action}</p>
            <p className="font-mono text-caption text-text-tertiary">
              {entry.actor}
            </p>
          </div>
        </div>
      ))}
    </PreviewShell>
  );
}

function StatGridPreview({
  stats,
}: {
  stats: { label: string; value: string; ok: boolean }[];
}) {
  return (
    <PreviewShell>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-surface-border bg-surface-base p-2.5"
          >
            <p className="text-caption text-text-tertiary">{stat.label}</p>
            <p
              className={cn(
                "font-display text-body-sm font-bold",
                stat.ok ? "text-status-success" : "text-status-warning",
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <PreviewBar height="h-2" width="w-full" delay={200} />
    </PreviewShell>
  );
}
