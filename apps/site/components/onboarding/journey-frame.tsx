"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { JourneyStepper } from "@/components/onboarding/journey-stepper";
import { Notice } from "@/components/onboarding/notice";
import { RequireSession } from "@/components/onboarding/require-session";
import { useOrganizations } from "@/lib/api/hooks";
import type { Journey, SessionInfo } from "@/lib/api/types";
import type { JourneyStepDef } from "@/lib/constants/onboarding";

interface FrameProps {
  step: JourneyStepDef["id"];
  title: string;
  description: string;
  /** Etapas que exigem empresa cadastrada redirecionam para /onboarding/empresa. */
  requiresOrganization?: boolean;
  children: (ctx: {
    session: SessionInfo;
    journey: Journey | null;
  }) => React.ReactNode;
}

function FrameBody({
  step,
  title,
  description,
  requiresOrganization,
  children,
  session,
}: FrameProps & { session: SessionInfo }) {
  const router = useRouter();
  const orgs = useOrganizations();
  const journey = orgs.data?.items[0] ?? null;

  useEffect(() => {
    if (requiresOrganization && orgs.isSuccess && !journey)
      router.replace("/onboarding/empresa");
  }, [requiresOrganization, orgs.isSuccess, journey, router]);

  return (
    <>
      <JourneyStepper journey={journey} current={step} />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8">
        <header className="ob-enter mb-8">
          <h1 className="font-display text-heading-xl font-bold text-text-primary sm:text-display-lg">
            {title}
          </h1>
          <p className="mt-2 text-body-lg text-text-secondary">{description}</p>
        </header>
        {orgs.isLoading ? (
          <p className="text-body-md text-text-tertiary" aria-live="polite">
            Carregando seu progresso…
          </p>
        ) : orgs.error ? (
          <Notice tone="error">{orgs.error.message}</Notice>
        ) : requiresOrganization && !journey ? null : (
          <div className="ob-enter-scale">{children({ session, journey })}</div>
        )}
      </div>
    </>
  );
}

export function JourneyFrame(props: FrameProps) {
  return (
    <RequireSession>
      {(session) => <FrameBody {...props} session={session} />}
    </RequireSession>
  );
}
