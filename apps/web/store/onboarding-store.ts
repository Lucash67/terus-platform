"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
import {
  onboardingBancoSchema,
  onboardingCadastroSchema,
} from "@terus/schemas";

import type { OnboardingErpId } from "@/lib/constants/onboarding";

export type OnboardingCadastro = z.infer<typeof onboardingCadastroSchema>;
export type OnboardingBanco = z.infer<typeof onboardingBancoSchema>;

interface OnboardingState {
  hasHydrated: boolean;
  cadastro: OnboardingCadastro | null;
  erp: OnboardingErpId | null;
  instrucoesConfirmadas: boolean;
  banco: Omit<OnboardingBanco, "erpPassword"> | null;
  diagnosticoConcluido: boolean;
  contratoAssinado: boolean;
  contratoAssinadoEm: string | null;
  setHasHydrated: (value: boolean) => void;
  setCadastro: (data: OnboardingCadastro) => void;
  setErp: (erp: OnboardingErpId) => void;
  confirmarInstrucoes: () => void;
  setBanco: (data: OnboardingBanco) => void;
  concluirDiagnostico: () => void;
  assinarContrato: () => void;
  resetOnboarding: () => void;
}

const initialData = {
  cadastro: null,
  erp: null,
  instrucoesConfirmadas: false,
  banco: null,
  diagnosticoConcluido: false,
  contratoAssinado: false,
  contratoAssinadoEm: null,
} satisfies Partial<OnboardingState>;

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      ...initialData,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setCadastro: (data) => set({ cadastro: data }),
      setErp: (erp) =>
        set({
          erp,
          // Trocar de ERP invalida as etapas seguintes
          instrucoesConfirmadas: false,
          banco: null,
          diagnosticoConcluido: false,
          contratoAssinado: false,
          contratoAssinadoEm: null,
        }),
      confirmarInstrucoes: () => set({ instrucoesConfirmadas: true }),
      setBanco: (data) => {
        // Credenciais nunca são persistidas no navegador — apenas metadados de conexão
        const { erpPassword: _erpPassword, ...connection } = data;
        set({ banco: connection });
      },
      concluirDiagnostico: () => set({ diagnosticoConcluido: true }),
      assinarContrato: () =>
        set({
          contratoAssinado: true,
          contratoAssinadoEm: new Date().toISOString(),
        }),
      resetOnboarding: () => set({ ...initialData }),
    }),
    {
      name: "terus-onboarding",
      partialize: (state) => ({
        cadastro: state.cadastro,
        erp: state.erp,
        instrucoesConfirmadas: state.instrucoesConfirmadas,
        banco: state.banco,
        diagnosticoConcluido: state.diagnosticoConcluido,
        contratoAssinado: state.contratoAssinado,
        contratoAssinadoEm: state.contratoAssinadoEm,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

/**
 * Maior etapa desbloqueada com base no progresso salvo.
 * A etapa N só abre quando a N-1 foi concluída.
 */
export function getUnlockedStep(state: {
  cadastro: OnboardingCadastro | null;
  erp: OnboardingErpId | null;
  instrucoesConfirmadas: boolean;
  banco: Omit<OnboardingBanco, "erpPassword"> | null;
  diagnosticoConcluido: boolean;
  contratoAssinado: boolean;
}): number {
  if (!state.cadastro) return 1;
  if (!state.erp || state.erp === "other") return 2;
  if (!state.instrucoesConfirmadas) return 3;
  if (!state.banco) return 4;
  if (!state.diagnosticoConcluido) return 5;
  if (!state.contratoAssinado) return 6;
  return 7;
}
