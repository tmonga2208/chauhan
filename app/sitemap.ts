import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { DEPARTMENT_COPY } from "@/lib/catalogue";

const SITE = "https://www.chauhansports.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/explore`, changeFrequency: "weekly", priority: 0.8 },
    ...Object.keys(DEPARTMENT_COPY).map((slug) => ({
      url: `${SITE}/categories/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${SITE}/products/${p.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
