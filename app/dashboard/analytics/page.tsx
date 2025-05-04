"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  BarChart2,
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  Command,
  Download,
  Filter,
  Hexagon,
  LineChartIcon,
  PieChartIcon,
  RefreshCw,
  Search,
  ShoppingBag,
  Tag,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function AnalyticsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<"admin" | "business" | "customer">("admin")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Chart data
  const annualData = [
    { month: "Jan", value: 42 },
    { month: "Feb", value: 53 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 62 },
    { month: "May", value: 57 },
    { month: "Jun", value: 68 },
    { month: "Jul", value: 72 },
    { month: "Aug", value: 78 },
    { month: "Sep", value: 82 },
    { month: "Oct", value: 76 },
    { month: "Nov", value: 84 },
    { month: "Dec", value: 92 },
  ]

  const categoryData = [
    { category: "Electronics", value: 35 },
    { category: "Fashion", value: 25 },
    { category: "Home", value: 18 },
    { category: "Beauty", value: 12 },
    { category: "Sports", value: 10 },
  ]

  const deviceData = [
    { name: "Desktop", value: 45, color: "#9333ea" },
    { name: "Mobile", value: 35, color: "#06b6d4" },
    { name: "Tablet", value: 20, color: "#3b82f6" },
  ]

  const userActivityData = [
    { day: "Mon", newUsers: 120, returningUsers: 80 },
    { day: "Tue", newUsers: 150, returningUsers: 90 },
    { day: "Wed", newUsers: 180, returningUsers: 110 },
    { day: "Thu", newUsers: 160, returningUsers: 120 },
    { day: "Fri", newUsers: 190, returningUsers: 140 },
    { day: "Sat", newUsers: 220, returningUsers: 160 },
    { day: "Sun", newUsers: 200, returningUsers: 150 },
  ]

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
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

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">ANALYTICS</div>
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

                <Select defaultValue="month">
                  <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-sm">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
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
                  <NavItem icon={Command} label="Dashboard" onClick={() => router.push("/dashboard")} />
                  <NavItem
                    icon={TrendingUp}
                    label="Analytics"
                    active
                    onClick={() => router.push("/dashboard/analytics")}
                  />
                  <NavItem icon={Tag} label="Discounts" onClick={() => router.push("/dashboard/discounts")} />
                  <NavItem icon={ShoppingBag} label="Orders" onClick={() => router.push("/dashboard/orders")} />
                  <NavItem icon={BarChart} label="Reports" onClick={() => router.push("/dashboard/reports")} />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">ANALYTICS TOOLS</div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Filter className="mr-2 h-3.5 w-3.5" />
                      Filters
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main analytics content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {/* Page header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
                  <p className="text-slate-400 mt-1">Detailed insights and performance metrics</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700/50">
                    {formatDate(new Date())}
                  </Badge>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                </div>
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <LineChartIcon className="mr-2 h-5 w-5 text-purple-500" />
                      Annual Sales Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={annualData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
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
                          />
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f8fafc" }}
                            formatter={(value: number) => [`${value}`, "Value"]}
                            labelFormatter={(label) => `Month: ${label}`}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#9333ea"
                            strokeWidth={2}
                            activeDot={{ r: 8, fill: "#9333ea", stroke: "#f8fafc" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="transparent"
                            fillOpacity={0.3}
                            fill="url(#colorValue)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                      Sales by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis
                            dataKey="category"
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
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f8fafc" }}
                            formatter={(value: number) => [`${value}%`, "Percentage"]}
                            labelFormatter={(label) => `Category: ${label}`}
                          />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {categoryData.map((entry, index) => {
                              const colors = ["#9333ea", "#a855f7", "#c084fc", "#d8b4fe", "#e9d5ff"]
                              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            })}
                          </Bar>
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <PieChartIcon className="mr-2 h-5 w-5 text-purple-500" />
                      Traffic Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            innerRadius={40}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f8fafc" }}
                            formatter={(value: number) => [`${value}%`, "Percentage"]}
                          />
                          <Legend formatter={(value) => <span style={{ color: "#94a3b8" }}>{value}</span>} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                      User Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorNewUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorReturningUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis
                            dataKey="day"
                            tick={{ fill: "#94a3b8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                          />
                          <YAxis
                            tick={{ fill: "#94a3b8" }}
                            axisLine={{ stroke: "#334155" }}
                            tickLine={{ stroke: "#334155" }}
                          />
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <RechartsTooltip
                            contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f8fafc" }}
                          />
                          <Legend
                            formatter={(value) => (
                              <span style={{ color: "#94a3b8" }}>
                                {value === "newUsers" ? "New Users" : "Returning Users"}
                              </span>
                            )}
                          />
                          <Area
                            type="monotone"
                            dataKey="newUsers"
                            stroke="#9333ea"
                            fillOpacity={1}
                            fill="url(#colorNewUsers)"
                            activeDot={{ r: 8, fill: "#9333ea", stroke: "#f8fafc" }}
                          />
                          <Area
                            type="monotone"
                            dataKey="returningUsers"
                            stroke="#06b6d4"
                            fillOpacity={1}
                            fill="url(#colorReturningUsers)"
                            activeDot={{ r: 8, fill: "#06b6d4", stroke: "#f8fafc" }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics metrics */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                    Key Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricBox title="Conversion Rate" value="4.2%" change="+0.8%" positive={true} />
                    <MetricBox title="Avg. Order Value" value="₹3,450" change="+12.5%" positive={true} />
                    <MetricBox title="Cart Abandonment" value="68.3%" change="-2.1%" positive={true} />
                    <MetricBox title="Bounce Rate" value="42.7%" change="+3.4%" positive={false} />
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

// Metric box component
function MetricBox({
  title,
  value,
  change,
  positive,
}: {
  title: string
  value: string
  change: string
  positive: boolean
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-4">
      <div className="text-sm text-slate-400 mb-1">{title}</div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className={`text-xs ${positive ? "text-green-400" : "text-red-400"} flex items-center`}>
        {positive ? "↑" : "↓"} {change} vs. last period
      </div>
    </div>
  )
}
