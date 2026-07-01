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
        <span className="ml-2 font-mono text-caption text-text-tertiary">
          terus · {slug}
        </span>
      </div>
      <div className="p-4 sm:p-6">{PREVIEWS[slug]}</div>
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
          3 alertas
        </span>
      </div>
      {[
        { label: "Ruptura · Loja Centro", time: "agora", type: "error" },
        {
          label: "Estoque crítico · SKU #2841",
          time: "2 min",
          type: "warning",
        },
        { label: "Reposição automática", time: "4 min", type: "success" },
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
        {["Fill Rate", "Ruptura", "Capital"].map((kpi, i) => (
          <div
            key={kpi}
            className="rounded-lg border border-surface-border bg-surface-base p-2 text-center"
          >
            <p className="text-caption text-text-tertiary">{kpi}</p>
            <p className="font-display text-body-sm font-bold text-brand-primary">
              {["96%", "−40%", "−18%"][i]}
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
        { sku: "SKU #1842", qty: "24 un.", status: "Aprovado" },
        { sku: "SKU #2901", qty: "12 un.", status: "Pendente" },
        { sku: "SKU #3310", qty: "48 un.", status: "Automático" },
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
        { task: "Reposição gôndola · Aisle 4", priority: "Alta" },
        { task: "Conferência estoque · Setor B", priority: "Média" },
        { task: "Etiquetagem promocional", priority: "Baixa" },
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
  log: (
    <PreviewShell>
      <PreviewBar height="h-3" width="w-28" delay={0} />
      {[
        { action: "Pedido #31881 rastreado", actor: "Sistema" },
        { action: "Tarefa concluída · Loja Norte", actor: "Operador" },
        { action: "Auditoria registrada", actor: "Terus Log" },
      ].map((entry) => (
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
  ),
  pulse: (
    <PreviewShell>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Integrações", value: "4/4", ok: true },
          { label: "Módulos ativos", value: "6/6", ok: true },
          { label: "Saúde ERP", value: "99.8%", ok: true },
          { label: "Ações pendentes", value: "3", ok: false },
        ].map((stat) => (
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
  ),
};
