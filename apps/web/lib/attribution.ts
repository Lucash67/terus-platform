/**
 * Atribuição de origem (UTM + CTA) do lead. Fica em sessionStorage apenas até
 * o cadastro da empresa, quando é gravada no backend junto da jornada.
 * Não contém dados pessoais.
 */

const KEY = "terus.attribution";
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type Attribution = Partial<
  Record<(typeof UTM_KEYS)[number] | "landing_path" | "cta", string>
>;

function safeStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

export function captureAttribution(cta?: string): void {
  const storage = safeStorage();
  if (!storage) return;
  const current = readAttribution() ?? {};
  const params = new URLSearchParams(window.location.search);
  const next: Attribution = { ...current };
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) next[key] = value.slice(0, 100);
  }
  next.landing_path ??= window.location.pathname.slice(0, 200);
  if (cta) next.cta = cta.slice(0, 60);
  try {
    storage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* armazenamento indisponível — atribuição é opcional */
  }
}

export function readAttribution(): Attribution | null {
  const storage = safeStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
