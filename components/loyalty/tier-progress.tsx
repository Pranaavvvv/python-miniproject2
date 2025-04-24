"use client"

import { getCurrentUser, getPointsNeededForNextTier, getUserTierDetails, loyaltyTiers } from "@/lib/loyalty"
import { Progress } from "@/components/ui/progress"
import { TierBadge } from "@/components/loyalty/tier-badge"
import { motion } from "framer-motion"

export function TierProgress() {
  const user = getCurrentUser()
  const tierDetails = getUserTierDetails(user.tier)
  const { nextTier, pointsNeeded } = getPointsNeededForNextTier(user)

  // Calculate progress percentage to next tier
  const progressPercentage = nextTier
    ? ((user.pointsBalance - tierDetails.pointsThreshold) / (nextTier.pointsThreshold - tierDetails.pointsThreshold)) *
      100
    : 100 // Already at highest tier

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Your Current Tier</h3>
          <TierBadge tier={user.tier} />
        </div>

        {nextTier ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{user.pointsBalance} points</span>
              <span>{nextTier.pointsThreshold} points</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-sm text-gray-400">
              You need <span className="font-medium text-primary">{pointsNeeded} more points</span> to reach{" "}
              {nextTier.tier} tier
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Progress value={100} className="h-2" />
            <p className="text-sm text-gray-400">Congratulations! You've reached the highest tier.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {loyaltyTiers.map((tier, index) => (
          <motion.div
            key={tier.tier}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${
              tier.tier === user.tier ? "border-primary bg-primary/10" : "border-gray-800 bg-secondary/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{tier.tier}</h4>
              {tier.tier === user.tier && (
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Current</span>
              )}
            </div>
            <p className="text-xs text-gray-400 mb-2">{tier.pointsThreshold}+ points</p>
            <ul className="text-xs space-y-1">
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
