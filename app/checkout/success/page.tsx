"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Package, Truck, Home, ChevronRight } from "lucide-react"

export default function CheckoutSuccessPage() {
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-16 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl rounded-lg border border-gray-700 bg-gray-800/50 p-8 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-500/20 p-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
          </div>

          <Badge variant="outline" className="mb-2 bg-green-900/20 text-green-400">
            Order Confirmed
          </Badge>
          <h1 className="mb-3 text-3xl font-bold text-white md:text-4xl">Thank You for Your Purchase!</h1>
          <p className="mb-6 text-gray-400">
            Your order has been received and is now being processed. You will receive a confirmation email shortly.
          </p>

          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-4">
            <div className="mb-4 flex justify-between">
              <span className="text-gray-400">Order Number:</span>
              <span className="font-medium text-white">{orderNumber}</span>
            </div>
            <div className="mb-4 flex justify-between">
              <span className="text-gray-400">Order Date:</span>
              <span className="font-medium text-white">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Method:</span>
              <span className="font-medium text-white">Credit Card (****1234)</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-4 text-lg font-medium text-white">Order Timeline</h3>
            <div className="relative">
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-700"></div>

              <div className="relative mb-8 flex items-center justify-center">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="absolute left-1/2 top-12 w-48 -translate-x-1/2 text-center">
                  <h4 className="font-medium text-white">Order Confirmed</h4>
                  <p className="text-sm text-gray-400">Just now</p>
                </div>
              </div>

              <div className="relative mb-8 flex items-center justify-center pt-8">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute left-1/2 top-20 w-48 -translate-x-1/2 text-center">
                  <h4 className="font-medium text-white">Processing Order</h4>
                  <p className="text-sm text-gray-400">Estimated: 1-2 days</p>
                </div>
              </div>

              <div className="relative mb-8 flex items-center justify-center pt-8">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute left-1/2 top-20 w-48 -translate-x-1/2 text-center">
                  <h4 className="font-medium text-white">Shipping</h4>
                  <p className="text-sm text-gray-400">Estimated: 3-5 days</p>
                </div>
              </div>

              <div className="relative flex items-center justify-center pt-8">
                <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">
                  <Home className="h-5 w-5 text-gray-400" />
                </div>
                <div className="absolute left-1/2 top-12 w-48 -translate-x-1/2 text-center">
                  <h4 className="font-medium text-white">Delivery</h4>
                  <p className="text-sm text-gray-400">Estimated: 5-7 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild className="bg-purple-700 hover:bg-purple-800">
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-purple-600 bg-transparent text-purple-400 hover:bg-purple-900/20"
            >
              <Link href="/account/orders">
                View Order Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
