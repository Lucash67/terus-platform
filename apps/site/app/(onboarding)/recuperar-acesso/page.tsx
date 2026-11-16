import type { Metadata } from "next";

import { AuthShell } from "@/components/onboarding/auth-shell";
import { RecoverForm } from "@/components/onboarding/recover-form";

export const metadata: Metadata = { title: "Recuperar acesso" };

export default function RecuperarAcessoPage() {
  return (
    <AuthShell
      eyebrow="Acesso"
      title="Recuperar acesso"
      description="Informe o e-mail da sua conta."
    >
      <RecoverForm />
    </AuthShell>
  );
}
