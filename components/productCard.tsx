"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import type { ProductProps } from "@/types/product";

export function ProductCard({ title, img, price, categories, id, className }: ProductProps) {
  return (
    <CardContainer className={`inter-var ${className}`}>
      <CardBody className="bg-black relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-white dark:border-white/[0.2] border-white/[0.2] w-[20rem] h-[30rem] rounded-xl p-6 border-2">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
        >
          {title}
        </CardItem>
    {categories.map((category, index) => (
      <Badge key={index} variant="outline" className="text-white">
        <Link href={`/categories/${decodeURIComponent(String(category)).replace(/\s+/g, '').toLowerCase()}`}>{category}</Link>
      </Badge>
    ))}
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={img[0]}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-15">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-md font-bold dark:text-white"
          >
         &#8377;{price} 
          </CardItem>
          <CardItem
            translateZ={20}
            as="a"
            href={`/products/${id}`}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer"
          >
            Buy Now →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
