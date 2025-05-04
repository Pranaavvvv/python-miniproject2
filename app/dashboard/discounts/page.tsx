"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bell,
  Calendar,
  ChevronDown,
  Command,
  Download,
  Hexagon,
  PercentIcon,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  Trash2,
  TrendingUp,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function DiscountsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeRole, setActiveRole] = useState<"admin" | "business" | "customer">("admin")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "Summer Sale",
      code: "SUMMER25",
      type: "Percentage",
      value: 25,
      usage: 1245,
      status: "Active",
      startDate: "2025-05-01",
      endDate: "2025-06-30",
      target: "All Products",
      minPurchase: 1000,
    },
    {
      id: 2,
      name: "New User",
      code: "WELCOME15",
      type: "Percentage",
      value: 15,
      usage: 876,
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      target: "First Purchase",
      minPurchase: 500,
    },
    {
      id: 3,
      name: "Loyalty Reward",
      code: "LOYAL10",
      type: "Percentage",
      value: 10,
      usage: 2134,
      status: "Active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      target: "Repeat Customers",
      minPurchase: 0,
    },
    {
      id: 4,
      name: "Flash Sale",
      code: "FLASH50",
      type: "Percentage",
      value: 50,
      usage: 432,
      status: "Expired",
      startDate: "2025-04-01",
      endDate: "2025-04-02",
      target: "Selected Items",
      minPurchase: 2000,
    },
    {
      id: 5,
      name: "Free Shipping",
      code: "FREESHIP",
      type: "Fixed",
      value: 150,
      usage: 987,
      status: "Active",
      startDate: "2025-03-15",
      endDate: "2025-06-15",
      target: "All Products",
      minPurchase: 1500,
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
            <div className="mt-4 text-purple-500 font-mono text-sm tracking-wider">DISCOUNTS</div>
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
                  placeholder="Search discounts..."
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
                  <NavItem icon={Tag} label="Discounts" active onClick={() => router.push("/dashboard/discounts")} />
                  <NavItem icon={ShoppingBag} label="Orders" onClick={() => router.push("/dashboard/orders")} />
                  <NavItem icon={BarChart} label="Reports" onClick={() => router.push("/dashboard/reports")} />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">DISCOUNT TOOLS</div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Plus className="mr-2 h-3.5 w-3.5" />
                      New Discount
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                      <Download className="mr-2 h-3.5 w-3.5" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main discounts content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="grid gap-6">
              {/* Page header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Discount Management</h1>
                  <p className="text-slate-400 mt-1">Create and manage promotional discounts</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px] bg-slate-800/50 border-slate-700 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Discount
                  </Button>
                </div>
              </div>

              {/* Discount metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Active Discounts</p>
                        <p className="text-2xl font-bold">4</p>
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
                        <p className="text-sm text-slate-400">Total Redemptions</p>
                        <p className="text-2xl font-bold">5,674</p>
                      </div>
                      <div className="bg-purple-500/20 p-2 rounded-full">
                        <PercentIcon className="h-5 w-5 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Revenue Impact</p>
                        <p className="text-2xl font-bold">₹1.2M</p>
                      </div>
                      <div className="bg-blue-500/20 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Expired</p>
                        <p className="text-2xl font-bold">1</p>
                      </div>
                      <div className="bg-red-500/20 p-2 rounded-full">
                        <XCircle className="h-5 w-5 text-red-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Discounts table */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Tag className="mr-2 h-5 w-5 text-purple-500" />
                    Active Discounts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700/50">
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Name</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Code</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Type</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Value</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Usage</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Status</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Validity</th>
                          <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discounts.map((discount) => (
                          <tr key={discount.id} className="border-b border-slate-700/30 hover:bg-slate-800/30">
                            <td className="py-3 px-4 text-sm">{discount.name}</td>
                            <td className="py-3 px-4 text-sm">
                              <code className="bg-slate-800/50 px-2 py-1 rounded text-xs">{discount.code}</code>
                            </td>
                            <td className="py-3 px-4 text-sm">{discount.type}</td>
                            <td className="py-3 px-4 text-sm">
                              {discount.type === "Percentage" ? `${discount.value}%` : `₹${discount.value}`}
                            </td>
                            <td className="py-3 px-4 text-sm">{discount.usage}</td>
                            <td className="py-3 px-4 text-sm">
                              <Badge
                                className={`${
                                  discount.status === "Active"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                }`}
                              >
                                {discount.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm text-slate-400">
                              {formatDate(discount.startDate)} - {formatDate(discount.endDate)}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Create new discount */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <Plus className="mr-2 h-5 w-5 text-purple-500" />
                    Create New Discount
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="discount-name">Discount Name</Label>
                        <Input
                          id="discount-name"
                          placeholder="e.g. Summer Sale"
                          className="bg-slate-800/50 border-slate-700 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discount-code">Discount Code</Label>
                        <Input
                          id="discount-code"
                          placeholder="e.g. SUMMER25"
                          className="bg-slate-800/50 border-slate-700 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discount-type">Discount Type</Label>
                        <Select defaultValue="percentage">
                          <SelectTrigger
                            id="discount-type"
                            className="bg-slate-800/50 border-slate-700 text-white mt-1"
                          >
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                            <SelectItem value="percentage">Percentage</SelectItem>
                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="discount-value">Discount Value</Label>
                        <Input
                          id="discount-value"
                          type="number"
                          placeholder="e.g. 25"
                          className="bg-slate-800/50 border-slate-700 text-white mt-1"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          className="bg-slate-800/50 border-slate-700 text-white mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="end-date">End Date</Label>
                        <Input id="end-date" type="date" className="bg-slate-800/50 border-slate-700 text-white mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="min-purchase">Minimum Purchase (₹)</Label>
                        <Input
                          id="min-purchase"
                          type="number"
                          placeholder="0"
                          className="bg-slate-800/50 border-slate-700 text-white mt-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-4">
                        <Switch id="active" />
                        <Label htmlFor="active">Active</Label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button variant="outline" className="mr-2">
                      Cancel
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">Create Discount</Button>
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
