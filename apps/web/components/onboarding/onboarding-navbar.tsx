"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge, Button } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useOnboardingStore } from "@/store/onboarding-store";

export function OnboardingNavbar() {
  const router = useRouter();
  const hasHydrated = useOnboardingStore((s) => s.hasHydrated);
  const cadastro = useOnboardingStore((s) => s.cadastro);
  const erp = useOnboardingStore((s) => s.erp);
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);

  const hasProgress = Boolean(cadastro || erp);

  function handleRestart() {
    const confirmed = window.confirm(
      "Recomeçar o onboarding do zero?\n\nTodo o progresso salvo neste navegador será apagado.",
    );
    if (!confirmed) return;
    resetOnboarding();
    router.push("/onboarding");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface-base/80 backdrop-blur-xl">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Navegação do onboarding"
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="shrink-0">
              <TerusLogo priority />
            </Link>
            <Badge
              variant="secondary"
              className="hidden font-medium sm:inline-flex"
            >
              Onboarding autônomo
            </Badge>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 text-body-sm text-text-tertiary lg:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-status-success" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              Ambiente seguro · acesso somente-leitura
            </span>
            <ThemeToggle />
            {hasHydrated && hasProgress ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRestart}
                className="text-text-secondary hover:text-status-error"
              >
                Recomeçar do zero
              </Button>
            ) : null}
            <Link
              href="/"
              className="text-body-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Salvar e sair
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
