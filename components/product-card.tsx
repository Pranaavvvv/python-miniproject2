"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Eye, Check, Sparkles, Clock, Truck, Shield } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)
  const alreadyInCart = isInCart && isInCart(product.id)

  // Calculate price display information
  const originalPrice = product.discount > 0 ? (product.price * (1 + product.discount / 100)).toFixed(2) : null

  const discountAmount = originalPrice ? `Save $${(originalPrice - product.price).toFixed(2)}` : null

  // Handle long product names
  const truncateName = (name) => {
    return name.length > 60 ? name.substring(0, 57) + "..." : name
  }

  // 3D tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setRotation({ x: rotateX, y: rotateY })
  }

  const resetRotation = () => {
    setRotation({ x: 0, y: 0 })
  }

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

      // Create confetti effect
      createConfetti()

      setTimeout(() => setShowCheck(false), 2000)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        variant: "success",
      })
    }, 600)
  }

  // Confetti effect when adding to cart
  const createConfetti = () => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.className = "absolute w-2 h-2 rounded-full pointer-events-none"
      particle.style.backgroundColor = getRandomColor()
      particle.style.position = "fixed"
      particle.style.zIndex = "9999"
      particle.style.left = `${centerX}px`
      particle.style.top = `${centerY}px`

      document.body.appendChild(particle)

      const angle = Math.random() * Math.PI * 2
      const velocity = 5 + Math.random() * 10
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      let x = 0
      let y = 0

      const animate = () => {
        x += vx
        y += vy + 0.5 // Add gravity

        particle.style.transform = `translate(${x}px, ${y}px) scale(${1 - Math.min(1, (x * x + y * y) / 10000)})`

        if (Math.abs(x) < 500 && Math.abs(y) < 500) {
          requestAnimationFrame(animate)
        } else {
          particle.remove()
        }
      }

      requestAnimationFrame(animate)
    }
  }

  const getRandomColor = () => {
    const colors = ["#FF5E5B", "#D8D8F6", "#7FC29B", "#FFC145", "#A239CA", "#4717F6"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false)
        resetRotation()
      }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: "transform 0.2s ease-out",
      }}
      className="h-full"
    >
      <Card
        className="product-card group relative h-full overflow-hidden border-0 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 20px 25px -5px rgba(139, 92, 246, 0.15), 0 0 10px 0 rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(139, 92, 246, 0.2)`
            : `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
        }}
      >
        <Link href={`/products/${product.id}`} className="block h-full">
          <CardContent className="p-0">
            <div className="relative">
              {/* Image container with skeleton loader */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-700 border-t-purple-500"></div>
                  </div>
                )}
                <Image
                  src={product.image || "/placeholder.svg?height=400&width=400"}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  } ${isHovered ? "scale-110 filter-none" : "scale-100 filter brightness-[0.95] saturate-[1.05]"}`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />

                {/* Animated gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 ${
                    isHovered ? "opacity-70" : "opacity-60"
                  }`}
                  style={{
                    background: isHovered
                      ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)",
                  }}
                ></div>

                {/* Animated shine effect */}
                {isHovered && (
                  <div
                    className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent 45%, rgba(255, 255, 255, 0.8) 50%, transparent 55%)",
                      backgroundSize: "200% 200%",
                      animation: "shine 1.5s ease-in-out",
                    }}
                  ></div>
                )}
              </div>

              {/* Badges container with animated entrance */}
              <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                <AnimatePresence>
                  {product.isNew && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-2.5 py-1 text-xs font-medium text-white shadow-lg shadow-emerald-900/20 backdrop-blur-sm">
                        <Sparkles className="mr-1 h-3 w-3" /> NEW
                      </Badge>
                    </motion.div>
                  )}
                  {product.discount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Badge className="bg-gradient-to-r from-red-600 to-pink-500 px-2.5 py-1 text-xs font-medium text-white shadow-lg shadow-red-900/20 backdrop-blur-sm">
                        -{product.discount}% OFF
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist button with animated heart effect */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="absolute right-3 top-3 z-10">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border border-gray-700/50 bg-gray-800/80 text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-red-500/70 hover:bg-gray-800/90 hover:text-red-400 hover:shadow-md hover:shadow-red-500/20"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    // Create heart animation
                    const button = e.currentTarget
                    const rect = button.getBoundingClientRect()
                    const heart = document.createElement("div")
                    heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
                    heart.className = "absolute pointer-events-none z-50"
                    heart.style.left = `${rect.left + rect.width / 2 - 8}px`
                    heart.style.top = `${rect.top + rect.height / 2 - 8}px`
                    heart.style.position = "fixed"
                    document.body.appendChild(heart)

                    const animation = heart.animate(
                      [
                        { transform: "scale(1)", opacity: 1 },
                        { transform: "scale(2) translateY(-40px)", opacity: 0 },
                      ],
                      {
                        duration: 1000,
                        easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
                      },
                    )

                    animation.onfinish = () => heart.remove()

                    toast({
                      title: "Added to wishlist",
                      description: `${product.name} has been added to your wishlist`,
                      variant: "success",
                    })
                  }}
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Quick actions overlay with staggered animation */}
              <div
                className={`absolute bottom-0 left-0 right-0 flex justify-between items-center bg-black/80 px-3 py-3 backdrop-blur-md transition-all duration-500 ${
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
              >
                <motion.div className="flex-1 mr-2" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="sm"
                    className={`w-full transition-all duration-300 ${
                      alreadyInCart
                        ? "bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
                        : "bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600"
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
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 bg-gray-800/70 text-white backdrop-blur-sm transition-all duration-300 hover:border-purple-500/70 hover:bg-gray-800/90 hover:text-purple-300"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setShowDetails(!showDetails)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>

              {/* Quick view details panel */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 z-20 bg-gray-900/95 p-4 backdrop-blur-md overflow-auto"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 h-7 w-7 rounded-full p-0 text-gray-400 hover:bg-gray-800 hover:text-white"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setShowDetails(false)
                      }}
                    >
                      ✕
                    </Button>

                    <div className="space-y-4 text-sm">
                      <h3 className="text-base font-medium text-white">{product.name}</h3>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-400">
                          <Clock className="mr-2 h-4 w-4 text-purple-400" />
                          <span>Delivery: 2-4 business days</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Truck className="mr-2 h-4 w-4 text-purple-400" />
                          <span>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Shield className="mr-2 h-4 w-4 text-purple-400" />
                          <span>30-day money-back guarantee</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">Description</h4>
                        <p className="text-gray-300">
                          {product.description ||
                            "Experience premium quality with this exceptional product, designed for performance and style."}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Button
                          className="w-full bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setShowDetails(false)
                          }}
                        >
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content section with improved styling */}
            <div className="p-4">
              {/* Top info row */}
              <div className="flex justify-between items-center mb-2">
                {/* Rating stars with enhanced micro-interactions */}
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 transition-all duration-300 ${
                          i < product.rating ? "fill-yellow-400 text-yellow-400 drop-shadow-sm" : "text-gray-600"
                        } ${isHovered && i < product.rating ? "scale-110 rotate-[8deg]" : ""}`}
                        style={{
                          transformOrigin: "center",
                          transitionDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="ml-1.5 text-xs font-medium text-gray-400">({product.reviewCount})</span>
                </div>

                {/* Product category with gradient */}
                <Badge
                  variant="outline"
                  className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-violet-900/20 text-xs font-normal text-purple-300"
                >
                  {product.category}
                </Badge>
              </div>

              {/* Product name with hover effect */}
              <div className="relative group/tooltip">
                <h3 className="text-sm font-medium text-white transition-colors duration-300 group-hover:text-purple-300 line-clamp-2 min-h-[40px]">
                  {truncateName(product.name)}
                </h3>

                {/* Enhanced tooltip for full product name */}
                {product.name.length > 60 && (
                  <div className="absolute -top-2 left-0 w-full p-2 bg-gray-800/95 text-xs text-white rounded shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 z-20 pointer-events-none backdrop-blur-sm border border-purple-500/20">
                    {product.name}
                  </div>
                )}
              </div>

              {/* Price display with improved styling */}
              <div className="mt-3 flex items-end justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                      ${product.price.toFixed(2)}
                    </span>
                    {originalPrice && <span className="ml-2 text-xs text-gray-500 line-through">${originalPrice}</span>}
                  </div>

                  {/* Show discount amount with animation if applicable */}
                  {discountAmount && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs font-medium text-green-400"
                    >
                      {discountAmount}
                    </motion.span>
                  )}
                </div>

                {/* Stock indicator with improved styling */}
                {product.stock > 0 ? (
                  <Badge className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-400 text-xs border border-green-500/20">
                    In Stock
                  </Badge>
                ) : (
                  <Badge className="bg-gradient-to-r from-red-900/30 to-pink-900/30 text-red-400 text-xs border border-red-500/20">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </motion.div>
  )
}
