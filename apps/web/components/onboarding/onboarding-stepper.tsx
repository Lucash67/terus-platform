"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { ONBOARDING_STEPS, TOTAL_STEPS } from "@/lib/constants/onboarding";
import { getUnlockedStep, useOnboardingStore } from "@/store/onboarding-store";

function StepCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="ob-check-draw"
      />
    </svg>
  );
}

export function OnboardingStepper() {
  const pathname = usePathname();
  const store = useOnboardingStore();
  const unlocked = getUnlockedStep(store);

  const currentStep = ONBOARDING_STEPS.find((step) =>
    pathname.startsWith(step.href),
  );

  // Página de boas-vindas não exibe o stepper
  if (!currentStep) return null;

  const currentOrder = currentStep.order;
  const progressPercent = Math.round(
    ((currentOrder - 1) / (TOTAL_STEPS - 1)) * 100,
  );

  return (
    <div className="border-b border-surface-border/60 bg-surface-base/60 backdrop-blur-xl">
      <Container>
        {/* Desktop: trilha completa */}
        <ol
          className="hidden items-center py-4 lg:flex"
          aria-label={`Progresso do onboarding: etapa ${currentOrder} de ${TOTAL_STEPS}`}
        >
          {ONBOARDING_STEPS.map((step, index) => {
            const isDone = step.order < currentOrder;
            const isCurrent = step.order === currentOrder;
            const isReachable = step.order <= unlocked;

            const node = (
              <span
                className={cn(
                  "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-body-sm font-semibold transition-all duration-300",
                  isDone &&
                    "border-brand-primary bg-brand-primary text-surface-base",
                  isCurrent &&
                    "ob-node-current border-brand-primary bg-surface-base text-brand-primary shadow-elevated",
                  !isDone &&
                    !isCurrent &&
                    "border-surface-border bg-surface-elevated-1 text-text-tertiary",
                )}
              >
                {isDone ? <StepCheckIcon /> : step.order}
              </span>
            );

            return (
              <li
                key={step.id}
                className={cn("flex items-center", index > 0 && "flex-1")}
              >
                {index > 0 && (
                  <span
                    className="relative mx-3 h-0.5 flex-1 overflow-hidden rounded-full bg-surface-elevated-2"
                    aria-hidden="true"
                  >
                    <span
                      className={cn(
                        "ob-connector-fill absolute inset-0 rounded-full bg-brand-primary",
                        step.order <= currentOrder ? "block" : "hidden",
                      )}
                      style={{ animationDelay: `${index * 60}ms` }}
                    />
                  </span>
                )}
                {isReachable && !isCurrent ? (
                  <Link
                    href={step.href}
                    className="group flex items-center gap-2.5"
                    aria-label={`Ir para etapa ${step.order}: ${step.label}`}
                  >
                    {node}
                    <span
                      className={cn(
                        "whitespace-nowrap text-body-sm font-medium transition-colors",
                        isDone
                          ? "text-text-secondary group-hover:text-brand-primary"
                          : "text-text-tertiary group-hover:text-text-secondary",
                      )}
                    >
                      {step.shortLabel}
                    </span>
                  </Link>
                ) : (
                  <span
                    className="flex items-center gap-2.5"
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {node}
                    <span
                      className={cn(
                        "whitespace-nowrap text-body-sm font-medium",
                        isCurrent ? "text-text-primary" : "text-text-tertiary",
                      )}
                    >
                      {step.shortLabel}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* Mobile: etapa atual + barra de progresso */}
        <div className="flex flex-col gap-2.5 py-3.5 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-body-sm font-semibold text-text-primary">
              {currentStep.label}
            </span>
            <span className="font-mono text-caption text-text-tertiary">
              {currentOrder} / {TOTAL_STEPS}
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-surface-elevated-2"
            role="progressbar"
            aria-valuenow={currentOrder}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          >
            <div
              className="h-full rounded-full bg-brand-primary transition-all duration-700 ease-out"
              style={{ width: `${Math.max(progressPercent, 4)}%` }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
