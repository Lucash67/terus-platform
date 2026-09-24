import Link from "next/link";
import { Badge } from "@terus/ui";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function OnboardingNavbar() {
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

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-body-sm text-text-tertiary md:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="ob-live-dot absolute inline-flex h-full w-full rounded-full bg-status-success" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-status-success" />
              </span>
              Ambiente seguro · acesso somente-leitura
            </span>
            <ThemeToggle />
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
