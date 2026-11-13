import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepDiagnostico } from "@/components/activation-demo/step-diagnostico";

export const metadata: Metadata = { title: "Diagnóstico" };

export default function Page() {
  return (
    <StepGuard step={5}>
      <StepDiagnostico />
    </StepGuard>
  );
}
