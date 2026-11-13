import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepCadastro } from "@/components/activation-demo/step-cadastro";

export const metadata: Metadata = { title: "Cadastro" };

export default function Page() {
  return (
    <StepGuard step={1}>
      <StepCadastro />
    </StepGuard>
  );
}
