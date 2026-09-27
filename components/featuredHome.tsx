"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Price, Reticle, SectionHead } from "@/components/instrument";
import { ProductCard } from "@/components/productCard";
import type { ProductProps } from "@/types/product";
import { displayTitle } from "@/lib/catalogue";

const CoverflowScene = dynamic(
  () => import("@/components/three/coverflow-scene"),
  { ssr: false }
);

const DRAG_THRESHOLD = 60;

export default function FeaturedCarousel({
  products: featured,
}: {
  products: ProductProps[];
}) {
  // The 3D deck needs a photo on every card.
  const products = React.useMemo(
    () => featured.filter((p) => p.img?.[0]),
    [featured]
  );
  // Open on the middle of the deck so it reads as balanced.
  const [active, setActive] = React.useState(() =>
    products.length ? Math.floor((products.length - 1) / 2) : 0
  );
  const [flat, setFlat] = React.useState(false);

  const dragStart = React.useRef<number | null>(null);
  const wheelLock = React.useRef(0);

  React.useEffect(() => {
    // Anyone who has asked for less motion gets the plain grid instead.
    setFlat(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const count = products.length;
  const step = React.useCallback(
    (dir: number) =>
      setActive((i) => Math.min(Math.max(i + dir, 0), Math.max(count - 1, 0))),
    [count]
  );

  const current = products[active];

  return (
    <section className="border-b border-hair py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow={count ? `${count} in stock` : "Selected stock"}
          title="What we would put in your hand today"
          lede="A working selection from the current catalogue — the pistols and rifles our customers are shooting this season."
          action={
            <Link
              href="/explore"
              className="data inline-flex h-12 items-center gap-3 border border-hair-strong px-6 text-ink transition-colors duration-500 hover:border-signal hover:text-signal"
            >
              All products
              <span aria-hidden="true">→</span>
            </Link>
          }
        />
      </div>

      {count === 0 ? (
        <div className="mx-auto mt-16 grid max-w-7xl place-items-center gap-4 px-6">
          <Reticle className="h-16 w-16 text-ink-faint" />
          <p className="prose-body text-ink-muted">
            Nothing is flagged as featured right now.
          </p>
          <Link href="/explore" className="data text-signal">
            Browse the full catalogue →
          </Link>
        </div>
      ) : flat ? (
        <div className="mx-auto mt-14 grid max-w-7xl gap-px bg-hair px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              title={p.title}
              img={p.img}
              price={Number(p.price)}
              categories={p.categories}
            />
          ))}
        </div>
      ) : (
        <>
          {/* --- The deck ------------------------------------------------ */}
          <div
            role="group"
            aria-label="Featured products"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                step(1);
              }
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                step(-1);
              }
            }}
            onPointerDown={(e) => (dragStart.current = e.clientX)}
            onPointerUp={(e) => {
              if (dragStart.current === null) return;
              const dx = e.clientX - dragStart.current;
              if (Math.abs(dx) > DRAG_THRESHOLD) step(dx < 0 ? 1 : -1);
              dragStart.current = null;
            }}
            onPointerLeave={() => (dragStart.current = null)}
            onWheel={(e) => {
              if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
              const now = Date.now();
              if (now - wheelLock.current < 380) return;
              wheelLock.current = now;
              step(e.deltaX > 0 ? 1 : -1);
            }}
            className="relative mt-10 h-[46svh] min-h-[300px] cursor-grab touch-pan-y select-none active:cursor-grabbing md:h-[56svh]"
          >
            <CoverflowScene urls={products.map((p) => p.img?.[0] ?? "")} active={active} />
          </div>

          {/* --- The record ---------------------------------------------- */}
          {current && (
            <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-10">
              <div className="flex flex-col gap-6 border-t border-hair pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <p className="data-sm text-ink-dim">
                    {current.categories?.[0] ?? "Catalogue"}
                  </p>
                  <h3 className="display mt-2 truncate text-2xl text-ink md:text-3xl">
                    {displayTitle(current.title)}
                  </h3>
                  <Price value={Number(current.price)} className="mt-3" />
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    disabled={active === 0}
                    aria-label="Previous product"
                    className="grid h-12 w-12 place-items-center border border-hair-strong text-ink transition-colors duration-300 hover:border-signal hover:text-signal disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <span className="data-sm w-16 text-center tabular-nums text-ink-dim">
                    {active + 1} / {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    disabled={active === count - 1}
                    aria-label="Next product"
                    className="grid h-12 w-12 place-items-center border border-hair-strong text-ink transition-colors duration-300 hover:border-signal hover:text-signal disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/products/${current.id}`}
                    className="data ml-1 inline-flex h-12 items-center gap-3 bg-signal px-6 text-paper transition-colors duration-500 hover:bg-signal-bright"
                  >
                    View
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Real links for keyboard and crawlers, off-screen. */}
          <ul className="sr-only">
            {products.map((p) => (
              <li key={p.id}>
                <Link href={`/products/${p.id}`}>{displayTitle(p.title)}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
