"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Price } from "@/components/instrument";
import type { ProductProps } from "@/types/product";

/* ==========================================================================
   The catalogue card.
   Reads as a spec sheet: the photo on a sunk plate, then a hairline, then
   the data row, then the one number that matters. Corner ticks take the
   signal colour on hover — no glow, no border flare.
   ========================================================================== */

type Props = ProductProps & {
  model?: string;
  year?: number;
  priority?: boolean;
};

export function ProductCard({
  title,
  img,
  price,
  categories,
  id,
  className,
  model,
  year,
  priority = false,
}: Props) {
  const category = categories?.[0];

  return (
    <Link
      href={`/products/${id}`}
      className={cn(
        "group relative flex h-full flex-col border border-hair bg-raised",
        "transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1.5 hover:border-hair-strong hover:bg-overlay",
        "focus-visible:-translate-y-1.5",
        className
      )}
    >
      {/* Corner ticks — the blueprint device, repeated site-wide */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-px -top-px h-2.5 w-2.5 border-l border-t border-hair-strong transition-colors duration-500 group-hover:border-signal"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -right-px h-2.5 w-2.5 border-b border-r border-hair-strong transition-colors duration-500 group-hover:border-signal"
      />

      {/* Photo plate */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sunk">
        {img?.[0] && (
          <Image
            src={img[0]}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            priority={priority}
            /* Held back a touch so a wall of white studio backgrounds doesn't
               glare on the dark grid — hovering brings the product forward. */
            className="object-cover opacity-[0.86] transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:opacity-100"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-raised/70 via-transparent to-transparent"
        />
      </div>

      {/* Data row — real fields only */}
      <div className="flex items-center justify-between gap-3 border-t border-hair px-5 pt-4">
        <span className="data-sm truncate text-ink-dim">
          {category ?? "Catalogue"}
        </span>
        {(model || year) && (
          <span className="data-sm shrink-0 text-ink-faint tabular-nums">
            {[model, year].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>

      <h3 className="display mt-3 px-5 text-xl text-ink text-balance">
        {title}
      </h3>

      {/* The number the eye should find */}
      <div className="mt-auto flex items-end justify-between gap-3 px-5 pb-5 pt-6">
        <div>
          <p className="data-sm text-ink-faint">Price</p>
          <Price value={price} className="mt-1" />
        </div>
        <span className="data-sm flex items-center gap-2 text-ink-dim transition-colors duration-500 group-hover:text-signal">
          View
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
}

export default ProductCard;
