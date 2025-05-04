import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ShopMart Dashboard",
  description: "AI-powered analytics dashboard for ShopMart e-commerce platform",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="min-h-screen bg-black">{children}</div>
}
