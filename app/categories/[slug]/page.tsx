"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/productCard";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { PageHeader } from "@/components/page-header";
import { Reticle } from "@/components/instrument";
import { cn } from "@/lib/utils";
import { departmentOf, fitsOf, triggerOf, type Fit } from "@/lib/catalogue";
import type { ProductProps } from "@/types/product";

const MAX_PRICE = Number.MAX_SAFE_INTEGER;
const INITIAL_LOAD = 9;
const LOAD_MORE = 6;

const TITLES: Record<string, { title: string; lede: string }> = {
  airpistol: {
    title: "Air pistols",
    lede: "10m match pistols, mechanical and electronic trigger.",
  },
  airrifle: {
    title: "Air rifles",
    lede: "10m match rifles with adjustable stocks and sights.",
  },
  pellets: {
    title: "Pellets",
    lede: "Match-grade 4.5mm pellets, sorted by head size.",
  },
  accessories: {
    title: "Accessories",
    lede: "Sights, grips, cylinders, cases and range kit.",
  },
};

const PRICE_BANDS: { label: string; range: [number, number] }[] = [
  { label: "Under ₹1,00,000", range: [0, 100000] },
  { label: "₹1,00,000 – ₹5,00,000", range: [100000, 500000] },
  { label: "₹5,00,000 – ₹10,00,000", range: [500000, 1000000] },
  { label: "Above ₹10,00,000", range: [1000000, MAX_PRICE] },
];

/** A hairline check row. */
function CheckRow({
  checked,
  onToggle,
  children,
}: {
  checked: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="group flex w-full items-center gap-3 py-2.5 text-left"
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-4 w-4 shrink-0 place-items-center border transition-colors duration-300",
          checked
            ? "border-signal bg-signal"
            : "border-hair-strong group-hover:border-ink-dim"
        )}
      >
        {checked && (
          <span className="h-1.5 w-1.5 bg-paper" />
        )}
      </span>
      <span
        className={cn(
          "text-sm transition-colors duration-300",
          checked ? "text-ink" : "text-ink-muted group-hover:text-ink"
        )}
      >
        {children}
      </span>
    </button>
  );
}

