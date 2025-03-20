"use client"
import Link from "next/link"
import { BarChart3, CreditCard, Globe, Home, MessageSquare, Plus, Settings, Target, Users, Wallet } from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SidebarBase } from "@/components/dashboard/sidebar-base"

interface AdvertiserSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isWalletConnected?: boolean
  onConnectWallet?: () => void
}

export function AdvertiserSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isWalletConnected = true,
  onConnectWallet = () => {},
}: AdvertiserSidebarProps) {
  return (
    <SidebarBase
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isWalletConnected={isWalletConnected}
      onConnectWallet={onConnectWallet}
      walletAction={{
        label: "Add Funds",
        icon: <Plus className="mr-2 h-4 w-4" />,
        onClick: () => {},
      }}
    >
      <Link
        href="/dashboard/advertiser"
        className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Globe className="h-4 w-4" />
        Campaigns
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Target className="h-4 w-4" />
        Audience
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Users className="h-4 w-4" />
        Publishers
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <CreditCard className="h-4 w-4" />
        Billing
      </Link>
      <Separator className="my-2" />
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Wallet className="h-4 w-4" />
        Wallet
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

