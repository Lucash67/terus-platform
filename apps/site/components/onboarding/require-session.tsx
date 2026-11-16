"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { Notice } from "@/components/onboarding/notice";
import { useSession } from "@/lib/api/hooks";
import type { SessionInfo } from "@/lib/api/types";

/**
 * Guarda de rota no cliente. A autorização real acontece no backend em cada
 * requisição; isto só evita mostrar telas vazias a quem não entrou.
 */
export function RequireSession({
  children,
  staffOnly = false,
}: {
  children: (session: SessionInfo) => React.ReactNode;
  staffOnly?: boolean;
}) {
  const { data, isLoading, error } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && data === null) {
      router.replace(`/entrar?next=${encodeURIComponent(pathname)}`);
    }
  }, [data, isLoading, pathname, router]);

  if (error) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <Notice tone="error" title="Serviço indisponível">
          {error.message}
        </Notice>
      </div>
    );
  }
  if (isLoading || !data) {
    return (
      <div
        className="flex min-h-[40vh] items-center justify-center"
        aria-live="polite"
      >
        <span className="ob-spin h-6 w-6 rounded-full border-2 border-brand-primary border-t-transparent" />
        <span className="sr-only">Carregando…</span>
      </div>
    );
  }
  if (staffOnly && data.user.role === "customer") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <Notice tone="warning" title="Área restrita">
          Esta área é da equipe Terus. Sua conta tem acesso ao portal do
          cliente.
        </Notice>
      </div>
    );
  }
  return <>{children(data)}</>;
}
