"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TierBadge } from "@/components/loyalty/tier-badge"
import { PointsHistory } from "@/components/loyalty/points-history"
import { TierProgress } from "@/components/loyalty/tier-progress"
import { RewardCard } from "@/components/loyalty/reward-card"
import { getCurrentUser, getFeaturedRewards, getUserActivities } from "@/lib/loyalty"
import { Award, Gift, History, TrendingUp } from "lucide-react"

export default function LoyaltyPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const user = getCurrentUser()
  const featuredRewards = getFeaturedRewards()
  const recentActivities = getUserActivities(user.id, 5)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            <br/>
            <br/>Loyalty Program</h1>
          <p className="text-gray-400">Earn points, unlock rewards, and enjoy exclusive benefits</p>
        </div>
        <div className="flex items-center gap-4">
          <TierBadge tier={user.tier} size="lg" />
          <Link href="/loyalty/redeem">
            <Button className="bg-primary hover:bg-primary/90">
              <Gift className="mr-2 h-4 w-4" /> Redeem Points
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary">
            <TrendingUp className="h-4 w-4 mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="rewards" className="data-[state=active]:bg-primary">
            <Gift className="h-4 w-4 mr-2" /> Rewards
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-primary">
            <History className="h-4 w-4 mr-2" /> Points History
          </TabsTrigger>
          <TabsTrigger value="tiers" className="data-[state=active]:bg-primary">
            <Award className="h-4 w-4 mr-2" /> Tiers & Benefits
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardDescription>Current Balance</CardDescription>
                  <CardTitle className="text-3xl gradient-text">{user.pointsBalance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Points available to redeem</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardDescription>Total Earned</CardDescription>
                  <CardTitle className="text-3xl text-green-500">{user.totalPointsEarned}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Points earned since joining</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardDescription>Total Redeemed</CardDescription>
                  <CardTitle className="text-3xl text-primary">{user.totalPointsRedeemed}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Points redeemed for rewards</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your journey to the next tier</CardDescription>
                </div>
                <Link href="/loyalty?tab=tiers" onClick={() => setActiveTab("tiers")}>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All Tiers
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <TierProgress />
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest points transactions</CardDescription>
                </div>
                <Link href="/loyalty?tab=history" onClick={() => setActiveTab("history")}>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <PointsHistory userId={user.id} limit={5} showFilters={false} />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Featured Rewards</CardTitle>
                <CardDescription>Popular rewards you can redeem with your points</CardDescription>
              </div>
              <Link href="/loyalty?tab=rewards" onClick={() => setActiveTab("rewards")}>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All Rewards
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredRewards.slice(0, 3).map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle>Ways to Earn Points</CardTitle>
              <CardDescription>Maximize your points earning potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Make a Purchase",
                    description: `Earn ${user.tier === "Bronze" ? "1" : user.tier === "Silver" ? "1.25" : user.tier === "Gold" ? "1.5" : user.tier === "Platinum" ? "1.75" : "2"} points for every $1 spent`,
                    icon: <ShoppingIcon className="h-10 w-10 text-primary" />,
                  },
                  {
                    title: "Write Reviews",
                    description: "Earn 50 points for each product review you submit",
                    icon: <ReviewIcon className="h-10 w-10 text-primary" />,
                  },
                  {
                    title: "Refer Friends",
                    description: "Earn 200 points when a friend makes their first purchase",
                    icon: <ReferralIcon className="h-10 w-10 text-primary" />,
                  },
                  {
                    title: "Birthday Bonus",
                    description: "Receive 500 bonus points on your birthday",
                    icon: <BirthdayIcon className="h-10 w-10 text-primary" />,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-secondary/30 rounded-lg border border-gray-800"
                  >
                    <div className="mb-3">{item.icon}</div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Redeem your points for these exciting rewards</CardDescription>
                </div>
                <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium">Your Balance:</span>
                  <span className="text-lg font-bold gradient-text">{user.pointsBalance} Points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFeaturedRewards().map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RewardCard reward={reward} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle>Points History</CardTitle>
              <CardDescription>Track all your points transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <PointsHistory userId={user.id} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          <Card className="bg-card border-gray-800">
            <CardHeader>
              <CardTitle>Loyalty Tiers & Benefits</CardTitle>
              <CardDescription>Discover the benefits of each loyalty tier</CardDescription>
            </CardHeader>
            <CardContent>
              <TierProgress />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Custom icons
function ShoppingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function ReviewIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}

function ReferralIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}

function BirthdayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
