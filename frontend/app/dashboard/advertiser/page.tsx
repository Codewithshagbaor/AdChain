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
  Globe,
  Home,
  LineChart,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Settings,
  Sliders,
  Target,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AdvertiserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true)
  }

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
              </nav>
            </div>
            <div className="mt-auto p-4">
              {isWalletConnected ? (
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm">Wallet Balance</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">24.8 ETH</div>
                    <div className="text-xs text-muted-foreground">≈ $45,245.12 USD</div>
                    <Button size="sm" className="mt-3 w-full bg-gradient-to-r from-blue-500 to-blue-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Funds
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
                      Connect your wallet to manage your funds and campaigns
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
          className={`fixed inset-0 z-10 bg-background/80 backdrop-blur-sm transition-all duration-200 ${
            isSidebarOpen ? "block md:hidden" : "hidden"
          }`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 md:pl-72">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Advertiser Dashboard</h1>
              <p className="text-muted-foreground">Manage your advertising campaigns and track performance</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>

          {!isWalletConnected && (
            <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 mb-2">
              <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle>Wallet not connected</AlertTitle>
              <AlertDescription>
                Connect your wallet to access all features and manage your campaigns.
                <Button
                  variant="link"
                  className="text-blue-600 dark:text-blue-400 p-0 h-auto ml-2"
                  onClick={handleConnectWallet}
                >
                  Connect now
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">45.23 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $82,345.89 USD</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +20.1% from last month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Across 8 publishers</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +2 from last week
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                <LineChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">1.2M</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +12.3% from last month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
                <PieChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">3.8%</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Industry avg: 2.1%</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +0.5% from last week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-blue-200 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Daily impressions and clicks across all campaigns</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Last 7 Days
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Last 24 Hours</DropdownMenuItem>
                      <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                      <DropdownMenuItem>Custom Range</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-700/10 p-6">
                  <div className="flex h-full w-full items-end gap-2">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="relative flex-1 overflow-hidden rounded-t-sm bg-gradient-to-t from-blue-500 to-blue-700"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                        }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="absolute inset-0" />
                            <TooltipContent>
                              <div className="text-xs">
                                <div className="font-medium">Day {i + 1}</div>
                                <div>{Math.floor(Math.random() * 10000)} impressions</div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Top Campaigns</CardTitle>
                <CardDescription>Your best performing campaigns this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "DeFi Product Launch", impressions: "450K", ctr: "4.2%", spend: "5.2 ETH" },
                    { name: "NFT Collection Promo", impressions: "320K", ctr: "3.8%", spend: "3.8 ETH" },
                    { name: "Token Awareness", impressions: "280K", ctr: "3.5%", spend: "3.2 ETH" },
                    { name: "Wallet Integration", impressions: "210K", ctr: "2.9%", spend: "2.5 ETH" },
                  ].map((campaign, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.impressions} impressions</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium leading-none">{campaign.ctr}</p>
                          <p className="text-sm text-muted-foreground">CTR</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium leading-none">{campaign.spend}</p>
                          <p className="text-sm text-muted-foreground">Spend</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Campaigns
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent campaign payments and deposits</CardDescription>
              </CardHeader>
              <CardContent>
                {isWalletConnected ? (
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
                      <div key={i} className="flex items-center justify-between">
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
                            <p className="text-sm font-medium leading-none">{transaction.type}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-1">{transaction.date}</span>
                              <span className="text-blue-500 hover:underline cursor-pointer">{transaction.hash}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p
                              className={`text-sm font-medium leading-none ${
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
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Wallet className="h-12 w-12 text-blue-200 dark:text-blue-800 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Wallet Not Connected</h3>
                    <p className="text-sm text-muted-foreground mb-4 max-w-md">
                      Connect your wallet to view your transaction history and manage your funds
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700" onClick={handleConnectWallet}>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
              {isWalletConnected && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
            <Card className="lg:col-span-3 border-blue-200 dark:border-blue-800">
              <Tabs defaultValue="publishers">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Network Stats</CardTitle>
                    <TabsList>
                      <TabsTrigger value="publishers">Publishers</TabsTrigger>
                      <TabsTrigger value="advertisers">Advertisers</TabsTrigger>
                    </TabsList>
                  </div>
                  <CardDescription>Network growth and activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="publishers" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-blue-200 dark:border-blue-800">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">Total Publishers</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">1,205</div>
                          <p className="text-xs text-muted-foreground">+12 this week</p>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 dark:border-blue-800">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">Active Publishers</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">892</div>
                          <p className="text-xs text-muted-foreground">74% of total</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm font-medium">Top Publishers</div>
                      {[
                        { name: "CryptoNews.io", impressions: "120K", revenue: "1.2 ETH" },
                        { name: "DeFiPulse", impressions: "95K", revenue: "0.95 ETH" },
                        { name: "NFTWorld", impressions: "82K", revenue: "0.82 ETH" },
                      ].map((publisher, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{publisher.name}</p>
                            <p className="text-sm text-muted-foreground">{publisher.impressions} impressions</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium leading-none">{publisher.revenue}</p>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="advertisers" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="border-blue-200 dark:border-blue-800">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">Total Advertisers</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">342</div>
                          <p className="text-xs text-muted-foreground">+8 this week</p>
                        </CardContent>
                      </Card>
                      <Card className="border-blue-200 dark:border-blue-800">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">Active Advertisers</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                          <div className="text-2xl font-bold">215</div>
                          <p className="text-xs text-muted-foreground">63% of total</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm font-medium">Top Advertisers</div>
                      {[
                        { name: "MetaChain", spend: "12.5 ETH", campaigns: "3" },
                        { name: "TokenSwap", spend: "8.2 ETH", campaigns: "2" },
                        { name: "CryptoWallet", spend: "6.8 ETH", campaigns: "1" },
                      ].map((advertiser, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">{advertiser.name}</p>
                            <p className="text-sm text-muted-foreground">{advertiser.campaigns} active campaigns</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium leading-none">{advertiser.spend}</p>
                            <p className="text-sm text-muted-foreground">Total Spend</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Campaign Settings</CardTitle>
                  <CardDescription>Manage your campaign preferences and targeting options</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Campaign
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Default Bid Strategy</div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        CPC
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 bg-accent text-accent-foreground">
                        CPM
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        CPA
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Target Audience</div>
                    <div className="flex flex-wrap gap-2">
                      {["DeFi Users", "NFT Collectors", "Traders", "Developers", "DAO Members"].map((tag, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 text-xs font-medium"
                        >
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Daily Budget Cap</div>
                      <div className="text-sm font-medium">2.5 ETH</div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div>0 ETH</div>
                      <div>5 ETH</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Campaign Optimization</div>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <Sliders className="h-3.5 w-3.5" />
                        <span className="text-xs">Adjust</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs">Auto-bidding</div>
                        <div className="flex items-center rounded-md border p-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span className="ml-2 text-xs">Enabled</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs">Smart Targeting</div>
                        <div className="flex items-center rounded-md border p-2">
                          <div className="h-4 w-4 rounded-full bg-green-500"></div>
                          <span className="ml-2 text-xs">Enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="ml-auto">
                Cancel
              </Button>
              <Button className="ml-2 bg-gradient-to-r from-blue-500 to-blue-700">Save Changes</Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}

