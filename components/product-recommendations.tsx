"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from "@/components/product-card"

export default function ProductRecommendations({ products, category }) {
  const scrollContainerRef = useRef(null)

  // Filter products to only show those in the same category
  const filteredProducts = products.filter((product) => product.category === category);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative">
      <div className="absolute -top-16 right-0 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollLeft}
          className="h-10 w-10 rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollRight}
          className="h-10 w-10 rounded-full border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex space-x-6"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={item} className="w-[280px] flex-shrink-0">
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
