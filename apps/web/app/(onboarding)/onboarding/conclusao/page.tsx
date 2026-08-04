import type { Metadata } from "next";

import { StepConclusao } from "@/components/onboarding/step-conclusao";
import { StepGuard } from "@/components/onboarding/step-guard";

export const metadata: Metadata = {
  title: "Ativação",
};

export default function ConclusaoPage() {
  return (
    <StepGuard step={7}>
      <StepConclusao />
    </StepGuard>
  );
}
