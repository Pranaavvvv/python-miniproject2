"use client"

import { useState } from "react"
import { getUserActivities } from "@/lib/loyalty"
import type { LoyaltyActivity } from "@/lib/types"
import { ArrowDown, ArrowUp, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"

interface PointsHistoryProps {
  userId: string
  limit?: number
  showFilters?: boolean
}

export function PointsHistory({ userId, limit, showFilters = true }: PointsHistoryProps) {
  const [filter, setFilter] = useState<"all" | "earned" | "redeemed" | "expired" | "adjusted">("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  const allActivities = getUserActivities(userId)

  // Apply filters
  const filteredActivities = allActivities.filter((activity) => {
    if (filter === "all") return true
    return activity.type === filter
  })

  // Apply sorting
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB
  })

  // Apply limit if provided
  const activities = limit ? sortedActivities.slice(0, limit) : sortedActivities

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
              <SelectTrigger className="w-[180px] bg-secondary border-gray-800">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="earned">Points Earned</SelectItem>
                <SelectItem value="redeemed">Points Redeemed</SelectItem>
                <SelectItem value="expired">Points Expired</SelectItem>
                <SelectItem value="adjusted">Points Adjusted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-gray-800 hover:bg-secondary"
            onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
          >
            <Clock className="h-4 w-4 mr-2" />
            {sortOrder === "newest" ? "Newest First" : "Oldest First"}
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {activities.length > 0 ? (
            activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />)
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 text-center text-gray-400 bg-secondary/30 rounded-md"
            >
              No activities found
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function ActivityItem({ activity }: { activity: LoyaltyActivity }) {
  const isPositive = activity.points > 0
  const date = new Date(activity.date)

  const getActivityIcon = () => {
    if (activity.type === "earned") return <ArrowUp className="h-4 w-4 text-green-500" />
    if (activity.type === "redeemed") return <ArrowDown className="h-4 w-4 text-red-500" />
    if (activity.type === "expired") return <Clock className="h-4 w-4 text-yellow-500" />
    return <ArrowUp className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center justify-between p-3 bg-secondary/30 rounded-md border border-gray-800"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">{getActivityIcon()}</div>
        <div>
          <p className="text-sm font-medium">{activity.description}</p>
          <p className="text-xs text-gray-400">
            {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
      <div className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "+" : ""}
        {activity.points}
      </div>
    </motion.div>
  )
}
