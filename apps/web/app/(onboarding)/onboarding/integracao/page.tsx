import type { Metadata } from "next";

import { StepGuard } from "@/components/onboarding/step-guard";
import { StepIntegracao } from "@/components/onboarding/step-integracao";

export const metadata: Metadata = {
  title: "Escolha do ERP",
};

export default function IntegracaoPage() {
  return (
    <StepGuard step={2}>
      <StepIntegracao />
    </StepGuard>
  );
}
