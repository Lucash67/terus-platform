import type { ReactNode } from "react";
import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
} from "@terus/ui";

import { PlatformScreenshot } from "@/components/sections/platform-screenshot";
import type { ModuleDefinition } from "@/lib/constants/modules";

interface ModuleCardProps {
  module: ModuleDefinition;
  /** Exibe a tela do portal (ou o ícone, se o módulo não tiver tela) no topo */
  withMedia?: boolean;
}

const MODULE_ICONS: Record<string, ReactNode> = {
  alert: (
    <path
      d="M12 3L2 19h20L12 3zm0 6v5m0 3h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  strategy: (
    <path
      d="M4 18V6m0 12h16M8 14V10m4 4V8m4 6V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  order: (
    <path
      d="M6 6h12v12H6zM9 10h6M9 14h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  task: (
    <path
      d="M9 11l2 2 4-4M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  unitization: (
    <path
      d="M4 8l8-4 8 4v8l-8 4-8-4V8zm0 0l8 4 8-4M12 12v8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  production: (
    <path
      d="M4 20V10l5 3V10l5 3V6h6v14H4zm4-3h2m4 0h2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  chain: (
    <path
      d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  vitrine: (
    <path
      d="M4 4h16v16H4zM4 10h16M4 15h16M10 4v16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
};

function ModuleMedia({ module }: { module: ModuleDefinition }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden border-b border-surface-border bg-surface-elevated-2">
      {module.screen ? (
        <>
          <PlatformScreenshot
            screen={module.screen}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
          />
          {module.screen.locked ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-full border border-surface-border bg-surface-elevated-1/95 px-3 py-1.5 font-mono text-caption text-text-secondary shadow-elevated">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                Na demonstração
              </span>
            </span>
          ) : null}
        </>
      ) : (
        <div className="tr-grid-bg absolute inset-0 flex items-center justify-center text-brand-primary">
          <svg
            viewBox="0 0 24 24"
            className="h-12 w-12 opacity-60"
            aria-hidden="true"
          >
            {MODULE_ICONS[module.slug]}
          </svg>
        </div>
      )}
    </div>
  );
}

export function ModuleCard({ module, withMedia = false }: ModuleCardProps) {
  return (
    <Link href={`/modulos/${module.slug}`} className="group block h-full">
      <Card
        className={cn(
          "card-interactive h-full shadow-sm transition-all duration-300 hover:shadow-elevated",
          withMedia && "overflow-hidden",
        )}
      >
        {withMedia ? <ModuleMedia module={module} /> : null}
        <CardHeader>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-primary-dim text-brand-primary transition-all duration-300 group-hover:bg-brand-primary group-hover:text-surface-base group-hover:shadow-glow-sm">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {MODULE_ICONS[module.slug]}
              </svg>
            </div>
            <Badge
              variant="outline"
              className="border-brand-primary/30 bg-brand-primary-dim font-mono text-caption font-medium tracking-wider text-brand-primary"
            >
              {module.metric}
            </Badge>
          </div>
          <CardTitle className="font-display text-heading-md transition-colors duration-300 group-hover:text-brand-primary">
            {module.name}
          </CardTitle>
          <CardDescription>{module.tagline}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-text-tertiary line-clamp-2">
            {module.description}
          </p>
          <p className="mt-4 text-caption text-brand-primary opacity-0 transition-opacity group-hover:opacity-100">
            Saiba mais →
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
