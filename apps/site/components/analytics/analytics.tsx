"use client";

import { useEffect } from "react";
import Script from "next/script";

import { CTA } from "@/lib/constants/conversion";
import { ANALYTICS_DOMAIN, ANALYTICS_EVENTS, track } from "@/lib/analytics";

const QUEUE_STUB =
  "window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}";

function originOf(element: Element): string {
  if (element.closest("header, nav")) return "menu";
  if (element.closest("footer")) return "rodape";
  const section = element.closest("section[id], section");
  return section?.id || "pagina";
}

/** Plausible + cliques de conversão por delegação, sem tocar em cada botão. */
export function Analytics() {
  useEffect(() => {
    if (!ANALYTICS_DOMAIN) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const props = {
        pagina: window.location.pathname,
        origem: originOf(link),
      };
      if (href === CTA.primary.href) track(ANALYTICS_EVENTS.ctaClick, props);
      else if (href.includes("wa.me/"))
        track(ANALYTICS_EVENTS.whatsappClick, props);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!ANALYTICS_DOMAIN) return null;

  return (
    <>
      <Script id="plausible-queue" strategy="afterInteractive">
        {QUEUE_STUB}
      </Script>
      <Script
        src="https://plausible.io/js/script.js"
        data-domain={ANALYTICS_DOMAIN}
        strategy="afterInteractive"
      />
    </>
  );
}
