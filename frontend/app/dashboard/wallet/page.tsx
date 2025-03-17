"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  Globe,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  Shield,
  Sliders,
  Users,
  Wallet,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WalletDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-blue-50/10 dark:to-blue-950/10">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
              </div>
              <span className="text-xl font-bold">AdChain</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 md:flex-initial">
            <div className="relative">
              <Input placeholder="Search..." className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]" />
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </form>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-blue-600"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="relative h-8 rounded-full">
                <span className="font-normal">alex@adchain.io</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/auth">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
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
                  href="/dashboard/overview"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
                  className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
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
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Wallet Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">43.4 ETH</div>
                  <div className="text-xs text-muted-foreground">≈ $79,157.57 USD</div>
                  <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Funds
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </aside>
        <div
          className={`fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
            isSidebarOpen ? "block md:hidden" : "hidden"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-72">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Wallet Dashboard</h1>
              <p className="text-muted-foreground">Manage your crypto assets and transactions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Etherscan
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                <Wallet className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">43.4 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $79,157.57 USD</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +5.2% from last week
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Available for Withdrawal</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">18.6 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $33,912.45 USD</p>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Locked in Campaigns</CardTitle>
                <LineChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">24.8 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $45,245.12 USD</p>
                  <div className="text-xs text-muted-foreground">12 active campaigns</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Gas Spent (30d)</CardTitle>
                <PieChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">0.12 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $218.76 USD</p>
                  <div className="text-xs text-red-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-135" />
                    -12.3% from last month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="assets" className="mt-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                  <CardDescription>Manage your cryptocurrency assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Ethereum", symbol: "ETH", balance: "43.4", value: "$79,157.57", change: "+5.2%" },
                      { name: "USD Coin", symbol: "USDC", balance: "12,500", value: "$12,500.00", change: "0.0%" },
                      { name: "AdChain Token", symbol: "ADC", balance: "25,000", value: "$7,500.00", change: "+12.5%" },
                    ].map((asset, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {asset.symbol.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{asset.name}</p>
                            <p className="text-sm text-muted-foreground">{asset.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {asset.balance} {asset.symbol}
                          </p>
                          <div className="flex items-center justify-end gap-1">
                            <p className="text-sm text-muted-foreground">{asset.value}</p>
                            <span
                              className={`text-xs ${asset.change.startsWith("+") ? "text-green-500" : asset.change === "0.0%" ? "text-muted-foreground" : "text-red-500"}`}
                            >
                              {asset.change}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Asset
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="mt-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View your recent blockchain transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "Deposit",
                        amount: "+10 ETH",
                        status: "Completed",
                        date: "Today, 10:45 AM",
                        address: "0x3a...4b2e",
                        hash: "0x8f2...3b7a",
                      },
                      {
                        type: "Campaign Payment",
                        amount: "-2.5 ETH",
                        status: "Completed",
                        date: "Yesterday, 2:20 PM",
                        address: "0x7c...9f3a",
                        hash: "0x6d1...9c4e",
                      },
                      {
                        type: "Publisher Payout",
                        amount: "-1.8 ETH",
                        status: "Pending",
                        date: "Yesterday, 11:30 AM",
                        address: "0x5d...2c1b",
                        hash: "0x2a7...5f8d",
                      },
                      {
                        type: "Deposit",
                        amount: "+15 ETH",
                        status: "Completed",
                        date: "Mar 12, 9:15 AM",
                        address: "0x3a...4b2e",
                        hash: "0x9e3...7c2b",
                      },
                    ].map((transaction, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              transaction.type === "Deposit"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                          >
                            {transaction.type === "Deposit" ? (
                              <ArrowRight className="h-5 w-5 rotate-180" />
                            ) : (
                              <ArrowRight className="h-5 w-5" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">{transaction.type}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-1">{transaction.date}</span>
                              <Link href="#" className="text-blue-500 hover:underline">
                                {transaction.hash}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p
                              className={`font-medium ${
                                transaction.type === "Deposit" ? "text-green-600 dark:text-green-400" : ""
                              }`}
                            >
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">{transaction.address}</p>
                          </div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              transaction.status === "Completed"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {transaction.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Wallet Security</CardTitle>
                  <CardDescription>Manage your wallet security settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            <Shield className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Enabled
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            <Wallet className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Connected Wallets</p>
                            <p className="text-sm text-muted-foreground">Manage your connected wallets</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            <Sliders className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Spending Limits</p>
                            <p className="text-sm text-muted-foreground">Set daily and transaction limits</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Checkup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common wallet operations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Deposit</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Add funds to your AdChain wallet</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Deposit Funds
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Withdraw</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Withdraw funds to your external wallet</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Withdraw Funds
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Swap</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">Exchange between different cryptocurrencies</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Swap Tokens
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

