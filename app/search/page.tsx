"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/productCard";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { PageHeader } from "@/components/page-header";
import { Reticle } from "@/components/instrument";
import type { ProductProps } from "@/types/product";

function SearchContent() {
  const query = useSearchParams().get("q") ?? "";
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!query) {
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
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
  }, [query]);

  return (
    <>
      <PageHeader
        eyebrow="Search"
        title={query ? <>Results for “{query}”</> : "Search the catalogue"}
        meta={
          loading
            ? "Searching…"
            : query
              ? `${products.length} ${products.length === 1 ? "match" : "matches"}`
              : undefined
        }
      />

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((item, i) => (
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
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Reticle className="h-14 w-14 text-ink-faint" />
            <p className="prose-body max-w-sm text-ink-muted text-pretty">
              {query
                ? `Nothing matched “${query}”. Try a brand name, a model, or a category.`
                : "Type a brand, model or category to find what you need."}
            </p>
            <Link href="/explore" className="data mt-2 text-signal">
              Browse the full catalogue →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <div className="grid min-h-[60vh] place-items-center">
          <Reticle className="h-12 w-12 animate-ring-pulse text-ink-faint" />
        </div>
      }
    >
      <SearchContent />
    </React.Suspense>
  );
}
