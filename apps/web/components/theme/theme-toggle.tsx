"use client";

import * as React from "react";
import { cn } from "@terus/ui";

interface ThemeToggleProps {
  className?: string;
}

/** Alterna entre o tema dark (padrão da marca) e o claro, persistindo a escolha. */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isLight, setIsLight] = React.useState(false);

  React.useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("terus-theme", next ? "light" : "dark");
    } catch {
      // storage indisponível (modo privado) — tema vale só para a sessão
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      title={isLight ? "Tema escuro" : "Tema claro"}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-surface-border text-text-secondary transition-all duration-200",
        "hover:border-brand-primary/40 hover:text-brand-primary",
        className,
      )}
    >
      {isLight ? (
        // Lua — voltar ao dark
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path
            d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Sol — ir para o claro
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
