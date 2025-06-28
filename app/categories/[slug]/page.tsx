"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { DATA } from '@/data/data'
import { ProductCard } from '@/components/productCard';

function Page() {
  const { slug } = useParams<{ slug: string }>();
  const categoryProducts = DATA.filter(product => product?.slug?.includes(slug));
  console.log(categoryProducts);

  return (
    <div>
      {categoryProducts.map((product) => (
        <ProductCard
                  key={product.id}
                  img={[product.img[0]]}
                  title={product.title}
                  price={Number(product.price)}
                    categories={product.categories}
                    id={product.id}
                  />
      ))}
    </div>
  )
}

export default Page

