"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, Heart, Eye, ShoppingCart, Sparkles } from "lucide-react"
import ProductCard from "@/components/product-card"
import { cn } from "@/lib/utils"

export default function ProductRecommendations({ products, category }) {
  const scrollContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [showQuickView, setShowQuickView] = useState(null)
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true)
  const controls = useAnimation()

  // Filter products to only show those in the same category
  const filteredProducts = products.filter((product) => product.category === category)

  // Find featured product (highest price or first item if no prices)
  const featuredProductIndex =
    filteredProducts.length > 0
      ? filteredProducts.reduce(
          (maxIndex, product, index, array) => (product.price > array[maxIndex].price ? index : maxIndex),
          0,
        )
      : 0

  // Calculate visible products based on container width
  const [visibleProducts, setVisibleProducts] = useState(4)

  useEffect(() => {
    const updateVisibleProducts = () => {
      const width = window.innerWidth
      if (width < 640) setVisibleProducts(1)
      else if (width < 1024) setVisibleProducts(2)
      else if (width < 1280) setVisibleProducts(3)
      else setVisibleProducts(4)
    }

    updateVisibleProducts()
    window.addEventListener("resize", updateVisibleProducts)
    return () => window.removeEventListener("resize", updateVisibleProducts)
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    let interval

    if (autoScrollEnabled && !isHovering && filteredProducts.length > visibleProducts) {
      interval = setInterval(() => {
        scrollRight()
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoScrollEnabled, isHovering, filteredProducts.length, visibleProducts])

  // Update active index based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const itemWidth = scrollContainerRef.current.querySelector("div[data-product]")?.offsetWidth || 300
        const newIndex = Math.round(scrollLeft / (itemWidth + 24)) // 24px is the gap

        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex)
          controls.start("show")
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [activeIndex, controls])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.querySelector("div[data-product]")?.offsetWidth || 300
      scrollContainerRef.current.scrollBy({
        left: -(itemWidth + 24),
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.querySelector("div[data-product]")?.offsetWidth || 300
      scrollContainerRef.current.scrollBy({
        left: itemWidth + 24,
        behavior: "smooth",
      })
    }
  }

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const itemWidth = scrollContainerRef.current.querySelector("div[data-product]")?.offsetWidth || 300
      scrollContainerRef.current.scrollTo({
        left: index * (itemWidth + 24),
        behavior: "smooth",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const featuredItem = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  const quickViewVariants = {
    hidden: { opacity: 0, y: 10, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgb(17, 24, 39)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  }

  return (
    <div className="relative py-8">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl opacity-90"></div>

      {/* Animated sparkle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Header with title and navigation */}
      <div className="relative flex items-center justify-between mb-8 px-6">
        <div className="flex items-center">
          <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
          <h2 className="text-2xl font-bold text-white">Recommended For You</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex space-x-2 mr-4">
            {filteredProducts.length > visibleProducts &&
              [...Array(Math.ceil(filteredProducts.length / visibleProducts))].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToIndex(i * visibleProducts)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    activeIndex >= i * visibleProducts && activeIndex < (i + 1) * visibleProducts
                      ? "bg-white scale-125"
                      : "bg-gray-600 hover:bg-gray-500",
                  )}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
          </div>

          <motion.button
            onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
            className={cn(
              "text-sm px-3 py-1 rounded-full transition-colors",
              autoScrollEnabled ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400",
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {autoScrollEnabled ? "Auto • ON" : "Auto • OFF"}
          </motion.button>

          <div className="flex space-x-2">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                className="h-10 w-10 rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                className="h-10 w-10 rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products carousel */}
      <div
        ref={scrollContainerRef}
        className="flex px-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="flex space-x-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={index === featuredProductIndex ? featuredItem : item}
              className={cn("w-[280px] flex-shrink-0 snap-start", index === featuredProductIndex && "relative z-10")}
              data-product="true"
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
            >
              <div
                className={cn(
                  "relative rounded-xl overflow-hidden transition-all duration-500 bg-gray-800 h-full",
                  index === featuredProductIndex
                    ? "border-2 border-yellow-400 shadow-lg shadow-yellow-400/20"
                    : "border border-gray-700",
                )}
              >
                {index === featuredProductIndex && (
                  <div className="absolute top-3 left-3 z-20 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    FEATURED
                  </div>
                )}

                <div className="relative overflow-hidden group">
                  <ProductCard product={product} />

                  {/* Overlay with quick actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowQuickView(showQuickView === product.id ? null : product.id)
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Quick view panel */}
                <AnimatePresence>
                  {showQuickView === product.id && (
                    <motion.div
                      variants={quickViewVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-4 bg-gray-800 border-t border-gray-700"
                    >
                      <h4 className="font-medium text-white mb-2">{product.name}</h4>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < (product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-500",
                            )}
                          />
                        ))}
                        <span className="text-gray-400 text-xs ml-2">
                          ({product.reviews || Math.floor(Math.random() * 100) + 10} reviews)
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                        {product.description ||
                          "This premium product combines style, comfort and durability for an exceptional experience."}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white">${product.price}</span>
                        <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                          Add to Cart
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mobile pagination dots */}
      <div className="md:hidden flex justify-center mt-4 space-x-2">
        {filteredProducts.length > visibleProducts &&
          [...Array(Math.ceil(filteredProducts.length / visibleProducts))].map((_, i) => (
            <motion.button
              key={i}
              onClick={() => scrollToIndex(i * visibleProducts)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                activeIndex >= i * visibleProducts && activeIndex < (i + 1) * visibleProducts
                  ? "bg-white"
                  : "bg-gray-600",
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
      </div>
    </div>
  )
}
