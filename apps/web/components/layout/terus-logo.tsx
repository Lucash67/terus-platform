import { BRAND } from "@/lib/constants/site";

interface TerusLogoProps {
  className?: string;
}

export function TerusLogo({
  className = "h-8 w-auto object-contain",
}: TerusLogoProps) {
  if (!BRAND.logos.primary) {
    return (
      <span className="font-display text-heading-md font-semibold text-text-primary">
        {BRAND.name}
        <span className="text-brand-primary">.</span>
      </span>
    );
  }

  return (
    <img src={BRAND.logos.primary} alt={BRAND.name} className={className} />
  );
}
