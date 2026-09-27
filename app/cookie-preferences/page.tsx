"use client";

import * as React from "react";
import { toast } from "sonner";
import { LegalPage } from "@/components/legal-page";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "chauhan:cookie-preferences";

type Prefs = { analytics: boolean; marketing: boolean };

const GROUPS: {
  key: keyof Prefs | "essential";
  name: string;
  description: string;
  locked?: boolean;
}[] = [
  {
    key: "essential",
    name: "Essential",
    description:
      "Needed for the site to work — pages, search and the enquiry form. These cannot be turned off.",
    locked: true,
  },
  {
    key: "analytics",
    name: "Performance",
    description:
      "Counts visits and traffic sources so we can see which pages are useful.",
  },
  {
    key: "marketing",
    name: "Marketing",
    description:
      "Used to show you relevant advertising on other sites and platforms.",
  },
];

export default function CookiePreferences() {
  const [prefs, setPrefs] = React.useState<Prefs>({
    analytics: false,
    marketing: false,
  });

  React.useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const saved = JSON.parse(raw) as Partial<Prefs>;
      setPrefs({
        analytics: !!saved.analytics,
        marketing: !!saved.marketing,
      });
    } catch {
      /* stored value is unreadable — keep the defaults */
    }
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    toast.success("Preferences saved on this device.");
  };

  return (
    <LegalPage title="Cookie preferences" updated={false}>
      <section>
        <p>
          This policy explains how Chauhan Sports uses cookies and similar
          technologies to recognise you when you visit the site — what they are,
          why we use them, and how you control them.
        </p>
      </section>

      <section>
        <h2>What cookies are</h2>
        <p>
          Cookies are small data files placed on your computer or phone when you
          visit a website. They are widely used to make sites work, to make them
          work more efficiently, and to report on how they are used.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          Choose which groups you allow. Your choice is stored on this device
          and browser.
        </p>

        <div className="mt-6 border border-hair bg-raised">
          {GROUPS.map(({ key, name, description, locked }, i) => {
            const on = locked ? true : prefs[key as keyof Prefs];
            return (
              <div
                key={key}
                className={cn(
                  "flex items-start justify-between gap-6 p-6",
                  i > 0 && "border-t border-hair"
                )}
              >
                <div>
                  <h3 className="display text-lg text-ink">{name}</h3>
                  <p className="mt-1.5 max-w-md text-sm text-ink-muted">
                    {description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${name} cookies`}
                  disabled={locked}
                  onClick={() =>
                    setPrefs((p) => ({
                      ...p,
                      [key as keyof Prefs]: !p[key as keyof Prefs],
                    }))
                  }
                  className={cn(
                    "relative h-8 w-14 shrink-0 border transition-colors duration-300",
                    on ? "border-signal bg-signal/20" : "border-hair-strong bg-sunk",
                    locked && "cursor-not-allowed opacity-60"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1 h-5 w-5 transition-[left,background-color] duration-300",
                      on ? "left-8 bg-signal" : "left-1 bg-ink-dim"
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={save}
            className="data h-12 bg-signal px-6 text-paper transition-colors duration-300 hover:bg-signal-bright"
          >
            Save preferences
          </button>
        </div>
      </section>
    </LegalPage>
  );
}
