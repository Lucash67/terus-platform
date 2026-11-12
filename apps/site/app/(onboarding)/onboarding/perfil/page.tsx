import type { Metadata } from "next";

import { ProfileStep } from "@/components/onboarding/profile-step";

export const metadata: Metadata = { title: "Operação" };

export default function Page() {
  return <ProfileStep />;
}
