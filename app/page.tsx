import Hero from "@/components/hero";
import FeaturedCarousel from "@/components/featuredHome";
import CategoriesComp from "@/components/categories";
import Features from "@/components/features";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCarousel />
      <CategoriesComp />
      <Features />
    </>
  );
}
