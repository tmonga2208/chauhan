"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/productCard";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { PageHeader } from "@/components/page-header";
import { Reticle } from "@/components/instrument";
import type { ProductProps } from "@/types/product";

const LIMIT = 9;

export default function ExplorePage() {
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [hasMore, setHasMore] = React.useState(true);
  const observer = React.useRef<IntersectionObserver | null>(null);

  const lastCardRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      observer.current?.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) setPage((p) => p + 1);
        },
        { rootMargin: "400px" }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?page=${page}&limit=${LIMIT}`);
        if (!res.ok) throw new Error("Request failed");
        const data: ProductProps[] = await res.json();
        if (cancelled) return;

        setProducts((prev) => {
          if (page === 1) return data;
          const seen = new Set(prev.map((p) => p.id));
          return [...prev, ...data.filter((p) => !seen.has(p.id))];
        });
        if (data.length < LIMIT) setHasMore(false);
      } catch {
        if (!cancelled) setHasMore(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const empty = !loading && products.length === 0;

  return (
    <>
      <PageHeader
        eyebrow="Full catalogue"
        title="Everything in the shop"
        lede="Pistols, rifles, pellets and range kit. Scroll — more loads as you go."
        meta={products.length ? `${products.length} shown` : undefined}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {empty ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Reticle className="h-14 w-14 text-ink-faint" />
            <p className="prose-body text-ink-muted">
              The catalogue is empty right now.
            </p>
            <Link href="/" className="data text-signal">
              Back to home →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <div
                key={product.id}
                ref={i === products.length - 1 ? lastCardRef : null}
              >
                <ProductCard
                  id={product.id}
                  title={product.title}
                  img={product.img}
                  price={Number(product.price)}
                  categories={product.categories}
                  priority={i < 3}
                />
              </div>
            ))}

            {loading &&
              Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={`skeleton-${i}`} />
              ))}
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="mt-16 flex items-center gap-4 border-t border-hair pt-6">
            <span className="h-px flex-1 bg-hair-faint" aria-hidden="true" />
            <p className="data-sm text-ink-faint">End of catalogue</p>
            <span className="h-px flex-1 bg-hair-faint" aria-hidden="true" />
          </div>
        )}
      </section>
    </>
  );
}
