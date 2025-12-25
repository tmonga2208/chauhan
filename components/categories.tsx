"use client"
import { useEffect, useState } from 'react';
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import CatCarouselSkeleton from './product-cat';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-explicit-any

function CategoriesComp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className='flex justify-center items-center'><CatCarouselSkeleton/></div>;

  return (
      <div>
          <p className=" ml-4 text-6xl font-black mb-4  flex justify-center items-center bg-clip-text py-8 text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Shop By Categories</p>
          <BentoGrid className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center">
      {categories.map((item, i) => (
        <Link key={i} href={`/categories/${item.title.toLowerCase().replace(/\s+/g, '')}`}>
            <BentoGridItem
              className="flex items-center justify-center w-[20rem] md:w-auto"
              title={item.title}
              header={item.header}
            />
          </Link>
      ))}
    </BentoGrid>
          
    </div>
  )
}

export default CategoriesComp

