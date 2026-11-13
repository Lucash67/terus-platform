import type { Metadata } from "next";

import { StepGuard } from "@/components/activation-demo/step-shell";
import { StepConexao } from "@/components/activation-demo/step-conexao";

export const metadata: Metadata = { title: "Dados da conexão" };

export default function Page() {
  return (
    <StepGuard step={4}>
      <StepConexao />
    </StepGuard>
  );
}
