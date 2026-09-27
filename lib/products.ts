import { cache } from "react";
import clientPromise from "@/lib/mongodb";
import { departmentOf, fitsOf } from "@/lib/catalogue";
import type { ProductProps } from "@/types/product";

/* Server-side reads for the pages. Mongo documents carry an ObjectId that
   can't cross into client components, so every read returns plain JSON. */

export type Product = ProductProps & Record<string, unknown>;

const plain = ({ _id, ...doc }: Record<string, unknown>): Product => {
  void _id;
  return JSON.parse(JSON.stringify(doc));
};

const collection = async () => (await clientPromise).db().collection("products");

// `cache` dedupes calls within one render — generateMetadata and the page
// both ask for the same product.
export const getProducts = cache(async (): Promise<Product[]> =>
  (await (await collection()).find({}).toArray()).map(plain)
);

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  const doc = await (await collection()).findOne({ id });
  return doc ? plain(doc) : null;
});

export const getFeatured = cache(async (): Promise<Product[]> =>
  (await (await collection()).find({ featured: true }).toArray()).map(plain)
);

/** Same department first, then kit made for the same discipline. */
export function relatedTo(product: Product, all: Product[], count = 3): Product[] {
  const department = departmentOf(product.slug);
  const fits = fitsOf(product);
  return all
    .filter((p) => p.id !== product.id)
    .map((p) => {
      const sameDept = departmentOf(p.slug) === department;
      const sharedFit = fitsOf(p).some((f) => fits.includes(f));
      return { p, score: (sameDept ? 2 : 0) + (sharedFit ? 1 : 0) };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ p }) => p);
}
