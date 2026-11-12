import type { Metadata } from "next";

import { StepContratos } from "@/components/onboarding/step-contratos";
import { StepGuard } from "@/components/onboarding/step-guard";

export const metadata: Metadata = {
  title: "Contrato digital",
};

export default function ContratosPage() {
  return (
    <StepGuard step={6}>
      <StepContratos />
    </StepGuard>
  );
}
