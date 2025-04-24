"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, ArrowRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")

      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
        variant: "success",
      })
    }, 1000)
  }

  return (
    <section className="bg-gradient-to-r from-purple-900/30 to-black py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl rounded-lg border border-purple-800/30 bg-black/50 p-8 text-center backdrop-blur-sm"
        >
          <Badge variant="outline" className="mb-2 bg-purple-900/20 text-purple-300">
            Stay Updated
          </Badge>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-gray-400">
            Get the latest updates on new products, special offers, and exclusive content delivered straight to your
            inbox.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="group bg-purple-700 hover:bg-purple-800">
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company. You can
            unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
