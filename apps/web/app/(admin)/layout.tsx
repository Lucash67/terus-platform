import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AccountNavbar } from "@/components/onboarding/account-navbar";
import { QueryProvider } from "@/components/providers/query-provider";
import { ONBOARDING_ENABLED } from "@/lib/feature-flags";

export const metadata: Metadata = {
  title: { default: "Painel — Terus", template: "%s · Painel Terus" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!ONBOARDING_ENABLED) notFound();
  return (
    <QueryProvider>
      <div className="flex min-h-screen flex-col bg-surface-base">
        <AccountNavbar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}
