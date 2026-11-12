import type { Metadata } from "next";

import { StepDiagnostico } from "@/components/onboarding/step-diagnostico";
import { StepGuard } from "@/components/onboarding/step-guard";

export const metadata: Metadata = {
  title: "Diagnóstico automatizado",
};

export default function DiagnosticoPage() {
  return (
    <StepGuard step={5}>
      <StepDiagnostico />
    </StepGuard>
  );
}
