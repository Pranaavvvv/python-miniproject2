"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Check,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  ChevronRight,
  Clock,
  Gift,
  Shield,
  Truck,
} from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Custom shimmer effect component for image loading
const ShimmerEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="relative w-full h-full">
      {/* Base shimmer background with improved gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Multiple animated shimmer layers for depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-purple-600/20 to-transparent"></div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 translate-x-full animate-[shimmer_2.5s_infinite_0.5s] bg-gradient-to-r from-transparent via-blue-600/10 to-transparent"></div>
      </div>

      {/* Subtle pulsing glow effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 to-transparent animate-pulse"></div>
    </div>
  </div>
)

// Enhanced rating stars component with animations
const RatingStars = ({ rating, reviewCount, isHovered }) => {
  return (
    <div className="flex items-center">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < Math.floor(rating)
          const isPartial = i === Math.floor(rating) && rating % 1 > 0

          return (
            <div key={i} className="relative w-3 h-3">
              <Star
                className={cn(
                  "h-3 w-3 transition-all duration-300",
                  isHovered && isFilled ? "scale-110" : "",
                  isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-600",
                )}
              />

              {isPartial && (
                <div className="absolute top-0 left-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
              )}

              {/* Animated glow effect on hover */}
              {isFilled && isHovered && (
                <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-sm animate-pulse"></div>
              )}
            </div>
          )
        })}
      </div>
      <span
        className={cn(
          "ml-1 text-xs font-medium transition-colors duration-300",
          isHovered ? "text-gray-100" : "text-gray-400",
        )}
      >
        ({reviewCount || 0})
      </span>
    </div>
  )
}

// Enhanced featured badge with advanced animations
const FeaturedBadge = ({ isHovered }) => (
  <div
    className={cn(
      "absolute top-4 z-10 overflow-hidden transition-all duration-500",
      isHovered ? "right-[-30px]" : "right-[-80px]",
    )}
  >
    <Badge className="bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg rotate-45 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
      <div className="flex items-center">
        <div className="mr-1 animate-spin-slow">
          <Sparkles className="h-3 w-3" />
        </div>
        FEATURED
      </div>
    </Badge>
  </div>
)

// Enhanced price display with advanced animations
const PriceDisplay = ({ price, originalPrice, discount }) => {
  const discountAmount = originalPrice ? `Save $${(originalPrice - price).toFixed(2)}` : null

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="relative text-lg font-bold text-white group-hover/card:text-purple-300 transition-colors duration-300 hover:scale-105">
          ${price.toFixed(2)}
          {/* Enhanced animated underline with gradient */}
          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 group-hover/card:w-full transition-all duration-300"></span>
        </span>

        {originalPrice && (
          <span className="ml-2 text-xs text-gray-500 line-through relative">
            ${originalPrice}
            {/* Animated strike-through effect */}
            <span className="absolute left-0 top-1/2 h-[1px] w-full bg-red-500/70"></span>
          </span>
        )}
      </div>

      {discountAmount && (
        <div className="text-xs font-medium text-green-500 flex items-center animate-fade-in">
          <div className="mr-1 animate-bounce-subtle">
            <Zap className="h-3 w-3" />
          </div>
          {discountAmount}
        </div>
      )}
    </div>
  )
}

