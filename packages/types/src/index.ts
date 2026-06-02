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
