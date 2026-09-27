"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/productCard";
import ProductPageSkeleton from "@/components/product-skeleton";
import GetStartedButton from "@/components/get-started";
import { Lens } from "@/components/ui/lens";
import { NoPhoto, Reticle, SpecRow } from "@/components/instrument";
import { cn } from "@/lib/utils";
import { DEPARTMENT_NAMES, departmentOf, fitsOf } from "@/lib/catalogue";
import type { ProductProps } from "@/types/product";

/* The description arrives as escaped HTML from the CMS. */
const cleanHTML = (html: unknown) => {
  if (!html) return "";
  if (typeof html !== "string") return String(html);
  return html
    .replace(/\\"/g, '"')
    .replace(/\\\//g, "/")
    .replace(/\\u[\dA-F]{4}/gi, (m) =>
      String.fromCharCode(parseInt(m.replace(/\\u/g, ""), 16))
    );
};

type AnyProduct = ProductProps & Record<string, unknown>;

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

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<AnyProduct | null>(null);
  const [related, setRelated] = React.useState<ProductProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeImage, setActiveImage] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setActiveImage(0);

    fetch(`/api/products/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data) setProduct(data);
        setLoading(false);
      })
      .catch(() => !cancelled && setLoading(false));

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => !cancelled && setRelated(Array.isArray(data) ? data : []))
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [id]);

  /* The order form reads these when it builds the enquiry email. */
  React.useEffect(() => {
    if (!product) return;
    localStorage.setItem("productName", JSON.stringify(product.title));
    localStorage.setItem("productImg", JSON.stringify(product.img?.[0] ?? ""));
  }, [product]);

  if (loading) return <ProductPageSkeleton />;

  if (!product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <Reticle className="h-16 w-16 text-ink-faint" />
        <h1 className="display text-display-sm text-ink">Product not found</h1>
        <p className="prose-body max-w-sm text-ink-muted">
          This listing may have sold or been removed.
        </p>
        <Link href="/explore" className="data mt-2 text-signal">
          Browse the catalogue →
        </Link>
      </div>
    );
  }

  const images = Array.isArray(product.img) ? product.img : [];
  const specs = collect(product, SPEC_FIELDS);
  const dimensions = collect(product, DIMENSION_FIELDS);
  const department = departmentOf(product.slug);
  const isGun = department === "airrifle" || department === "airpistol";
  const diagram =
    department === "airrifle"
      ? "/img23.png"
      : department === "airpistol"
        ? "/pisto_dim2.png"
        : null;
  const fits = fitsOf(product);

  // Same department first, then kit made for the same discipline.
  const others = related
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const sameDept = departmentOf(p.slug) === department;
      const sharedFit = fitsOf(p).some((f) => fits.includes(f));
      return { p, score: (sameDept ? 2 : 0) + (sharedFit ? 1 : 0) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ p }) => p);

  return (
    <>
      {/* --- Gallery + buy rail ------------------------------------------ */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden border border-hair bg-raised">
            {images[activeImage] ? (
              <Lens zoomFactor={2} lensSize={260} ariaLabel="Zoom image">
                <Image
                  src={images[activeImage]}
                  alt={product.title}
                  width={1200}
                  height={900}
                  priority
                  className="h-full w-full object-cover"
                />
              </Lens>
            ) : (
              <NoPhoto />
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-hair-strong"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-hair-strong"
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
                    "relative h-20 w-24 shrink-0 overflow-hidden border transition-colors duration-300",
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
                    className="object-cover"
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
            {product.title}
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
              {Number(product.price).toLocaleString("en-IN")}
            </p>
            <p className="data-sm mt-2 text-ink-faint">Excluding 18% GST</p>
          </div>

          <div className="mt-6">
            <GetStartedButton
              price={`Order — ₹${Number(product.price).toLocaleString(
                "en-IN"
              )} (excluding 18% GST)`}
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
            <div className="mt-10 border-t border-hair pt-6">
              <h2 className="data text-ink-dim">Description</h2>
              <div
                className="prose-body mt-4 text-ink-muted [&_a]:text-signal [&_li]:mt-1 [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{
                  __html: cleanHTML(product.included),
                }}
              />
            </div>
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
                  alt={`${product.title} dimensioned drawing`}
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
            <p className="data-sm truncate text-ink-faint">{product.title}</p>
            <p className="font-data text-lg tabular-nums text-signal">
              <span className="opacity-60">₹</span>
              {Number(product.price).toLocaleString("en-IN")}
            </p>
          </div>
          <GetStartedButton
            price={`Order — ₹${Number(product.price).toLocaleString(
              "en-IN"
            )} (excluding 18% GST)`}
            label="Order"
            className="h-11 w-auto shrink-0 px-5"
          />
        </div>
      </div>
    </>
  );
}
