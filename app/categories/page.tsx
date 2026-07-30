"use client";

import * as React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/productCard";
import ProductCardSkeleton from "@/components/product-card-skeleton";
import { PageHeader } from "@/components/page-header";
import { Reticle } from "@/components/instrument";
import type { ProductProps } from "@/types/product";

export default function CollectionPage() {
  const [products, setProducts] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  return (
    <>
      <PageHeader
        eyebrow="Collection"
        title="Every department, one grid"
        lede="Air rifles, pistols, pellets and accessories, laid out together."
        meta={loading ? "Loading…" : `${products.length} products`}
      />

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item, i) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                img={item.img}
                price={Number(item.price)}
                categories={item.categories}
                priority={i < 4}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <Reticle className="h-14 w-14 text-ink-faint" />
            <p className="prose-body text-ink-muted">
              Nothing is listed yet.
            </p>
            <Link href="/" className="data text-signal">
              Back to home →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
