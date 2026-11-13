import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepPreparacao } from "@/components/activation-demo/step-preparacao";

export const metadata: Metadata = { title: "Preparação do TI" };

export default function Page() {
  return (
    <StepGuard step={3}>
      <StepPreparacao />
    </StepGuard>
  );
}
