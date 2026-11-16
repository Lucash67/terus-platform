import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepContrato } from "@/components/activation-demo/step-contrato";

export const metadata: Metadata = { title: "Contrato" };

export default function Page() {
  return (
    <StepGuard step={6}>
      <StepContrato />
    </StepGuard>
  );
}
