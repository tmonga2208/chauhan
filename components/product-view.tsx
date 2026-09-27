"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/productCard";
import GetStartedButton from "@/components/get-started";
import { Lens } from "@/components/ui/lens";
import { NoPhoto, SpecRow } from "@/components/instrument";
import { cn } from "@/lib/utils";
import {
  cleanHTML,
  DEPARTMENT_NAMES,
  departmentOf,
  displayTitle,
  fitsOf,
  formatINR,
  triggerOf,
} from "@/lib/catalogue";
import type { Product } from "@/lib/products";

type AnyProduct = Product;

const SPEC_FIELDS: { key: string; label: string }[] = [
  { key: "caliber", label: "Calibre" },
  { key: "shot", label: "Shot" },
  { key: "shots", label: "Shots" },
  { key: "cartridgeCapacity", label: "Cartridge capacity" },
  { key: "maxEnergy", label: "Max energy" },
  { key: "trigger", label: "Trigger" },
  { key: "triggerWeight", label: "Trigger weight" },
  { key: "sights", label: "Sights" },
  { key: "grip", label: "Grip" },
  { key: "weight", label: "Weight" },
];

const DIMENSION_FIELDS: { key: string; label: string }[] = [
  { key: "barrelLength", label: "Barrel length" },
  { key: "barrel", label: "Barrel" },
  { key: "dimensions", label: "Dimensions" },
  { key: "cylinder", label: "Cylinder" },
  { key: "stock", label: "Stock" },
];

const collect = (product: AnyProduct, fields: { key: string; label: string }[]) =>
  fields
    .map(({ key, label }) => ({ label, value: product[key] }))
    .filter((row) => row.value !== undefined && row.value !== null && row.value !== "")
    .map((row) => ({ label: row.label, value: String(row.value) }));

