import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/product-view";
import { getProduct, getProducts, relatedTo } from "@/lib/products";
import { displayTitle, formatINR, stripHTML } from "@/lib/catalogue";

/* Built ahead of time and refreshed from the database every five minutes,
   so a price or stock change made in the CMS shows up within that window. */
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ id: p.id }));
}

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await getProduct((await params).id);
  if (!product) return { title: "Product not found" };

  const name = displayTitle(product.title);
  const about = stripHTML(product.included);
  const description =
    (about ? about.slice(0, 150).replace(/\s\S*$/, "") + "… " : "") +
    `₹${formatINR(product.price)} excluding GST.`;
  const image = product.img?.[0];

  return {
    title: name,
    description,
    openGraph: { title: name, description, images: image ? [image] : [] },
  };
}

export default async function ProductPage({ params }: Params) {
  const product = await getProduct((await params).id);
  if (!product) notFound();

  return (
    <ProductView product={product} related={relatedTo(product, await getProducts())} />
  );
}
