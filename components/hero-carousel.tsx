"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Play, ArrowRight } from "lucide-react"

// Enhanced slide data with more properties and 3D elements
const slides = [
  {
    id: 1,
    title: "Premium Collection",
    subtitle: "Elevate Your Style",
    description: "Discover our exclusive range of premium products designed for the modern lifestyle.",
    cta: "Shop Now",
    secondaryCta: "Learn More",
    image: "https://hnmagazine.co.uk/wp-content/uploads/2024/07/HN-Magazine-Landscape-image-1200x800px-2024-07-11T191112.527-1024x683.jpg", // Using placeholder image
    textColor: "#FFFFFF",
    link: "/products?collection=premium",
    parallaxElements: [
      { image: "/api/placeholder/300/300", x: -15, y: 10, scale: 0.8, opacity: 0.8, rotation: 5 },
      { image: "/api/placeholder/250/250", x: 25, y: -20, scale: 0.6, opacity: 0.7, rotation: -8 },
      { image: "/api/placeholder/180/180", x: -30, y: 30, scale: 0.4, opacity: 0.6, rotation: 12 },
    ],
    particles: {
      count: 20,
      color: "#A78BFA",
      size: { min: 2, max: 8 },
      speed: { min: 0.5, max: 2 },
    },
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh Styles for the Season",
    description: "Be the first to explore our latest arrivals featuring cutting-edge designs.",
    cta: "View Collection",
    secondaryCta: "Watch Preview",
    image: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/watch-og-image-202309_GEO_IN?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693679389056", // Using placeholder image
    textColor: "#FFFFFF",
    link: "/products?filter=new-arrivals",
    parallaxElements: [
      { image: "/api/placeholder/280/280", x: 20, y: 15, scale: 0.7, opacity: 0.8, rotation: -5 },
      { image: "/api/placeholder/220/220", x: -20, y: -15, scale: 0.5, opacity: 0.6, rotation: 10 },
      { image: "/api/placeholder/200/200", x: 35, y: 25, scale: 0.45, opacity: 0.7, rotation: -15 },
    ],
    particles: {
      count: 25,
      color: "#F9A8D4",
      size: { min: 3, max: 10 },
      speed: { min: 0.3, max: 1.8 },
    },
  },
  {
    id: 3,
    title: "Limited Edition",
    subtitle: "Exclusive Designs",
    description: "Don't miss our limited edition collection. Once they're gone, they're gone forever.",
    cta: "Shop Limited Edition",
    secondaryCta: "Set Reminder",
    image: "https://cdn.prod.website-files.com/63b937f7cb69a848fab5e097/6773983a8dab1b70ebbfde62_LTD%20ED%20watches%20lead.jpg", // Using placeholder imag
    textColor: "#FFFFFF",
    link: "/products?collection=limited",
    parallaxElements: [
      { image: "/api/placeholder/320/320", x: -25, y: -10, scale: 0.75, opacity: 0.7, rotation: 8 },
      { image: "/api/placeholder/270/270", x: 20, y: 25, scale: 0.6, opacity: 0.8, rotation: -12 },
      { image: "/api/placeholder/190/190", x: -35, y: 15, scale: 0.5, opacity: 0.6, rotation: 20 },
    ],
    particles: {
      count: 30,
      color: "#93C5FD",
      size: { min: 2, max: 12 },
      speed: { min: 0.4, max: 2.2 },
    },
  },
]

// Particle component for dynamic background effects
const Particle = ({ color, size, position, speed, rotation }) => {
  const x = useMotionValue(position.x)
  const y = useMotionValue(position.y)
  const rotate = useMotionValue(rotation)

  useEffect(() => {
    const updatePosition = () => {
      const newY = y.get() + speed
      if (newY > window.innerHeight) {
        y.set(-size)
        x.set(Math.random() * window.innerWidth)
      } else {
        y.set(newY)
      }
      rotate.set(rotate.get() + 0.2)
    }

    const interval = setInterval(updatePosition, 16)
    return () => clearInterval(interval)
  }, [y, x, speed, size, rotate])

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
        position: "absolute",
        opacity: Math.random() * 0.5 + 0.3,
        filter: `blur(${Math.random() * 2}px)`,
      }}
    />
  )
}

