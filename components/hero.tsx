"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GridRules, Reticle } from "@/components/instrument";
import type { Discipline } from "@/components/three/target-scene";
import { cn } from "@/lib/utils";

/* The 3D face never blocks first paint — it loads after the shell, and the
   reticle below stands in until it arrives. */
const TargetScene = dynamic(() => import("@/components/three/target-scene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <Reticle className="h-56 w-56 animate-ring-pulse text-ink-faint" />
    </div>
  ),
});

/* Each discipline's claim is its own ISSF target: the headline number, the
   face on the right and the stats all come from the same sheet. */
const SHEETS: Record<
  Discipline,
  {
    label: string;
    lead: string;
    figure: string;
    tail: string;
    lede: string;
    face: string;
    caption: string;
    href: string;
    cta: string;
  }
> = {
  rifle: {
    label: "Air rifle",
    lead: "The ten is a",
    figure: "0.5mm",
    tail: "dot.",
    lede: "Walther match air rifles, and the pellets, sights and kit that go with them.",
    face: "45.5mm",
    caption: "Official 10m rifle face · black covers rings 4–9",
    href: "/categories/airrifle",
    cta: "See air rifles",
  },
  pistol: {
    label: "Air pistol",
    lead: "The ten ring is",
    figure: "11.5mm",
    tail: "wide.",
    lede: "Walther match air pistols, and the pellets and kit that go with them.",
    face: "155.5mm",
    caption: "Official 10m pistol face · black covers rings 7–10",
    href: "/categories/airpistol",
    cta: "See air pistols",
  },
};

export default function Hero() {
  const [discipline, setDiscipline] = React.useState<Discipline>("rifle");
  const sheet = SHEETS[discipline];

  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden border-b border-hair">
      <GridRules className="-z-10" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-20 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-10 lg:pt-24">
        {/* --- Thesis ---------------------------------------------------- */}
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-4">
            <p className="data flex items-center gap-3 text-signal">
              <span className="h-px w-8 bg-signal/50" aria-hidden="true" />
              ISSF 10m
            </p>
            <div
              role="group"
              aria-label="Discipline"
              className="inline-flex border border-hair-strong p-0.5"
            >
              {(Object.keys(SHEETS) as Discipline[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={discipline === d}
                  onClick={() => setDiscipline(d)}
                  className={cn(
                    "data h-9 px-4 transition-colors duration-300",
                    discipline === d
                      ? "bg-ink text-void"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {SHEETS[d].label}
                </button>
              ))}
            </div>
          </div>

          <div
            key={discipline}
            aria-live="polite"
            className="animate-in fade-in slide-in-from-bottom-1 duration-500"
          >
            <h1 className="display mt-8 text-display-lg text-ink">
              {sheet.lead}
              <br />
              <span className="text-signal">{sheet.figure}</span> {sheet.tail}
            </h1>

            <p className="prose-body mt-7 max-w-md text-ink-muted text-pretty">
              {sheet.lede}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={sheet.href}
              className="data group inline-flex h-13 items-center justify-center gap-3 bg-signal px-8 py-4 text-paper transition-colors duration-500 hover:bg-signal-bright"
            >
              {sheet.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/explore"
              className="data inline-flex h-13 items-center justify-center border border-hair-strong px-8 py-4 text-ink transition-colors duration-500 hover:border-signal hover:text-signal"
            >
              Browse everything
            </Link>
          </div>

          {/* The target sheet, in the data role. */}
          <dl className="mt-14 grid max-w-lg grid-cols-3 border-t border-hair pt-5">
            {[
              { k: "Calibre", v: "4.5mm" },
              { k: "Distance", v: "10m" },
              { k: "Target face", v: sheet.face },
            ].map(({ k, v }) => (
              <div key={k}>
                <dt className="data-sm text-ink-dim">{k}</dt>
                <dd className="font-data mt-1.5 text-sm text-ink tabular-nums">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --- The face -------------------------------------------------- */}
        <div className="relative h-[46svh] min-h-[320px] lg:h-[74svh]">
          <TargetScene discipline={discipline} />
          <p className="data-sm absolute bottom-0 right-0 hidden text-ink-faint lg:block">
            {sheet.caption}
          </p>
        </div>
      </div>
    </section>
  );
}
