/** Contratos de resposta da API (apps/api/app/api/schemas). */

export type PlatformRole = "customer" | "terus_sales" | "terus_admin";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  job_title: string | null;
  role: PlatformRole;
  email_verified: boolean;
  created_at: string;
}

export interface SessionInfo {
  user: User;
  email_verification: "verified" | "pending_provider_not_configured";
}

export interface Organization {
  id: string;
  legal_name: string;
  trade_name: string | null;
  cnpj: string;
  segment: string;
  size_band: string;
  city: string | null;
  state: string | null;
  status: string;
}

export interface Recommendation {
  module: string;
  name: string;
  reason: string;
}

export interface RequestEvent {
  id: string;
  event_type: string;
  from_status: string | null;
  to_status: string | null;
  note: string | null;
  visible_to_customer: boolean;
  created_at: string;
}

export interface CommercialRequest {
  id: string;
  kind: "proposal" | "specialist_contact";
  status: string;
  preferred_contact: string;
  message: string | null;
  assigned_to: string | null;
  contract_evidence: string | null;
  created_at: string;
  updated_at: string;
  events: RequestEvent[];
}

export interface ImplementationItem {
  key: string;
  label: string;
  status:
    | "concluido"
    | "informado"
    | "pendente"
    | "nao_configurado"
    | "nao_iniciado";
  detail: string;
}

export interface Profile {
  erp: string;
  erp_other: string | null;
  stores_band: string;
  priorities: string[];
  has_it_contact: boolean;
  timeline: string;
  notes: string | null;
}

export interface Journey {
  organization: Organization;
  membership_role: string | null;
  session_id: string;
  track: string;
  status: string;
  completed_steps: string[];
  profile: Profile | null;
  recommendations: Recommendation[];
  requests: CommercialRequest[];
  implementation: ImplementationItem[];
  updated_at: string;
}

export interface Lead {
  tenant_id: string;
  legal_name: string;
  trade_name: string | null;
  cnpj: string;
  segment: string;
  size_band: string;
  status: string;
  qualification_score: number | null;
  owner_name: string | null;
  owner_email: string | null;
  utm_source: string | null;
  latest_request_id: string | null;
  latest_request_status: string | null;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadPage {
  items: Lead[];
  total: number;
  page: number;
  page_size: number;
}

export interface LeadDetail {
  journey: Journey;
  owner: {
    full_name: string;
    email: string;
    phone: string | null;
    job_title: string | null;
  } | null;
  qualification_score: number | null;
  qualification_reasons: {
    factor: string;
    points: number;
    explanation: string;
  }[];
  source: Record<string, string> | null;
  audit: {
    id: string;
    action: string;
    actor_id: string | null;
    entity: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
  }[];
}

export interface StaffMember {
  id: string;
  full_name: string;
  email: string;
  role: string;
}
