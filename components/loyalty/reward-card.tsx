"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getCurrentUser, redeemReward } from "@/lib/loyalty"
import type { LoyaltyReward } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { Gift, Info, Loader2 } from "lucide-react"

interface RewardCardProps {
  reward: LoyaltyReward
  onRedeemed?: () => void
}

export function RewardCard({ reward, onRedeemed }: RewardCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const { toast } = useToast()
  const user = getCurrentUser()

  const handleRedeem = () => {
    setIsRedeeming(true)

    // Simulate API call
    setTimeout(() => {
      const result = redeemReward(user.id, reward.id)

      if (result.success) {
        toast({
          title: "Reward Redeemed",
          description: result.message,
          variant: "default",
        })
        if (onRedeemed) onRedeemed()
      } else {
        toast({
          title: "Redemption Failed",
          description: result.message,
          variant: "destructive",
        })
      }

      setIsRedeeming(false)
      setIsDialogOpen(false)
    }, 1500)
  }

  const canRedeem = user.pointsBalance >= reward.pointsCost && reward.available

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-card rounded-lg overflow-hidden border border-gray-800 h-full flex flex-col"
      >
        <div className="relative h-48 bg-secondary">
          <Image src={reward.image || "/placeholder.svg"} alt={reward.name} fill className="object-cover" />
          {!reward.available && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <span className="px-3 py-1 bg-secondary text-white text-sm font-medium rounded-full">
                Currently Unavailable
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2 px-2 py-1 bg-primary/90 text-white text-sm font-medium rounded-full">
            {reward.pointsCost} Points
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium mb-1">{reward.name}</h3>
          <p className="text-sm text-gray-400 mb-4 flex-1">{reward.description}</p>

          <Button
            onClick={() => setIsDialogOpen(true)}
            disabled={!canRedeem}
            className={canRedeem ? "bg-primary hover:bg-primary/90" : "bg-gray-700"}
            size="sm"
          >
            <Gift className="mr-2 h-4 w-4" />
            {canRedeem ? "Redeem Reward" : "Not Enough Points"}
          </Button>
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border border-gray-800">
          <DialogHeader>
            <DialogTitle>Redeem Reward</DialogTitle>
            <DialogDescription>
              Are you sure you want to redeem this reward? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-4 py-4">
            <div className="relative w-20 h-20 bg-secondary rounded-md overflow-hidden flex-shrink-0">
              <Image src={reward.image || "/placeholder.svg"} alt={reward.name} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-medium">{reward.name}</h4>
              <p className="text-sm text-gray-400">{reward.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-primary font-bold">{reward.pointsCost} Points</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-400">Your balance: {user.pointsBalance} Points</span>
              </div>
            </div>
          </div>

          {reward.expiryDays && (
            <div className="flex items-start gap-2 p-3 bg-secondary/30 rounded-md text-sm">
              <Info className="h-4 w-4 text-primary mt-0.5" />
              <p>This reward will expire {reward.expiryDays} days after redemption.</p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isRedeeming}>
              Cancel
            </Button>
            <Button onClick={handleRedeem} disabled={isRedeeming || !canRedeem}>
              {isRedeeming ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redeeming...
                </>
              ) : (
                "Confirm Redemption"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
