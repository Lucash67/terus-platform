import type { Metadata } from "next";

import { StepCadastro } from "@/components/onboarding/step-cadastro";
import { StepGuard } from "@/components/onboarding/step-guard";

export const metadata: Metadata = {
  title: "Cadastro da empresa",
};

export default function CadastroPage() {
  return (
    <StepGuard step={1}>
      <StepCadastro />
    </StepGuard>
  );
}
