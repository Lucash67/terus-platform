import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AccountNavbar } from "@/components/onboarding/account-navbar";
import { QueryProvider } from "@/components/providers/query-provider";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: {
    default: "Sua conta — Terus Varejo",
    template: "%s · Terus Varejo",
  },
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!ONBOARDING_ENABLED) notFound();

  return (
    <QueryProvider>
      <div className="ob-bg relative flex min-h-screen flex-col overflow-x-clip">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div className="ob-grid-overlay absolute inset-x-0 top-0 h-[560px]" />
          <div className="ob-aurora absolute -left-32 top-24 h-96 w-96 rounded-full bg-brand-primary/20" />
          <div className="ob-aurora ob-aurora-delayed absolute -right-24 top-[45%] h-80 w-80 rounded-full bg-brand-secondary/25" />
        </div>
        <AccountNavbar />
        <main id="conteudo" className="relative flex-1">
          {children}
        </main>
        <footer className="relative border-t border-surface-border/60 py-5">
          <p className="px-4 text-center text-body-sm text-text-tertiary">
            Seus dados ficam salvos na sua conta. Nesta jornada não pedimos
            senha nem acesso ao banco do ERP.
          </p>
        </footer>
      </div>
    </QueryProvider>
  );
}
