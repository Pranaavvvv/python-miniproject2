"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { getCategories } from "@/lib/products"

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories(getCategories())
  }, [])

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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.slice(0, 6).map((category) => (
        <motion.div key={category.id} variants={item}>
          <Card className="category-card overflow-hidden border-gray-800 bg-gray-900">
            <CardContent className="p-0">
              <div className="relative h-[150px] w-full overflow-hidden">
      
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">{category.name}</h3>
                  <p className="mb-4 text-sm text-gray-300 line-clamp-2">{category.description}</p>
                  <Button asChild className="group bg-purple-700 hover:bg-purple-800">
                    <Link href={`/products?category=${category.id}`}>
                      Shop Now
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
