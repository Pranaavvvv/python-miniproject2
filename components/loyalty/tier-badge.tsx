import { getUserTierDetails } from "@/lib/loyalty"
import type { LoyaltyTier } from "@/lib/types"
import { Award } from "lucide-react"

interface TierBadgeProps {
  tier: LoyaltyTier
  size?: "sm" | "md" | "lg"
  showIcon?: boolean
}

export function TierBadge({ tier, size = "md", showIcon = true }: TierBadgeProps) {
  const tierDetails = getUserTierDetails(tier)

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${tierDetails.color}20`,
        color: tierDetails.color,
        border: `1px solid ${tierDetails.color}40`,
      }}
    >
      {showIcon && <Award className={size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5"} />}
      {tier}
    </div>
  )
}
