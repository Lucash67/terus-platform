/**
 * Onboarding self-service: liberado em desenvolvimento e oculto em produção
 * até NEXT_PUBLIC_ONBOARDING_ENABLED=true ser definido na Vercel.
 */
export const ONBOARDING_ENABLED =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_ONBOARDING_ENABLED === "true";
