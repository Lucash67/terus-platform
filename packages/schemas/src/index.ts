import { z } from "zod";

// Common validation schemas shared across frontend and backend

export const uuidSchema = z.string().uuid();

export const timestampSchema = z.string().datetime();

export const cnpjSchema = z
  .string()
  .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "CNPJ inválido");

export const emailSchema = z.string().email("E-mail inválido");

export const onboardingStep1Schema = z.object({
  email: emailSchema,
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: cnpjSchema,
  segment: z.enum(["retail", "industry", "distribution"]),
  erp: z.enum(["winthor", "rms", "other"]),
});

export const onboardingStep2Schema = z.object({
  erpHost: z.string().min(1, "Host do ERP é obrigatório"),
  erpPort: z.number().int().min(1024).max(65535),
  erpDatabase: z.string().min(1, "Nome do banco é obrigatório"),
  erpUser: z.string().min(1, "Usuário é obrigatório"),
  erpPassword: z.string().min(1, "Senha é obrigatória"),
});

export const diagnosticJobSchema = z.object({
  sessionId: uuidSchema,
});

export const healthResponseSchema = z.object({
  status: z.enum(["healthy", "degraded", "unhealthy"]),
  version: z.string(),
  timestamp: timestampSchema,
  services: z.object({
    database: z.enum(["up", "down"]),
    redis: z.enum(["up", "down"]),
    vault: z.enum(["up", "down", "skipped"]),
  }),
});
