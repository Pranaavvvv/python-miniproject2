"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bell,
  ChevronDown,
  Command,
  Download,
  Hexagon,
  RefreshCw,
  Search,
  ShoppingBag,
  Tag,
  TrendingUp,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"

export default function OrdersPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<"admin" | "business" | "customer">("admin")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [orders, setOrders] = useState([
    {
      id: "ORD-7829",
      customer: "Rahul Sharma",
      date: "2025-05-04T08:30:00",
      total: 4850,
      status: "Delivered",
      items: 3,
      payment: "Credit Card",
    },
    {
      id: "ORD-7828",
      customer: "Priya Patel",
      date: "2025-05-04T10:15:00",
      total: 2750,
      status: "Processing",
      items: 2,
      payment: "UPI",
    },
    {
      id: "ORD-7827",
      customer: "Amit Kumar",
      date: "2025-05-03T14:45:00",
      total: 8950,
      status: "Shipped",
      items: 5,
      payment: "Credit Card",
    },
    {
      id: "ORD-7826",
      customer: "Neha Singh",
      date: "2025-05-03T09:20:00",
      total: 1250,
      status: "Pending",
      items: 1,
      payment: "Cash on Delivery",
    },
    {
      id: "ORD-7825",
      customer: "Vikram Mehta",
      date: "2025-05-02T16:10:00",
      total: 5450,
      status: "Delivered",
      items: 4,
      payment: "Debit Card",
    },
    {
      id: "ORD-7824",
      customer: "Ananya Gupta",
      date: "2025-05-02T11:30:00",
      total: 3250,
      status: "Cancelled",
      items: 2,
      payment: "UPI",
    },
    {
      id: "ORD-7823",
      customer: "Rajesh Verma",
      date: "2025-05-01T13:45:00",
      total: 6750,
      status: "Delivered",
      items: 3,
      payment: "Credit Card",
    },
  ])

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "Pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "Cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "Processing":
        return <RefreshCw className="h-4 w-4 mr-1" />
      case "Shipped":
        return <Truck className="h-4 w-4 mr-1" />
      case "Pending":
        return <Clock className="h-4 w-4 mr-1" />
      case "Cancelled":
        return <XCircle className="h-4 w-4 mr-1" />
      default:
        return null
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
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">ORDERS</div>
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
                  placeholder="Search orders..."
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
                  <NavItem icon={ShoppingBag} label="Orders" active onClick={() => router.push("/dashboard/orders")} />
                  <NavItem icon={BarChart} label="Reports" onClick={() => router.push("/dashboard/reports")} />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">ORDER FILTERS</div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <CheckCircle className="mr-2 h-3.5 w-3.5" />
                      Delivered
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Truck className="mr-2 h-3.5 w-3.5" />
                      Shipped
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <RefreshCw className="mr-2 h-3.5 w-3.5" />
                      Processing
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Clock className="mr-2 h-3.5 w-3.5" />
                      Pending
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <XCircle className="mr-2 h-3.5 w-3.5" />
                      Cancelled
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main orders content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {/* Page header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Order Management</h1>
                  <p className="text-slate-400 mt-1">View and manage customer orders</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Input
                    placeholder="Search orders..."
                    className="w-[200px] bg-slate-800/50 border-slate-700 text-white"
                  />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Order metrics */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Total Orders</p>
                        <p className="text-2xl font-bold">2,433</p>
                      </div>
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <Package className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Delivered</p>
                        <p className="text-2xl font-bold">1,285</p>
                      </div>
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Shipped</p>
                        <p className="text-2xl font-bold">642</p>
                      </div>
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <Truck className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Processing</p>
                        <p className="text-2xl font-bold">324</p>
                      </div>
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <RefreshCw className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Pending</p>
                        <p className="text-2xl font-bold">182</p>
                      </div>
                      <div className="bg-amber-500/20 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Orders table */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <ShoppingBag className="mr-2 h-5 w-5 text-purple-500" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700/50">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Order ID</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Customer</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Date</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Total</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Items</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Payment</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
                            <td className="py-3 px-4 text-sm">{order.customer}</td>
                            <td className="py-3 px-4 text-sm text-slate-400">{formatDate(order.date)}</td>
                            <td className="py-3 px-4 text-sm">{formatCurrency(order.total)}</td>
                            <td className="py-3 px-4 text-sm">
                              <Badge className={getStatusBadgeColor(order.status)}>
                                <div className="flex items-center">
                                  {getStatusIcon(order.status)}
                                  {order.status}
                                </div>
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-center">{order.items}</td>
                            <td className="py-3 px-4 text-sm">{order.payment}</td>
                            <td className="py-3 px-4 text-sm">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-slate-700/50 py-4">
                  <div className="text-sm text-slate-400">Showing 7 of 2,433 orders</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
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
