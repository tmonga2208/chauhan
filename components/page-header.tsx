import * as React from "react";
import { Eyebrow, GridRules } from "@/components/instrument";
import { cn } from "@/lib/utils";

/**
 * The masthead every inner page shares: hairline grid, mono eyebrow,
 * display title, and a data line carrying the count or query.
 */
export function PageHeader({
  eyebrow,
  title,
  meta,
  lede,
  action,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate border-b border-hair pb-10 pt-14 md:pb-14 md:pt-20",
        className
      )}
    >
      <GridRules className="-z-10" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="display mt-5 text-display-sm text-ink text-balance">
              {title}
            </h1>
            {lede && (
              <p className="prose-body mt-4 max-w-prose text-ink-muted text-pretty">
                {lede}
              </p>
            )}
            {meta && (
              <p className="data-sm mt-5 text-ink-faint tabular-nums">{meta}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
