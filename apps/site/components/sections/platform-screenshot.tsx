import Image from "next/image";
import { cn } from "@terus/ui";

import type { PlatformScreen } from "@/lib/constants/lp";

interface PlatformScreenshotProps {
  screen: PlatformScreen;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** Captura do portal na versão do tema ativo do site. */
export function PlatformScreenshot({
  screen,
  sizes,
  className,
  priority = false,
}: PlatformScreenshotProps) {
  const common = {
    width: screen.width,
    height: screen.height,
    sizes,
    priority,
    quality: 85,
  };

  return (
    <>
      <Image
        {...common}
        src={`/plataforma/${screen.image}-light.webp`}
        alt={screen.alt}
        className={cn("hidden [.light_&]:block", className)}
      />
      <Image
        {...common}
        src={`/plataforma/${screen.image}-dark.webp`}
        alt={screen.alt}
        className={cn("block [.light_&]:hidden", className)}
      />
    </>
  );
}