// Particles container component
const ParticlesEffect = ({ config, isActive }) => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!isActive) return

    const newParticles = Array.from({ length: config.count }).map((_, i) => ({
      id: i,
      size: Math.random() * (config.size.max - config.size.min) + config.size.min,
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      speed: Math.random() * (config.speed.max - config.speed.min) + config.speed.min,
      rotation: Math.random() * 360,
      color: config.color,
    }))

    setParticles(newParticles)
  }, [config, isActive])

  if (!isActive) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </div>
  )
}

// 3D Card effect component
const Card3D = ({ children, sensitivity = 30, perspective = 1000, className = "" }) => {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * sensitivity
    const rotateXValue = ((centerY - mouseY) / (rect.height / 2)) * sensitivity

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setScale(1.02)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}

// Audio visualization component
const AudioVisualizer = ({ isPlaying, isMuted, color }) => {
  const canvasRef = useRef(null)
  const [bars] = useState(20)

  useEffect(() => {
    if (!canvasRef.current || !isPlaying || isMuted) return

    const ctx = canvasRef.current.getContext("2d")
    const width = canvasRef.current.width
    const height = canvasRef.current.height

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < bars; i++) {
        // Generate random heights for visualization
        const barHeight = isPlaying && !isMuted ? Math.random() * height * 0.8 + height * 0.2 : height * 0.1

        const barWidth = width / bars - 2
        const x = i * (barWidth + 2)

        ctx.fillStyle = color
        ctx.fillRect(x, height - barHeight, barWidth, barHeight)
      }
    }

    const interval = setInterval(renderFrame, 100)
    return () => clearInterval(interval)
  }, [isPlaying, isMuted, bars, color])

  if (!isPlaying || isMuted) return null

  return <canvas ref={canvasRef} width={100} height={30} className="opacity-0" />
}

