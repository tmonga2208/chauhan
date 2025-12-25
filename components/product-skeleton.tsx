import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function ProductPageSkeleton() {
  return (
    <div className="bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left: Scrollable Images Skeleton */}
        <div className="flex-1 flex flex-col justify-start items-center p-8 overflow-y-scroll no-scrollbar max-h-screen">
          {/* Multiple image skeletons */}
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="w-full max-w-[800px] h-[400px] rounded-2xl mb-4 bg-gray-800" />
          ))}
        </div>

        {/* Right: Sticky Info/Accordion Skeleton */}
        <div className="flex-1 flex flex-col items-start justify-start p-8 max-w-xl text-white">
          <div className="w-full sticky top-0">
            <div className="mb-8">
              {/* Title skeleton */}
              <Skeleton className="h-16 w-full mb-4 bg-gray-800" />

              {/* Categories skeleton */}
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20 rounded-full bg-gray-800" />
                <Skeleton className="h-6 w-24 rounded-full bg-gray-800" />
                <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
              </div>

              {/* Order button skeleton */}
              <Skeleton className="w-full h-14 rounded-full mb-6 bg-gray-800" />
            </div>

            {/* Accordion skeleton */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="year">
                <AccordionTrigger className="text-white">
                  <Skeleton className="h-5 w-12 bg-gray-800" />
                </AccordionTrigger>
                <AccordionContent>
                  <Skeleton className="h-4 w-16 bg-gray-800" />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="model">
                <AccordionTrigger className="text-white">
                  <Skeleton className="h-5 w-16 bg-gray-800" />
                </AccordionTrigger>
                <AccordionContent>
                  <Skeleton className="h-4 w-24 bg-gray-800" />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="included">
                <AccordionTrigger className="text-white">
                  <Skeleton className="h-5 w-32 bg-gray-800" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-gray-800" />
                    <Skeleton className="h-4 w-3/4 bg-gray-800" />
                    <Skeleton className="h-4 w-5/6 bg-gray-800" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Looking For More Section Skeleton */}
      <section>
        <Skeleton className="ml-4 my-4 py-4 h-16 w-80 bg-gray-800" />

        <div className="flex justify-center">
          <div className="w-xs sm:w-lg md:w-2xl lg:w-5xl overflow-hidden">
            <div className="flex gap-4 px-4">
              {/* Product card skeletons */}
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <Skeleton className="w-full h-48 rounded-lg mb-4 bg-gray-800" />
                    <Skeleton className="h-6 w-3/4 mb-2 bg-gray-800" />
                    <Skeleton className="h-5 w-1/2 mb-2 bg-gray-800" />
                    <div className="flex gap-2 mb-2">
                      <Skeleton className="h-4 w-16 rounded-full bg-gray-800" />
                      <Skeleton className="h-4 w-12 rounded-full bg-gray-800" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer skeleton */}
      <div className="mt-16">
        <Skeleton className="w-full h-32 bg-gray-900" />
      </div>
    </div>
  )
}
