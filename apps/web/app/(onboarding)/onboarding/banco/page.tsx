import type { Metadata } from "next";

import { StepBanco } from "@/components/onboarding/step-banco";
import { StepGuard } from "@/components/onboarding/step-guard";

export const metadata: Metadata = {
  title: "Configuração do banco",
};

export default function BancoPage() {
  return (
    <StepGuard step={4}>
      <StepBanco />
    </StepGuard>
  );
}
