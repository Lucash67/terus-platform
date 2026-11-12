import { z } from "zod";

/**
 * Schemas do Self Onboarding 2.0 — espelham a validação do backend
 * (apps/api/app/api/schemas). O servidor continua sendo a fonte de verdade.
 */

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidCnpj(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) return false;
  const calc = (base: string, weights: number[]) => {
    const total = weights.reduce((sum, w, i) => sum + Number(base[i]) * w, 0);
    const r = total % 11;
    return r < 2 ? "0" : String(11 - r);
  };
  const first = calc(digits.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = calc(
    digits.slice(0, 12) + first,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
  );
  return digits.slice(12) === first + second;
}

export function formatCnpj(value: string): string {
  const d = onlyDigits(value).slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

export function formatPhone(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d.replace(/^(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

const password = z
  .string()
  .min(10, "Use pelo menos 10 caracteres.")
  .max(128)
  .refine(
    (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
    "Use maiúsculas e minúsculas.",
  )
  .refine((v) => /\d/.test(v), "Inclua ao menos um número.");

export const registerSchema = z.object({
  full_name: z.string().trim().min(3, "Informe seu nome completo.").max(160),
  email: z.string().trim().email("E-mail inválido."),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || onlyDigits(v).length >= 10,
      "Telefone com DDD, ex.: (85) 99999-9999.",
    ),
  job_title: z.string().max(120).optional(),
  password,
  accept_terms: z.literal(true, {
    errorMap: () => ({ message: "Aceite os Termos de Uso para continuar." }),
  }),
  accept_privacy: z.literal(true, {
    errorMap: () => ({
      message: "Aceite a Política de Privacidade para continuar.",
    }),
  }),
  marketing_opt_in: z.boolean(),
});
export type RegisterValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("E-mail inválido."),
  password: z.string().min(1, "Informe a senha."),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const recoverSchema = z.object({
  email: z.string().trim().email("E-mail inválido."),
});
export type RecoverValues = z.infer<typeof recoverSchema>;

export const resetPasswordSchema = z
  .object({ new_password: password, confirm: z.string() })
  .refine((v) => v.new_password === v.confirm, {
    message: "As senhas não conferem.",
    path: ["confirm"],
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const SEGMENTS = [
  "supermercado",
  "atacarejo",
  "farmacia",
  "material_construcao",
  "industria",
  "distribuidor",
  "outro",
] as const;
export const SIZE_BANDS = ["1", "2-10", "11-50", "51+"] as const;
export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
] as const; // prettier-ignore

export const organizationSchema = z.object({
  legal_name: z.string().trim().min(2, "Informe a razão social.").max(200),
  trade_name: z.string().trim().max(200).optional(),
  cnpj: z.string().refine(isValidCnpj, "CNPJ inválido. Confira os 14 dígitos."),
  segment: z.enum(SEGMENTS, {
    errorMap: () => ({ message: "Escolha o segmento." }),
  }),
  size_band: z.enum(SIZE_BANDS, {
    errorMap: () => ({ message: "Escolha o número de lojas." }),
  }),
  city: z.string().trim().max(120).optional(),
  state: z.enum(UFS).optional().or(z.literal("")),
});
export type OrganizationValues = z.infer<typeof organizationSchema>;

export const ERP_CHOICES = [
  "rms",
  "consinco",
  "vr_software",
  "ciss_poder",
  "rpinfo",
  "api_rest",
  "winthor",
  "sankhya",
  "vitsis",
  "outro",
] as const;
export const PRIORITIES = [
  "ruptura",
  "excesso",
  "reposicao",
  "execucao_loja",
  "metas",
  "fornecedores",
  "producao",
  "cd_logistica",
  "exposicao",
] as const;
export const TIMELINES = ["imediato", "ate_3_meses", "explorando"] as const;

export const profileSchema = z
  .object({
    erp: z.enum(ERP_CHOICES, {
      errorMap: () => ({ message: "Escolha o ERP." }),
    }),
    erp_other: z.string().trim().max(80).optional(),
    stores_band: z.enum(SIZE_BANDS, {
      errorMap: () => ({ message: "Escolha o número de lojas." }),
    }),
    priorities: z
      .array(z.enum(PRIORITIES))
      .min(1, "Escolha pelo menos uma prioridade."),
    has_it_contact: z.boolean(),
    timeline: z.enum(TIMELINES, {
      errorMap: () => ({ message: "Escolha o prazo." }),
    }),
    notes: z.string().max(1000).optional(),
  })
  .refine((v) => v.erp !== "outro" || Boolean(v.erp_other?.trim()), {
    message: "Informe qual é o ERP.",
    path: ["erp_other"],
  });
export type ProfileValues = z.infer<typeof profileSchema>;

export const commercialRequestSchema = z.object({
  kind: z.enum(["proposal", "specialist_contact"]),
  preferred_contact: z.enum(["email", "telefone", "whatsapp"]),
  message: z.string().max(2000).optional(),
});
export type CommercialRequestValues = z.infer<typeof commercialRequestSchema>;
