"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type {
  CommercialRequestValues,
  LoginValues,
  OrganizationValues,
  ProfileValues,
  RegisterValues,
} from "@terus/schemas";
import { onlyDigits } from "@terus/schemas";

import { ApiError, apiRequest } from "@/lib/api/client";
import type {
  Journey,
  LeadDetail,
  LeadPage,
  SessionInfo,
  StaffMember,
} from "@/lib/api/types";
import { readAttribution } from "@/lib/attribution";

export const queryKeys = {
  session: ["session"] as const,
  organizations: ["organizations"] as const,
  journey: (id: string) => ["organizations", id] as const,
  leads: (params: Record<string, string | number | undefined>) =>
    ["admin", "leads", params] as const,
  lead: (id: string) => ["admin", "lead", id] as const,
  funnel: ["admin", "funnel"] as const,
  staff: ["admin", "staff"] as const,
};

/** Sessão atual: `null` quando não autenticado (401), erro para indisponibilidade. */
export function useSession(
  options: Partial<UseQueryOptions<SessionInfo | null>> = {},
) {
  return useQuery<SessionInfo | null>({
    queryKey: queryKeys.session,
    queryFn: async () => {
      try {
        return await apiRequest<SessionInfo>("/v1/auth/session", {
          retryOnAuth: false,
        });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          try {
            return await apiRequest<SessionInfo>("/v1/auth/refresh", {
              method: "POST",
            });
          } catch {
            return null;
          }
        }
        throw error;
      }
    },
    staleTime: 60_000,
    retry: false,
    ...options,
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: RegisterValues) =>
      apiRequest<SessionInfo>("/v1/auth/register", {
        method: "POST",
        body: {
          ...values,
          phone: values.phone ? onlyDigits(values.phone) : null,
          job_title: values.job_title || null,
        },
      }),
    onSuccess: (data) => {
      qc.clear();
      qc.setQueryData(queryKeys.session, data);
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: LoginValues) =>
      apiRequest<SessionInfo>("/v1/auth/login", {
        method: "POST",
        body: values,
      }),
    onSuccess: (data) => {
      qc.clear();
      qc.setQueryData(queryKeys.session, data);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiRequest<void>("/v1/auth/logout", { method: "POST" }),
    onSettled: () => {
      qc.clear();
      qc.setQueryData(queryKeys.session, null);
    },
  });
}

export function useRecover() {
  return useMutation({
    mutationFn: (email: string) =>
      apiRequest<{ delivery: "sent" | "not_configured"; message: string }>(
        "/v1/auth/recover",
        { method: "POST", body: { email } },
      ),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (body: { token: string; new_password: string }) =>
      apiRequest<{ message: string }>("/v1/auth/reset-password", {
        method: "POST",
        body,
      }),
  });
}

export function useOrganizations(enabled = true) {
  return useQuery({
    queryKey: queryKeys.organizations,
    queryFn: () => apiRequest<{ items: Journey[] }>("/v1/organizations"),
    enabled,
  });
}

function organizationBody(values: OrganizationValues) {
  return {
    ...values,
    cnpj: onlyDigits(values.cnpj),
    trade_name: values.trade_name || null,
    city: values.city || null,
    state: values.state || null,
  };
}

export function useCreateOrganization() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: OrganizationValues) =>
      apiRequest<Journey>("/v1/organizations", {
        method: "POST",
        body: { ...organizationBody(values), source: readAttribution() },
      }),
    onSuccess: (journey) => {
      qc.setQueryData(queryKeys.journey(journey.organization.id), journey);
      void qc.invalidateQueries({ queryKey: queryKeys.organizations });
    },
  });
}

export function useUpdateOrganization(tenantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: OrganizationValues) =>
      apiRequest<Journey>(`/v1/organizations/${tenantId}`, {
        method: "PUT",
        body: organizationBody(values),
      }),
    onSuccess: (journey) => {
      qc.setQueryData(queryKeys.journey(tenantId), journey);
      void qc.invalidateQueries({ queryKey: queryKeys.organizations });
    },
  });
}

export function useSaveProfile(tenantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: ProfileValues) =>
      apiRequest<Journey>(`/v1/organizations/${tenantId}/profile`, {
        method: "PUT",
        body: {
          ...values,
          erp_other: values.erp === "outro" ? values.erp_other : null,
          notes: values.notes || null,
        },
      }),
    onSuccess: (journey) => {
      qc.setQueryData(queryKeys.journey(tenantId), journey);
      void qc.invalidateQueries({ queryKey: queryKeys.organizations });
    },
  });
}

export function useRequestCommercial(tenantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (values: CommercialRequestValues) =>
      apiRequest<Journey>(`/v1/organizations/${tenantId}/commercial-requests`, {
        method: "POST",
        body: { ...values, message: values.message || null },
      }),
    onSuccess: (journey) => {
      qc.setQueryData(queryKeys.journey(tenantId), journey);
      void qc.invalidateQueries({ queryKey: queryKeys.organizations });
    },
  });
}

// --- Equipe Terus ---------------------------------------------------------------

export function useLeads(params: {
  status?: string;
  q?: string;
  page: number;
}) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.q) search.set("q", params.q);
  search.set("page", String(params.page));
  search.set("page_size", "20");
  return useQuery({
    queryKey: queryKeys.leads(params),
    queryFn: () => apiRequest<LeadPage>(`/v1/admin/leads?${search.toString()}`),
    placeholderData: (previous) => previous,
  });
}

export function useFunnel() {
  return useQuery({
    queryKey: queryKeys.funnel,
    queryFn: () =>
      apiRequest<{ counts: Record<string, number> }>("/v1/admin/funnel"),
  });
}

export function useStaff() {
  return useQuery({
    queryKey: queryKeys.staff,
    queryFn: () => apiRequest<StaffMember[]>("/v1/admin/staff"),
  });
}

export function useLead(tenantId: string) {
  return useQuery({
    queryKey: queryKeys.lead(tenantId),
    queryFn: () => apiRequest<LeadDetail>(`/v1/admin/leads/${tenantId}`),
  });
}

function useLeadMutation<TBody>(
  tenantId: string,
  path: (requestId: string) => string,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ requestId, body }: { requestId: string; body: TBody }) =>
      apiRequest<LeadDetail | undefined>(path(requestId), {
        method: "POST",
        body,
      }),
    onSuccess: (data) => {
      if (data) qc.setQueryData(queryKeys.lead(tenantId), data);
      else void qc.invalidateQueries({ queryKey: queryKeys.lead(tenantId) });
      void qc.invalidateQueries({ queryKey: ["admin", "leads"] });
      void qc.invalidateQueries({ queryKey: queryKeys.funnel });
    },
  });
}

export function useChangeRequestStatus(tenantId: string) {
  return useLeadMutation<{
    to_status: string;
    note?: string;
    contract_evidence?: string;
  }>(tenantId, (id) => `/v1/admin/commercial-requests/${id}/status`);
}

export function useAssignRequest(tenantId: string) {
  return useLeadMutation<{ assignee_id: string | null }>(
    tenantId,
    (id) => `/v1/admin/commercial-requests/${id}/assign`,
  );
}

export function useAddNote(tenantId: string) {
  return useLeadMutation<{ note: string; visible_to_customer: boolean }>(
    tenantId,
    (id) => `/v1/admin/commercial-requests/${id}/notes`,
  );
}
