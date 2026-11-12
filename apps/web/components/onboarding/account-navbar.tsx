"use client";

import { Button } from "@terus/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Container } from "@/components/layout/container";
import { TerusLogo } from "@/components/layout/terus-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useLogout, useSession } from "@/lib/api/hooks";

/** Navbar simplificada das áreas de conta, onboarding, portal e admin. */
export function AccountNavbar() {
  const router = useRouter();
  const { data: session } = useSession();
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border/60 bg-surface-base/80 backdrop-blur-xl">
      <Container>
        <nav
          className="flex h-16 items-center justify-between gap-3"
          aria-label="Conta"
        >
          <Link href="/" aria-label="Página inicial da Terus">
            <TerusLogo className="w-28 sm:w-32" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session ? (
              <>
                <span className="hidden max-w-48 truncate text-body-sm text-text-secondary md:inline">
                  {session.user.full_name}
                </span>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={
                      session.user.role === "customer" ? "/portal" : "/admin"
                    }
                  >
                    {session.user.role === "customer" ? "Portal" : "Painel"}
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await logout.mutateAsync().catch(() => undefined);
                    router.push("/entrar");
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/entrar">Entrar</Link>
              </Button>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
