"use client"

import { useState } from "react"
import { Gift, Award, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { getCurrentUser, getPointsNeededForNextTier, getUserTierDetails } from "@/lib/loyalty"
import Link from "next/link"

export function PointsDisplay() {
  const [isOpen, setIsOpen] = useState(false)
  const user = getCurrentUser()
  const tierDetails = getUserTierDetails(user.tier)
  const { nextTier, pointsNeeded } = getPointsNeededForNextTier(user)

  // Calculate progress percentage to next tier
  const progressPercentage = nextTier
    ? ((user.pointsBalance - tierDetails.pointsThreshold) / (nextTier.pointsThreshold - tierDetails.pointsThreshold)) *
      100
    : 100 // Already at highest tier

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-gray-400 hover:text-primary transition-colors"
        >
          <Award className="h-4 w-4" />
          <span className="hidden md:inline">{user.pointsBalance} Points</span>
          {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-card border border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Loyalty Program</h3>
            <div
              className="px-2 py-1 text-xs rounded-full"
              style={{ backgroundColor: `${tierDetails.color}20`, color: tierDetails.color }}
            >
              {user.tier} Tier
            </div>
          </div>

          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400">Points Balance</span>
            <span className="font-bold text-lg gradient-text">{user.pointsBalance}</span>
          </div>

          {nextTier ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{tierDetails.tier}</span>
                <span>{nextTier.tier}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-gray-400 text-center">
                {pointsNeeded} more points needed for {nextTier.tier}
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>{tierDetails.tier}</span>
                <span>Max Tier</span>
              </div>
              <Progress value={100} className="h-2" />
              <p className="text-xs text-gray-400 text-center">You've reached the highest tier!</p>
            </div>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Gift className="h-4 w-4 text-primary" />
            <span>Earn {tierDetails.pointsMultiplier}x points per $1 spent</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href="/loyalty">
              <Button variant="outline" size="sm" className="w-full border-primary/50 hover:bg-primary/10">
                My Rewards
              </Button>
            </Link>
            <Link href="/loyalty/redeem">
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                Redeem Points
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
