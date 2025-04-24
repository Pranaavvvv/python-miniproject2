"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles } from "lucide-react"
import { getCategories } from "@/lib/products"
import { cn } from "@/lib/utils"

export default function CategoryShowcase() {
  const [categories, setCategories] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const showcaseRef = useRef(null)

  // Custom cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorSize = useMotionValue(12)

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Particle system
  const [particles, setParticles] = useState([])
  const particleColors = ["#9333EA", "#A855F7", "#C084FC", "#E9D5FF"]

  useEffect(() => {
    // Get categories data
    const fetchedCategories = getCategories().map((category) => ({
      ...category,
      // Add a featured flag to some categories to create visual hierarchy
      featured: Math.random() > 0.7,
      // Add a custom accent color to each category
      accentColor: getRandomColor(),
      // Add icon type for visual variety
      iconType: Math.floor(Math.random() * 3),
    }))
    setCategories(fetchedCategories)

    // Initialize particles
    const initialParticles = Array.from({ length: 20 }, createParticle)
    setParticles(initialParticles)

    // Particle animation loop
    const particleInterval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Update particle position
          const newY = particle.y - particle.speed
          // Reset particle if it goes off screen
          if (newY < -20) {
            return createParticle()
          }
          return { ...particle, y: newY }
        }),
      )
    }, 50)

    // Track mouse movement for custom cursor and card hover effects
    const handleMouseMove = (e) => {
      if (!showcaseRef.current) return

      const rect = showcaseRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x, y })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearInterval(particleInterval)
    }
  }, [])

  // Helper function to create a new particle
  function createParticle() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 100, // percentage across container
      y: 100 + Math.random() * 20, // start below container
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.7,
      speed: 0.2 + Math.random() * 0.5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }
  }

  // Helper function to generate random colors
  function getRandomColor() {
    const hue = Math.floor(Math.random() * 60) + 260 // Purple range
    return `hsl(${hue}, 70%, 60%)`
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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

  // Card hover animation
  const handleCardHover = (index) => {
    if (isMobile) return
    setActiveIndex(index)
    cursorSize.set(60)
  }

  const handleCardLeave = () => {
    if (isMobile) return
    setActiveIndex(null)
    cursorSize.set(12)
  }

  // Calculate card tilt based on mouse position
  const getCardStyle = (index) => {
    if (activeIndex !== index || isMobile) return {}

    const card = document.getElementById(`category-card-${index}`)
    if (!card) return {}

    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.width / 2
    const cardCenterY = rect.height / 2

    // Calculate distance from center (as percentage)
    const distanceX = (mousePosition.x - cardCenterX) / cardCenterX
    const distanceY = (mousePosition.y - cardCenterY) / cardCenterY

    // Apply subtle tilt effect
    return {
      transform: `perspective(1000px) rotateX(${distanceY * -3}deg) rotateY(${distanceX * 3}deg) scale(1.02)`,
      boxShadow: `
        0 10px 30px -5px rgba(0, 0, 0, 0.3),
        ${distanceX * -10}px ${distanceY * -10}px 20px rgba(0, 0, 0, 0.2)
      `,
      zIndex: 10,
    }
  }

  // Custom cursor size animation
  const cursorSize2 = useTransform(cursorSize, (size) => size * 2)

  return (
    <div className="relative py-12 overflow-hidden" ref={showcaseRef}>
      {/* Background particles */}
      {!isMobile &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: particle.opacity }}
            exit={{ opacity: 0 }}
          />
        ))}

      {/* Custom cursor */}
      {!isMobile && (
        <>
          <motion.div
            className="fixed top-0 left-0 rounded-full bg-purple-500 mix-blend-difference pointer-events-none z-50"
            style={{
              x: cursorX,
              y: cursorY,
              width: cursorSize,
              height: cursorSize,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
          <motion.div
            className="fixed top-0 left-0 rounded-full border border-purple-300 pointer-events-none z-50"
            style={{
              x: cursorX,
              y: cursorY,
              width: cursorSize2,
              height: cursorSize2,
              translateX: "-50%",
              translateY: "-50%",
              opacity: 0.3,
            }}
          />
        </>
      )}

      {/* Section heading with animation */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-700"
          initial={{ letterSpacing: "0.1em" }}
          animate={{ letterSpacing: "0.05em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Explore Categories
        </motion.h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our curated collection of premium products across various categories
        </p>
      </motion.div>

      {/* Categories grid with staggered animation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4"
      >
        {categories.slice(0, 6).map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            id={`category-card-${index}`}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={handleCardLeave}
            className={cn("transition-all duration-300", category.featured ? "sm:col-span-2 lg:col-span-1" : "")}
            style={getCardStyle(index)}
          >
            <Card
              className={cn(
                "category-card h-full overflow-hidden border-gray-800 bg-gray-900 group",
                "transition-all duration-500 hover:border-purple-500/50",
                activeIndex === index ? "ring-2 ring-purple-500 ring-opacity-50" : "",
              )}
            >
              <CardContent className="p-0 h-full">
                <div className="relative h-full min-h-[200px] w-full overflow-hidden">
                  {/* Category background with parallax effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
                    style={{
                      backgroundSize: "150% 150%",
                      backgroundPosition: "50% 50%",
                    }}
                    animate={{
                      backgroundPosition: activeIndex === index ? "30% 30%" : "50% 50%",
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Decorative elements based on category type */}
                    {category.iconType === 0 && (
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-purple-700 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-purple-500 blur-3xl translate-x-1/2 translate-y-1/2" />
                      </div>
                    )}
                    {category.iconType === 1 && (
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border-8 border-purple-600" />
                        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border-4 border-purple-400" />
                      </div>
                    )}
                    {category.iconType === 2 && (
                      <div className="absolute inset-0 opacity-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-20 h-20 border border-purple-300"
                            style={{
                              top: `${Math.random() * 100}%`,
                              left: `${Math.random() * 100}%`,
                              transform: `rotate(${Math.random() * 90}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

                  {/* Content container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category badge */}
                    <div
                      className="mb-3 inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${category.accentColor}30`, color: category.accentColor }}
                    >
                      {category.featured ? (
                        <>
                          <Sparkles className="mr-1 h-3 w-3" /> Featured
                        </>
                      ) : (
                        <>New Collection</>
                      )}
                    </div>

                    {/* Category name with animated underline */}
                    <div className="relative mb-2">
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                        {category.name}
                      </h3>
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: activeIndex === index ? "40%" : "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Description with line clamp */}
                    <p className="mb-4 text-sm text-gray-300 line-clamp-2 group-hover:text-gray-200 transition-colors">
                      {category.description}
                    </p>

                    {/* Animated button */}
                    <Button
                      asChild
                      className="group relative overflow-hidden bg-transparent border border-purple-500 hover:bg-purple-500/20 transition-all duration-300 self-start"
                    >
                      <Link href={`/products?category=${category.id}`}>
                        <span className="relative z-10 flex items-center">
                          Shop Now
                          <motion.div
                            animate={{ x: activeIndex === index ? 5 : 0 }}
                            transition={{
                              repeat: activeIndex === index ? Number.POSITIVE_INFINITY : 0,
                              repeatType: "reverse",
                              duration: 0.6,
                            }}
                          >
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-purple-600"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* View all categories button */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          asChild
          variant="outline"
          className="bg-transparent border-purple-500 text-purple-400 hover:bg-purple-950 hover:text-purple-300"
        >
          <Link href="/categories" className="group">
            View All Categories
            <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <ChevronRight className="ml-2 h-4 w-4" />
            </motion.span>
          </Link>
        </Button>
      </motion.div>
    </div>
  )
}
