/**
 * Cliente HTTP da API Terus. Usado SOMENTE pelos hooks em lib/api/hooks.ts
 * (componentes nunca chamam fetch diretamente).
 *
 * O navegador fala com a API pelo proxy same-origin do Next (/api/v1/* →
 * API_INTERNAL_URL/v1/*), então os cookies HttpOnly de sessão funcionam sem
 * expor tokens ao JavaScript.
 */

export interface ApiErrorBody {
  error: string;
  message: string;
  detail: unknown[];
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public detail: unknown[] = [],
  ) {
    super(message);
  }
}

const BASE = "/api";
const UNAVAILABLE_MESSAGE =
  "O serviço de cadastro não está disponível neste ambiente. Tente mais tarde ou fale com a Terus pelo WhatsApp.";

async function rawRequest(path: string, init: RequestInit): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    ...init,
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
      "x-terus-client": "web",
      ...(init.headers ?? {}),
    },
  });
}

let refreshing: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  refreshing ??= rawRequest("/v1/auth/refresh", { method: "POST" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

async function parse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  if (!isJson) {
    throw new ApiError(
      response.status,
      "SERVICE_UNAVAILABLE",
      UNAVAILABLE_MESSAGE,
    );
  }
  const body: unknown = await response.json();
  if (!response.ok) {
    const err = body as Partial<ApiErrorBody>;
    throw new ApiError(
      response.status,
      err.error ?? "UNKNOWN",
      err.message ?? "Algo deu errado. Tente de novo.",
      err.detail ?? [],
    );
  }
  return body as T;
}

export async function apiRequest<T>(
  path: string,
  options: { method?: string; body?: unknown; retryOnAuth?: boolean } = {},
): Promise<T> {
  const { method = "GET", body, retryOnAuth = true } = options;
  const init: RequestInit = {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  };
  let response: Response;
  try {
    response = await rawRequest(path, init);
  } catch {
    throw new ApiError(0, "NETWORK", UNAVAILABLE_MESSAGE);
  }
  if (response.status === 401 && retryOnAuth && !path.startsWith("/v1/auth/")) {
    if (await tryRefresh()) {
      response = await rawRequest(path, init);
    }
  }
  return parse<T>(response);
}

export function fieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiError)) return {};
  const out: Record<string, string> = {};
  for (const item of error.detail) {
    if (
      item &&
      typeof item === "object" &&
      "field" in item &&
      "message" in item
    ) {
      out[String(item.field)] = String(item.message);
    }
  }
  return out;
}
