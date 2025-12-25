"use client"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import AutoScroll from "embla-carousel-auto-scroll"
import { motion } from "motion/react"
import { useRef } from "react"
import { CardBody, CardContainer, CardItem } from "./ui/3d-card"

interface CarouselSkeletonProps {
  itemCount?: number
}

export default function CarouselSkeleton({ itemCount = 6 }: CarouselSkeletonProps) {
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
        <CarouselContent >
        {Array.from({ length: itemCount }).map((_, idx) => (
          <CarouselItem key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
            <ProductCardSkeleton />
          </CarouselItem>
        ))}
        </CarouselContent>    
        </Carousel>
        </motion.div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <CardContainer>
      <CardBody className="bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-white dark:border-white/[0.2] border-white/[0.2] w-[20rem] h-[30rem] rounded-xl p-6 border-2">
        {/* Title Skeleton */}
        <CardItem translateZ="50" className="mb-4">
          <Skeleton className="h-6 w-3/4 bg-gray-700" />
        </CardItem>

        {/* Category Badges Skeleton */}
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-700" />
        </div>

        {/* Image Skeleton */}
        <CardItem translateZ="100" className="w-full mt-4">
          <Skeleton className="h-60 w-full rounded-xl bg-gray-700" />
        </CardItem>

        {/* Price and Button Skeleton */}
        <div className="flex justify-between items-center mt-15">
          <CardItem translateZ={20}>
            <Skeleton className="h-8 w-20 bg-gray-700" />
          </CardItem>
          <CardItem translateZ={20}>
            <Skeleton className="h-8 w-24 rounded-xl bg-gray-700" />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}
