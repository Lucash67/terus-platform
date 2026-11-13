import type { Metadata } from "next";

import { LeadsInbox } from "@/components/admin/leads-inbox";

export const metadata: Metadata = { title: "Leads" };

export default function AdminPage() {
  return <LeadsInbox />;
}
