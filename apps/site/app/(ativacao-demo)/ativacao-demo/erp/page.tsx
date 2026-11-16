import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepErp } from "@/components/activation-demo/step-erp";

export const metadata: Metadata = { title: "Escolha do ERP" };

export default function Page() {
  return (
    <StepGuard step={2}>
      <StepErp />
    </StepGuard>
  );
}
