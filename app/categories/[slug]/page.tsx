"use client"

import { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { ProductProps } from '@/types/product'
import Image from "next/image"
import Link from "next/link"

function Page() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setIsLoading(false)
      })
  }, [])

  const INITIAL_LOAD = 8
  const LOAD_MORE_COUNT = 4

  const categoryProducts = useMemo(() => products.filter((product) => product?.slug?.includes(slug)), [products, slug])

  const totalProducts = categoryProducts.length
  const productsToShow = currentPage === 1 ? INITIAL_LOAD : INITIAL_LOAD + (currentPage - 1) * LOAD_MORE_COUNT

  const displayedProducts = categoryProducts.slice(0, productsToShow)
  const hasMoreProducts = productsToShow < totalProducts

  const handleLoadMore = async () => {
    setIsLoading(true)
    setCurrentPage((prev) => prev + 1)
    setIsLoading(false)
  }
  return (
    <div className="space-y-6 min-h-screen bg-black text-white">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/products/${item.id}`} className="absolute inset-0 z-10">
                      <span className="sr-only">{item.title}</span>
                </Link>
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.img[0]}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                        <h3 className="text-md font-bold ">{item.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.categories}</span>
                  </div>
                      <p className="text-lg font-semibold">&#8377;{item.price}</p>
                </div>
              </div>
                  ))}

        {/* Skeleton loaders while loading more */}
        {isLoading && (
          <>
            {Array.from({ length: LOAD_MORE_COUNT }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            size="lg"
            variant="outline"
            className="min-w-32 bg-transparent"
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* Products count info */}
      <div className="text-center text-sm text-muted-foreground">
        Showing {displayedProducts.length} of {totalProducts} products
      </div>
    </div>
  )
}

// Skeleton component for loading state
function ProductCardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse border-2 border-muted p-4 rounded-lg">
      <div className="aspect-square bg-muted rounded-lg" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-5 bg-muted rounded w-1/3" />
      </div>
    </div>
  )
}

export default Page
