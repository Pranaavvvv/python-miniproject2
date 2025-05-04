"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  AlertCircle,
  BarChart3,
  Bell,
  Command,
  Download,
  Hexagon,
  LineChart,
  RefreshCw,
  Search,
  ShoppingBag,
  Tag,
  TrendingUp,
  ChevronDown,
  Filter,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  DollarSign,
  Users,
  Package,
  Truck,
  CheckCircle,
  BarChart,
  BarChart2,
} from "lucide-react"

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [systemStatus, setSystemStatus] = useState(85)
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<"admin" | "business" | "customer">("admin")
  const [salesData, setSalesData] = useState({
    daily: 245000,
    weekly: 1865000,
    monthly: 7450000,
    growth: 24.8,
  })
  const [ordersData, setOrdersData] = useState({
    pending: 182,
    processing: 324,
    shipped: 642,
    delivered: 1285,
    total: 2433,
  })
  const [recommendationMetrics, setRecommendationMetrics] = useState({
    clickThroughRate: 18.7,
    conversionRate: 4.2,
    relevanceScore: 86,
    personalizedViews: 12845,
  })
  const [userInteractions, setUserInteractions] = useState({
    productViews: 28450,
    addToCart: 4320,
    purchases: 2433,
    searches: 15680,
    recommendationClicks: 5320,
  })
  const [aiFeatureUsage, setAiFeatureUsage] = useState({
    chatbotInteractions: 4850,
    visualSearches: 1240,
    nlpQueries: 3680,
    recommendationEngagements: 9540,
  })
  const [topRecommendedProducts, setTopRecommendedProducts] = useState([
    { id: 1, name: "Premium Wireless Earbuds", sales: 128, conversionRate: 8.4, method: "Collaborative" },
    { id: 2, name: "Smart Fitness Watch", sales: 96, conversionRate: 7.2, method: "Content-based" },
    { id: 3, name: "Ultra HD Smart TV", sales: 84, conversionRate: 6.5, method: "Context-aware" },
    { id: 4, name: "Professional DSLR Camera", sales: 72, conversionRate: 5.8, method: "Hybrid" },
    { id: 5, name: "Gaming Laptop", sales: 65, conversionRate: 5.2, method: "Collaborative" },
  ])
  const [recentCustomers, setRecentCustomers] = useState([
    { id: "USR-7829", name: "Rahul Sharma", interactions: 24, purchases: 3, recommendationClicks: 12 },
    { id: "USR-7828", name: "Priya Patel", interactions: 18, purchases: 2, recommendationClicks: 8 },
    { id: "USR-7827", name: "Amit Kumar", interactions: 32, purchases: 5, recommendationClicks: 15 },
    { id: "USR-7826", name: "Neha Singh", interactions: 14, purchases: 1, recommendationClicks: 6 },
    { id: "USR-7825", name: "Vikram Mehta", interactions: 27, purchases: 4, recommendationClicks: 11 },
  ])
  const [discountEffectiveness, setDiscountEffectiveness] = useState({
    personalizedConversion: 8.4,
    generalConversion: 3.2,
    totalDiscountsClaimed: 1845,
    revenue: 1250000,
  })
  const [recommendationMethods, setRecommendationMethods] = useState({
    collaborative: 42,
    contentBased: 28,
    contextAware: 18,
    hybrid: 12,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)

  // Performance data for charts
  const performanceData = [
    { name: "Mon", cpu: 65, memory: 78, network: 72 },
    { name: "Tue", cpu: 78, memory: 65, network: 80 },
    { name: "Wed", cpu: 92, memory: 70, network: 75 },
    { name: "Thu", cpu: 84, memory: 85, network: 82 },
    { name: "Fri", cpu: 96, memory: 75, network: 88 },
    { name: "Sat", cpu: 88, memory: 80, network: 78 },
    { name: "Sun", cpu: 72, memory: 68, network: 70 },
  ]

  const pieChartData = [
    { name: "Collaborative", value: 42, color: "#9333ea" },
    { name: "Content-Based", value: 28, color: "#06b6d4" },
    { name: "Context-Aware", value: 18, color: "#3b82f6" },
    { name: "Hybrid", value: 12, color: "#10b981" },
  ]

  const lineChartData = [
    { month: "Jan", ctr: 12.4, conversion: 3.2 },
    { month: "Feb", ctr: 14.2, conversion: 3.5 },
    { month: "Mar", ctr: 13.8, conversion: 3.3 },
    { month: "Apr", ctr: 15.6, conversion: 3.8 },
    { month: "May", ctr: 16.2, conversion: 4.0 },
    { month: "Jun", ctr: 17.8, conversion: 4.3 },
    { month: "Jul", ctr: 18.4, conversion: 4.1 },
    { month: "Aug", ctr: 19.2, conversion: 4.5 },
    { month: "Sep", ctr: 18.7, conversion: 4.2 },
  ]

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)

      // Update recommendation metrics with small random fluctuations
      setRecommendationMetrics((prev) => ({
        ...prev,
        clickThroughRate: +(prev.clickThroughRate + (Math.random() * 0.6 - 0.3)).toFixed(1),
        conversionRate: +(prev.conversionRate + (Math.random() * 0.4 - 0.2)).toFixed(1),
        relevanceScore: Math.min(100, Math.max(70, prev.relevanceScore + Math.floor(Math.random() * 3 - 1))),
      }))

      // Update user interactions
      setUserInteractions((prev) => ({
        ...prev,
        productViews: prev.productViews + Math.floor(Math.random() * 50),
        addToCart: prev.addToCart + Math.floor(Math.random() * 10),
        searches: prev.searches + Math.floor(Math.random() * 30),
      }))

      // Update AI feature usage
      setAiFeatureUsage((prev) => ({
        ...prev,
        chatbotInteractions: prev.chatbotInteractions + Math.floor(Math.random() * 5),
        visualSearches: prev.visualSearches + Math.floor(Math.random() * 3),
        nlpQueries: prev.nlpQueries + Math.floor(Math.random() * 4),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        // Use purple tones to match ShopMart theme
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50)}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Draw pie chart
  // useEffect(() => {
  //   const canvas = pieChartRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext("2d")
  //   if (!ctx) return

  //   canvas.width = canvas.offsetWidth
  //   canvas.height = canvas.offsetHeight

  //   const centerX = canvas.width / 2
  //   const centerY = canvas.height / 2
  //   const radius = Math.min(centerX, centerY) - 20

  //   const data = [
  //     { value: recommendationMethods.collaborative, color: "#9333ea" },
  //     { value: recommendationMethods.contentBased, color: "#06b6d4" },
  //     { value: recommendationMethods.contextAware, color: "#3b82f6" },
  //     { value: recommendationMethods.hybrid, color: "#10b981" },
  //   ]

  //   const total = data.reduce((sum, item) => sum + item.value, 0)
  //   let startAngle = 0

  //   data.forEach((item) => {
  //     const sliceAngle = (2 * Math.PI * item.value) / total

  //     ctx.beginPath()
  //     ctx.fillStyle = item.color
  //     ctx.moveTo(centerX, centerY)
  //     ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
  //     ctx.closePath()
  //     ctx.fill()

  //     // Add a white border
  //     ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
  //     ctx.lineWidth = 1
  //     ctx.stroke()

  //     // Calculate position for labels
  //     const labelAngle = startAngle + sliceAngle / 2
  //     const labelRadius = radius * 0.7
  //     const labelX = centerX + labelRadius * Math.cos(labelAngle)
  //     const labelY = centerY + labelRadius * Math.sin(labelAngle)

  //     // Draw percentage
  //     ctx.fillStyle = "#ffffff"
  //     ctx.font = "bold 12px Arial"
  //     ctx.textAlign = "center"
  //     ctx.textBaseline = "middle"
  //     ctx.fillText(`${item.value}%`, labelX, labelY)

  //     startAngle += sliceAngle
  //   })

  //   // Draw a circle in the middle
  //   ctx.beginPath()
  //   ctx.fillStyle = "#1e293b"
  //   ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI)
  //   ctx.fill()
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  //   ctx.stroke()

  //   // Draw title in the middle
  //   ctx.fillStyle = "#ffffff"
  //   ctx.font = "bold 12px Arial"
  //   ctx.textAlign = "center"
  //   ctx.textBaseline = "middle"
  //   ctx.fillText("Recommendation", centerX, centerY - 8)
  //   ctx.fillText("Methods", centerX, centerY + 8)
  // }, [recommendationMethods])

  // Draw bar chart
  // useEffect(() => {
  //   const canvas = barChartRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext("2d")
  //   if (!ctx) return

  //   canvas.width = canvas.offsetWidth
  //   canvas.height = canvas.offsetHeight

  //   const padding = 40
  //   const width = canvas.width - padding * 2
  //   const height = canvas.height - padding * 2
  //   const barCount = 7
  //   const barWidth = width / barCount - 10

  //   const data = [
  //     { label: "Mon", value: 65, color: "#9333ea" },
  //     { label: "Tue", value: 78, color: "#a855f7" },
  //     { label: "Wed", value: 92, color: "#c084fc" },
  //     { label: "Thu", value: 84, color: "#d8b4fe" },
  //     { label: "Fri", value: 96, color: "#9333ea" },
  //     { label: "Sat", value: 88, color: "#a855f7" },
  //     { label: "Sun", value: 72, color: "#c084fc" },
  //   ]

  //   // Draw axes
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  //   ctx.lineWidth = 1

  //   // X-axis
  //   ctx.beginPath()
  //   ctx.moveTo(padding, canvas.height - padding)
  //   ctx.lineTo(canvas.width - padding, canvas.height - padding)
  //   ctx.stroke()

  //   // Y-axis
  //   ctx.beginPath()
  //   ctx.moveTo(padding, padding)
  //   ctx.lineTo(padding, canvas.height - padding)
  //   ctx.stroke()

  //   // Draw grid lines
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
  //   for (let i = 0; i <= 5; i++) {
  //     const y = padding + (height - height * (i / 5))
  //     ctx.beginPath()
  //     ctx.moveTo(padding, y)
  //     ctx.lineTo(canvas.width - padding, y)
  //     ctx.stroke()

  //     // Y-axis labels
  //     ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  //     ctx.font = "10px Arial"
  //     ctx.textAlign = "right"
  //     ctx.textBaseline = "middle"
  //     ctx.fillText(`${i * 20}`, padding - 5, y)
  //   }

  //   // Draw bars
  //   data.forEach((item, index) => {
  //     const x = padding + index * (barWidth + 10)
  //     const barHeight = (item.value / 100) * height
  //     const y = canvas.height - padding - barHeight

  //     // Create gradient
  //     const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding)
  //     gradient.addColorStop(0, item.color)
  //     gradient.addColorStop(1, `${item.color}50`)

  //     // Draw bar
  //     ctx.fillStyle = gradient
  //     ctx.beginPath()
  //     ctx.roundRect(x, y, barWidth, barHeight, 4)
  //     ctx.fill()

  //     // Draw value on top of bar
  //     ctx.fillStyle = "#ffffff"
  //     ctx.font = "bold 10px Arial"
  //     ctx.textAlign = "center"
  //     ctx.textBaseline = "bottom"
  //     ctx.fillText(`${item.value}`, x + barWidth / 2, y - 5)

  //     // X-axis labels
  //     ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  //     ctx.font = "10px Arial"
  //     ctx.textAlign = "center"
  //     ctx.textBaseline = "top"
  //     ctx.fillText(item.label, x + barWidth / 2, canvas.height - padding + 5)
  //   })

  //   // Chart title
  //   ctx.fillStyle = "#ffffff"
  //   ctx.font = "bold 12px Arial"
  //   ctx.textAlign = "center"
  //   ctx.textBaseline = "top"
  //   ctx.fillText("Weekly Sales Performance", canvas.width / 2, 15)
  // }, [])

  // Draw line chart
  // useEffect(() => {
  //   const canvas = lineChartRef.current
  //   if (!canvas) return

  //   const ctx = canvas.getContext("2d")
  //   if (!ctx) return

  //   canvas.width = canvas.offsetWidth
  //   canvas.height = canvas.offsetHeight

  //   const padding = 40
  //   const width = canvas.width - padding * 2
  //   const height = canvas.height - padding * 2

  //   const data = [
  //     { month: "Jan", ctr: 12.4, conversion: 3.2 },
  //     { month: "Feb", ctr: 14.2, conversion: 3.5 },
  //     { month: "Mar", ctr: 13.8, conversion: 3.3 },
  //     { month: "Apr", ctr: 15.6, conversion: 3.8 },
  //     { month: "May", ctr: 16.2, conversion: 4.0 },
  //     { month: "Jun", ctr: 17.8, conversion: 4.3 },
  //     { month: "Jul", ctr: 18.4, conversion: 4.1 },
  //     { month: "Aug", ctr: 19.2, conversion: 4.5 },
  //     { month: "Sep", ctr: 18.7, conversion: 4.2 },
  //   ]

  //   // Draw axes
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
  //   ctx.lineWidth = 1

  //   // X-axis
  //   ctx.beginPath()
  //   ctx.moveTo(padding, canvas.height - padding)
  //   ctx.lineTo(canvas.width - padding, canvas.height - padding)
  //   ctx.stroke()

  //   // Y-axis
  //   ctx.beginPath()
  //   ctx.moveTo(padding, padding)
  //   ctx.lineTo(padding, canvas.height - padding)
  //   ctx.stroke()

  //   // Draw grid lines
  //   ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
  //   for (let i = 0; i <= 5; i++) {
  //     const y = padding + (height - height * (i / 5))
  //     ctx.beginPath()
  //     ctx.moveTo(padding, y)
  //     ctx.lineTo(canvas.width - padding, y)
  //     ctx.stroke()

  //     // Y-axis labels
  //     ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  //     ctx.font = "10px Arial"
  //     ctx.textAlign = "right"
  //     ctx.textBaseline = "middle"
  //     ctx.fillText(`${i * 5}%`, padding - 5, y)
  //   }

  //   // X-axis labels
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width

  //     ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
  //     ctx.font = "10px Arial"
  //     ctx.textAlign = "center"
  //     ctx.textBaseline = "top"
  //     ctx.fillText(item.month, x, canvas.height - padding + 5)
  //   })

  //   // Draw CTR line
  //   ctx.strokeStyle = "#9333ea"
  //   ctx.lineWidth = 2
  //   ctx.beginPath()
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width
  //     const y = padding + height - (item.ctr / 25) * height

  //     if (index === 0) {
  //       ctx.moveTo(x, y)
  //     } else {
  //       ctx.lineTo(x, y)
  //     }
  //   })
  //   ctx.stroke()

  //   // Add gradient under CTR line
  //   const ctrGradient = ctx.createLinearGradient(0, padding, 0, canvas.height - padding)
  //   ctrGradient.addColorStop(0, "rgba(147, 51, 234, 0.3)")
  //   ctrGradient.addColorStop(1, "rgba(147, 51, 234, 0)")

  //   ctx.fillStyle = ctrGradient
  //   ctx.beginPath()
  //   ctx.moveTo(padding, canvas.height - padding)
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width
  //     const y = padding + height - (item.ctr / 25) * height
  //     ctx.lineTo(x, y)
  //   })
  //   ctx.lineTo(canvas.width - padding, canvas.height - padding)
  //   ctx.closePath()
  //   ctx.fill()

  //   // Draw data points for CTR
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width
  //     const y = padding + height - (item.ctr / 25) * height

  //     ctx.fillStyle = "#9333ea"
  //     ctx.beginPath()
  //     ctx.arc(x, y, 4, 0, Math.PI * 2)
  //     ctx.fill()

  //     ctx.fillStyle = "#ffffff"
  //     ctx.beginPath()
  //     ctx.arc(x, y, 2, 0, Math.PI * 2)
  //     ctx.fill()
  //   })

  //   // Draw Conversion line
  //   ctx.strokeStyle = "#06b6d4"
  //   ctx.lineWidth = 2
  //   ctx.beginPath()
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width
  //     const y = padding + height - (item.conversion / 5) * height

  //     if (index === 0) {
  //       ctx.moveTo(x, y)
  //     } else {
  //       ctx.lineTo(x, y)
  //     }
  //   })
  //   ctx.stroke()

  //   // Draw data points for Conversion
  //   data.forEach((item, index) => {
  //     const x = padding + (index / (data.length - 1)) * width
  //     const y = padding + height - (item.conversion / 5) * height

  //     ctx.fillStyle = "#06b6d4"
  //     ctx.beginPath()
  //     ctx.arc(x, y, 4, 0, Math.PI * 2)
  //     ctx.fill()

  //     ctx.fillStyle = "#ffffff"
  //     ctx.beginPath()
  //     ctx.arc(x, y, 2, 0, Math.PI * 2)
  //     ctx.fill()
  //   })

  //   // Chart title
  //   ctx.fillStyle = "#ffffff"
  //   ctx.font = "bold 12px Arial"
  //   ctx.textAlign = "center"
  //   ctx.textBaseline = "top"
  //   ctx.fillText("CTR vs Conversion Rate Trends", canvas.width / 2, 15)

  //   // Legend
  //   ctx.fillStyle = "#9333ea"
  //   ctx.fillRect(padding, 15, 10, 10)
  //   ctx.fillStyle = "#ffffff"
  //   ctx.font = "10px Arial"
  //   ctx.textAlign = "left"
  //   ctx.textBaseline = "middle"
  //   ctx.fillText("CTR", padding + 15, 20)

  //   ctx.fillStyle = "#06b6d4"
  //   ctx.fillRect(padding + 60, 15, 10, 10)
  //   ctx.fillStyle = "#ffffff"
  //   ctx.fillText("Conversion", padding + 75, 20)
  // }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getTrendIcon = () => {
    if (recommendationMetrics.clickThroughRate > 15) {
      return <ArrowUpRight className="h-4 w-4 text-green-500" />
    } else if (recommendationMetrics.clickThroughRate < 10) {
      return <ArrowDownRight className="h-4 w-4 text-red-500" />
    } else {
      return <RefreshCw className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-cyan-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-purple-400 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">SHOPMART DASHBOARD</div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed left-0 top-0 z-50 w-full transition-all duration-300 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Hexagon className="h-8 w-8 text-purple-500 mr-2" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                SHOPMART ANALYTICS
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search analytics..."
                  className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-slate-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-slate-800/50 border-slate-700 text-sm">
                      <span className="mr-2">
                        {activeRole === "admin" ? "Admin" : activeRole === "business" ? "Business" : "Customer"}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <DropdownMenuItem onClick={() => setActiveRole("admin")} className="focus:bg-slate-700">
                      Admin View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveRole("business")} className="focus:bg-slate-700">
                      Business View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveRole("customer")} className="focus:bg-slate-700">
                      Customer View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full animate-pulse"></span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Select defaultValue="today">
                  <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-sm">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                  </SelectContent>
                </Select>

                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback className="bg-slate-700 text-purple-500">AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 relative z-10 pt-24">
        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Command} label="Dashboard" active onClick={() => router.push("/dashboard")} />
                  <NavItem icon={TrendingUp} label="Analytics" onClick={() => router.push("/dashboard/analytics")} />
                  <NavItem icon={Tag} label="Discounts" onClick={() => router.push("/dashboard/discounts")} />
                  <NavItem icon={ShoppingBag} label="Orders" onClick={() => router.push("/dashboard/orders")} />
                  <NavItem icon={BarChart} label="Reports" onClick={() => router.push("/dashboard/reports")} />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">AI SYSTEM STATUS</div>
                  <div className="space-y-3">
                    <StatusItem
                      label="Recommendation Engine"
                      value={recommendationMetrics.relevanceScore}
                      color="purple"
                    />
                    <StatusItem
                      label="Conversion Rate"
                      value={recommendationMetrics.conversionRate * 10}
                      color="green"
                    />
                    <StatusItem
                      label="Click-Through Rate"
                      value={recommendationMetrics.clickThroughRate * 2}
                      color="cyan"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <OverviewCard
                  title="Total Sales"
                  value={formatCurrency(salesData.monthly)}
                  icon={DollarSign}
                  change={+24.8}
                  changeText="vs last month"
                />
                <OverviewCard
                  title="Orders"
                  value={ordersData.total.toString()}
                  icon={Package}
                  change={+12.5}
                  changeText="vs last month"
                />
                <OverviewCard title="Customers" value="18,452" icon={Users} change={+8.2} changeText="vs last month" />
                <OverviewCard
                  title="Conversion"
                  value={`${recommendationMetrics.conversionRate}%`}
                  icon={BarChart2}
                  change={+0.8}
                  changeText="vs last month"
                />
              </div>

              {/* Charts Section */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                      Performance Analytics
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-1 animate-pulse"></div>
                        LIVE
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Click-Through Rate"
                      value={`${recommendationMetrics.clickThroughRate}%`}
                      icon={BarChart3}
                      trend="up"
                      color="purple"
                      detail="From recommendations"
                    />
                    <MetricCard
                      title="Conversion Rate"
                      value={`${recommendationMetrics.conversionRate}%`}
                      icon={LineChart}
                      trend="stable"
                      color="cyan"
                      detail="Purchases from recs"
                    />
                    <MetricCard
                      title="Personalized Views"
                      value={recommendationMetrics.personalizedViews.toLocaleString("en-IN")}
                      icon={PieChart}
                      trend="up"
                      color="blue"
                      detail="Unique user sessions"
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="performance" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-800/50 p-1">
                          <TabsTrigger
                            value="performance"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                          >
                            Performance
                          </TabsTrigger>
                          <TabsTrigger
                            value="methods"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                          >
                            Methods
                          </TabsTrigger>
                          <TabsTrigger
                            value="products"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                          >
                            Top Products
                          </TabsTrigger>
                        </TabsList>
                      </div>

                      <TabsContent value="performance" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsBarChart
                                data={performanceData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis
                                  dataKey="name"
                                  tick={{ fill: "#94a3b8" }}
                                  axisLine={{ stroke: "#334155" }}
                                  tickLine={{ stroke: "#334155" }}
                                />
                                <YAxis
                                  tick={{ fill: "#94a3b8" }}
                                  axisLine={{ stroke: "#334155" }}
                                  tickLine={{ stroke: "#334155" }}
                                />
                                <RechartsTooltip
                                  contentStyle={{
                                    backgroundColor: "#1e293b",
                                    borderColor: "#475569",
                                    color: "#f8fafc",
                                  }}
                                />
                                <Legend
                                  formatter={(value) => (
                                    <span style={{ color: "#94a3b8" }}>
                                      {value === "cpu" ? "CPU" : value === "memory" ? "Memory" : "Network"}
                                    </span>
                                  )}
                                />
                                <Bar dataKey="cpu" fill="#9333ea" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="memory" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="network" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              </RechartsBarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsLineChart
                                data={lineChartData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                              >
                                <defs>
                                  <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                                  </linearGradient>
                                  <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                  </linearGradient>
                                </defs>
                                <XAxis
                                  dataKey="month"
                                  tick={{ fill: "#94a3b8" }}
                                  axisLine={{ stroke: "#334155" }}
                                  tickLine={{ stroke: "#334155" }}
                                />
                                <YAxis
                                  tick={{ fill: "#94a3b8" }}
                                  axisLine={{ stroke: "#334155" }}
                                  tickLine={{ stroke: "#334155" }}
                                  tickFormatter={(value) => `${value}%`}
                                />
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <RechartsTooltip
                                  contentStyle={{
                                    backgroundColor: "#1e293b",
                                    borderColor: "#475569",
                                    color: "#f8fafc",
                                  }}
                                  formatter={(value: number) => [`${value}%`, ""]}
                                />
                                <Legend
                                  formatter={(value) => (
                                    <span style={{ color: "#94a3b8" }}>{value === "ctr" ? "CTR" : "Conversion"}</span>
                                  )}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="ctr"
                                  stroke="#9333ea"
                                  strokeWidth={2}
                                  activeDot={{ r: 8, fill: "#9333ea", stroke: "#f8fafc" }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="conversion"
                                  stroke="#06b6d4"
                                  strokeWidth={2}
                                  activeDot={{ r: 8, fill: "#06b6d4", stroke: "#f8fafc" }}
                                />
                              </RechartsLineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="methods" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartsPieChart>
                                <Pie
                                  data={pieChartData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  innerRadius={40}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                  {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <RechartsTooltip
                                  contentStyle={{
                                    backgroundColor: "#1e293b",
                                    borderColor: "#475569",
                                    color: "#f8fafc",
                                  }}
                                  formatter={(value: number) => [`${value}%`, "Percentage"]}
                                />
                              </RechartsPieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                            <div className="space-y-4">
                              <RecommendationMethod
                                name="Collaborative Filtering"
                                percentage={recommendationMethods.collaborative}
                                description="Based on similar user preferences"
                              />
                              <RecommendationMethod
                                name="Content-Based Filtering"
                                percentage={recommendationMethods.contentBased}
                                description="Based on product attributes"
                              />
                              <RecommendationMethod
                                name="Context-Aware"
                                percentage={recommendationMethods.contextAware}
                                description="Based on user context and behavior"
                              />
                              <RecommendationMethod
                                name="Hybrid Approach"
                                percentage={recommendationMethods.hybrid}
                                description="Combination of multiple methods"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="products" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-5">Product</div>
                            <div className="col-span-2">Sales</div>
                            <div className="col-span-2">Conv. Rate</div>
                            <div className="col-span-3">Method</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            {topRecommendedProducts.map((product) => (
                              <ProductRow
                                key={product.id}
                                name={product.name}
                                sales={product.sales}
                                conversionRate={product.conversionRate}
                                method={product.method}
                              />
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Order Status */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Package className="mr-2 h-5 w-5 text-purple-500" />
                    Order Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <OrderStatusCard status="Pending" count={ordersData.pending} icon={Clock} color="amber" />
                    <OrderStatusCard status="Processing" count={ordersData.processing} icon={RefreshCw} color="blue" />
                    <OrderStatusCard status="Shipped" count={ordersData.shipped} icon={Truck} color="purple" />
                    <OrderStatusCard status="Delivered" count={ordersData.delivered} icon={CheckCircle} color="green" />
                  </div>
                </CardContent>
              </Card>

              {/* Personalized Discounts & Customer Analysis */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Tag className="mr-2 h-5 w-5 text-purple-500" />
                    Personalized Discounts & Customer Analysis
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-purple-400 border-purple-500/50">
                    Performance
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-300 mb-3">Discount Effectiveness</h3>
                      <div className="space-y-3">
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-slate-500">Personalized Conversion Rate</div>
                            <div className="text-xs text-purple-400">
                              {discountEffectiveness.personalizedConversion}%
                            </div>
                          </div>
                          <div className="text-sm font-medium text-slate-200 mb-2">vs. General Conversion Rate</div>
                          <Progress
                            value={discountEffectiveness.personalizedConversion * 10}
                            className="h-1.5 bg-slate-700"
                          >
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: `${discountEffectiveness.personalizedConversion * 10}%` }}
                            />
                          </Progress>
                          <div className="mt-2 text-xs text-slate-400">
                            General conversion: {discountEffectiveness.generalConversion}%
                          </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs text-slate-500">Total Discounts Claimed</div>
                            <div className="text-xs text-purple-400">
                              {discountEffectiveness.totalDiscountsClaimed.toLocaleString("en-IN")}
                            </div>
                          </div>
                          <div className="text-sm font-medium text-slate-200 mb-2">Revenue Generated</div>
                          <div className="text-lg font-mono text-cyan-400">
                            {formatCurrency(discountEffectiveness.revenue)}
                          </div>
                          <div className="mt-1 text-xs text-green-400">+18.5% from previous period</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-slate-300 mb-3">Recent Customer Activity</h3>
                      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                        <div className="grid grid-cols-12 text-xs text-slate-400 p-2 border-b border-slate-700/50 bg-slate-800/50">
                          <div className="col-span-5">Customer</div>
                          <div className="col-span-2">Interactions</div>
                          <div className="col-span-2">Purchases</div>
                          <div className="col-span-3">Rec. Clicks</div>
                        </div>

                        <div className="divide-y divide-slate-700/30">
                          {recentCustomers.map((customer) => (
                            <CustomerRow
                              key={customer.id}
                              name={customer.name}
                              interactions={customer.interactions}
                              purchases={customer.purchases}
                              recommendationClicks={customer.recommendationClicks}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-slate-700/50 pt-4">
                  <div className="w-full flex items-center justify-between">
                    <div className="text-sm text-slate-400">
                      Personalization effectiveness:{" "}
                      <span className="text-purple-400">
                        {Math.round(
                          (discountEffectiveness.personalizedConversion / discountEffectiveness.generalConversion) *
                            100,
                        )}
                        % higher
                      </span>
                    </div>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      View Detailed Report
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                      <div className="text-3xl font-mono text-purple-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Today's Orders</div>
                        <div className="text-sm font-mono text-slate-200">
                          {ordersData.pending + ordersData.processing}
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Revenue</div>
                        <div className="text-sm font-mono text-slate-200">{formatCurrency(salesData.daily)}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Filter} label="Tune AI Model" />
                    <ActionButton icon={Tag} label="New Discount" />
                    <ActionButton icon={Download} label="Export Data" />
                    <ActionButton icon={BarChart} label="Generate Report" />
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AlertItem
                      title="Model Retraining Required"
                      time="14:32:12"
                      description="Recommendation model accuracy below threshold"
                      type="warning"
                    />
                    <AlertItem
                      title="New User Segment Detected"
                      time="13:45:06"
                      description="Potential for targeted recommendations"
                      type="info"
                    />
                    <AlertItem
                      title="AI Model Update Available"
                      time="09:12:45"
                      description="New version with improved accuracy"
                      type="update"
                    />
                    <AlertItem
                      title="Discount Campaign Ended"
                      time="04:30:00"
                      description="Summer sale promotion has ended"
                      type="success"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Sales & Revenue */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Sales & Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Daily Sales</div>
                        <div className="text-xs text-cyan-400">{formatCurrency(salesData.daily)}</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Weekly Sales</div>
                        <div className="text-xs text-purple-400">{formatCurrency(salesData.weekly)}</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Monthly Sales</div>
                        <div className="text-xs text-blue-400">{formatCurrency(salesData.monthly)}</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-400">Growth Rate</div>
                        <div className="flex items-center">
                          <Slider defaultValue={[salesData.growth]} max={50} step={0.1} className="w-24 mr-2" />
                          <span className="text-green-400">+{salesData.growth}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-purple-400" : "text-slate-400 hover:text-slate-100"}`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-pink-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      default:
        return "from-purple-500 to-pink-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string
  value: string
  icon: React.ElementType
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case "down":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const getColor = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      default:
        return "from-purple-500 to-pink-500 border-purple-500/30"
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon
          className={`h-5 w-5 text-${color === "purple" ? "purple" : color === "cyan" ? "cyan" : color === "blue" ? "blue" : "green"}-500`}
        />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-purple-500 to-pink-500"></div>
    </div>
  )
}

// Overview card component
function OverviewCard({
  title,
  value,
  icon: Icon,
  change,
  changeText,
}: {
  title: string
  value: string
  icon: React.ElementType
  change: number
  changeText: string
}) {
  return (
    <Card className="bg-slate-800/50 border-slate-700/50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-slate-400">{title}</div>
          <div className="bg-slate-700/50 p-2 rounded-full">
            <Icon className="h-4 w-4 text-purple-400" />
          </div>
        </div>
        <div className="text-xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-xs">
          {change > 0 ? (
            <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
          )}
          <span className={change > 0 ? "text-green-400" : "text-red-400"}>
            {change > 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-slate-500 ml-1">{changeText}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Order status card component
function OrderStatusCard({
  status,
  count,
  icon: Icon,
  color,
}: {
  status: string
  count: number
  icon: React.ElementType
  color: "amber" | "blue" | "purple" | "green"
}) {
  const getColorClasses = () => {
    switch (color) {
      case "amber":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      case "blue":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30"
      case "purple":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30"
      case "green":
        return "bg-green-500/10 text-green-400 border-green-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className={`rounded-lg border p-4 ${getColorClasses()}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="font-medium">{status}</div>
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-xs mt-1 opacity-70">Orders</div>
    </div>
  )
}

// Product row component
function ProductRow({
  name,
  sales,
  conversionRate,
  method,
}: {
  name: string
  sales: number
  conversionRate: number
  method: string
}) {
  const getMethodBadge = () => {
    switch (method) {
      case "Collaborative":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
            Collaborative
          </Badge>
        )
      case "Content-based":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
            Content-based
          </Badge>
        )
      case "Context-aware":
        return (
          <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
            Context-aware
          </Badge>
        )
      case "Hybrid":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
            Hybrid
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-400 border-slate-500/30 text-xs">
            {method}
          </Badge>
        )
    }
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-5 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-300">{sales}</div>
      <div className="col-span-2 text-purple-400">{conversionRate}%</div>
      <div className="col-span-3">{getMethodBadge()}</div>
    </div>
  )
}

// Recommendation method component
function RecommendationMethod({
  name,
  percentage,
  description,
}: {
  name: string
  percentage: number
  description: string
}) {
  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {percentage}%
        </Badge>
      </div>
      <div className="mb-2">
        <div className="text-xs text-slate-500 mb-1">{description}</div>
        <Progress value={percentage} className="h-1.5 bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-500">Effectiveness: {Math.round(percentage * 0.9)}%</div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
          Details
        </Button>
      </div>
    </div>
  )
}

// Customer row component
function CustomerRow({
  name,
  interactions,
  purchases,
  recommendationClicks,
}: {
  name: string
  interactions: number
  purchases: number
  recommendationClicks: number
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-5 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-300">{interactions}</div>
      <div className="col-span-2 text-green-400">{purchases}</div>
      <div className="col-span-3 text-purple-400">{recommendationClicks}</div>
    </div>
  )
}

// Alert item component
function AlertItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Check, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "update":
        return { icon: Download, color: "text-purple-500 bg-purple-500/10 border-purple-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div>
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400">{description}</div>
      </div>
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-purple-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Add missing imports
function Info(props) {
  return <AlertCircle {...props} />
}

function Check(props) {
  return <CheckCircle {...props} />
}
