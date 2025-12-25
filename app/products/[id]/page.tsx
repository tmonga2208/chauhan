"use client"
import { useParams } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ProductCard } from '@/components/productCard';
import { motion } from "framer-motion"
import AutoScroll from 'embla-carousel-auto-scroll';
import Footer from '@/components/footer';
import type { ProductProps } from '@/types/product';
import ProductPageSkeleton from '@/components/product-skeleton';
import GetStartedButton from '@/components/get-started';

function Page() {
    const plugin = useRef(
        AutoScroll({
            speed: 1,
            startDelay: 1000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
        }),
    )
    const { id } = useParams();
    const [product, setProduct] = useState<ProductProps | null>(null);
    const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then((res) => {
                if (!res.ok) {
                    console.error("Failed to fetch product", res.status);
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setProduct(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }, [id]);

    if (loading || !product) return <div><ProductPageSkeleton /></div>;

    return (
        <div className='bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a]'>
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left: Scrollable Images */}
                <div className="flex-1 flex flex-col justify-start items-center p-8 overflow-y-scroll no-scrollbar max-h-screen">
                    {Array.isArray(product.img) && product.img?.map((img, idx) => (
                        <Image
                            key={idx}
                            src={img}
                            alt={product.title}
                            width={800}
                            height={400}
                            className="rounded-2xl object-contain shadow-lg mb-4"
                        />
                    ))}
                </div>
                {/* Right: Sticky Info/Accordion */}
                <div className="flex-1 flex flex-col items-start justify-start p-8 max-w-xl text-white">
                    <div className="w-full sticky top-0">
                        <div className="mb-8">
                            <h1 className="text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">{product.title}</h1>
                            <div className="flex gap-2 mb-4">
                                {product.categories?.map((cat) => (
                                    <Badge key={cat} variant="outline" className="text-white px-3 py-1 rounded-full text-xs">{cat}</Badge>
                                ))}
                            </div>
                            <GetStartedButton price={`Order - ₹${product.price.toLocaleString()}`} />
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="year">
                                <AccordionTrigger>Year</AccordionTrigger>
                                <AccordionContent>{product.year}</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="model">
                                <AccordionTrigger>Model</AccordionTrigger>
                                <AccordionContent>{product.model}</AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="included">
                                <AccordionTrigger>What&apos;s Included</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="list-disc ml-4">
                                        {product.included && product.included?.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
            <section>
                <p className=" ml-4 my-4 py-4 text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-white drop-shadow-lg">Looking For More?</p>
                <motion.div initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }} className="flex  justify-center">
                    <Carousel opts={{ align: "start", loop: true, }} plugins={[plugin.current]} className="w-xs sm:w-lg md:w-2xl lg:w-5xl overflow-hidden">
                        <CarouselContent className="">
                            {allProducts.map((item, idx) => (
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
            </section>
            <Footer />
        </div>
    )
}

export default Page