function FilterGroup({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-hair py-6 first:border-t-0 first:pt-0">
      <legend className="data mb-3 text-ink-dim">{heading}</legend>
      {children}
    </fieldset>
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0,
    MAX_PRICE,
  ]);
  const [selectedFits, setSelectedFits] = React.useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const inCategory = React.useMemo(
    () => products.filter((p) => departmentOf(p?.slug) === slug),
    [products, slug]
  );

  const heading = TITLES[slug] ?? {
    title: inCategory[0]?.categories?.[0] ?? "Products",
    lede: "",
  };

  const isGun = slug.includes("airrifle") || slug.includes("airpistol");

  // Only offered where some items are tagged for one discipline.
  const fitOptions = React.useMemo(() => {
    if (isGun) return [];
    const set = new Set<Fit>();
    inCategory.forEach((p) => fitsOf(p).forEach((f) => set.add(f)));
    return (["Rifle", "Pistol"] as Fit[]).filter((f) => set.has(f));
  }, [inCategory, isGun]);

  const filtered = React.useMemo(
    () =>
      inCategory.filter((item) => {
        const trigger = triggerOf(item);
        const type = trigger
          ? trigger === "electronic"
            ? "Electronic"
            : "Mechanical"
          : null;
        const matchesType =
          selectedTypes.length === 0 || (type !== null && selectedTypes.includes(type));

        const matchesPrice =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        const matchesFit =
          selectedFits.length === 0 ||
          fitsOf(item).some((f) => selectedFits.includes(f));

        return matchesType && matchesPrice && matchesFit;
      }),
    [inCategory, selectedTypes, priceRange, selectedFits]
  );

  const shown = page === 1 ? INITIAL_LOAD : INITIAL_LOAD + (page - 1) * LOAD_MORE;
  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;

  const toggle =
    (setter: React.Dispatch<React.SetStateAction<string[]>>) => (value: string) => {
      setter((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
      setPage(1);
    };

  const activeCount =
    selectedFits.length +
    selectedTypes.length +
    (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0);

  const reset = () => {
    setSelectedFits([]);
    setSelectedTypes([]);
    setPriceRange([0, MAX_PRICE]);
    setPage(1);
  };

  const filterPanel = (
    <>
      {isGun && (
        <FilterGroup heading="Trigger">
          {["Mechanical", "Electronic"].map((type) => (
            <CheckRow
              key={type}
              checked={selectedTypes.includes(type)}
              onToggle={() => toggle(setSelectedTypes)(type)}
            >
              {type}
            </CheckRow>
          ))}
        </FilterGroup>
      )}

      <FilterGroup heading="Price">
        {PRICE_BANDS.map(({ label, range }) => {
          const checked = priceRange[0] === range[0] && priceRange[1] === range[1];
          return (
            <CheckRow
              key={label}
              checked={checked}
              onToggle={() => {
                setPriceRange(checked ? [0, MAX_PRICE] : range);
                setPage(1);
              }}
            >
              {label}
            </CheckRow>
          );
        })}
      </FilterGroup>

      {fitOptions.length > 0 && (
        <FilterGroup heading="Made for">
          {fitOptions.map((fit) => (
            <CheckRow
              key={fit}
              checked={selectedFits.includes(fit)}
              onToggle={() => toggle(setSelectedFits)(fit)}
            >
              {fit === "Rifle" ? "Air rifle" : "Air pistol"}
            </CheckRow>
          ))}
        </FilterGroup>
      )}
    </>
  );

  return (
    <>
      <PageHeader
        eyebrow="Department"
        title={heading.title}
        lede={heading.lede || undefined}
        meta={
          loading
            ? "Loading…"
            : `${visible.length} of ${filtered.length} shown`
        }
        action={
          <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
            <Dialog.Trigger className="data inline-flex h-12 items-center gap-3 border border-hair-strong px-6 text-ink transition-colors hover:border-signal hover:text-signal lg:hidden">
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Filters
              {activeCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center bg-signal px-1 text-paper tabular-nums">
                  {activeCount}
                </span>
              )}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[100] bg-sunk/80 backdrop-blur-sm" />
              <Dialog.Content className="fixed inset-y-0 left-0 z-[101] flex w-[86vw] max-w-sm flex-col border-r border-hair bg-void">
                <div className="flex items-center justify-between border-b border-hair px-6 py-5">
                  <Dialog.Title className="data text-ink-dim">
                    Filters
                  </Dialog.Title>
                  <Dialog.Close
                    aria-label="Close filters"
                    className="grid h-9 w-9 place-items-center border border-hair text-ink-muted hover:text-ink"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  {filterPanel}
                </div>
                <div className="border-t border-hair px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setFiltersOpen(false)}
                    className="data h-12 w-full bg-signal text-paper"
                  >
                    Show {filtered.length} products
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        }
      />

      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-14 lg:px-10">
        {/* Filter rail */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-28">
            <div className="flex items-center justify-between border-b border-hair pb-4">
              <h2 className="data text-ink-dim">Filters</h2>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="data-sm text-signal transition-opacity hover:opacity-70"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="pt-6">{filterPanel}</div>
          </div>
        </aside>

        {/* Grid */}
        <main className="min-w-0 flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : visible.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((item, i) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    img={item.img}
                    price={Number(item.price)}
                    categories={item.categories}
                    priority={i < 3}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    className="data h-12 border border-hair-strong px-8 text-ink transition-colors hover:border-signal hover:text-signal"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <Reticle className="h-14 w-14 text-ink-faint" />
              <p className="prose-body max-w-sm text-ink-muted text-pretty">
                {activeCount > 0
                  ? "Nothing matches those filters."
                  : "Nothing is listed in this department yet."}
              </p>
              {activeCount > 0 ? (
                <button
                  type="button"
                  onClick={reset}
                  className="data text-signal"
                >
                  Clear filters →
                </button>
              ) : (
                <Link href="/explore" className="data text-signal">
                  Browse everything →
                </Link>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
