"use client"
import React from 'react'
import { ProductCard } from "@/components/productCard";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import {DATA} from "@/data/data";
import AutoScroll from 'embla-carousel-auto-scroll'
import { useRef } from "react";
import {motion} from "framer-motion"

function FeaturedCarousel() {
    const plugin = useRef(
    AutoScroll({
      speed: 1,
      startDelay: 1000,
      stopOnFocusIn: true,
    }),
  )
  return (
      <div>
        <p className="ml-4 text-6xl font-black flex justify-center items-center bg-clip-text py-2 text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Featured Products</p>
        <motion.div initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} className="flex  justify-center">
            <Carousel opts={{align:"start", loop: true,}} plugins={[plugin.current]} className="w-xs sm:w-lg md:w-2xl lg:w-5xl overflow-hidden">
            <CarouselContent className="">
              {DATA.map((item, idx) => (
                <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <ProductCard
                  img={[item.img[0]]}
                  title={item.title}
                  price={Number(item.price)}
                    categories={item.categories}
                    id={item.id}
                  />
                </CarouselItem>
                ))}
            </CarouselContent>    
        </Carousel>
        </motion.div>
    </div>
  )
}

export default FeaturedCarousel