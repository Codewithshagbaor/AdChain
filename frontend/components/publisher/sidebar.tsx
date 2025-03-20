"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  BarChart3,
  LayoutGrid,
  Globe,
  Tag,
  FileText,
  CreditCard,
  Wallet,
  MessageSquare,
  Settings,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function PublisherSiderBar ({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <>
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-20 w-64 transform border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <div className="flex items-center gap-2 md:hidden">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
              </div>
              <span className="text-xl font-bold">AdChain</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close Sidebar</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
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
                href="#"
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
            </nav>
          </div>
          <div className="mt-auto p-4">
            {isWalletConnected ? (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Earnings Available</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">18.6 ETH</div>
                  <div className="text-xs text-muted-foreground">≈ $33,912.45 USD</div>
                  <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-700">
                    <Wallet className="mr-2 h-4 w-4" />
                    Withdraw
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Wallet Not Connected</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your wallet to manage your earnings and withdrawals
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={handleConnectWallet}
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Wallet
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </aside>
      <div
        className={`fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-all duration-200 ${isSidebarOpen ? "block md:hidden" : "hidden"
          }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </>
  )
}