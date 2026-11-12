"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ONBOARDING_STEPS } from "@/lib/constants/onboarding";
import { getUnlockedStep, useOnboardingStore } from "@/store/onboarding-store";

interface StepGuardProps {
  step: number;
  children: React.ReactNode;
}

/**
 * Bloqueia o acesso direto a etapas ainda não desbloqueadas,
 * redirecionando para a etapa mais avançada disponível.
 */
export function StepGuard({ step, children }: StepGuardProps) {
  const router = useRouter();
  const store = useOnboardingStore();
  const unlocked = getUnlockedStep(store);
  const blocked = store.hasHydrated && step > unlocked;

  useEffect(() => {
    if (blocked) {
      const target = ONBOARDING_STEPS[unlocked - 1];
      router.replace(target.href);
    }
  }, [blocked, unlocked, router]);

  if (!store.hasHydrated || blocked) {
    return (
      <div
        className="flex min-h-[40vh] items-center justify-center"
        aria-busy="true"
      >
        <span className="h-8 w-8 rounded-full border-2 border-surface-elevated-3 border-t-brand-primary ob-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
