import type { Metadata } from "next";

import { WelcomeHero } from "@/components/onboarding/welcome-hero";

export const metadata: Metadata = {
  title: "Bem-vindo",
  description:
    "Conecte seu ERP à Terus em minutos com o onboarding autônomo — do cadastro à ativação dos módulos.",
};

export default function OnboardingWelcomePage() {
  return <WelcomeHero />;
}
