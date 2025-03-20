"use client"
import Link from "next/link"
import {
  BarChart3,
  CreditCard,
  FileText,
  Globe,
  Home,
  LayoutGrid,
  MessageSquare,
  Settings,
  Tag,
  Wallet,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { SidebarBase } from "@/components/dashboard/sidebar-base"

interface PublisherSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isWalletConnected?: boolean
  onConnectWallet?: () => void
}

export function PublisherSidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  isWalletConnected = true,
  onConnectWallet = () => {},
}: PublisherSidebarProps) {
  return (
    <SidebarBase
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isWalletConnected={isWalletConnected}
      onConnectWallet={onConnectWallet}
      walletBalance="18.6 ETH"
      walletBalanceUSD="$33,912.45 USD"
      walletAction={{
        label: "Withdraw",
        icon: <Wallet className="mr-2 h-4 w-4" />,
        onClick: () => {},
      }}
    >
      <Link
        href="/dashboard/publisher"
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
        <LayoutGrid className="h-4 w-4" />
        Ad Units
      </Link>
      <Link
        href="/dashboard/publisher/websites"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Globe className="h-4 w-4" />
        Websites
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <Tag className="h-4 w-4" />
        Placements
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <FileText className="h-4 w-4" />
        Reports
      </Link>
      <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
      >
        <CreditCard className="h-4 w-4" />
        Payments
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

