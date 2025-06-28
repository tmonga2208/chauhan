
import Component from "@/components/crosshairGame";
import CategoriesComp from "@/components/categories";
import Footer from "@/components/footer";
import Features from "@/components/features";
import FeaturedCarousel from "@/components/featuredHome";

export default function Home() {
  
  return (
    <div>
      <section  className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] min-h-screen flex items-center justify-center">
        <Component />
      </section>
      <section  className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white">
        <FeaturedCarousel/>
      </section>
      <section className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white">
        <CategoriesComp/>
      </section>
      <section className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] text-white">
      <Features/>
      </section>
     <section className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] pt-8">
        <Footer/>
      </section>
    </div>
  );
}