// Main component
export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const dragX = useMotionValue(0)
  const dragThreshold = 50

  // Animated progress bar
  const progressSpring = useSpring(progress, { stiffness: 100, damping: 20 })

  // Custom cursor states
  const [cursorVariant, setCursorVariant] = useState("default")
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const cursorSize = useSpring(32, { stiffness: 300, damping: 20 })
  const cursorOpacity = useSpring(0, { stiffness: 300, damping: 20 })

  // For parallax effect
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 300], [0, -50])

  // For 3D tilt effect
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const tiltTransform = useTransform(
    [tiltX, tiltY],
    ([latestX, latestY]) => `perspective(1000px) rotateX(${latestY}deg) rotateY(${-latestX}deg)`,
  )

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setProgress(0)
  }, [])

  // Handle autoplay with progress tracking
  useEffect(() => {
    if (!autoplay || isPaused) {
      return
    }

    const duration = 8000
    const interval = 50
    let timer
    let elapsed = 0

    const updateProgress = () => {
      elapsed += interval
      setProgress((elapsed / duration) * 100)

      if (elapsed >= duration) {
        elapsed = 0
        setProgress(0)
        nextSlide()
      }
    }

    timer = setInterval(updateProgress, interval)
    return () => {
      clearInterval(timer)
    }
  }, [autoplay, isPaused, nextSlide])

  // Handle drag functionality
  const handleDragStart = () => {
    setIsDragging(true)
    setAutoplay(false)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setAutoplay(true)

    const dragDistance = dragX.get()

    if (dragDistance > dragThreshold) {
      prevSlide()
    } else if (dragDistance < -dragThreshold) {
      nextSlide()
    }

    dragX.set(0)
  }

  // Handle custom cursor
  const updateCursorPosition = (e) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    setMousePosition({ x: e.clientX, y: e.clientY })

    // Update tilt based on mouse position relative to container center
    if (containerRef.current && isHovering) {
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const maxTilt = 5
      const tiltXValue = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt
      const tiltYValue = ((e.clientY - centerY) / (rect.height / 2)) * maxTilt

      tiltX.set(tiltXValue)
      tiltY.set(tiltYValue)
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    cursorOpacity.set(1)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    cursorOpacity.set(0)
    tiltX.set(0)
    tiltY.set(0)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        // Spacebar
        setIsPaused((prev) => !prev)
      } else if (e.key === "m") {
        setIsMuted((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  // Animated variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(10px)",
      transition: {
        duration: 0.3,
      },
    },
  }

  const cursorVariants = {
    default: {
      height: cursorSize,
      width: cursorSize,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderColor: "rgba(255, 255, 255, 0.5)",
      x: cursorX,
      y: cursorY,
      opacity: cursorOpacity,
      mixBlendMode: "difference",
    },
    leftArrow: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderColor: "white",
      x: cursorX,
      y: cursorY,
      opacity: cursorOpacity,
    },
    rightArrow: {
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderColor: "white",
      x: cursorX,
      y: cursorY,
      opacity: cursorOpacity,
    },
    text: {
      height: 24,
      width: 24,
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.8)",
      mixBlendMode: "difference",
      x: cursorX,
      y: cursorY,
      opacity: cursorOpacity,
    },
    button: {
      height: 50,
      width: 50,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      borderColor: "white",
      x: cursorX,
      y: cursorY,
      opacity: cursorOpacity,
    },
  }

  // Magnetic button effect
  const MagneticButton = ({ children, className, onClick, onMouseEnter, onMouseLeave }) => {
    const buttonRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return

      const rect = buttonRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2))

      const maxDistance = 100
      const magnetStrength = 0.4

      if (distance < maxDistance) {
        const x = (e.clientX - centerX) * magnetStrength
        const y = (e.clientY - centerY) * magnetStrength
        setPosition({ x, y })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      if (onMouseLeave) onMouseLeave()
    }

    return (
      <motion.div
        ref={buttonRef}
        className={className}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {children}
      </motion.div>
    )
  }

  // Get current slide data
  const currentSlide = slides[current]

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black"
      ref={containerRef}
      onMouseMove={updateCursorPosition}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full border-2 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorVariant === "leftArrow" && <ChevronLeft className="h-6 w-6 text-white opacity-80" />}
        {cursorVariant === "rightArrow" && <ChevronRight className="h-6 w-6 text-white opacity-80" />}
        {cursorVariant === "button" && <ArrowRight className="h-5 w-5 text-white opacity-80" />}
      </motion.div>

      {/* Particles effect */}
      {slides.map((slide, index) => (
        <ParticlesEffect
          key={`particles-${slide.id}`}
          config={slide.particles}
          isActive={current === index && !isPaused}
        />
      ))}

      {/* Slides */}
      <motion.div
        className="relative h-full w-full"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{ x: dragX, transform: tiltTransform }}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {slides.map(
            (slide, index) =>
              current === index && (
                <motion.div
                  key={slide.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                  onMouseEnter={() => setCursorVariant("default")}
                >
            

                  {/* Background image with parallax */}
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 mix-blend-overlay"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      y: parallaxY,
                    }}
                  />

                  {/* Decorative parallax elements */}
                  {slide.parallaxElements.map((element, i) => (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{
                        backgroundImage: `url(${element.image})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        width: "300px",
                        height: "300px",
                        top: `${50 + element.y}%`,
                        left: `${70 + element.x}%`,
                        opacity: element.opacity,
                        scale: element.scale,
                        rotate: element.rotation,
                        x: useTransform(dragX, [-100, 100], [element.x * -2, element.x * 2]),
                        y: useTransform(parallaxY, [0, -50], [0, element.y * 0.5]),
                      }}
                    />
                  ))}

                  {/* Content */}
                  <div className="container relative mx-auto flex h-full items-center px-4">
                    <div className="max-w-xl z-10">
                      <motion.span
                        custom={0}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-medium backdrop-blur-sm"
                        style={{ backgroundColor: `${slide.color}80`, color: slide.textColor }}
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {slide.subtitle}
                      </motion.span>

                      <motion.h1
                        custom={1}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-4 text-5xl font-bold leading-tight md:text-6xl"
                        style={{
                          color: slide.textColor,
                          textShadow: `0 0 20px ${slide.color}50`,
                        }}
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        custom={2}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="mb-8 text-xl text-gray-200 max-w-lg"
                        onMouseEnter={() => setCursorVariant("text")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        custom={3}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex space-x-4"
                      >
                        <Card3D className="perspective-1000">
                          <MagneticButton
                            className="relative overflow-hidden group text-base font-medium transition-all rounded-md"
                            onMouseEnter={() => setCursorVariant("button")}
                            onMouseLeave={() => setCursorVariant("default")}
                          >
                            <Button
                              asChild
                              className="relative overflow-hidden group text-base font-medium transition-all px-6 py-3 h-auto"
                              style={{
                                backgroundColor: slide.color,
                                boxShadow: `0 0 20px ${slide.color}80`,
                              }}
                            >
                              <Link href={slide.link}>
                                <span className="relative z-10 flex items-center">
                                  {slide.cta}
                                  <motion.span
                                    className="ml-2"
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                      repeat: Number.POSITIVE_INFINITY,
                                      duration: 1.5,
                                      ease: "easeInOut",
                                    }}
                                  >
                                    <ArrowRight className="h-4 w-4" />
                                  </motion.span>
                                </span>
                                <motion.span
                                  className="absolute inset-0 bg-white/20"
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileHover={{ scale: 1.5, opacity: 1 }}
                                  transition={{ duration: 0.6 }}
                                  style={{ originX: 0, originY: 0 }}
                                />
                              </Link>
                            </Button>
                          </MagneticButton>
                        </Card3D>

                        <Card3D className="perspective-1000">
                          <MagneticButton
                            className="relative overflow-hidden group text-base font-medium transition-all rounded-md"
                            onMouseEnter={() => setCursorVariant("button")}
                            onMouseLeave={() => setCursorVariant("default")}
                          >
                            <Button
                              variant="outline"
                              asChild
                              className="border-2 text-base font-medium px-6 py-3 h-auto backdrop-blur-sm"
                              style={{
                                borderColor: slide.color,
                                color: slide.textColor,
                                boxShadow: `0 0 15px ${slide.color}40`,
                              }}
                            >
                              <Link href="#">
                                <span className="relative z-10">{slide.secondaryCta}</span>
                                <motion.span
                                  className="absolute inset-0 bg-white/10"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </Link>
                            </Button>
                          </MagneticButton>
                        </Card3D>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </motion.div>

      {/* Slide indicators with enhanced animations */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center space-y-4">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1)
                setCurrent(index)
                setProgress(0)
              }}
              className="group relative h-3 w-12 overflow-hidden rounded-full bg-white/20 transition-all hover:bg-white/30"
              aria-label={`Go to slide ${index + 1}`}
              onMouseEnter={() => setCursorVariant("button")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              {current === index && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: progressSpring,
                    backgroundColor: slides[index].color,
                  }}
                  layoutId="activeIndicator"
                />
              )}
              <div className="absolute inset-0 w-full scale-x-0 bg-white/50 transition-transform origin-left group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        {/* Controls with enhanced visual feedback */}
        <div className="flex space-x-3">
          <motion.button
            onClick={() => setIsPaused(!isPaused)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/25"
            aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            {isPaused ? <Play className="h-4 w-4 text-white" /> : <Pause className="h-4 w-4 text-white" />}
          </motion.button>

          <motion.button
            onClick={() => setIsMuted(!isMuted)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all hover:bg-white/25"
            aria-label={isMuted ? "Unmute" : "Mute"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("button")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="relative">
              {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
              {!isMuted && (
                <div className="absolute -right-3 -top-3">
                  <AudioVisualizer isPlaying={!isPaused} isMuted={isMuted} color={currentSlide.color} />
                </div>
              )}
            </div>
          </motion.button>
        </div>
      </div>

      {/* Navigation buttons with enhanced hover effects */}
      <div
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2"
        onMouseEnter={() => setCursorVariant("leftArrow")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <motion.button
          onClick={prevSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${currentSlide.color}50` }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous slide"
        >
          <motion.div initial={{ x: 0 }} whileHover={{ x: -2 }} transition={{ type: "spring", stiffness: 300 }}>
            <ChevronLeft className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>

      <div
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2"
        onMouseEnter={() => setCursorVariant("rightArrow")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <motion.button
          onClick={nextSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
          whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${currentSlide.color}50` }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next slide"
        >
          <motion.div initial={{ x: 0 }} whileHover={{ x: 2 }} transition={{ type: "spring", stiffness: 300 }}>
            <ChevronRight className="h-6 w-6" />
          </motion.div>
        </motion.button>
      </div>

      {/* Enhanced slide number with animated transitions */}
      <motion.div
        className="absolute right-8 top-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-baseline font-mono text-white/70">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-3xl font-bold"
            style={{ color: currentSlide.color }}
          >
            {current + 1}
          </motion.span>
          <span className="mx-2 text-xl">/</span>
          <span className="text-xl">{slides.length}</span>
        </div>
      </motion.div>

      {/* Keyboard shortcuts help */}
      <motion.div
        className="absolute left-8 bottom-8 z-20 text-xs text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded mr-1">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd>
            <span className="ml-1">Navigate</span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd>
            <span className="ml-1">Pause</span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-white/10 rounded">M</kbd>
            <span className="ml-1">Mute</span>
          </div>
        </div>
      </motion.div>

      {/* Mouse scroll indicator for first-time visitors */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className="w-1 h-1 bg-white rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
        <span className="text-xs text-white/50 mt-2">Scroll to explore</span>
      </motion.div>
    </div>
  )
}
