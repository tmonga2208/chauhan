import * as React from "react";
import { PageHeader } from "@/components/page-header";

/**
 * Shared shell for policy pages. Narrow measure, serif body, hairline rules
 * between sections — the site's reading layout rather than a floating card.
 */
export function LegalPage({
  title,
  updated = true,
  children,
}: {
  title: string;
  updated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={title}
        meta={
          updated
            ? `Last updated ${new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : undefined
        }
      />
      <div className="mx-auto max-w-3xl px-6 py-14 lg:px-10 lg:py-20">
        <div
          className="prose-body space-y-10 text-ink-muted
            [&_h2]:display [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:text-ink
            [&_section]:border-t [&_section]:border-hair [&_section]:pt-8
            [&_section:first-child]:border-t-0 [&_section:first-child]:pt-0
            [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-4
            [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
            [&_strong]:text-ink"
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default LegalPage;
