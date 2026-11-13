"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import { cnpjSchema, onboardingCadastroSchema } from "@terus/schemas";
import { isValidCnpj } from "@terus/schemas/self-onboarding";

import type { DemoErpId } from "@/lib/constants/activation-demo";

/** Schema compartilhado do wizard + dígito verificador do CNPJ (o original só checava o formato). */
export const demoCadastroSchema = onboardingCadastroSchema.extend({
  cnpj: cnpjSchema.refine(isValidCnpj, "CNPJ inválido — confira os dígitos"),
});

export type DemoCadastro = z.infer<typeof demoCadastroSchema>;

/** Conexão por banco (Oracle/PostgreSQL). Sem senha: a wiki manda entregá-la por canal seguro. */
export const demoDbConnectionSchema = z.object({
  host: z.string().trim().min(3, "Informe o IP ou hostname público"),
  port: z.coerce
    .number({ invalid_type_error: "Porta inválida" })
    .int("Porta inválida")
    .min(1, "Porta inválida")
    .max(65535, "Porta inválida"),
  database: z.string().trim().min(1, "Informe o service name ou o database"),
  schemaOwner: z.string().trim().optional(),
});

/** Conexão por API (CISS Poder, RPInfo, API REST). */
export const demoApiConnectionSchema = z.object({
  baseUrl: z
    .string()
    .trim()
    .url("Informe a URL completa, com http:// ou https://"),
  apiUser: z.string().trim().min(2, "Informe o usuário de integração"),
});

export type DemoDbConnection = z.infer<typeof demoDbConnectionSchema>;
export type DemoApiConnection = z.infer<typeof demoApiConnectionSchema>;
export type DemoConnection =
  | ({ kind: "db" } & DemoDbConnection)
  | ({ kind: "api" } & DemoApiConnection);

interface DemoState {
  hasHydrated: boolean;
  cadastro: DemoCadastro | null;
  erp: DemoErpId | null;
  preparacaoConfirmada: boolean;
  conexao: DemoConnection | null;
  diagnosticoConcluido: boolean;
  contratoAceitoEm: string | null;
  setHasHydrated: (value: boolean) => void;
  setCadastro: (data: DemoCadastro) => void;
  setErp: (erp: DemoErpId) => void;
  confirmarPreparacao: () => void;
  setConexao: (data: DemoConnection) => void;
  concluirDiagnostico: () => void;
  reabrirDiagnostico: () => void;
  aceitarContrato: () => void;
  reset: () => void;
}

const initialData = {
  cadastro: null,
  erp: null,
  preparacaoConfirmada: false,
  conexao: null,
  diagnosticoConcluido: false,
  contratoAceitoEm: null,
};

export const useActivationDemo = create<DemoState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      ...initialData,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setCadastro: (data) => set({ cadastro: data }),
      setErp: (erp) =>
        set((state) =>
          state.erp === erp
            ? { erp }
            : {
                erp,
                // Trocar de ERP invalida tudo o que depende dele
                preparacaoConfirmada: false,
                conexao: null,
                diagnosticoConcluido: false,
                contratoAceitoEm: null,
              },
        ),
      confirmarPreparacao: () => set({ preparacaoConfirmada: true }),
      setConexao: (data) =>
        set({
          conexao: data,
          diagnosticoConcluido: false,
          contratoAceitoEm: null,
        }),
      concluirDiagnostico: () => set({ diagnosticoConcluido: true }),
      // Nova rodada: o resultado anterior deixa de valer, e o contrato depende dele
      reabrirDiagnostico: () =>
        set({ diagnosticoConcluido: false, contratoAceitoEm: null }),
      aceitarContrato: () =>
        set({ contratoAceitoEm: new Date().toISOString() }),
      reset: () => set({ ...initialData }),
    }),
    {
      // Chave própria: não se mistura com a jornada real (que vive na API)
      name: "terus-ativacao-demo",
      partialize: ({ hasHydrated: _h, ...rest }) => ({
        cadastro: rest.cadastro,
        erp: rest.erp,
        preparacaoConfirmada: rest.preparacaoConfirmada,
        conexao: rest.conexao,
        diagnosticoConcluido: rest.diagnosticoConcluido,
        contratoAceitoEm: rest.contratoAceitoEm,
      }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
);

/** Maior etapa liberada: a etapa N só abre com a N−1 concluída. */
export function getUnlockedStep(state: {
  cadastro: DemoCadastro | null;
  erp: DemoErpId | null;
  preparacaoConfirmada: boolean;
  conexao: DemoConnection | null;
  diagnosticoConcluido: boolean;
  contratoAceitoEm: string | null;
}): number {
  if (!state.cadastro) return 1;
  if (!state.erp || state.erp === "outro") return 2;
  if (!state.preparacaoConfirmada) return 3;
  if (!state.conexao) return 4;
  if (!state.diagnosticoConcluido) return 5;
  if (!state.contratoAceitoEm) return 6;
  return 7;
}
