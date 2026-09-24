import type { Metadata } from "next";

import { OnboardingNavbar } from "@/components/onboarding/onboarding-navbar";
import { OnboardingStepper } from "@/components/onboarding/onboarding-stepper";

export const metadata: Metadata = {
  title: {
    default: "Onboarding — Terus Varejo",
    template: "%s · Onboarding Terus Varejo",
  },
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ob-bg relative flex min-h-screen flex-col overflow-x-clip">
      {/* Camada de fundo animada */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="ob-grid-overlay absolute inset-x-0 top-0 h-[560px]" />
        <div className="ob-aurora absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-primary/20" />
        <div className="ob-aurora ob-aurora-delayed absolute -right-24 top-[45%] h-80 w-80 rounded-full bg-brand-secondary/25" />
      </div>

      <OnboardingNavbar />
      <OnboardingStepper />

      <main className="relative flex-1">{children}</main>

      <footer className="relative border-t border-surface-border/60 py-5">
        <p className="text-center text-body-sm text-text-tertiary">
          Conexão criptografada · credenciais em cofre dedicado · acesso
          somente-leitura ao seu ERP
        </p>
      </footer>
    </div>
  );
}
