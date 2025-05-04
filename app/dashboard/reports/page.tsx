"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  BarChart2,
  Bell,
  Calendar,
  ChevronDown,
  Command,
  Download,
  FileText,
  Filter,
  Hexagon,
  LineChartIcon,
  Printer,
  Search,
  Share2,
  ShoppingBag,
  Tag,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<"admin" | "business" | "customer">("admin")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Chart data
  const salesData = [
    { month: "Jan", value: 1250000 },
    { month: "Feb", value: 1450000 },
    { month: "Mar", value: 1350000 },
    { month: "Apr", value: 1650000 },
    { month: "May", value: 1550000 },
    { month: "Jun", value: 1850000 },
    { month: "Jul", value: 2050000 },
    { month: "Aug", value: 2250000 },
    { month: "Sep", value: 2150000 },
    { month: "Oct", value: 2350000 },
    { month: "Nov", value: 2550000 },
    { month: "Dec", value: 2750000 },
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

  const conversionData = [
    { stage: "Visit", value: 100 },
    { stage: "View", value: 68 },
    { stage: "Cart", value: 42 },
    { stage: "Checkout", value: 28 },
    { stage: "Purchase", value: 18 },
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
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
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">REPORTS</div>
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
                  placeholder="Search reports..."
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
                  <NavItem icon={TrendingUp} label="Analytics" onClick={() => router.push("/dashboard/analytics")} />
                  <NavItem icon={Tag} label="Discounts" onClick={() => router.push("/dashboard/discounts")} />
                  <NavItem icon={ShoppingBag} label="Orders" onClick={() => router.push("/dashboard/orders")} />
                  <NavItem icon={BarChart} label="Reports" active onClick={() => router.push("/dashboard/reports")} />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">REPORT TOOLS</div>
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
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Printer className="mr-2 h-3.5 w-3.5" />
                      Print
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Share2 className="mr-2 h-3.5 w-3.5" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main reports content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {/* Page header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Reports Dashboard</h1>
                  <p className="text-slate-400 mt-1">Comprehensive business analytics and insights</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-700/50">
                    {formatDate(new Date())}
                  </Badge>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>

              {/* Report tabs */}
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="bg-slate-800/50 p-1 mb-6">
                  <TabsTrigger
                    value="sales"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                  >
                    Sales Report
                  </TabsTrigger>
                  <TabsTrigger
                    value="products"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                  >
                    Product Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="customers"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                  >
                    Customer Analysis
                  </TabsTrigger>
                  <TabsTrigger
                    value="marketing"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-purple-400"
                  >
                    Marketing Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Total Revenue</p>
                            <p className="text-2xl font-bold">₹24.5M</p>
                            <p className="text-xs text-green-400">+18.2% vs last year</p>
                          </div>
                          <div className="bg-purple-500/20 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Average Order Value</p>
                            <p className="text-2xl font-bold">₹3,450</p>
                            <p className="text-xs text-green-400">+12.5% vs last year</p>
                          </div>
                          <div className="bg-cyan-500/20 p-2 rounded-full">
                            <BarChart2 className="h-5 w-5 text-cyan-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Conversion Rate</p>
                            <p className="text-2xl font-bold">4.2%</p>
                            <p className="text-xs text-green-400">+0.8% vs last year</p>
                          </div>
                          <div className="bg-blue-500/20 p-2 rounded-full">
                            <LineChartIcon className="h-5 w-5 text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

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
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <LineChartIcon className="h-12 w-12 text-purple-500 mx-auto mb-4 opacity-50" />
                              <p className="text-slate-400">Sales trend visualization</p>
                              <p className="text-xs text-slate-500 mt-1">Showing monthly revenue data</p>
                            </div>
                          </div>
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
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <BarChart2 className="h-12 w-12 text-purple-500 mx-auto mb-4 opacity-50" />
                              <p className="text-slate-400">Category distribution</p>
                              <p className="text-xs text-slate-500 mt-1">Showing sales by product category</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                          <LineChartIcon className="mr-2 h-5 w-5 text-purple-500" />
                          Conversion Funnel
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <BarChart className="h-12 w-12 text-purple-500 mx-auto mb-4 opacity-50" />
                              <p className="text-slate-400">Conversion funnel visualization</p>
                              <p className="text-xs text-slate-500 mt-1">Showing customer journey stages</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-slate-100 flex items-center text-base">
                          <BarChart className="mr-2 h-5 w-5 text-purple-500" />
                          Traffic Sources
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden p-4">
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <BarChart2 className="h-12 w-12 text-purple-500 mx-auto mb-4 opacity-50" />
                              <p className="text-slate-400">Traffic source distribution</p>
                              <p className="text-xs text-slate-500 mt-1">Showing visitor acquisition channels</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="products" className="mt-0">
                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                        Top Performing Products
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Units Sold</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead>Profit Margin</TableHead>
                            <TableHead>Growth</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Premium Wireless Earbuds</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>1,245</TableCell>
                            <TableCell>{formatCurrency(1245000)}</TableCell>
                            <TableCell>42%</TableCell>
                            <TableCell className="text-green-400">+24%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Smart Fitness Watch</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>982</TableCell>
                            <TableCell>{formatCurrency(982000)}</TableCell>
                            <TableCell>38%</TableCell>
                            <TableCell className="text-green-400">+18%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Ultra HD Smart TV</TableCell>
                            <TableCell>Electronics</TableCell>
                            <TableCell>645</TableCell>
                            <TableCell>{formatCurrency(3225000)}</TableCell>
                            <TableCell>32%</TableCell>
                            <TableCell className="text-green-400">+15%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Designer Handbag</TableCell>
                            <TableCell>Fashion</TableCell>
                            <TableCell>842</TableCell>
                            <TableCell>{formatCurrency(1684000)}</TableCell>
                            <TableCell>45%</TableCell>
                            <TableCell className="text-green-400">+22%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Premium Skincare Set</TableCell>
                            <TableCell>Beauty</TableCell>
                            <TableCell>1,124</TableCell>
                            <TableCell>{formatCurrency(1124000)}</TableCell>
                            <TableCell>52%</TableCell>
                            <TableCell className="text-green-400">+28%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <BarChart className="mr-2 h-5 w-5 text-purple-500" />
                        Inventory Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>In Stock</TableHead>
                            <TableHead>Reorder Level</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Premium Wireless Earbuds</TableCell>
                            <TableCell>EAR-001</TableCell>
                            <TableCell>245</TableCell>
                            <TableCell>50</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">In Stock</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Smart Fitness Watch</TableCell>
                            <TableCell>WAT-002</TableCell>
                            <TableCell>42</TableCell>
                            <TableCell>50</TableCell>
                            <TableCell>
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Low Stock</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Ultra HD Smart TV</TableCell>
                            <TableCell>TV-003</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>20</TableCell>
                            <TableCell>
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Out of Stock</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Designer Handbag</TableCell>
                            <TableCell>BAG-004</TableCell>
                            <TableCell>124</TableCell>
                            <TableCell>30</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">In Stock</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Premium Skincare Set</TableCell>
                            <TableCell>SKN-005</TableCell>
                            <TableCell>85</TableCell>
                            <TableCell>40</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">In Stock</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="customers" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Total Customers</p>
                            <p className="text-2xl font-bold">18,452</p>
                            <p className="text-xs text-green-400">+8.2% vs last month</p>
                          </div>
                          <div className="bg-purple-500/20 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">New Customers</p>
                            <p className="text-2xl font-bold">1,245</p>
                            <p className="text-xs text-green-400">+12.5% vs last month</p>
                          </div>
                          <div className="bg-cyan-500/20 p-2 rounded-full">
                            <BarChart2 className="h-5 w-5 text-cyan-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Customer Retention</p>
                            <p className="text-2xl font-bold">78.4%</p>
                            <p className="text-xs text-green-400">+2.8% vs last month</p>
                          </div>
                          <div className="bg-blue-500/20 p-2 rounded-full">
                            <LineChartIcon className="h-5 w-5 text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                        Top Customers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Total Orders</TableHead>
                            <TableHead>Total Spent</TableHead>
                            <TableHead>Last Purchase</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Rahul Sharma</TableCell>
                            <TableCell>24</TableCell>
                            <TableCell>{formatCurrency(124500)}</TableCell>
                            <TableCell>May 2, 2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Priya Patel</TableCell>
                            <TableCell>18</TableCell>
                            <TableCell>{formatCurrency(98200)}</TableCell>
                            <TableCell>May 1, 2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Amit Kumar</TableCell>
                            <TableCell>32</TableCell>
                            <TableCell>{formatCurrency(156800)}</TableCell>
                            <TableCell>Apr 28, 2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Neha Singh</TableCell>
                            <TableCell>14</TableCell>
                            <TableCell>{formatCurrency(78500)}</TableCell>
                            <TableCell>Apr 25, 2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Vikram Mehta</TableCell>
                            <TableCell>27</TableCell>
                            <TableCell>{formatCurrency(134200)}</TableCell>
                            <TableCell>Apr 22, 2025</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="marketing" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Marketing ROI</p>
                            <p className="text-2xl font-bold">324%</p>
                            <p className="text-xs text-green-400">+18.2% vs last campaign</p>
                          </div>
                          <div className="bg-purple-500/20 p-2 rounded-full">
                            <TrendingUp className="h-5 w-5 text-purple-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Email Open Rate</p>
                            <p className="text-2xl font-bold">28.5%</p>
                            <p className="text-xs text-green-400">+3.2% vs industry avg</p>
                          </div>
                          <div className="bg-cyan-500/20 p-2 rounded-full">
                            <BarChart2 className="h-5 w-5 text-cyan-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-slate-400">Social Engagement</p>
                            <p className="text-2xl font-bold">12.4K</p>
                            <p className="text-xs text-green-400">+24.8% vs last month</p>
                          </div>
                          <div className="bg-blue-500/20 p-2 rounded-full">
                            <LineChartIcon className="h-5 w-5 text-blue-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-slate-100 flex items-center text-base">
                        <BarChart2 className="mr-2 h-5 w-5 text-purple-500" />
                        Campaign Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Campaign Name</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Impressions</TableHead>
                            <TableHead>Clicks</TableHead>
                            <TableHead>Conversions</TableHead>
                            <TableHead>ROI</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Summer Sale 2025</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>124,500</TableCell>
                            <TableCell>12,450</TableCell>
                            <TableCell>1,245</TableCell>
                            <TableCell className="text-green-400">342%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">New Product Launch</TableCell>
                            <TableCell>Social Media</TableCell>
                            <TableCell>245,800</TableCell>
                            <TableCell>24,580</TableCell>
                            <TableCell>2,458</TableCell>
                            <TableCell className="text-green-400">412%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Loyalty Program</TableCell>
                            <TableCell>Email + SMS</TableCell>
                            <TableCell>98,200</TableCell>
                            <TableCell>9,820</TableCell>
                            <TableCell>982</TableCell>
                            <TableCell className="text-green-400">285%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Festival Discount</TableCell>
                            <TableCell>Multi-channel</TableCell>
                            <TableCell>345,600</TableCell>
                            <TableCell>34,560</TableCell>
                            <TableCell>3,456</TableCell>
                            <TableCell className="text-green-400">385%</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Referral Program</TableCell>
                            <TableCell>Website + App</TableCell>
                            <TableCell>78,500</TableCell>
                            <TableCell>7,850</TableCell>
                            <TableCell>785</TableCell>
                            <TableCell className="text-green-400">245%</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
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
