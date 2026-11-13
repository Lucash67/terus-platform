import type { Metadata } from "next";

import { LeadDetailView } from "@/components/admin/lead-detail";

export const metadata: Metadata = { title: "Lead" };

export default function LeadPage({ params }: { params: { id: string } }) {
  return <LeadDetailView tenantId={params.id} />;
}
