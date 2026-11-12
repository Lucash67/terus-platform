import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/components/onboarding/auth-shell";
import { RegisterForm } from "@/components/onboarding/register-form";

export const metadata: Metadata = { title: "Criar conta" };

export default function CriarContaPage() {
  return (
    <AuthShell
      eyebrow="Começar agora · etapa 1 de 5"
      title="Crie sua conta"
      description="Com a conta você salva o progresso e retoma de qualquer dispositivo. Leva cerca de 3 minutos até pedir a proposta."
      footer={
        <>
          Já tem conta?{" "}
          <Link href="/entrar" className="text-text-link hover:underline">
            Entrar
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
