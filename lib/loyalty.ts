import type {
    LoyaltyActivity,
    LoyaltyReward,
    LoyaltyStats,
    LoyaltyTier,
    LoyaltyTierDetails,
    LoyaltyUser,
  } from "./types"
  
  // Mock data for loyalty users
  const loyaltyUsers: LoyaltyUser[] = Array.from({ length: 50 }, (_, i) => {
    const tiers: LoyaltyTier[] = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"]
    const tier = tiers[Math.min(Math.floor(Math.random() * 5), 4)]
    const pointsBalance =
      tier === "Bronze"
        ? Math.floor(Math.random() * 1000)
        : tier === "Silver"
          ? Math.floor(Math.random() * 2000) + 1000
          : tier === "Gold"
            ? Math.floor(Math.random() * 3000) + 3000
            : tier === "Platinum"
              ? Math.floor(Math.random() * 5000) + 6000
              : Math.floor(Math.random() * 10000) + 10000
  
    const totalEarned = pointsBalance + Math.floor(Math.random() * 5000)
    const totalRedeemed = totalEarned - pointsBalance
  
    // Generate a date within the last 2 years
    const joinDate = new Date()
    joinDate.setDate(joinDate.getDate() - Math.floor(Math.random() * 730))
  
    // Generate a date within the last 30 days
    const lastActivity = new Date()
    lastActivity.setDate(lastActivity.getDate() - Math.floor(Math.random() * 30))
  
    return {
      id: `user-${i + 1}`,
      name: [
        "Emma Thompson",
        "Liam Johnson",
        "Olivia Williams",
        "Noah Brown",
        "Ava Jones",
        "Ethan Davis",
        "Sophia Miller",
        "Mason Wilson",
        "Isabella Moore",
        "Logan Taylor",
        "Charlotte Anderson",
        "Jacob Thomas",
        "Amelia Jackson",
        "Lucas White",
        "Mia Harris",
        "Benjamin Martin",
        "Harper Thompson",
        "Elijah Garcia",
        "Evelyn Martinez",
        "Alexander Robinson",
      ][i % 20],
      email: `user${i + 1}@example.com`,
      pointsBalance,
      tier,
      joinDate: joinDate.toISOString(),
      totalPointsEarned: totalEarned,
      totalPointsRedeemed: totalRedeemed,
      lastActivity: lastActivity.toISOString(),
      avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`,
    }
  })
  
  // Current user (for demo purposes)
  const currentUser: LoyaltyUser = {
    id: "current-user",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    pointsBalance: 3750,
    tier: "Gold",
    joinDate: new Date(Date.now() - 86400000 * 180).toISOString(), // 180 days ago
    totalPointsEarned: 5200,
    totalPointsRedeemed: 1450,
    lastActivity: new Date().toISOString(),
    avatar: "/placeholder.svg?height=40&width=40&text=AM",
  }
  
  // Mock data for loyalty activities
  const generateActivities = (userId: string, count: number): LoyaltyActivity[] => {
    const activities: LoyaltyActivity[] = []
    const now = new Date()
  
    for (let i = 0; i < count; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() - Math.floor(Math.random() * 90)) // Within last 90 days
  
      const types: ("earned" | "redeemed" | "expired" | "adjusted")[] = [
        "earned",
        "earned",
        "earned",
        "redeemed",
        "adjusted",
      ]
      const type = types[Math.floor(Math.random() * types.length)]
  
      let description = ""
      let points = 0
      let reference = ""
  
      if (type === "earned") {
        const sources = ["Purchase", "Review", "Referral", "Birthday Bonus", "Welcome Bonus", "Promotion"]
        const source = sources[Math.floor(Math.random() * sources.length)]
        points =
          source === "Purchase"
            ? Math.floor(Math.random() * 500) + 50
            : source === "Review"
              ? 50
              : source === "Referral"
                ? 200
                : source === "Birthday Bonus"
                  ? 500
                  : source === "Welcome Bonus"
                    ? 250
                    : Math.floor(Math.random() * 300) + 100
  
        description =
          source === "Purchase"
            ? `Earned points from order #ORD-${Math.floor(Math.random() * 10000)}`
            : source === "Review"
              ? `Earned points for product review`
              : source === "Referral"
                ? `Earned points for referring a friend`
                : source === "Birthday Bonus"
                  ? `Birthday bonus points`
                  : source === "Welcome Bonus"
                    ? `Welcome bonus points`
                    : `Earned points from ${source.toLowerCase()}`
  
        reference =
          source === "Purchase"
            ? `ORD-${Math.floor(Math.random() * 10000)}`
            : source === "Review"
              ? `REV-${Math.floor(Math.random() * 10000)}`
              : source === "Referral"
                ? `REF-${Math.floor(Math.random() * 10000)}`
                : ""
      } else if (type === "redeemed") {
        const rewards = [
          "10% Discount",
          "Free Shipping",
          "Product Reward",
          "$5 Gift Card",
          "$10 Gift Card",
          "Premium Service",
        ]
        const reward = rewards[Math.floor(Math.random() * rewards.length)]
        points =
          reward === "10% Discount"
            ? 500
            : reward === "Free Shipping"
              ? 300
              : reward === "Product Reward"
                ? 1000
                : reward === "$5 Gift Card"
                  ? 750
                  : reward === "$10 Gift Card"
                    ? 1500
                    : 2000
  
        description = `Redeemed points for ${reward}`
        reference = `RWD-${Math.floor(Math.random() * 10000)}`
        points = -points // Negative for redemptions
      } else if (type === "expired") {
        points = -Math.floor(Math.random() * 300)
        description = "Points expired"
      } else {
        // adjusted
        points = Math.floor(Math.random() * 200) - 100 // Can be positive or negative
        description = points > 0 ? "Points adjustment (bonus)" : "Points adjustment (correction)"
      }
  
      activities.push({
        id: `activity-${userId}-${i}`,
        userId,
        type,
        points,
        description,
        date: date.toISOString(),
        reference,
      })
    }
  
    // Sort by date (newest first)
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
  
  // Mock data for loyalty rewards
  const loyaltyRewards: LoyaltyReward[] = [
    {
      id: "reward-1",
      name: "10% Off Your Next Purchase",
      description: "Get 10% off your next order. Valid for 30 days after redemption.",
      pointsCost: 500,
      category: "Discount",
      image: "/placeholder.svg?height=200&width=200&text=10%+Off",
      available: true,
      featured: true,
      expiryDays: 30,
      redemptionCount: 342,
      dateAdded: new Date(Date.now() - 86400000 * 120).toISOString(),
    },
    {
      id: "reward-2",
      name: "Free Standard Shipping",
      description: "Free standard shipping on your next order. No minimum purchase required.",
      pointsCost: 300,
      category: "Discount",
      image: "/placeholder.svg?height=200&width=200&text=Free+Shipping",
      available: true,
      featured: true,
      expiryDays: 60,
      redemptionCount: 567,
      dateAdded: new Date(Date.now() - 86400000 * 90).toISOString(),
    },
    {
      id: "reward-3",
      name: "$5 Gift Card",
      description: "Receive a $5 gift card to use on any purchase.",
      pointsCost: 750,
      category: "Gift Card",
      image: "/placeholder.svg?height=200&width=200&text=$5+Gift+Card",
      available: true,
      featured: false,
      expiryDays: 365,
      redemptionCount: 189,
      dateAdded: new Date(Date.now() - 86400000 * 60).toISOString(),
    },
    {
      id: "reward-4",
      name: "$10 Gift Card",
      description: "Receive a $10 gift card to use on any purchase.",
      pointsCost: 1500,
      category: "Gift Card",
      image: "/placeholder.svg?height=200&width=200&text=$10+Gift+Card",
      available: true,
      featured: false,
      expiryDays: 365,
      redemptionCount: 124,
      dateAdded: new Date(Date.now() - 86400000 * 60).toISOString(),
    },
    {
      id: "reward-5",
      name: "Premium Support Service",
      description: "Get access to our premium support service for 3 months.",
      pointsCost: 2000,
      category: "Service",
      image: "/placeholder.svg?height=200&width=200&text=Premium+Support",
      available: true,
      featured: false,
      expiryDays: 90,
      redemptionCount: 45,
      dateAdded: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
    {
      id: "reward-6",
      name: "Mystery Box",
      description: "Receive a mystery box with surprise products valued at $25+.",
      pointsCost: 3000,
      category: "Product",
      image: "/placeholder.svg?height=200&width=200&text=Mystery+Box",
      available: true,
      featured: true,
      redemptionCount: 78,
      dateAdded: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
    {
      id: "reward-7",
      name: "Early Access to Sales",
      description: "Get 24-hour early access to our seasonal sales events.",
      pointsCost: 1000,
      category: "Experience",
      image: "/placeholder.svg?height=200&width=200&text=Early+Access",
      available: true,
      featured: false,
      redemptionCount: 156,
      dateAdded: new Date(Date.now() - 86400000 * 45).toISOString(),
    },
    {
      id: "reward-8",
      name: "Exclusive Product",
      description: "Redeem for an exclusive product only available to loyalty members.",
      pointsCost: 5000,
      category: "Product",
      image: "/placeholder.svg?height=200&width=200&text=Exclusive+Product",
      available: true,
      featured: true,
      redemptionCount: 23,
      dateAdded: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: "reward-9",
      name: "25% Off Your Next Purchase",
      description: "Get 25% off your next order. Valid for 14 days after redemption.",
      pointsCost: 2500,
      category: "Discount",
      image: "/placeholder.svg?height=200&width=200&text=25%+Off",
      available: true,
      featured: false,
      expiryDays: 14,
      redemptionCount: 89,
      dateAdded: new Date(Date.now() - 86400000 * 75).toISOString(),
    },
    {
      id: "reward-10",
      name: "VIP Customer Service",
      description: "Get priority customer service for 6 months.",
      pointsCost: 4000,
      category: "Service",
      image: "/placeholder.svg?height=200&width=200&text=VIP+Service",
      available: false, // Currently unavailable
      featured: false,
      expiryDays: 180,
      redemptionCount: 12,
      dateAdded: new Date(Date.now() - 86400000 * 100).toISOString(),
    },
  ]
  
  // Loyalty tier details
  export const loyaltyTiers: LoyaltyTierDetails[] = [
    {
      tier: "Bronze",
      pointsThreshold: 0,
      pointsMultiplier: 1,
      benefits: ["Earn 1 point per $1 spent", "Birthday bonus points", "Access to rewards catalog"],
      color: "#CD7F32", // Bronze color
    },
    {
      tier: "Silver",
      pointsThreshold: 1000,
      pointsMultiplier: 1.25,
      benefits: [
        "Earn 1.25 points per $1 spent",
        "Birthday bonus points",
        "Access to rewards catalog",
        "Free shipping on orders over $50",
      ],
      color: "#C0C0C0", // Silver color
    },
    {
      tier: "Gold",
      pointsThreshold: 3000,
      pointsMultiplier: 1.5,
      benefits: [
        "Earn 1.5 points per $1 spent",
        "Birthday bonus points",
        "Access to rewards catalog",
        "Free shipping on all orders",
        "Early access to sales",
      ],
      color: "#FFD700", // Gold color
    },
    {
      tier: "Platinum",
      pointsThreshold: 6000,
      pointsMultiplier: 1.75,
      benefits: [
        "Earn 1.75 points per $1 spent",
        "Birthday bonus points",
        "Access to rewards catalog",
        "Free shipping on all orders",
        "Early access to sales",
        "Exclusive rewards",
        "Priority customer service",
      ],
      color: "#E5E4E2", // Platinum color
    },
    {
      tier: "Diamond",
      pointsThreshold: 10000,
      pointsMultiplier: 2,
      benefits: [
        "Earn 2 points per $1 spent",
        "Birthday bonus points",
        "Access to rewards catalog",
        "Free shipping on all orders",
        "Early access to sales",
        "Exclusive rewards",
        "Priority customer service",
        "Personal shopping assistant",
        "Exclusive events and experiences",
      ],
      color: "#B9F2FF", // Diamond-like color
    },
  ]
  
  // Get loyalty stats
  export function getLoyaltyStats(): LoyaltyStats {
    const tierCounts: Record<LoyaltyTier, number> = {
      Bronze: 0,
      Silver: 0,
      Gold: 0,
      Platinum: 0,
      Diamond: 0,
    }
  
    let totalPointsIssued = 0
    let totalPointsRedeemed = 0
  
    loyaltyUsers.forEach((user) => {
      tierCounts[user.tier]++
      totalPointsIssued += user.totalPointsEarned
      totalPointsRedeemed += user.totalPointsRedeemed
    })
  
    return {
      totalUsers: loyaltyUsers.length,
      activeUsers: loyaltyUsers.filter((user) => {
        const lastActivity = new Date(user.lastActivity)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return lastActivity >= thirtyDaysAgo
      }).length,
      totalPointsIssued,
      totalPointsRedeemed,
      averagePointsPerUser: Math.round(totalPointsIssued / loyaltyUsers.length),
      topTierDistribution: tierCounts,
      redemptionRate: Number.parseFloat((totalPointsRedeemed / totalPointsIssued).toFixed(2)),
    }
  }
  
  // Get current user
  export function getCurrentUser(): LoyaltyUser {
    return currentUser
  }
  
  // Get user activities
  export function getUserActivities(userId: string, limit?: number): LoyaltyActivity[] {
    // Generate activities on demand for the current user
    const activities = userId === currentUser.id ? generateActivities(userId, 20) : generateActivities(userId, 10)
  
    return limit ? activities.slice(0, limit) : activities
  }
  
  // Get all users
  export function getAllUsers(page = 1, limit = 10): { users: LoyaltyUser[]; total: number } {
    const start = (page - 1) * limit
    const end = start + limit
  
    return {
      users: loyaltyUsers.slice(start, end),
      total: loyaltyUsers.length,
    }
  }
  
  // Get all rewards
  export function getAllRewards(): LoyaltyReward[] {
    return loyaltyRewards
  }
  
  // Get featured rewards
  export function getFeaturedRewards(): LoyaltyReward[] {
    return loyaltyRewards.filter((reward) => reward.featured && reward.available)
  }
  
  // Get reward by ID
  export function getRewardById(id: string): LoyaltyReward | undefined {
    return loyaltyRewards.find((reward) => reward.id === id)
  }
  
  // Get user tier details
  export function getUserTierDetails(tier: LoyaltyTier): LoyaltyTierDetails {
    return loyaltyTiers.find((t) => t.tier === tier) || loyaltyTiers[0]
  }
  
  // Get next tier details
  export function getNextTierDetails(currentTier: LoyaltyTier): LoyaltyTierDetails | null {
    const currentTierIndex = loyaltyTiers.findIndex((t) => t.tier === currentTier)
    if (currentTierIndex === -1 || currentTierIndex === loyaltyTiers.length - 1) {
      return null // No next tier (user is at highest tier or tier not found)
    }
    return loyaltyTiers[currentTierIndex + 1]
  }
  
  // Calculate points needed for next tier
  export function getPointsNeededForNextTier(user: LoyaltyUser): {
    nextTier: LoyaltyTierDetails | null
    pointsNeeded: number
  } {
    const nextTier = getNextTierDetails(user.tier)
    if (!nextTier) {
      return { nextTier: null, pointsNeeded: 0 }
    }
  
    const pointsNeeded = Math.max(0, nextTier.pointsThreshold - user.pointsBalance)
    return { nextTier, pointsNeeded }
  }
  
  // Calculate points that would be earned for a purchase
  export function calculatePointsForPurchase(amount: number, tier: LoyaltyTier): number {
    const tierDetails = getUserTierDetails(tier)
    return Math.floor(amount * tierDetails.pointsMultiplier)
  }
  
  // Redeem a reward (simulation)
  export function redeemReward(userId: string, rewardId: string): { success: boolean; message: string } {
    const user = userId === currentUser.id ? currentUser : loyaltyUsers.find((u) => u.id === userId)
    const reward = loyaltyRewards.find((r) => r.id === rewardId)
  
    if (!user) {
      return { success: false, message: "User not found" }
    }
  
    if (!reward) {
      return { success: false, message: "Reward not found" }
    }
  
    if (!reward.available) {
      return { success: false, message: "This reward is currently unavailable" }
    }
  
    if (user.pointsBalance < reward.pointsCost) {
      return { success: false, message: "Insufficient points balance" }
    }
  
    // Simulate successful redemption
    if (userId === currentUser.id) {
      currentUser.pointsBalance -= reward.pointsCost
      currentUser.totalPointsRedeemed += reward.pointsCost
      currentUser.lastActivity = new Date().toISOString()
    }
  
    return {
      success: true,
      message: `Successfully redeemed ${reward.name} for ${reward.pointsCost} points`,
    }
  }
  