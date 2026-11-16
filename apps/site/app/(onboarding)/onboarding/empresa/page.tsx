import type { Metadata } from "next";

import { OrganizationStep } from "@/components/onboarding/organization-step";

export const metadata: Metadata = { title: "Empresa" };

export default function Page() {
  return <OrganizationStep />;
}
