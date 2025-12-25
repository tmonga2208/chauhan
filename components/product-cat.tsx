import { Skeleton } from "@/components/ui/skeleton"
import { BentoGrid } from "./ui/bento-grid"

interface CarouselSkeletonProps {
  itemCount?: number
}

export default function CatCarouselSkeleton({ itemCount = 4 }: CarouselSkeletonProps) {
    return (
        <div>
          <p className=" ml-4 text-6xl font-black mb-4  flex justify-center items-center bg-clip-text py-8 text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Shop By Categories</p>
   <BentoGrid className="max-w-5xl mx-auto">
        {Array.from({ length: itemCount }).map((_, idx) => (
          <div key={idx} className="basis-full sm:basis-1/2 lg:basis-1/3">
            <CatCardSkeleton />
            </div>
        ))}
        </BentoGrid>
          </div>
  )
}

function CatCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Product Image Skeleton */}
      <Skeleton className="w-[550px] md:w-[200px] aspect-[10/9] rounded-md" />

      {/* Product Title Skeleton */}
      <div className="space-y-2 flex justify-center items-center">
        <Skeleton className="h-5 w-3/4" />
      </div>
    </div>
  )
}
