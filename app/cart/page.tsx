"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, ChevronRight, CreditCard, ShieldCheck, Truck, Plus, Minus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax - discount

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    setTimeout(() => {
      if (promoCode.toUpperCase() === "DISCOUNT20") {
        const discountAmount = subtotal * 0.2
        setDiscount(discountAmount)
        toast({
          title: "Promo code applied",
          description: "20% discount has been applied to your order",
          variant: "success",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired",
          variant: "destructive",
        })
      }

      setIsApplyingPromo(false)
    }, 800)
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)

    // Simulate API call
    setTimeout(() => {
      setIsCheckingOut(false)
      clearCart()
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
        variant: "success",
      })
      // Redirect to success page
      window.location.href = "/checkout/success"
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-16 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
            Your Cart
          </Badge>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl">Shopping Cart</h1>
          <p className="mx-auto max-w-2xl text-gray-400">Review your items and proceed to checkout</p>
        </motion.div>

        {cart.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="mb-4 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-400 hover:text-white">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col rounded-lg border border-gray-700 bg-gray-900 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="relative mb-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md sm:mb-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=96&width=96"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col sm:ml-4">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-white">{item.name}</h3>
                            <p className="text-sm text-gray-400">
                              {item.category} • {item.color || "Black"} • {item.size || "M"}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="h-8 w-8 text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-md border border-gray-700 bg-gray-800">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex h-8 w-10 items-center justify-center border-x border-gray-700 text-sm text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-white"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</span>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">Have a Promo Code?</h2>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleApplyPromo}
                    disabled={isApplyingPromo || !promoCode}
                    className="bg-purple-700 hover:bg-purple-800"
                  >
                    {isApplyingPromo ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Applying...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-xs text-gray-400">Try "DISCOUNT20" for 20% off your order</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="sticky top-24 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                <h2 className="mb-4 text-xl font-semibold text-white">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax (7%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-4 bg-gray-700" />

                <div className="mb-6 flex justify-between">
                  <span className="text-lg font-medium text-gray-300">Total</span>
                  <span className="text-xl font-bold text-white">${total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-purple-700 hover:bg-purple-800"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <ShieldCheck className="h-4 w-4 text-gray-500" />
                    <span>100% purchase protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span>Free shipping on orders over $100</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-md flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50 p-8 text-center"
          >
            <ShoppingCart className="mb-4 h-16 w-16 text-gray-500" />
            <h2 className="mb-2 text-2xl font-semibold text-white">Your cart is empty</h2>
            <p className="mb-6 text-gray-400">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="bg-purple-700 hover:bg-purple-800">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
