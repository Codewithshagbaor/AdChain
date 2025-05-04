"use client"

import { useState, type ReactNode } from "react"

import { DashboardHeader } from "@/components/dashboard/header"
import { AdvertiserSidebar } from "@/components/dashboard/advertiser-sidebar"
import { PublisherSidebar } from "@/components/dashboard/publisher-sidebar"
import { OverviewSidebar } from "@/components/dashboard/overview-sidebar"

interface DashboardLayoutProps {
  children: ReactNode
  userType: "advertiser" | "publisher" | "overview"
}

export function DashboardLayout({
  children,
  userType,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-blue-50/10 dark:to-blue-950/10">
      <DashboardHeader onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        {userType === "advertiser" && (
          <AdvertiserSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {userType === "publisher" && (
          <PublisherSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        {userType === "overview" && (
          <OverviewSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        )}
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-72">{children}</main>
      </div>
    </div>
  )
}