export default function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const [activeImage, setActiveImage] = React.useState(0);

  /* The order form reads these when it builds the enquiry email. */
  React.useEffect(() => {
    localStorage.setItem("productName", JSON.stringify(product.title));
    localStorage.setItem("productImg", JSON.stringify(product.img?.[0] ?? ""));
  }, [product]);

  const images = Array.isArray(product.img) ? product.img : [];
  const trigger = triggerOf(product as AnyProduct & { type?: string });
  const specs = [
    ...(trigger
      ? [{ label: "Trigger type", value: trigger === "electronic" ? "Electronic" : "Mechanical" }]
      : []),
    ...collect(product, SPEC_FIELDS),
  ];
  const dimensions = collect(product, DIMENSION_FIELDS);
  const name = displayTitle(product.title);
  const department = departmentOf(product.slug);
  const isGun = department === "airrifle" || department === "airpistol";
  const diagram =
    department === "airrifle"
      ? "/img23.png"
      : department === "airpistol"
        ? "/pisto_dim2.png"
        : null;
  const fits = fitsOf(product);
  const others = related;

  return (
    <>
      {/* --- Gallery + buy rail ------------------------------------------ */}
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-16">
        {/* Gallery */}
        <div>
          <div className="photo-plate relative aspect-[4/3] overflow-hidden border border-hair">
            {images[activeImage] ? (
              <Lens
                zoomFactor={2}
                lensSize={260}
                ariaLabel="Zoom image"
                surfaceClassName="h-full rounded-none bg-paper"
              >
                <Image
                  src={images[activeImage]}
                  alt={name}
                  width={1200}
                  height={900}
                  priority
                  className="h-full w-full object-contain p-6 md:p-10"
                />
              </Lens>
            ) : (
              <NoPhoto />
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-paper-shade"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-paper-shade"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar">
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === activeImage}
                  className={cn(
                    "photo-plate relative h-20 w-24 shrink-0 overflow-hidden border transition-colors duration-300",
                    i === activeImage
                      ? "border-signal"
                      : "border-hair hover:border-hair-strong"
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="data flex items-center gap-3 text-signal">
            <span className="h-px w-6 bg-signal/50" aria-hidden="true" />
            {product.categories?.[0] ?? "Catalogue"}
          </p>

          <h1 className="display mt-5 text-display-sm text-ink text-balance">
            {name}
          </h1>

          {DEPARTMENT_NAMES[department] && (
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href={`/categories/${department}`}
                className="data-sm border border-hair px-3 py-1.5 text-ink-muted transition-colors hover:border-signal hover:text-signal"
              >
                {DEPARTMENT_NAMES[department]}
              </Link>
              {!isGun &&
                fits.map((fit) => (
                  <span
                    key={fit}
                    className="data-sm border border-hair px-3 py-1.5 text-ink-dim"
                  >
                    For air {fit.toLowerCase()}
                  </span>
                ))}
            </div>
          )}

          <div className="mt-8 border-t border-hair pt-6">
            <p className="data-sm text-ink-faint">Price</p>
            <p className="font-data mt-2 text-3xl font-medium tabular-nums text-signal md:text-4xl">
              <span className="opacity-60">₹</span>
              {formatINR(product.price)}
            </p>
            <p className="data-sm mt-2 text-ink-faint">Excluding 18% GST</p>
          </div>

          <div className="mt-6">
            <GetStartedButton
              price={`Order — ₹${formatINR(product.price)} (excluding 18% GST)`}
            />
          </div>

          <p className="data-sm mt-4 text-ink-faint">
            Questions before you order?{" "}
            <a
              href="tel:+919661470953"
              className="text-ink-muted underline decoration-hair-strong underline-offset-4 transition-colors hover:text-signal"
            >
              Call us
            </a>
          </p>

          {product.included ? (
            // Closed by default so the price and Order button stay the
            // focus; the text is still in the page for search engines.
            <details className="group mt-10 border-y border-hair">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                <h2 className="data text-ink-dim transition-colors group-hover:text-ink">
                  Description
                </h2>
                <span
                  aria-hidden="true"
                  className="font-data text-lg leading-none text-ink-dim transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div
                className="prose-body pb-6 text-ink-muted [&_a]:text-signal [&_li]:mt-1 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(product.included),
                }}
              />
            </details>
          ) : null}
        </div>
      </div>

      {/* --- Specification sheet ----------------------------------------- */}
      {isGun && (specs.length > 0 || dimensions.length > 0) && (
        <section className="border-y border-hair bg-sunk py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-end justify-between border-b border-hair pb-5">
              <h2 className="display text-display-sm text-ink">
                Specification
              </h2>
              <p className="data-sm text-ink-faint">
                Manufacturer figures
              </p>
            </div>

            <div className="grid gap-x-16 md:grid-cols-2">
              {specs.length > 0 && (
                <dl className="pt-2">
                  {specs.map(({ label, value }) => (
                    <SpecRow key={label} label={label} value={value} />
                  ))}
                </dl>
              )}
              {dimensions.length > 0 && (
                <dl className="pt-2">
                  {dimensions.map(({ label, value }) => (
                    <SpecRow key={label} label={label} value={value} />
                  ))}
                </dl>
              )}
            </div>

            {/* Technical drawing */}
            {diagram && (
              <figure className="mt-14 border border-hair bg-raised p-6 md:p-10">
                <figcaption className="data mb-6 flex items-center gap-3 text-ink-dim">
                  <span className="h-px w-6 bg-hair-strong" aria-hidden="true" />
                  Dimensions in millimetres
                </figcaption>
                <Image
                  src={diagram}
                  alt={`${name} dimensioned drawing`}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </figure>
            )}
          </div>
        </section>
      )}

      {/* --- Related ------------------------------------------------------ */}
      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 md:py-20">
          <div className="flex items-end justify-between border-b border-hair pb-5">
            <h2 className="display text-display-sm text-ink">
              Also in the shop
            </h2>
            <Link
              href="/explore"
              className="data text-ink-dim transition-colors hover:text-signal"
            >
              All products →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.title}
                img={item.img}
                price={Number(item.price)}
                categories={item.categories}
              />
            ))}
          </div>
        </section>
      )}

      {/* --- Mobile order bar --------------------------------------------- */}
      <div className="sticky bottom-0 z-40 border-t border-hair bg-void/95 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-3">
          <div className="min-w-0">
            <p className="data-sm truncate text-ink-faint">{name}</p>
            <p className="font-data text-lg tabular-nums text-signal">
              <span className="opacity-60">₹</span>
              {formatINR(product.price)}
            </p>
          </div>
          <GetStartedButton
            price={`Order — ₹${formatINR(product.price)} (excluding 18% GST)`}
            label="Order"
            className="h-11 w-auto shrink-0 px-5"
          />
        </div>
      </div>
    </>
  );
}
