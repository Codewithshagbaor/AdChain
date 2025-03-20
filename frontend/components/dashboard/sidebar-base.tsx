"use client"

import type { ReactNode } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {CustomConnectWallet} from "@/components/ConnectWeb3Wallet"
interface SidebarBaseProps {
  children: ReactNode
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  walletBalance?: string
  walletBalanceUSD?: string
  walletAction?: {
    label: string
    icon: ReactNode
    onClick: () => void
  }
  isWalletConnected?: boolean
  onConnectWallet?: () => void
}

export function SidebarBase({
  children,
  isSidebarOpen,
  setIsSidebarOpen,
  walletBalance = "43.4 ETH",
  walletBalanceUSD = "$79,157.57 USD",
  walletAction,
  isWalletConnected = true,
  onConnectWallet,
}: SidebarBaseProps) {
  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
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
            <Button variant="outline" size="icon" className="ml-auto md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close Sidebar</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">{children}</nav>
          </div>
          <div className="mt-auto p-4">
            {isWalletConnected ? (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">{walletBalance}</div>
                  <div className="text-xs text-muted-foreground">≈ {walletBalanceUSD}</div>
                  {walletAction && (
                    <Button
                      size="sm"
                      className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-700"
                      onClick={walletAction.onClick}
                    >
                      {walletAction.icon}
                      {walletAction.label}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Wallet Not Connected</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Connect your wallet to manage your funds and campaigns
                  </p>
                  <CustomConnectWallet />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </aside>
      <div
        className={`fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
          isSidebarOpen ? "block md:hidden" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
    </>
  )
}

