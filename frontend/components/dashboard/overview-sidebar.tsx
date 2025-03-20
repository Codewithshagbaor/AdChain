"use client"
import Link from "next/link"
import { BarChart3, CreditCard, Globe, Home, LineChart, MessageSquare, Settings, Users, Wallet } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SidebarBase } from "@/components/dashboard/sidebar-base"

interface OverviewSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function OverviewSidebar({ isSidebarOpen, setIsSidebarOpen }: OverviewSidebarProps) {
  return (
    <SidebarBase
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      walletAction={{
        label: "Manage Wallet",
        icon: <Wallet className="mr-2 h-4 w-4" />,
        onClick: () => {},
      }}
    >
      <Link
        href="/dashboard/overview"
        className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
      >
        <Home className="h-4 w-4" />
        Overview
      </Link>
      <Link
        href="/dashboard/advertiser"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <BarChart3 className="h-4 w-4" />
        Advertiser Dashboard
      </Link>
      <Link
        href="/dashboard/publisher"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Globe className="h-4 w-4" />
        Publisher Dashboard
      </Link>
      <Link
        href="/dashboard/wallet"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Wallet className="h-4 w-4" />
        Wallet
      </Link>
      <Link
        href="/dashboard/analytics"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <LineChart className="h-4 w-4" />
        Analytics
      </Link>
      <Separator className="my-2" />
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Users className="h-4 w-4" />
        Team
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <CreditCard className="h-4 w-4" />
        Billing
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <MessageSquare className="h-4 w-4" />
        Support
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </SidebarBase>
  )
}

