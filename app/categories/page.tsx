import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ArrowUpDown, Filter } from "lucide-react"
import {DATA} from "@/data/data";
import Image from "next/image"
import Link from "next/link"

interface FilterProps{
  x: number;
  total: number;
}

export default function Page({x,total}:FilterProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Product Type Filter */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="text-base">Product Type</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Label className="flex items-center gap-3 font-normal cursor-pointer">
                      <Checkbox id="product-rifle" /> Air Rifle
                    </Label>
                    <Label className="flex items-center gap-3 font-normal cursor-pointer">
                      <Checkbox id="product-pistol" /> Air Pistol
                    </Label>
                    <Label className="flex items-center gap-3 font-normal cursor-pointer">
                      <Checkbox id="product-pallets" /> Pallets
                    </Label>
                    <Label className="flex items-center gap-3 font-normal cursor-pointer">
                      <Checkbox id="product-accessories" /> Accessories
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button variant="outline" className="w-full bg-transparent">
              Clear All Filters
            </Button>
          </div>

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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="shrink-0 bg-transparent">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[200px]" align="end">
                  <DropdownMenuRadioGroup value="featured">
                    <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">Customer Rating</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {DATA.map((item) => (
              <div key={item.id} className="group relative">
                <Link href={`/products/${decodeURIComponent(String(item.title)).replace(/\s+/g, '').toLowerCase()}`} className="absolute inset-0 z-10">
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
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.categories}</span>
                  </div>
                      <p className="text-lg font-semibold">&#8377;{item.price}</p>
                </div>
              </div>
                  ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
