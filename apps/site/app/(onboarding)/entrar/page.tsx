import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { AuthShell } from "@/components/onboarding/auth-shell";
import { LoginForm } from "@/components/onboarding/login-form";

export const metadata: Metadata = { title: "Entrar" };

export default function EntrarPage() {
  return (
    <AuthShell
      eyebrow="Acesso"
      title="Entrar na sua conta"
      description="Retome o cadastro ou acompanhe a sua solicitação."
      footer={
        <>
          Ainda não tem conta?{" "}
          <Link href="/criar-conta" className="text-text-link hover:underline">
            Criar conta
          </Link>
        </>
      }
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
