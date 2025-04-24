"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, TrendingUp } from "lucide-react"
import HeroCarousel from "@/components/hero-carousel"
import FeaturedProducts from "@/components/featured-products"
import CategoryShowcase from "@/components/category-showcase"
import Newsletter from "@/components/newsletter"
import { getProducts } from "@/lib/products"

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const products = getProducts().slice(0, 8)
    setFeaturedProducts(products)
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <HeroCarousel />

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
            Trending Now
          </Badge>
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-white">Discover Our Featured Products</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Explore our handpicked selection of premium products that are trending right now. Elevate your style with
            our exclusive collection.
          </p>
        </motion.div>

        {isLoaded && <FeaturedProducts products={featuredProducts} />}

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            className="group border-purple-600 bg-transparent text-purple-300 hover:bg-purple-900/20"
          >
            <Link href="/products">
              View All Products
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
            Shop By Category
          </Badge>
          <h2 className="mb-3 text-4xl font-bold tracking-tight text-white">Explore Our Collections</h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Browse through our carefully curated categories to find exactly what you're looking for.
          </p>
        </motion.div>

        <CategoryShowcase />
      </section>


      <Newsletter />
    </div>
  )
}
