"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import ProductCard from "@/components/product-card"
import { getProducts, getCategories } from "@/lib/products"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const allProducts = getProducts()
    const allCategories = getCategories()
    setProducts(allProducts)
    setFilteredProducts(allProducts)
    setCategories(allCategories)
  }, [])

  useEffect(() => {
    let result = [...products]

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory)
    }

    // Filter by price range
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    setFilteredProducts(result)
  }, [searchQuery, selectedCategory, priceRange, sortBy, products])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange([0, 1000])
    setSortBy("featured")
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-16 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
            All Products
          </Badge>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl">Explore Our Collection</h1>
          <p className="mx-auto max-w-2xl text-gray-400">
            Browse through our extensive catalog of premium products designed to elevate your lifestyle.
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-gray-700 bg-gray-800 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="border-gray-700 bg-gray-800 text-white">
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 rounded-lg border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Filters</h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-400 hover:text-white">
                <X className="mr-2 h-4 w-4" />
                Clear All
              </Button>
            </div>

            <Separator className="my-4 bg-gray-700" />

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <h4 className="mb-3 font-medium text-white">Category</h4>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-700 bg-gray-800 text-white">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-white">Price Range</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-white">Availability</h4>
                <div className="space-y-2">
                  {["In Stock", "On Sale", "New Arrivals"].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.toLowerCase().replace(" ", "-")}
                        className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-600"
                      />
                      <label htmlFor={option.toLowerCase().replace(" ", "-")} className="ml-2 text-sm text-gray-300">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-400">
            Showing <span className="font-medium text-white">{filteredProducts.length}</span> products
          </p>
          {(searchQuery || selectedCategory !== "all" || priceRange[0] > 0 || priceRange[1] < 1000) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-purple-400 hover:text-purple-300">
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={item}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50 p-8 text-center">
            <Search className="mb-4 h-12 w-12 text-gray-500" />
            <h3 className="mb-2 text-xl font-semibold text-white">No products found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-purple-600 text-purple-400 hover:bg-purple-900/20"
              onClick={clearFilters}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
