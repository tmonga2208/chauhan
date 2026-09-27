"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/instrument";
import { cn } from "@/lib/utils";

type Category = { title: string; header: string };

const slugify = (title: string) => title.toLowerCase().replace(/\s+/g, "");

/** What each category actually contains, in the shop's own words. */
const BLURBS: Record<string, string> = {
  airpistol: "10m match pistols, mechanical and electronic trigger.",
  airrifle: "10m match rifles with adjustable stocks and sights.",
  pellets: "Match-grade 4.5mm pellets, sorted by head size.",
  accessories: "Sights, grips, cylinders, cases and range kit.",
};

/* An alternating 7/5 rhythm — asymmetric, but it still resolves. */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export default function CategoriesComp() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setCategories(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-b border-hair py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow="Four departments"
          title="Start from the discipline"
          lede="Pistol and rifle shooters need different things from a shop. Pick your side of the range."
        />

        {loading ? (
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {SPANS.map((span, i) => (
              <div
                key={i}
                className={cn(
                  "h-[22rem] animate-pulse border border-hair bg-raised md:h-[26rem]",
                  span
                )}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {categories.map((item, i) => {
              const slug = slugify(item.title);
              return (
                <Link
                  key={slug}
                  href={`/categories/${slug}`}
                  className={cn(
                    "group relative flex flex-col border border-hair bg-raised",
                    "transition-colors duration-500 hover:border-hair-strong hover:bg-overlay",
                    SPANS[i % SPANS.length]
                  )}
                >
                  {/* The department's instrument, whole, on the target card */}
                  <div className="photo-plate relative h-56 overflow-hidden md:h-72">
                    <Image
                      src={item.header}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-contain p-6 transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] md:p-8"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-paper-shade transition-colors duration-500 group-hover:border-signal"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-paper-shade transition-colors duration-500 group-hover:border-signal"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-6 border-t border-hair p-6 md:p-8">
                    <div>
                      <h3 className="display text-2xl text-ink md:text-3xl">
                        {item.title}
                      </h3>
                      <p className="prose-body mt-2 max-w-sm text-sm text-ink-muted">
                        {BLURBS[slug] ?? "Browse the range."}
                      </p>
                    </div>
                    <span className="data-sm flex shrink-0 items-center gap-2 text-ink-dim transition-colors duration-500 group-hover:text-signal">
                      Shop
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
