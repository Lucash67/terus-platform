"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";

/** Registra UTM e página de entrada (sem PII) para gravar junto do lead. */
export function AttributionCapture({ cta }: { cta?: string }) {
  useEffect(() => {
    captureAttribution(cta);
  }, [cta]);
  return null;
}
