import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(45_90%_52%)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
      {centered && <div className="mt-4 mx-auto section-divider" />}
      {!centered && <div className="mt-4 section-divider" />}
      {subtitle && (
        <p className="mt-6 mx-auto max-w-2xl text-[hsl(0_0%_65%)] text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
