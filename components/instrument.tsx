import * as React from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Instrument primitives
   The shared vocabulary of the site: hairline rules, mono data, and the
   concentric reticle taken from the Chauhan Sports mark.
   ========================================================================== */

/**
 * The reticle — concentric target rings, straight from the logo bullseye.
 * Used as section divider, loading state, empty state and hover mark.
 */
export function Reticle({
  className,
  rings = 4,
  hit = false,
}: {
  className?: string;
  rings?: number;
  hit?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {Array.from({ length: rings }).map((_, i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r={46 - i * (40 / rings)}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.75}
          opacity={0.25 + i * (0.4 / rings)}
        />
      ))}
      <circle
        cx="50"
        cy="50"
        r={6}
        className={hit ? "fill-signal" : "fill-current"}
        opacity={hit ? 1 : 0.9}
      />
      {/* crosshair ticks */}
      <path
        d="M50 0v10M50 90v10M0 50h10M90 50h10"
        stroke="currentColor"
        strokeWidth={0.75}
        opacity={0.4}
      />
    </svg>
  );
}

/**
 * The hairline column grid that sits behind full-width sections.
 * Six columns on desktop, three on mobile — the drafting paper the whole
 * site is laid out on.
 */
export function GridRules({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="mx-auto grid h-full max-w-7xl grid-cols-3 md:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "border-l border-hair-faint",
              i >= 3 && "hidden md:block",
              i === 5 && "border-r"
            )}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Mono eyebrow with a hairline lead-in. The eyebrow always carries real
 * information — a discipline, a count, a standard — never a decorative number.
 */
export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "data flex items-center gap-3 text-signal",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="h-px w-6 bg-signal/50" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * Section header. Left-aligned by default — the previous design centred
 * every heading, which flattened the page's reading order.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-6 border-t border-hair pt-6 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display mt-5 text-display-sm text-ink text-balance">
          {title}
        </h2>
        {lede && (
          <p className="prose-body mt-4 max-w-prose text-ink-muted text-pretty">
            {lede}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

/**
 * A single row of the spec table: mono label, hairline leader, value.
 * The core unit of the certificate language.
 */
export function SpecRow({
  label,
  value,
  className,
}: {
  label: string;
  value?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-3 border-b border-hair py-3",
        className
      )}
    >
      <dt className="data-sm shrink-0 text-ink-dim">{label}</dt>
      <span
        className="h-px min-w-4 flex-1 bg-hair-faint"
        aria-hidden="true"
      />
      <dd className="font-data text-sm text-ink tabular-nums">
        {value ?? <span className="text-ink-faint">—</span>}
      </dd>
    </div>
  );
}

/**
 * Price. Always mono, always tabular, always in signal red — it is the one
 * number the eye should find.
 */
export function Price({
  value,
  className,
  size = "md",
}: {
  value: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <p
      className={cn(
        "font-data font-medium tabular-nums text-signal",
        size === "sm" && "text-sm",
        size === "md" && "text-lg",
        size === "lg" && "text-2xl md:text-3xl",
        className
      )}
    >
      <span className="opacity-60">₹</span>
      {value.toLocaleString("en-IN")}
    </p>
  );
}

/**
 * Primary action. A hairline-bordered slab that fills with signal red on
 * hover — no glow, no scale, no shadow bloom.
 */
export function ActionLink({
  children,
  className,
  variant = "solid",
  ...props
}: React.ComponentProps<"a"> & { variant?: "solid" | "outline" }) {
  return (
    <a
      className={cn(
        "data group/action relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden px-7 transition-colors duration-500",
        variant === "solid"
          ? "bg-signal text-paper hover:bg-signal-bright"
          : "border border-hair-strong text-ink hover:border-signal hover:text-signal",
        className
      )}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-500 group-hover/action:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
