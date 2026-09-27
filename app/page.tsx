import Hero from "@/components/hero";
import FeaturedCarousel from "@/components/featuredHome";
import CategoriesComp from "@/components/categories";
import { getFeatured } from "@/lib/products";
import { DEPARTMENT_TILES } from "@/lib/catalogue";

// The featured selection comes from the database; refreshed every five minutes.
export const revalidate = 300;

export default async function Home() {
  return (
    <>
      <Hero />
      <FeaturedCarousel products={await getFeatured()} />
      <CategoriesComp categories={DEPARTMENT_TILES} />
    </>
  );
}
