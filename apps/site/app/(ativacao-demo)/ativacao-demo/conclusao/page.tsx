import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepConclusao } from "@/components/activation-demo/step-conclusao";

export const metadata: Metadata = { title: "Ativação" };

export default function Page() {
  return (
    <StepGuard step={7}>
      <StepConclusao />
    </StepGuard>
  );
}
