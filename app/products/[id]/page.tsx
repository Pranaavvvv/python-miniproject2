"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, ShoppingCart, Star, Truck, RefreshCw, Shield, Minus, Plus, Check } from 'lucide-react'
import ProductRecommendations from "@/components/product-recommendations"
import { getProductById, getRelatedProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    if (params.id) {
      const productData = getProductById(params.id)
      if (productData) {
        setProduct(productData)
        setRelatedProducts(getRelatedProducts(productData.id, productData.category))
      } else {
        router.push("/products")
      }
    }
  }, [params.id, router])

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    // Simulate API call
    setTimeout(() => {
      addToCart(product, quantity)
      setIsAddingToCart(false)

      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} added to your cart`,
        variant: "success",
      })
    }, 600)
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pb-16 pt-24">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-400">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="sticky top-24 overflow-hidden rounded-lg bg-gray-800">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg?height=600&width=600"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto p-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition ${
                      selectedImage === index ? "border-purple-500" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=80&width=80"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="mb-2 flex items-center gap-2">
              <Badge className="bg-purple-600 text-white">{product.category}</Badge>
              {product.isNew && (
                <Badge variant="outline" className="border-green-500 text-green-400">
                  New Arrival
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge variant="outline" className="border-red-500 text-red-400">
                  {product.discount}% Off
                </Badge>
              )}
            </div>

            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">{product.name}</h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-500"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.reviewCount} reviews</span>
            </div>

            <div className="mb-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="mb-6 text-gray-300">{product.description}</p>

            <div className="mb-6 rounded-lg border border-gray-700 bg-gray-800/50 p-4">
              <h3 className="mb-3 font-medium text-white">Available Options</h3>
              <div className="mb-4">
                <span className="mb-2 block text-sm text-gray-400">Colors:</span>
                <div className="flex gap-2">
                  {["black", "white", "purple", "gray"].map((color) => (
                    <button
                      key={color}
                      className={`h-8 w-8 rounded-full border-2 ${
                        color === "black"
                          ? "border-purple-500 bg-black"
                          : color === "white"
                            ? "bg-white"
                            : color === "purple"
                              ? "bg-purple-600"
                              : "bg-gray-500"
                      }`}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-2 block text-sm text-gray-400">Size:</span>
                <div className="flex flex-wrap gap-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-600 text-sm font-medium text-white hover:border-purple-500 hover:bg-purple-900/20"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center rounded-md border border-gray-700 bg-gray-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-gray-400 hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-12 items-center justify-center border-x border-gray-700 text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-gray-400 hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-purple-700 hover:bg-purple-800"
              >
                {isAddingToCart ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-400"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400"
                aria-label="Share product"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Separator className="my-6 bg-gray-700" />

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Truck className="h-5 w-5 text-purple-400" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <RefreshCw className="h-5 w-5 text-purple-400" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="h-5 w-5 text-purple-400" />
                <span>2-year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Check className="h-5 w-5 text-green-400" />
                <span className="text-green-400">In stock - ready to ship</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-white">Product Description</h3>
                <p className="text-gray-300">
                  {product.fullDescription ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl."}
                </p>
                <p className="text-gray-300">
                  Designed with both style and functionality in mind, this product is perfect for those who appreciate
                  quality craftsmanship and attention to detail. Each piece is carefully inspected to ensure it meets
                  our high standards.
                </p>
                <h4 className="text-lg font-medium text-white">Key Features</h4>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>Premium quality materials</li>
                  <li>Ergonomic design for comfort</li>
                  <li>Durable construction</li>
                  <li>Versatile for various occasions</li>
                  <li>Modern aesthetic with timeless appeal</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-xl font-semibold text-white">Technical Specifications</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-white">Material</td>
                      <td className="py-3 text-gray-300">Premium grade</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-white">Dimensions</td>
                      <td className="py-3 text-gray-300">12" x 8" x 4"</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-white">Weight</td>
                      <td className="py-3 text-gray-300">1.5 lbs</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-white">Color Options</td>
                      <td className="py-3 text-gray-300">Black, White, Purple, Gray</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 pr-4 font-medium text-white">Warranty</td>
                      <td className="py-3 text-gray-300">2 Years</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-medium text-white">Country of Origin</td>
                      <td className="py-3 text-gray-300">Made in USA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
              <div className="prose prose-invert max-w-none">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">Customer Reviews</h3>
                  <Button className="bg-purple-700 hover:bg-purple-800">Write a Review</Button>
                </div>

                <div className="mb-8 flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-gray-900 p-6 text-center md:w-1/3">
                    <div className="mb-2 text-4xl font-bold text-white">{product.rating.toFixed(1)}</div>
                    <div className="mb-4 flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">Based on {product.reviewCount} reviews</p>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-4">
                          <div className="flex w-24 items-center">
                            <span className="mr-2 text-sm text-gray-400">{star} stars</span>
                          </div>
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-700">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%`,
                              }}
                            ></div>
                          </div>
                          <div className="w-16 text-right text-sm text-gray-400">
                            {star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="my-6 bg-gray-700" />

                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="rounded-lg border border-gray-700 bg-gray-900 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-700">
                            <Image
                              src={`/placeholder.svg?height=40&width=40`}
                              alt="User avatar"
                              width={40}
                              height={40}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">Customer {review}</h4>
                            <p className="text-xs text-gray-400">Posted on {new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (review === 3 ? 4 : 5) ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h5 className="mb-2 font-medium text-white">
                        {review === 1
                          ? "Absolutely love it!"
                          : review === 2
                            ? "Great quality and design"
                            : "Very good but could be better"}
                      </h5>
                      <p className="text-gray-300">
                        {review === 1
                          ? "This product exceeded my expectations. The quality is outstanding and it looks even better in person. Highly recommend!"
                          : review === 2
                            ? "I'm very satisfied with my purchase. The design is elegant and the product feels premium. Fast shipping too!"
                            : "Overall a good product. The quality is nice but I had some minor issues with the sizing. Customer service was helpful though."}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-700">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <section className="mt-16">
          <div className="mb-8 text-center">
            <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
              You May Also Like
            </Badge>
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">Recommended Products</h2>
            <p className="mx-auto max-w-2xl text-gray-400">
              Based on your browsing history and customers who purchased this item
            </p>
          </div>

          <ProductRecommendations products={relatedProducts} category={product.category} />
        </section>
      </div>
    </div>
  )
}