// Enhanced hover card effect with advanced animations and glowing borders
const HoverCardEffect = ({ children, isHovered }) => (
  <div className="absolute inset-0 pointer-events-none">
    {/* Top and bottom borders with improved gradient and animation */}
    <div
      className={cn(
        "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-all duration-500",
        isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
      )}
    ></div>
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-500 delay-100",
        isHovered ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0",
      )}
    ></div>

    {/* Left and right borders with improved gradient and animation */}
    <div
      className={cn(
        "absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-violet-500 to-transparent transition-all duration-500 delay-200",
        isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
      )}
    ></div>
    <div
      className={cn(
        "absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-violet-500 to-transparent transition-all duration-500 delay-300",
        isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0",
      )}
    ></div>

    {/* Enhanced corner glows with animated pulsing */}
    <div
      className={cn(
        "absolute top-0 left-0 h-10 w-10 bg-gradient-radial from-purple-500 to-transparent blur-md rounded-full transition-opacity duration-300",
        isHovered ? "opacity-30 animate-pulse" : "opacity-0",
      )}
    ></div>
    <div
      className={cn(
        "absolute bottom-0 right-0 h-10 w-10 bg-gradient-radial from-blue-500 to-transparent blur-md rounded-full transition-opacity duration-300 delay-500",
        isHovered ? "opacity-30 animate-pulse" : "opacity-0",
      )}
    ></div>

    {/* New: Diagonal corner glows */}
    <div
      className={cn(
        "absolute top-0 right-0 h-10 w-10 bg-gradient-radial from-violet-500 to-transparent blur-md rounded-full transition-opacity duration-300 delay-250",
        isHovered ? "opacity-20 animate-pulse-slow" : "opacity-0",
      )}
    ></div>
    <div
      className={cn(
        "absolute bottom-0 left-0 h-10 w-10 bg-gradient-radial from-violet-500 to-transparent blur-md rounded-full transition-opacity duration-300 delay-750",
        isHovered ? "opacity-20 animate-pulse-slow" : "opacity-0",
      )}
    ></div>

    {children}
  </div>
)

