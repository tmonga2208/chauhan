"use client";

import * as React from "react";
import { LegalPage } from "@/components/legal-page";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "chauhan:do-not-sell";

export default function DoNotSell() {
  const [optedOut, setOptedOut] = React.useState(false);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setOptedOut(localStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  const toggle = () => {
    setOptedOut((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  };

  return (
    <LegalPage title="Do not sell my personal information" updated={false}>
      <section>
        <p>
          If you are a resident of certain jurisdictions (such as California
          under the CCPA), you may have the right to direct us not to sell your
          personal information. Chauhan Sports does not sell your personal
          information in the traditional sense — that is, for money. We may,
          however, share personal information with third parties for targeted
          advertising, which some laws treat as a “sale”.
        </p>
      </section>

      <section>
        <h2>Opt out</h2>
        <p>
          Use the switch below to record your preference. It applies to this
          device and browser, and is stored locally — clearing your browser data
          will clear it too.
        </p>

        <div className="mt-6 flex flex-col gap-5 border border-hair bg-raised p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="display text-lg text-ink">
              Opt out of selling and sharing
            </h3>
            <p className="data-sm mt-2 text-ink-faint">
              {!ready
                ? "Checking your preference…"
                : optedOut
                  ? "Recorded — we will not share your data for targeted ads on this browser"
                  : "Currently allowed"}
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={optedOut}
            aria-label="Opt out of selling and sharing my personal information"
            onClick={toggle}
            disabled={!ready}
            className={cn(
              "relative h-8 w-14 shrink-0 border transition-colors duration-300",
              optedOut
                ? "border-signal bg-signal/20"
                : "border-hair-strong bg-sunk"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1 h-5 w-5 transition-[left,background-color] duration-300",
                optedOut ? "left-8 bg-signal" : "left-1 bg-ink-dim"
              )}
            />
          </button>
        </div>
      </section>

      <section>
        <h2>Make a request</h2>
        <p>
          To ask a question or make a formal request about your data, contact us
          at{" "}
          <a href="mailto:contact@chauhansports.com">
            contact@chauhansports.com
          </a>{" "}
          or <a href="tel:+919661470953">+91 96614 70953</a>.
        </p>
      </section>
    </LegalPage>
  );
}
