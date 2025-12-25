"use client"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { ProductProps } from '@/types/product'

export default function Page() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const total = products.length;
  const x = total;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">

          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground mt-1">
                  Discover our complete range of air rifles, pistols, pellets, and accessories
                </p>
                <p className="text-sm text-muted-foreground mt-2">Showing {x} of {total} products</p>
              </div>

            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((item) => (
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
            </div>

          </div>
        </div>
      </div>
  )
}