// Enhanced quick action button with advanced animations and effects
const QuickActionButton = ({ icon: Icon, label, onClick, className, disabled, loading, success }) => (
  <Button
    className={cn("group/button relative overflow-hidden transition-all duration-300", className)}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {/* Enhanced background animation with multiple layers */}
    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></span>
    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -translate-x-full group-hover/button:animate-shimmer-slow"></span>

    {/* Content with enhanced icon and label animations */}
    <span className="relative flex items-center justify-center">
      {loading ? (
        <div className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
      ) : success ? (
        <div className="mr-2 h-4 w-4 animate-scale-in">
          <Check className="h-4 w-4" />
        </div>
      ) : (
        <div className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110 group-hover/button:animate-wiggle">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <span className="group-hover/button:animate-bounce-subtle">{label}</span>
    </span>
  </Button>
)

// New: Animated particle background component
const ParticleBackground = ({ isActive }) => {
  // Hardcoded particles for performance and reliability
  const particles = [
    { left: "10%", top: "20%", delay: 0 },
    { left: "30%", top: "50%", delay: 0.5 },
    { left: "50%", top: "30%", delay: 1 },
    { left: "70%", top: "70%", delay: 1.5 },
    { left: "90%", top: "40%", delay: 2 },
    { left: "20%", top: "80%", delay: 2.5 },
    { left: "40%", top: "10%", delay: 3 },
    { left: "60%", top: "60%", delay: 3.5 },
    { left: "80%", top: "20%", delay: 4 },
    { left: "25%", top: "35%", delay: 4.5 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full bg-purple-500/30 transition-all duration-1000",
            isActive ? "opacity-100 animate-float-up" : "opacity-0",
          )}
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

// New: Enhanced stock indicator with animations
const StockIndicator = ({ stock, isHovered }) => {
  if (stock > 10) {
    return (
      <Badge className="bg-green-600/20 text-green-400 text-xs border border-green-500/20 flex items-center gap-1">
        <span className={cn("h-1.5 w-1.5 rounded-full bg-green-500", isHovered && "animate-pulse")}></span>
        In Stock
      </Badge>
    )
  } else if (stock > 0) {
    return (
      <Badge className="bg-amber-600/20 text-amber-400 text-xs border border-amber-500/20 flex items-center gap-1">
        <span className={cn("h-1.5 w-1.5 rounded-full bg-amber-500", isHovered && "animate-pulse-fast")}></span>
        Low Stock ({stock} left)
      </Badge>
    )
  } else {
    return (
      <Badge className="bg-red-600/20 text-red-400 text-xs border border-red-500/20 flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
        Out of Stock
      </Badge>
    )
  }
}

// New: Enhanced category badge with animations
const CategoryBadge = ({ category, isHovered }) => {
  // Map categories to colors (hardcoded for reliability)
  const getCategoryColor = (cat) => {
    const lowerCat = cat.toLowerCase()
    if (lowerCat === "electronics") return "purple"
    if (lowerCat === "clothing") return "blue"
    if (lowerCat === "books") return "emerald"
    if (lowerCat === "home") return "amber"
    return "violet" // default
  }

  const getCategoryIcon = (cat) => {
    const lowerCat = cat.toLowerCase()
    if (lowerCat === "electronics") return <Zap className="h-3 w-3" />
    if (lowerCat === "clothing") return <TrendingUp className="h-3 w-3" />
    if (lowerCat === "books") return <Eye className="h-3 w-3" />
    if (lowerCat === "home") return <Heart className="h-3 w-3" />
    return <Sparkles className="h-3 w-3" /> // default
  }

  const color = getCategoryColor(category)

  return (
    <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
      <Badge
        variant="outline"
        className={cn(
          "text-xs font-normal transition-all duration-300 flex items-center gap-1",
          color === "purple" &&
            "border-purple-500/30 bg-purple-900/10 text-purple-400 group-hover/card:border-purple-500/50 group-hover/card:bg-purple-900/20",
          color === "blue" &&
            "border-blue-500/30 bg-blue-900/10 text-blue-400 group-hover/card:border-blue-500/50 group-hover/card:bg-blue-900/20",
          color === "emerald" &&
            "border-emerald-500/30 bg-emerald-900/10 text-emerald-400 group-hover/card:border-emerald-500/50 group-hover/card:bg-emerald-900/20",
          color === "amber" &&
            "border-amber-500/30 bg-amber-900/10 text-amber-400 group-hover/card:border-amber-500/50 group-hover/card:bg-amber-900/20",
          color === "violet" &&
            "border-violet-500/30 bg-violet-900/10 text-violet-400 group-hover/card:border-violet-500/50 group-hover/card:bg-violet-900/20",
        )}
      >
        <div className={cn("transition-transform duration-300", isHovered && "animate-wiggle")}>
          {getCategoryIcon(category)}
        </div>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    </div>
  )
}

// New: Product highlights component with animations
const ProductHighlights = ({ product, isVisible }) => {
  // Hardcoded highlights for reliability
  const getHighlights = (product) => {
    const highlights = []

    if (product.freeShipping) {
      highlights.push({
        icon: <Truck className="h-3 w-3 text-green-500" />,
        text: "Free worldwide shipping",
        color: "text-green-400",
      })
    }

    if (product.warranty) {
      highlights.push({
        icon: <Shield className="h-3 w-3 text-blue-500" />,
        text: `${product.warranty} warranty included`,
        color: "text-blue-400",
      })
    }

    if (product.rating > 4.5) {
      highlights.push({
        icon: <Award className="h-3 w-3 text-amber-500" />,
        text: "Top-rated product",
        color: "text-amber-400",
      })
    }

    if (product.discount > 20) {
      highlights.push({
        icon: <Zap className="h-3 w-3 text-purple-500" />,
        text: "Best value deal",
        color: "text-purple-400",
      })
    }

    if (product.isNew) {
      highlights.push({
        icon: <Sparkles className="h-3 w-3 text-indigo-500" />,
        text: "New arrival",
        color: "text-indigo-400",
      })
    }

    if (product.deliveryTime) {
      highlights.push({
        icon: <Clock className="h-3 w-3 text-cyan-500" />,
        text: `Delivery in ${product.deliveryTime}`,
        color: "text-cyan-400",
      })
    }

    if (product.giftEligible) {
      highlights.push({
        icon: <Gift className="h-3 w-3 text-pink-500" />,
        text: "Gift wrapping available",
        color: "text-pink-400",
      })
    }

    return highlights.slice(0, 3) // Limit to 3 highlights
  }

  const highlights = getHighlights(product)

  return (
    <div
      className={cn(
        "mt-3 pt-2 border-t border-gray-800/50 transition-all duration-300 overflow-hidden",
        isVisible ? "opacity-100 max-h-24" : "opacity-0 max-h-0",
      )}
    >
      <ul className="text-xs text-gray-400">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className={cn("flex items-center gap-1 mb-1", highlight.color, "animate-slide-in-right")}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {highlight.icon}
            {highlight.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

// New: 3D card tilt effect (simplified and hardcoded for reliability)
const Card3DTiltEffect = ({ isHovered, children }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-transform duration-300",
        isHovered ? "transform rotate-x-1 rotate-y-2" : "",
      )}
    >
      {children}
    </div>
  )
}

export default function FeaturedProducts({ products }) {
  const { addToCart, isInCart } = useCart()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" })
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredProductId, setHoveredProductId] = useState(null)
  const [activeFilters, setActiveFilters] = useState([])
  const [sortOption, setSortOption] = useState("featured")

  // State for add to cart button
  const [addingToCart, setAddingToCart] = useState({})
  const [showCheckMark, setShowCheckMark] = useState({})

  // Get unique categories from products
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  // Filter products based on selected category and active filters
  let filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  // Apply additional filters
  if (activeFilters.includes("inStock")) {
    filteredProducts = filteredProducts.filter((product) => product.stock > 0)
  }
  if (activeFilters.includes("onSale")) {
    filteredProducts = filteredProducts.filter((product) => product.discount > 0)
  }
  if (activeFilters.includes("topRated")) {
    filteredProducts = filteredProducts.filter((product) => product.rating >= 4.5)
  }

  // Sort products
  if (sortOption === "priceAsc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortOption === "priceDesc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortOption === "newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  } else if (sortOption === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  }
  // Default is "featured" which uses the original order

  // Handle truncation of product names
  const truncateName = (name) => {
    return name.length > 60 ? name.substring(0, 57) + "..." : name
  }

  // Get trending and featured products
  const trendingProducts = products
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 3)

  // Toggle filter function
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter((f) => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCart && isInCart(product.id)) return

    setAddingToCart((prevState) => ({ ...prevState, [product.id]: true }))

    // Simulate API call
    setTimeout(() => {
      addToCart(product, 1)
      setAddingToCart((prevState) => ({ ...prevState, [product.id]: false }))
      setShowCheckMark((prevState) => ({ ...prevState, [product.id]: true }))

      setTimeout(() => setShowCheckMark((prevState) => ({ ...prevState, [product.id]: false })), 2000)

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
        variant: "success",
      })
    }, 600)
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-12 md:py-16 lg:py-24">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient background with enhanced colors */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-indigo-900/10 to-transparent"></div>

        {/* Animated grid lines with subtle movement */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-movement"></div>
        </div>

        {/* Floating orbs in background (hardcoded for reliability) */}
        <div className="absolute left-[20%] top-[30%] w-[200px] h-[200px] rounded-full bg-gradient-radial from-purple-500/10 to-transparent blur-xl animate-float-1"></div>
        <div className="absolute left-[70%] top-[20%] w-[300px] h-[300px] rounded-full bg-gradient-radial from-blue-500/10 to-transparent blur-xl animate-float-2"></div>
        <div className="absolute left-[40%] top-[70%] w-[250px] h-[250px] rounded-full bg-gradient-radial from-violet-500/10 to-transparent blur-xl animate-float-3"></div>
        <div className="absolute left-[80%] top-[60%] w-[180px] h-[180px] rounded-full bg-gradient-radial from-indigo-500/10 to-transparent blur-xl animate-float-4"></div>
        <div className="absolute left-[10%] top-[50%] w-[220px] h-[220px] rounded-full bg-gradient-radial from-fuchsia-500/10 to-transparent blur-xl animate-float-5"></div>
      </div>

      {/* Section header with trending products feature */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center">
                <span className="relative">
                  Featured Products
                  {/* Enhanced animated underline with gradient */}
                  <span className="absolute -bottom-1 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 animate-expand-width"></span>
                </span>
                <span className="ml-2 animate-spin-slow">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </span>
              </h2>
              <p className="text-gray-400 max-w-lg">
                Discover our collection of premium products, carefully selected for their exceptional quality and
                design.
              </p>
            </div>

            {/* Enhanced trending products showcase with animations */}
            <div className="mt-4 sm:mt-0">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="animate-bounce-subtle">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                </span>
                <span className="text-sm font-medium text-yellow-500">Trending Now</span>
                <div className="flex -space-x-3">
                  {trendingProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      className="relative h-8 w-8 rounded-full border-2 border-gray-800 overflow-hidden hover:scale-115 hover:z-10 transition-all duration-300"
                      style={{ zIndex: trendingProducts.length - idx }}
                    >
                      <Image
                        src={product.image || "/placeholder.svg?height=40&width=40"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  ))}
                  <div className="hover:scale-115 hover:z-10 active:scale-95 transition-all duration-300">
                    <Link
                      href="/trending"
                      className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-medium hover:bg-yellow-500/20 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced filtering and sorting controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Category filtering with enhanced animations */}
            <motion.div
              className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800 md:flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap hover:scale-105 active:scale-95",
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 via-violet-600 to-blue-600 text-white shadow-md shadow-purple-500/20"
                      : "bg-gray-800/80 text-gray-300 hover:bg-gray-700/80",
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.button>
              ))}
            </motion.div>

            {/* New: Advanced filtering and sorting options */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Filter buttons */}
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700",
                  activeFilters.includes("inStock") && "border-green-500/50 bg-green-900/20 text-green-400",
                )}
                onClick={() => toggleFilter("inStock")}
              >
                <Check
                  className={cn("mr-1 h-4 w-4", activeFilters.includes("inStock") ? "opacity-100" : "opacity-0")}
                />
                In Stock
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700",
                  activeFilters.includes("onSale") && "border-red-500/50 bg-red-900/20 text-red-400",
                )}
                onClick={() => toggleFilter("onSale")}
              >
                <Check className={cn("mr-1 h-4 w-4", activeFilters.includes("onSale") ? "opacity-100" : "opacity-0")} />
                On Sale
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-gray-700 bg-gray-800/50 text-gray-300 hover:bg-gray-700",
                  activeFilters.includes("topRated") && "border-yellow-500/50 bg-yellow-900/20 text-yellow-400",
                )}
                onClick={() => toggleFilter("topRated")}
              >
                <Check
                  className={cn("mr-1 h-4 w-4", activeFilters.includes("topRated") ? "opacity-100" : "opacity-0")}
                />
                Top Rated
              </Button>

              {/* Sort dropdown */}
              <select
                className="px-3 py-1 text-sm rounded-md border border-gray-700 bg-gray-800/50 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </motion.div>
          </div>
        </div>

        {/* Products grid with enhanced animations */}
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${activeFilters.join("-")}-${sortOption}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            >
              {filteredProducts.map((product) => {
                const alreadyInCart = isInCart && isInCart(product.id)
                const isHovered = hoveredProductId === product.id
                const isLoading = addingToCart[product.id] || false
                const showCheck = showCheckMark[product.id] || false

                // Calculate price display information
                const originalPrice =
                  product.discount > 0 ? (product.price * (1 + product.discount / 100)).toFixed(2) : null

                // Featured product logic (example criteria)
                const isFeatured = product.rating >= 4.7 && product.reviewCount > 50

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="group/card relative"
                  >
                    {/* Particle background effect on hover */}
                    <ParticleBackground isActive={isHovered} />

                    <Card
                      className="product-card relative overflow-hidden border border-gray-800 bg-gray-900/90 transition-all duration-500 hover:border-purple-500/70 hover:shadow-xl hover:shadow-purple-500/20 h-full"
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                    >
                      {/* Enhanced hover card effect with glowing borders */}
                      <HoverCardEffect isHovered={isHovered} />

                      {/* 3D card tilt effect */}
                      <Card3DTiltEffect isHovered={isHovered} />

                      {/* Featured badge if applicable */}
                      {isFeatured && <FeaturedBadge isHovered={isHovered} />}

                      <Link href={`/products/${product.id}`} className="block h-full">
                        <CardContent className="p-0">
                          <div className="relative">
                            {/* Image container with advanced loading effects */}
                            <div className="relative aspect-square overflow-hidden bg-gray-800">
                              <ShimmerEffect />

                              {/* Advanced image zoom and parallax effect */}
                              <div
                                className={cn(
                                  "absolute inset-0 transition-all duration-500",
                                  isHovered && "scale-110 -translate-y-2",
                                )}
                              >
                                <Image
                                  src={product.image || "/placeholder.svg?height=400&width=400"}
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-all duration-700"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority
                                />
                              </div>

                              {/* Multiple layered image overlays for depth */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>

                              {/* Animated subtle vignette on hover */}
                              <div
                                className={cn(
                                  "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,black_100%)] transition-opacity duration-500",
                                  isHovered ? "opacity-70" : "opacity-0",
                                )}
                              ></div>
                            </div>

                            {/* Enhanced badges container with animations */}
                            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
                              {product.isNew && (
                                <div className="animate-slide-in-left">
                                  <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 px-2 py-1 text-xs font-medium text-white shadow-md shadow-green-600/20 backdrop-blur-sm flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                                    <span className="animate-pulse">
                                      <Zap className="h-3 w-3" />
                                    </span>
                                    NEW
                                  </Badge>
                                </div>
                              )}

                              {product.discount > 0 && (
                                <div className="animate-slide-in-left" style={{ animationDelay: "100ms" }}>
                                  <Badge className="bg-gradient-to-r from-red-600 to-pink-600 px-2 py-1 text-xs font-medium text-white shadow-md shadow-red-600/20 backdrop-blur-sm flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                                    <span className="animate-spin-slow">
                                      <Sparkles className="h-3 w-3" />
                                    </span>
                                    -{product.discount}%
                                  </Badge>
                                </div>
                              )}

                              {/* Special badge for best-sellers */}
                              {product.reviewCount > 100 && (
                                <div className="animate-slide-in-left" style={{ animationDelay: "200ms" }}>
                                  <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 px-2 py-1 text-xs font-medium text-white shadow-md shadow-amber-500/20 backdrop-blur-sm flex items-center gap-1 hover:scale-105 transition-transform duration-200">
                                    <span className="animate-pulse-slow">
                                      <Award className="h-3 w-3" />
                                    </span>
                                    BEST SELLER
                                  </Badge>
                                </div>
                              )}
                            </div>

                            {/* Enhanced wishlist button with advanced effects */}
                            <div className="absolute right-3 top-3 z-10 hover:scale-110 active:scale-90 transition-transform duration-200">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full border border-gray-700/50 bg-gray-800/70 text-gray-300 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:border-red-500 hover:text-red-400 hover:shadow-md hover:shadow-red-500/20 group/heart"
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
                                {/* Heart icon with animated fill effect */}
                                <span className="relative">
                                  <Heart className="h-4 w-4 transition-all duration-300" />

                                  {/* Animated fill effect */}
                                  <span className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="h-4 w-4 fill-red-500 text-red-500 opacity-0 scale-50 transition-all duration-300 group-hover/heart:opacity-100 group-hover/heart:scale-100" />
                                  </span>
                                </span>

                                {/* Enhanced pulse animation on hover */}
                                <span className="absolute inset-0 rounded-full bg-red-500/20 scale-0 opacity-0 group-hover/heart:scale-150 group-hover/heart:opacity-100 transition-all duration-700"></span>
                              </Button>
                            </div>

                            {/* Enhanced quick actions overlay with animations */}
                            <div
                              className={cn(
                                "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-sm p-3 transition-all duration-300",
                                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
                              )}
                            >
                              <div className="flex gap-2">
                                <QuickActionButton
                                  icon={ShoppingCart}
                                  label={alreadyInCart ? "In Cart" : "Add to Cart"}
                                  className={cn(
                                    "flex-1 text-sm transition-all duration-300",
                                    alreadyInCart
                                      ? "bg-green-700 hover:bg-green-800"
                                      : "bg-purple-700 hover:bg-purple-800",
                                  )}
                                  onClick={(e) => handleAddToCart(e, product)}
                                  disabled={isLoading || alreadyInCart}
                                  loading={isLoading}
                                  success={showCheck || alreadyInCart}
                                />

                                <QuickActionButton
                                  icon={Eye}
                                  label="Quick View"
                                  className="bg-gray-800 text-white hover:bg-gray-700 text-sm border border-gray-700"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    // Add quick view functionality here
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Enhanced content section with microinteractions */}
                          <div className="p-4">
                            {/* Enhanced top info row */}
                            <div className="flex justify-between items-center mb-2">
                              {/* Enhanced rating stars with microinteractions */}
                              <RatingStars
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                                isHovered={isHovered}
                              />

                              {/* Enhanced product category badge */}
                              <CategoryBadge category={product.category} isHovered={isHovered} />
                            </div>

                            {/* Enhanced product name with hover effects */}
                            <div className="relative group/tooltip">
                              <h3
                                className={cn(
                                  "text-sm font-medium text-white transition-colors duration-300 group-hover/card:text-purple-300 line-clamp-2 min-h-[40px]",
                                  isHovered && "-translate-y-1",
                                )}
                              >
                                {truncateName(product.name)}

                                {/* Animated underline effect */}
                                {isHovered && (
                                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-purple-500 to-blue-500 animate-expand-width"></span>
                                )}
                              </h3>

                              {/* Enhanced tooltip for full product name */}
                              {product.name.length > 60 && (
                                <div className="absolute -top-2 left-0 w-full p-2 bg-gray-800 border border-purple-500/30 text-xs text-white rounded shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                                  {product.name}
                                </div>
                              )}
                            </div>

                            {/* Enhanced price display with animations */}
                            <div className="mt-2 flex items-end justify-between">
                              <PriceDisplay
                                price={product.price}
                                originalPrice={originalPrice}
                                discount={product.discount}
                              />

                              {/* Enhanced stock indicator with animations */}
                              <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                                <StockIndicator stock={product.stock} isHovered={isHovered} />
                              </div>
                            </div>

                            {/* Enhanced product highlights with animations */}
                            <ProductHighlights product={product} isVisible={isHovered} />
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced empty state with animations */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <div className="h-24 w-24 rounded-full bg-gray-800/50 flex items-center justify-center mb-4 animate-pulse-slow">
                <ShoppingCart className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
              <p className="text-gray-400 text-center max-w-md mb-4">
                We couldn't find any products matching your current filters. Try adjusting your selection or browse all
                products.
              </p>
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 group"
                onClick={() => {
                  setSelectedCategory("all")
                  setActiveFilters([])
                  setSortOption("featured")
                }}
              >
                <span className="group-hover:animate-wiggle">Reset all filters</span>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Enhanced floating pagination or load more button */}
        {filteredProducts.length >= 8 && (
          <motion.div
            className="container mx-auto px-4 mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
              <Button
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90 group relative overflow-hidden"
                size="lg"
              >
                {/* Enhanced button background animation */}
                <span className="absolute inset-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer-slow"></span>

                <span className="relative flex items-center">
                  Load more products
                  <span className="ml-1 group-hover:animate-bounce-right">
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </span>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Enhanced related categories cross-selling section */}
        <div className="container mx-auto px-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 border border-gray-800 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800/50 relative overflow-hidden"
          >
            {/* Background animated particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[10%] top-[20%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"></div>
              <div
                className="absolute left-[30%] top-[50%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute left-[50%] top-[30%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute left-[70%] top-[70%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute left-[90%] top-[40%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute left-[20%] top-[80%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "2.5s" }}
              ></div>
              <div
                className="absolute left-[40%] top-[10%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "3s" }}
              ></div>
              <div
                className="absolute left-[60%] top-[60%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "3.5s" }}
              ></div>
              <div
                className="absolute left-[80%] top-[20%] w-1 h-1 rounded-full bg-purple-500/20 animate-float-up"
                style={{ animationDelay: "4s" }}
              ></div>
            </div>

            <h3 className="text-lg font-medium text-white mb-4 flex items-center relative z-10">
              <span className="animate-spin-slow mr-2">
                <Sparkles className="h-4 w-4 text-purple-400" />
              </span>
              Explore Related Categories
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 relative z-10">
              {categories
                .filter((cat) => cat !== "all")
                .map((category, index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-200"
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-full py-4 px-3 flex flex-col items-center justify-center gap-2 border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-purple-500/50 text-gray-300 hover:text-white transition-all duration-300",
                        selectedCategory === category && "border-purple-500/70 bg-purple-900/20 text-purple-300",
                      )}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {/* Category icon with animations */}
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center group-hover:animate-wiggle">
                        <ShoppingCart className="h-4 w-4 text-purple-400" />
                      </div>
                      <span className="text-xs font-medium">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </Button>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced newsletter subscription with animated background */}
        <div className="container mx-auto px-4 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative overflow-hidden p-8 rounded-xl"
          >
            {/* Enhanced animated background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80">
              {/* Enhanced animated particles with varying sizes and speeds */}
              <div className="absolute inset-0">
                <div className="absolute left-[10%] top-[20%] w-1 h-1 rounded-full bg-white/80 animate-float-up"></div>
                <div
                  className="absolute left-[30%] top-[50%] w-2 h-2 rounded-full bg-white/60 animate-float-up"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute left-[50%] top-[30%] w-1 h-1 rounded-full bg-white/80 animate-float-up"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute left-[70%] top-[70%] w-2 h-2 rounded-full bg-white/60 animate-float-up"
                  style={{ animationDelay: "1.5s" }}
                ></div>
                <div
                  className="absolute left-[90%] top-[40%] w-1 h-1 rounded-full bg-white/80 animate-float-up"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div
                  className="absolute left-[20%] top-[80%] w-2 h-2 rounded-full bg-white/60 animate-float-up"
                  style={{ animationDelay: "2.5s" }}
                ></div>
                <div
                  className="absolute left-[40%] top-[10%] w-1 h-1 rounded-full bg-white/80 animate-float-up"
                  style={{ animationDelay: "3s" }}
                ></div>
                <div
                  className="absolute left-[60%] top-[60%] w-2 h-2 rounded-full bg-white/60 animate-float-up"
                  style={{ animationDelay: "3.5s" }}
                ></div>
                <div
                  className="absolute left-[80%] top-[20%] w-1 h-1 rounded-full bg-white/80 animate-float-up"
                  style={{ animationDelay: "4s" }}
                ></div>
              </div>

              {/* Enhanced gradient overlay with animation */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/50 animate-pulse-slow"></div>
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-1/2">
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Stay Updated
                </motion.h3>
                <motion.p
                  className="text-gray-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Subscribe to our newsletter for exclusive deals, new product launches, and more!
                </motion.p>
              </div>

              <div className="md:w-1/2 w-full">
                <motion.div
                  className="flex w-full max-w-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 py-2 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-l-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="hover:scale-105 active:scale-95 transition-transform duration-200">
                    <Button className="bg-white text-purple-900 hover:bg-purple-100 rounded-l-none border-l-0 relative overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer-slow"></span>
                      <span className="relative">Subscribe</span>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
