import type { ReactNode } from "react";
import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@terus/ui";

import type { ModuleDefinition } from "@/lib/constants/modules";

interface ModuleCardProps {
  module: ModuleDefinition;
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
  log: (
    <path
      d="M6 4h12v16H6zM9 8h6M9 12h6M9 16h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  pulse: (
    <path
      d="M4 12h4l2-6 4 12 2-6h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

export function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={`/modulos/${module.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-200 hover:border-brand-primary/40 hover:bg-surface-elevated-2">
        <CardHeader>
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-primary-dim text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-surface-base">
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                {MODULE_ICONS[module.slug]}
              </svg>
            </div>
            <Badge variant="outline" className="text-caption">
              {module.metric}
            </Badge>
          </div>
          <CardTitle className="font-display text-heading-md group-hover:text-brand-primary">
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
