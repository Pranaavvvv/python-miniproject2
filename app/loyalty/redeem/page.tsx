"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RewardCard } from "@/components/loyalty/reward-card"
import { TierBadge } from "@/components/loyalty/tier-badge"
import { getCurrentUser, getAllRewards } from "@/lib/loyalty"
import { Award, Search } from "lucide-react"

export default function RedeemPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"pointsAsc" | "pointsDesc" | "newest" | "popular">("pointsAsc")

  const user = getCurrentUser()
  const allRewards = getAllRewards()

  // Filter rewards based on search query and category
  const filteredRewards = allRewards.filter((reward) => {
    const matchesSearch =
      searchQuery === "" ||
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || reward.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Sort rewards
  const sortedRewards = [...filteredRewards].sort((a, b) => {
    if (sortOrder === "pointsAsc") return a.pointsCost - b.pointsCost
    if (sortOrder === "pointsDesc") return b.pointsCost - a.pointsCost
    if (sortOrder === "newest") return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    if (sortOrder === "popular") return b.redemptionCount - a.redemptionCount
    return 0
  })

  // Get unique categories
  const categories = ["all", ...new Set(allRewards.map((reward) => reward.category))]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Redeem Rewards</h1>
          <p className="text-gray-400">Exchange your points for exclusive rewards and benefits</p>
        </div>
        <div className="flex items-center gap-4 bg-secondary/50 px-4 py-2 rounded-lg">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold gradient-text">{user.pointsBalance}</span>
            </div>
            <span className="text-xs text-gray-400">Available Points</span>
          </div>
          <TierBadge tier={user.tier} />
        </div>
      </div>

      <Card className="bg-card border-gray-800 mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rewards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <select
                className="bg-secondary border border-gray-800 rounded-md px-3 py-2 text-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
              >
                <option value="pointsAsc">Points: Low to High</option>
                <option value="pointsDesc">Points: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
        <TabsList className="bg-secondary">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="data-[state=active]:bg-primary capitalize">
              {category === "all" ? "All Rewards" : category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRewards
                .filter((reward) => category === "all" || reward.category === category)
                .map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <RewardCard reward={reward} />
                  </motion.div>
                ))}
            </div>

            {sortedRewards.filter((reward) => category === "all" || reward.category === category).length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No rewards found in this category</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
