"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  DEMO_BASE,
  DEMO_STEPS,
  DEMO_TOTAL_STEPS,
} from "@/lib/constants/activation-demo";
import {
  getUnlockedStep,
  useActivationDemo,
} from "@/lib/activation-demo/store";

export function CheckIcon({
  className,
  draw = true,
}: {
  className?: string;
  draw?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={draw ? "ob-check-draw" : undefined}
      />
    </svg>
  );
}

/** Topo da demonstração: marca, aviso permanente de simulação e saída. */
export function DemoNavbar() {
  const router = useRouter();
  const hasHydrated = useActivationDemo((s) => s.hasHydrated);
  const hasProgress = useActivationDemo((s) => Boolean(s.cadastro || s.erp));
  const reset = useActivationDemo((s) => s.reset);

  const restart = () => {
    if (
      !window.confirm(
        "Recomeçar a demonstração do zero?\n\nO que foi preenchido neste navegador será apagado.",
      )
    )
      return;
    reset();
    router.push(DEMO_BASE);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-status-warning/30 bg-status-warning/10 backdrop-blur-xl">
        <Container>
          <p className="flex flex-wrap items-center justify-center gap-x-2 py-2 text-center text-body-sm text-text-primary">
            <span className="rounded-full bg-status-warning/20 px-2 py-0.5 font-mono text-caption uppercase tracking-wider text-status-warning">
              Demonstração
            </span>
            Nada é enviado à Terus: o diagnóstico, a assinatura e a ativação são
            simulados.
          </p>
        </Container>
      </div>
      <div className="border-b border-surface-border/60 bg-surface-base/80 backdrop-blur-xl">
        <Container>
          <nav
            className="flex h-16 items-center justify-between gap-3"
            aria-label="Demonstração da ativação"
          >
            <div className="flex items-center gap-3">
              <Link href="/" aria-label="Página inicial da Terus">
                <TerusLogo className="w-28 sm:w-32" />
              </Link>
              <span className="hidden rounded-full border border-surface-border px-3 py-1 font-mono text-caption uppercase tracking-wider text-text-tertiary sm:inline-flex">
                Ativação técnica
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              {hasHydrated && hasProgress ? (
                <button
                  type="button"
                  onClick={restart}
                  className="text-body-sm text-text-secondary transition-colors hover:text-status-error"
                >
                  Recomeçar
                </button>
              ) : null}
              <Link
                href="/"
                className="text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                Sair
              </Link>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

/** Trilha das 7 etapas (desktop) e etapa atual com barra (celular). */
export function DemoStepper() {
  const pathname = usePathname();
  const state = useActivationDemo();
  const unlocked = getUnlockedStep(state);
  const current = DEMO_STEPS.find((s) => pathname.startsWith(s.href));
  if (!current) return null;

  const order = current.order;
  const percent = Math.round((order / DEMO_TOTAL_STEPS) * 100);

  return (
    <div className="relative z-10 border-b border-surface-border/60 bg-surface-base/60 backdrop-blur-xl">
      <Container>
        <ol
          className="hidden items-center py-4 lg:flex"
          aria-label={`Progresso: etapa ${order} de ${DEMO_TOTAL_STEPS}`}
        >
          {DEMO_STEPS.map((step, index) => {
            const isDone = step.order < unlocked && step.order !== order;
            const isCurrent = step.order === order;
            const reachable = step.order <= unlocked && !isCurrent;
            const node = (
              <span
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-body-sm font-semibold transition-all duration-300",
                  isCurrent &&
                    "ob-node-current border-brand-primary bg-surface-base text-brand-primary shadow-elevated",
                  !isCurrent &&
                    isDone &&
                    "border-brand-primary bg-brand-primary text-surface-base",
                  !isCurrent &&
                    !isDone &&
                    "border-surface-border bg-surface-elevated-1 text-text-tertiary",
                )}
              >
                {isDone ? <CheckIcon className="h-4 w-4" /> : step.order}
              </span>
            );
            const label = (
              <span
                className={cn(
                  "whitespace-nowrap text-body-sm font-medium transition-colors",
                  isCurrent
                    ? "text-text-primary"
                    : isDone
                      ? "text-text-secondary"
                      : "text-text-tertiary",
                )}
              >
                {step.shortLabel}
              </span>
            );
            return (
              <li
                key={step.id}
                className={cn("flex items-center", index > 0 && "flex-1")}
              >
                {index > 0 ? (
                  <span
                    className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-surface-elevated-2"
                    aria-hidden="true"
                  >
                    {step.order <= Math.max(order, unlocked) ? (
                      <span
                        className={cn(
                          "ob-connector-fill absolute inset-0 rounded-full",
                          step.order <= order
                            ? "bg-brand-primary"
                            : "bg-brand-primary/35",
                        )}
                        style={{ animationDelay: `${index * 60}ms` }}
                      />
                    ) : null}
                  </span>
                ) : null}
                {reachable ? (
                  <Link
                    href={step.href}
                    className="group flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    aria-label={`Ir para a etapa ${step.order}: ${step.label}`}
                  >
                    {node}
                    {label}
                  </Link>
                ) : (
                  <span
                    className="flex items-center gap-2.5"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {node}
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col gap-2.5 py-3.5 lg:hidden">
          <div className="flex items-center justify-between">
            <span
              className="text-body-sm font-semibold text-text-primary"
              aria-current="step"
            >
              {current.label}
            </span>
            <span className="font-mono text-caption text-text-tertiary">
              {order} / {DEMO_TOTAL_STEPS}
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-surface-elevated-2"
            role="progressbar"
            aria-label="Progresso da demonstração"
            aria-valuenow={order}
            aria-valuemin={1}
            aria-valuemax={DEMO_TOTAL_STEPS}
          >
            <div
              className="h-full rounded-full bg-brand-primary transition-all duration-700 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
