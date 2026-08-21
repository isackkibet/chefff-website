import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export default function LegalPage({
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <>
      <div className="pt-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[hsl(0_0%_55%)] hover:text-[hsl(45_90%_52%)] transition-colors"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Home
        </Link>
      </div>

      <article className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
            <p className="text-sm text-[hsl(0_0%_45%)]">
              Last updated: {lastUpdated}
            </p>
            <div className="section-divider mt-4" />
          </header>

          <div
            className="
            text-[hsl(0_0%_65%)] leading-relaxed space-y-6
            [&_h2]:text-[hsl(42_30%_94%)] [&_h2]:font-semibold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3
            [&_p]:leading-relaxed
            [&_a]:text-[hsl(45_90%_52%)] [&_a:hover]:underline
            [&_table]:w-full [&_table]:text-sm
          "
          >
            {children}
          </div>
        </div>
      </article>
    </>
  );
}
