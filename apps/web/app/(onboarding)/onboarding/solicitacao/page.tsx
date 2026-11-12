import type { Metadata } from "next";

import { RequestStep } from "@/components/onboarding/request-step";

export const metadata: Metadata = { title: "Recomendação" };

export default function Page() {
  return <RequestStep />;
}
