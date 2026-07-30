"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { GridRules, Reticle } from "@/components/instrument";

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

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden border-b border-hair">
      {/* Backplate: the range footage, held right back so it reads as
          atmosphere rather than a slideshow. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster="/rifle.jpg"
        className="absolute inset-0 -z-20 h-full w-full scale-105 object-cover opacity-25 blur-[3px]"
      >
        <source src="/last.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_70%_40%,transparent_10%,var(--color-void)_75%)]"
      />
      <GridRules className="-z-10" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-24 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-10 lg:pt-28">
        {/* --- Thesis ---------------------------------------------------- */}
        <div className="relative z-10 max-w-2xl">
          <p className="data flex items-center gap-3 text-signal">
            <span className="h-px w-8 bg-signal/50" aria-hidden="true" />
            ISSF 10m · Air pistol &amp; rifle
          </p>

          <h1 className="display mt-7 text-display-lg text-ink">
            The ten ring is
            <br />
            <span className="text-signal tabular-nums">11.5mm</span> wide.
          </h1>

          <p className="prose-body mt-7 max-w-lg text-ink-muted text-pretty">
            Everything we stock is built to close that gap. Match air pistols,
            rifles, pellets and accessories from Morini, Walther and
            Grünig+Elmiger — each one inspected and certified before it leaves
            us.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/explore"
              className="data group inline-flex h-13 items-center justify-center gap-3 bg-signal px-8 py-4 text-paper transition-colors duration-500 hover:bg-signal-bright"
            >
              Browse the catalogue
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/categories/airpistol"
              className="data inline-flex h-13 items-center justify-center border border-hair-strong px-8 py-4 text-ink transition-colors duration-500 hover:border-signal hover:text-signal"
            >
              See air pistols
            </Link>
          </div>

          {/* Real credentials, in the data role. */}
          <dl className="mt-14 grid max-w-lg grid-cols-3 border-t border-hair pt-5">
            {[
              { k: "Calibre", v: "4.5mm" },
              { k: "Distance", v: "10m" },
              { k: "Certified", v: "Every unit" },
            ].map(({ k, v }) => (
              <div key={k}>
                <dt className="data-sm text-ink-dim">{k}</dt>
                <dd className="font-data mt-1.5 text-sm text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* --- The face -------------------------------------------------- */}
        <div className="relative h-[46svh] min-h-[320px] lg:h-[74svh]">
          <TargetScene />
          <p className="data-sm absolute bottom-0 right-0 hidden text-ink-faint lg:block">
            Official 10m face · rings 7–10 shown in black
          </p>
        </div>
      </div>
    </section>
  );
}
