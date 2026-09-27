"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reticle, SectionHead } from "@/components/instrument";
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
                  "aspect-[16/10] animate-pulse border border-hair bg-raised",
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
                    "group relative isolate flex aspect-[16/10] flex-col justify-end overflow-hidden border border-hair p-6 md:p-8",
                    "transition-colors duration-500 hover:border-hair-strong",
                    SPANS[i % SPANS.length]
                  )}
                >
                  <Image
                    src={item.header}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="-z-10 object-cover opacity-60 transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-75"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/70 to-void/10"
                  />

                  {/* corner ticks */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-hair-strong transition-colors duration-500 group-hover:border-signal"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-hair-strong transition-colors duration-500 group-hover:border-signal"
                  />

                  <Reticle
                    className="absolute right-6 top-6 h-9 w-9 text-ink-faint opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:right-8 md:top-8"
                    rings={3}
                  />

                  <p className="data-sm text-signal">Shop</p>
                  <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="prose-body mt-2 max-w-sm text-sm text-ink-muted">
                    {BLURBS[slug] ?? "Browse the range."}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
