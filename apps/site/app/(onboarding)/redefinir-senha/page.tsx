import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthShell } from "@/components/onboarding/auth-shell";
import { ResetPasswordForm } from "@/components/onboarding/reset-password-form";

export const metadata: Metadata = { title: "Nova senha" };

export default function RedefinirSenhaPage() {
  return (
    <AuthShell
      eyebrow="Acesso"
      title="Criar nova senha"
      description="O link vale por 1 hora e só pode ser usado uma vez."
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
