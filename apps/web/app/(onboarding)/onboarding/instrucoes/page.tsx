import type { Metadata } from "next";

import { StepGuard } from "@/components/onboarding/step-guard";
import { StepInstrucoes } from "@/components/onboarding/step-instrucoes";

export const metadata: Metadata = {
  title: "Instruções de integração",
};

export default function InstrucoesPage() {
  return (
    <StepGuard step={3}>
      <StepInstrucoes />
    </StepGuard>
  );
}
