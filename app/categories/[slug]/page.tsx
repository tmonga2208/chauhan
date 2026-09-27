import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryView from "@/components/category-view";
import { getProducts } from "@/lib/products";
import { DEPARTMENT_COPY as TITLES, departmentOf } from "@/lib/catalogue";

// Refreshed from the database every five minutes, like product pages.
export const revalidate = 300;

export function generateStaticParams() {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const heading = TITLES[(await params).slug];
  if (!heading) return {};
  return { title: heading.title, description: heading.lede };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const products = (await getProducts()).filter(
    (p) => departmentOf(p.slug) === slug
  );
  if (!TITLES[slug] && products.length === 0) notFound();

  return <CategoryView slug={slug} products={products} />;
}
