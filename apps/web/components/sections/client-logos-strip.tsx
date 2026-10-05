import Image from "next/image";

import { CLIENT_LOGOS } from "@/lib/constants/site-data";

/**
 * Faixa de logos logo abaixo do hero — prova social no primeiro scroll.
 */
export function ClientLogosStrip() {
  return (
    <section
      aria-label="Empresas que operam com a Terus"
      className="relative border-b border-surface-border-subtle bg-surface-elevated-1/40 py-8"
    >
      <p className="text-center font-mono text-caption font-semibold uppercase tracking-widest text-text-tertiary">
        Redes e distribuidores que já operam com a Terus
      </p>

      <div className="tr-ticker-wrap relative mt-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface-base to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface-base to-transparent"
          aria-hidden="true"
        />
        <ul className="tr-ticker flex w-max gap-4 pr-4">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, index) => (
            <li
              key={`${client.name}-${index}`}
              aria-hidden={index >= CLIENT_LOGOS.length}
              className="tr-logo-chip h-14 w-36 shrink-0 px-4 py-2"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={112}
                height={40}
                className="max-h-10 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
