import * as React from "react";
import { Check } from "lucide-react";
import { Eyebrow, GridRules } from "@/components/instrument";

/* ==========================================================================
   Certificate of inspection.
   Every match pistol arrives with a factory test sheet, so the shop's own
   promises are set as one — grouped checks, hairline leaders, a stamp.
   It replaces three identical feature cards with a single artifact.
   ========================================================================== */

const CHECKS: { group: string; note: string; rows: string[] }[] = [
  {
    group: "Mechanical",
    note: "On the bench, before anything is listed.",
    rows: [
      "Mechanical function tested",
      "Bore and barrel inspected",
      "Safety mechanism verified",
    ],
  },
  {
    group: "Provenance",
    note: "So you know exactly what you are buying.",
    rows: [
      "Condition report written by hand",
      "Serial and model confirmed",
      "Authenticity guaranteed",
    ],
  },
  {
    group: "Range readiness",
    note: "Set up the way a match shooter expects it.",
    rows: [
      "Trigger weight checked to ISSF minimum",
      "Sight alignment squared",
      "Cylinder pressure tested",
    ],
  },
];

/** The shop stamp: the reticle, ringed by its own name. */
function Stamp() {
  return (
    <div className="relative h-32 w-32 shrink-0 text-brass">
      <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
        <defs>
          <path
            id="stamp-ring"
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
            fill="none"
          />
        </defs>
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.55"
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.35"
        />
        <text
          className="font-data"
          fill="currentColor"
          fontSize="15"
          letterSpacing="4.2"
          opacity="0.85"
        >
          <textPath href="#stamp-ring" startOffset="0%">
            INSPECTED · CHAUHAN SPORTS · PATNA ·
          </textPath>
        </text>
        {/* the mark itself */}
        <g transform="translate(100,100)">
          {[46, 34, 22].map((r, i) => (
            <circle
              key={r}
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity={0.3 + i * 0.15}
            />
          ))}
          <circle r="9" className="fill-signal" />
          <path
            d="M0,-56 v12 M0,44 v12 M-56,0 h12 M44,0 h12"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="inspection"
      className="relative isolate border-b border-hair py-20 md:py-28"
    >
      <GridRules className="-z-10 opacity-60" />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="border border-hair bg-raised">
          {/* --- Document head ------------------------------------------- */}
          <header className="flex flex-col gap-6 border-b border-hair px-6 py-8 sm:flex-row sm:items-start sm:justify-between md:px-10 md:py-10">
            <div className="max-w-xl">
              <Eyebrow>Issued with every dispatch</Eyebrow>
              <h2 className="display mt-5 text-display-sm text-ink text-balance">
                Certificate of inspection
              </h2>
              <p className="prose-body mt-4 text-ink-muted text-pretty">
                Nothing goes out of this shop untested. Each instrument passes
                the same nine checks on the bench, and the sheet travels with it
                in the case.
              </p>
            </div>
            <Stamp />
          </header>

          {/* --- The checks ---------------------------------------------- */}
          <div className="grid md:grid-cols-3">
            {CHECKS.map(({ group, note, rows }, i) => (
              <section
                key={group}
                className={
                  i > 0
                    ? "border-t border-hair px-6 py-8 md:border-l md:border-t-0 md:px-8 md:py-10"
                    : "px-6 py-8 md:px-8 md:py-10"
                }
              >
                <h3 className="data text-brass">{group}</h3>
                <p className="prose-body mt-3 text-sm text-ink-dim">{note}</p>

                <ul className="mt-6">
                  {rows.map((row) => (
                    <li
                      key={row}
                      className="flex items-baseline gap-3 border-b border-hair py-3.5 last:border-b-0"
                    >
                      <Check
                        className="h-3.5 w-3.5 shrink-0 translate-y-0.5 text-brass"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span className="text-sm text-ink-muted">{row}</span>
                      <span
                        className="h-px min-w-3 flex-1 self-center bg-hair-faint"
                        aria-hidden="true"
                      />
                      <span className="data-sm shrink-0 text-brass-dim">
                        Pass
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* --- Signature line ------------------------------------------- */}
          <footer className="flex flex-col gap-4 border-t border-hair px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-10">
            <p className="data-sm text-ink-faint">
              Chauhan Sports Pvt Ltd · Patna, Bihar
            </p>
            <p className="data-sm text-ink-faint">
              Questions before you buy?{" "}
              <a
                href="tel:+919661470953"
                className="text-ink underline decoration-hair-strong underline-offset-4 transition-colors hover:text-signal hover:decoration-signal"
              >
                +91 96614 70953
              </a>
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
}
