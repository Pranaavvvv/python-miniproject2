"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TierBadge } from "@/components/loyalty/tier-badge"
import { PointsHistory } from "@/components/loyalty/points-history"
import { getAllUsers, getLoyaltyStats, loyaltyTiers } from "@/lib/loyalty"
import {
  Award,
  BarChart3,
  Gift,
  Search,
  Settings,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react"
import type { LoyaltyUser } from "@/lib/types"
import Image from "next/image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function LoyaltyAdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<LoyaltyUser | null>(null)
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const stats = getLoyaltyStats()
  const { users, total } = getAllUsers(currentPage, 10)
  const totalPages = Math.ceil(total / 10)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Loyalty Program Administration</h1>
          <p className="text-gray-400">Manage your loyalty program, users, and rewards</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary">
            <BarChart3 className="h-4 w-4 mr-2" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-primary">
            <Users className="h-4 w-4 mr-2" /> Users
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-primary">
            <Gift className="h-4 w-4 mr-2" /> Rewards
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-primary">
            <Settings className="h-4 w-4 mr-2" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Users",
                value: stats.totalUsers,
                description: "Enrolled in loyalty program",
                icon: <Users className="h-8 w-8 text-primary" />,
                color: "from-violet-500/20 to-transparent",
              },
              {
                title: "Active Users",
                value: stats.activeUsers,
                description: "Active in the last 30 days",
                icon: <TrendingUp className="h-8 w-8 text-green-500" />,
                color: "from-green-500/20 to-transparent",
              },
              {
                title: "Total Points Issued",
                value: stats.totalPointsIssued.toLocaleString(),
                description: "Points earned by all users",
                icon: <Award className="h-8 w-8 text-yellow-500" />,
                color: "from-yellow-500/20 to-transparent",
              },
              {
                title: "Redemption Rate",
                value: `${(stats.redemptionRate * 100).toFixed(1)}%`,
                description: "Points redeemed vs issued",
                icon: <Gift className="h-8 w-8 text-purple-500" />,
                color: "from-purple-500/20 to-transparent",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-card border-gray-800 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50`} />
                  <CardHeader className="relative pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl">{stat.value}</CardTitle>
                      {stat.icon}
                    </div>
                    <CardDescription>{stat.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm text-gray-400">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle>Tier Distribution</CardTitle>
                <CardDescription>User distribution across loyalty tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(stats.topTierDistribution).map(([tier, count], index) => {
                    const percentage = (count / stats.totalUsers) * 100
                    const tierDetails = loyaltyTiers.find((t) => t.tier === tier)

                    return (
                      <div key={tier} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TierBadge tier={tier as any} size="sm" />
                            <span className="text-sm">{count} users</span>
                          </div>
                          <span className="text-sm text-gray-400">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: tierDetails?.color || "#8b5cf6" }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest points transactions across all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-y-auto pr-2">
                  {/* This would typically be a feed of recent activities across all users */}
                  <p className="text-center text-gray-400 py-12">
                    Activity feed would be displayed here, showing recent transactions across all users
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Loyalty Program Users</CardTitle>
                <CardDescription>Manage users enrolled in your loyalty program</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-secondary border-gray-800 w-[250px]"
                  />
                </div>
                <Button
                  onClick={() => {
                    setSelectedUser(null)
                    setIsUserDialogOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Tier <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Points <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Join Date <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Last Activity <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-secondary">
                            <Image
                              src={user.avatar || "/placeholder.svg?height=32&width=32"}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={user.tier} size="sm" />
                      </TableCell>
                      <TableCell>{user.pointsBalance.toLocaleString()}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(user.lastActivity).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-gray-800">
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsUserDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" /> Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Award className="h-4 w-4 mr-2" /> Adjust Points
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <TrendingUp className="h-4 w-4 mr-2" /> View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-800" />
                            <DropdownMenuItem className="text-red-500">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No users found</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-gray-400">
                  Showing {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, total)} of {total} users
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-800"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-800"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedUser && (
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Details: {selectedUser.name}</CardTitle>
                    <CardDescription>{selectedUser.email}</CardDescription>
                  </div>
                  <TierBadge tier={selectedUser.tier} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Points Balance</p>
                    <p className="text-2xl font-bold gradient-text">{selectedUser.pointsBalance.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Total Earned</p>
                    <p className="text-2xl font-bold text-green-500">
                      {selectedUser.totalPointsEarned.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 mb-1">Total Redeemed</p>
                    <p className="text-2xl font-bold text-primary">
                      {selectedUser.totalPointsRedeemed.toLocaleString()}
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">Activity History</h3>
                <PointsHistory userId={selectedUser.id} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Manage Rewards</CardTitle>
                <CardDescription>Create and manage rewards for your loyalty program</CardDescription>
              </div>
              <Button onClick={() => setIsRewardDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Reward
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reward</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Points Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Redemptions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* This would typically be populated with actual rewards data */}
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-secondary">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=10%+Off"
                            alt="10% Off"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">10% Off Your Next Purchase</p>
                          <p className="text-xs text-gray-400 truncate max-w-[250px]">
                            Get 10% off your next order. Valid for 30 days.
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-xs">Available</span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">Featured</span>
                    </TableCell>
                    <TableCell>342</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-gray-800">
                          <DropdownMenuLabel>Reward Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-800" />
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit Reward
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Gift className="h-4 w-4 mr-2" /> Toggle Featured
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="h-4 w-4 mr-2" /> View Redemptions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-800" />
                          <DropdownMenuItem className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete Reward
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle>Loyalty Program Settings</CardTitle>
              <CardDescription>Configure your loyalty program settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="programName">Program Name</Label>
                    <Input id="programName" defaultValue="Nebula Rewards" className="bg-secondary border-gray-800" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pointsName">Points Name</Label>
                    <Input id="pointsName" defaultValue="Stars" className="bg-secondary border-gray-800" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Points Earning Rules</Label>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Purchase Points</h4>
                        <Button variant="outline" size="sm" className="border-gray-800">
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Points earned per $1 spent</p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {loyaltyTiers.map((tier) => (
                          <div key={tier.tier} className="p-2 bg-secondary/50 rounded-md text-center">
                            <TierBadge tier={tier.tier} size="sm" showIcon={false} />
                            <p className="text-lg font-bold mt-1">{tier.pointsMultiplier}x</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Other Earning Methods</h4>
                        <Button variant="outline" size="sm" className="border-gray-800">
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Product Review</p>
                          <p className="font-medium">50 points</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Friend Referral</p>
                          <p className="font-medium">200 points</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Birthday Bonus</p>
                          <p className="font-medium">500 points</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Account Creation</p>
                          <p className="font-medium">250 points</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tier Settings</Label>
                  <div className="space-y-4">
                    {loyaltyTiers.map((tier) => (
                      <div key={tier.tier} className="p-4 bg-secondary/30 rounded-lg border border-gray-800">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <TierBadge tier={tier.tier} />
                            <h4 className="font-medium">{tier.tier} Tier</h4>
                          </div>
                          <Button variant="outline" size="sm" className="border-gray-800">
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Points Threshold</p>
                            <p className="font-medium">{tier.pointsThreshold}+ points</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Points Multiplier</p>
                            <p className="font-medium">{tier.pointsMultiplier}x per $1</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Benefits</p>
                            <p className="text-sm">{tier.benefits.length} benefits</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Edit Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="bg-card border border-gray-800">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {selectedUser ? "Update user details and loyalty status" : "Add a new user to the loyalty program"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Name</Label>
              <Input id="userName" defaultValue={selectedUser?.name || ""} className="bg-secondary border-gray-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">Email</Label>
              <Input id="userEmail" defaultValue={selectedUser?.email || ""} className="bg-secondary border-gray-800" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userTier">Loyalty Tier</Label>
              <select
                id="userTier"
                defaultValue={selectedUser?.tier || "Bronze"}
                className="w-full bg-secondary border border-gray-800 rounded-md px-3 py-2"
              >
                {loyaltyTiers.map((tier) => (
                  <option key={tier.tier} value={tier.tier}>
                    {tier.tier}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userPoints">Points Balance</Label>
              <Input
                id="userPoints"
                type="number"
                defaultValue={selectedUser?.pointsBalance || 0}
                className="bg-secondary border-gray-800"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button>{selectedUser ? "Update User" : "Add User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reward Edit Dialog */}
      <Dialog open={isRewardDialogOpen} onOpenChange={setIsRewardDialogOpen}>
        <DialogContent className="bg-card border border-gray-800">
          <DialogHeader>
            <DialogTitle>Add New Reward</DialogTitle>
            <DialogDescription>Create a new reward for your loyalty program</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rewardName">Reward Name</Label>
              <Input
                id="rewardName"
                placeholder="e.g. 10% Off Your Next Purchase"
                className="bg-secondary border-gray-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rewardDescription">Description</Label>
              <Textarea
                id="rewardDescription"
                placeholder="Describe the reward and any terms or conditions"
                className="bg-secondary border-gray-800 min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rewardCategory">Category</Label>
                <select id="rewardCategory" className="w-full bg-secondary border border-gray-800 rounded-md px-3 py-2">
                  <option value="Discount">Discount</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                  <option value="Experience">Experience</option>
                  <option value="Gift Card">Gift Card</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rewardPoints">Points Cost</Label>
                <Input
                  id="rewardPoints"
                  type="number"
                  placeholder="e.g. 500"
                  className="bg-secondary border-gray-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rewardExpiry">Expiry Days (Optional)</Label>
                <Input id="rewardExpiry" type="number" placeholder="e.g. 30" className="bg-secondary border-gray-800" />
                <p className="text-xs text-gray-400">Days until reward expires after redemption</p>
              </div>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="rewardImage">Reward Image</Label>
                <Button variant="outline" className="mt-1 border-gray-800">
                  Upload Image
                </Button>
                <p className="text-xs text-gray-400">Recommended size: 400x400px</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="rewardFeatured" className="rounded border-gray-800" />
              <Label htmlFor="rewardFeatured">Feature this reward</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="rewardAvailable" className="rounded border-gray-800" defaultChecked />
              <Label htmlFor="rewardAvailable">Available for redemption</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRewardDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Add Reward</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
