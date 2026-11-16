"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { RequireSession } from "@/components/onboarding/require-session";
import { Notice } from "@/components/onboarding/notice";
import { useOrganizations } from "@/lib/api/hooks";

/** Retomada: leva a pessoa para a próxima etapa pendente, segundo o servidor. */
function Resume() {
  const router = useRouter();
  const orgs = useOrganizations();
  useEffect(() => {
    if (!orgs.isSuccess) return;
    const journey = orgs.data.items[0];
    if (!journey) router.replace("/onboarding/empresa");
    else if (!journey.profile) router.replace("/onboarding/perfil");
    else if (journey.requests.length === 0)
      router.replace("/onboarding/solicitacao");
    else router.replace("/portal");
  }, [orgs.isSuccess, orgs.data, router]);
  if (orgs.error) return <Notice tone="error">{orgs.error.message}</Notice>;
  return (
    <p
      className="py-16 text-center text-body-md text-text-tertiary"
      aria-live="polite"
    >
      Retomando de onde você parou…
    </p>
  );
}

export function OnboardingHub() {
  return (
    <RequireSession>
      {(session) =>
        session.user.role === "customer" ? <Resume /> : <AdminRedirect />
      }
    </RequireSession>
  );
}

function AdminRedirect() {
  const router = useRouter();
  useEffect(() => router.replace("/admin"), [router]);
  return null;
}
