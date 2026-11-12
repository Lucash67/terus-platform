type EventProps = Record<string, string | number>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

/** Domínio cadastrado no Plausible. Vazio = analytics desligado (ADR-009). */
export const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "";

export const ANALYTICS_EVENTS = {
  ctaClick: "CTA Click",
  whatsappClick: "WhatsApp Click",
  preCadastro: "Pre-cadastro Enviado",
  tourChapter: "Tour Capitulo",
  videoSound: "Video Som Ativado",
} as const;

type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export function track(event: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}
