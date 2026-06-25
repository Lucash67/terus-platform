// Common types shared across frontend and backend

export type UUID = string;

export type Timestamp = string;

export interface BaseEntity {
  id: UUID;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Tenant {
  id: UUID;
  name: string;
  cnpj: string;
  schemaName: string;
  status: "pending" | "active" | "suspended";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OnboardingSession extends BaseEntity {
  email: string;
  companyName: string;
  cnpj: string;
  segment: "retail" | "industry" | "distribution";
  erp: "winthor" | "rms" | "other";
  currentStep: number;
  status: "in_progress" | "completed" | "failed";
  stepData: Record<string, unknown>;
}

export interface DiagnosticJob extends BaseEntity {
  sessionId: UUID;
  status: "pending" | "running" | "completed" | "failed";
  results: DiagnosticItem[];
}

export interface DiagnosticItem {
  name: string;
  status: "passed" | "failed" | "skipped";
  message: string;
  duration?: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  detail?: unknown[];
}

export interface CompanyLogos {
  primary: string | null;
  monochrome: string | null;
  dark: string | null;
}

export interface RedeCompany {
  name: string;
  slug: string;
  category: "varejo" | "distribuidor";
  status: "ativo" | "inativo";
  integrationStatus: "connected" | "pending" | "error";
  erp: string | null;
  website: string | null;
  featured: boolean;
  permissionLevel: "logo" | "case" | "public";
  logos: CompanyLogos;
}

export interface Indicator {
  label: string;
  value: string;
}

export interface ExecutiveIndicator {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  company: string | null;
  category: "varejo" | "distribuidor";
  erp: string;
  challenge: string;
  implementation: string;
  results: string;
  beforeAfterIndicators: {
    antes: Indicator[];
    depois: Indicator[];
    resultados: Indicator[];
  };
  executiveIndicators: ExecutiveIndicator[];
  logos: CompanyLogos;
  thumbnail?: string | null;
  description?: string;
}
