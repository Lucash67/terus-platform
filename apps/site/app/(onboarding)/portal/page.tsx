import type { Metadata } from "next";

import { PortalView } from "@/components/portal/portal-view";

export const metadata: Metadata = { title: "Portal do cliente" };

export default function PortalPage() {
  return <PortalView />;
}
