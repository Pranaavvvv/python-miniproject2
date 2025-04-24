"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Eye, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const alreadyInCart = isInCart && isInCart(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (alreadyInCart) return

    setIsAddingToCart(true)

    // Simulate API call
    setTimeout(() => {
      addToCart(product, 1)
      setIsAddingToCart(false)
      setShowCheck(true)
      
      setTimeout(() => setShowCheck(false), 2000)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        variant: "success",
      })
    }, 600)
  }

  // Calculate price display information
  const originalPrice = product.discount > 0 
    ? (product.price * (1 + product.discount / 100)).toFixed(2)
    : null
  
  const discountAmount = originalPrice 
    ? `Save $${(originalPrice - product.price).toFixed(2)}`
    : null

  // Handle long product names
  const truncateName = (name) => {
    return name.length > 60 ? name.substring(0, 57) + '...' : name;
  }

  return (
    <Card
      className="product-card group relative overflow-hidden border border-gray-800 bg-gray-900/90 transition-all duration-300 hover:border-purple-500/70 hover:shadow-lg hover:shadow-purple-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <CardContent className="p-0">
          <div className="relative">
            {/* Image container with skeleton loader */}
            <div className="relative aspect-square overflow-hidden bg-gray-800">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-purple-500"></div>
                </div>
              )}
              <Image
                src={product.image || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                } ${isHovered ? "scale-110" : "scale-100"}`}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              
              {/* Image overlay gradient - Always visible but enhanced on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
                  isHovered ? "opacity-100" : "opacity-50"
                }`}
              ></div>
            </div>

            {/* Badges container */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-600/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  NEW
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-red-600/90 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            {/* Wishlist button with hover effect */}
            <Button
              variant="outline"
              size="icon"
              className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full border border-gray-700/50 bg-gray-800/70 text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-red-500 hover:bg-gray-800/90 hover:text-red-400 hover:shadow-md hover:shadow-red-500/20"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toast({
                  title: "Added to wishlist",
                  description: `${product.name} has been added to your wishlist`,
                  variant: "success",
                })
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>

            {/* Quick actions overlay - Fixed position at bottom of image */}
            <div
              className={`absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/80 px-3 py-2 backdrop-blur-sm transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                size="sm"
                className={`flex-1 mr-2 transition-all duration-300 ${
                  alreadyInCart
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-purple-700 hover:bg-purple-800"
                }`}
                onClick={handleAddToCart}
                disabled={isAddingToCart || alreadyInCart}
              >
                {isAddingToCart ? (
                  <>
                    <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Adding...
                  </>
                ) : showCheck || alreadyInCart ? (
                  <>
                    <Check className="mr-2 h-3 w-3" />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-3 w-3" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 bg-gray-800/50 text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500 hover:bg-gray-800/90"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content section - Always visible */}
          <div className="p-4">
            {/* Top info row */}
            <div className="flex justify-between items-center mb-2">
              {/* Rating stars with micro-interactions */}
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 transition-all duration-300 ${
                        i < product.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-600"
                      } ${isHovered && i < product.rating ? "scale-110" : ""}`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs font-medium text-gray-400">
                  ({product.reviewCount})
                </span>
              </div>

              {/* Product category */}
              <Badge variant="outline" className="border-purple-500/30 bg-purple-900/10 text-xs font-normal text-purple-400">
                {product.category}
              </Badge>
            </div>
            
            {/* Product name - ALWAYS VISIBLE with proper truncation */}
            <div className="relative group/tooltip">
              <h3 className="text-sm font-medium text-white transition-colors duration-300 hover:text-purple-400 line-clamp-2 min-h-[40px]">
                {truncateName(product.name)}
              </h3>
              
              {/* Tooltip for full product name */}
              {product.name.length > 60 && (
                <div className="absolute -top-2 left-0 w-full p-2 bg-gray-800 text-xs text-white rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                  {product.name}
                </div>
              )}
            </div>
            
            {/* Price display */}
            <div className="mt-2 flex items-end justify-between">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  {originalPrice && (
                    <span className="ml-2 text-xs text-gray-500 line-through">
                      ${originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Show discount amount if applicable */}
                {discountAmount && (
                  <span className="text-xs font-medium text-green-500">
                    {discountAmount}
                  </span>
                )}
              </div>
              
              {/* Stock indicator */}
              {product.stock > 0 ? (
                <Badge className="bg-green-600/20 text-green-400 text-xs">In Stock</Badge>
              ) : (
                <Badge className="bg-red-600/20 text-red-400 text-xs">Out of Stock</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}