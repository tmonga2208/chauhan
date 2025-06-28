"use client"

import { ShoppingCart, X, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/useCart"
import Image from "next/image"
import { handleCheckout } from "@/lib/checkout"
import Script from "next/script"
import { useEffect, useState } from "react"

export function CartDropdown() {
  const { state, removeItem, updateQuantity, toggleCart } = useCart()
  const [currency, setCurrency] = useState('INR');
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price) * item.quantity, 0)
  useEffect(() => { 
    const newCurrency = localStorage.getItem("region") === 'IN' ? '₹' : '$';
    setCurrency(newCurrency);
  }, []);

  return (
    <Sheet open={state.isOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Cart">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart ({totalItems} items)</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {state.items.map((item) => {
            return (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <div className="relative w-20 h-20">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
        {state.items.length > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="tm-cart font-medium">{currency}{totalPrice.toFixed(2)}</span>
            </div>
            <form onSubmit={(e) => handleCheckout(e, totalPrice, 'INR', 'Customer Name', 'customer@example.com')}>
              <Button type="submit" className="w-full">Checkout</Button>
            </form>
            <Script id="razorpay-checkout-js" src="https://checkout.razorpay.com/v1/checkout.js"/>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

