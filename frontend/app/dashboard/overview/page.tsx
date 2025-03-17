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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function OverviewDashboard() {
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
                    <Wallet className="mr-2 h-4 w-4" />
                    Manage Wallet
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
              <h1 className="text-2xl font-bold tracking-tight">Overview Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Alex! Here's a summary of your AdChain activity.</p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Last 30 Days
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                  <DropdownMenuItem>Year to Date</DropdownMenuItem>
                  <DropdownMenuItem>All Time</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">32.45 ETH</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">≈ $59,128.76 USD</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +18.3% from last month
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <BarChart3 className="h-4 w-4 text-blue-600" />
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
                <LineChart className="h-4 w-4 text-blue-600" />
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
                <CardTitle className="text-sm font-medium">Active Ad Units</CardTitle>
                <PieChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">24</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Across 5 websites</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +3 from last month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 border-blue-200 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Revenue vs. Spend</CardTitle>
                  <CardDescription>Compare your earnings and spending over time</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Last 30 Days
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
                      <DropdownMenuItem>Last 90 Days</DropdownMenuItem>
                      <DropdownMenuItem>Year to Date</DropdownMenuItem>
                      <DropdownMenuItem>All Time</DropdownMenuItem>
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
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div key={i} className="relative flex-1">
                        <div
                          className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-gradient-to-t from-blue-500 to-blue-700 opacity-70"
                          style={{
                            height: `${Math.random() * 60 + 20}%`,
                          }}
                        ></div>
                        <div
                          className="absolute bottom-0 left-0 right-0 rounded-t-sm bg-gradient-to-t from-green-500 to-green-700"
                          style={{
                            height: `${Math.random() * 60 + 20}%`,
                            width: "50%",
                          }}
                        ></div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="absolute inset-0" />
                            <TooltipContent>
                              <div className="text-xs">
                                <div className="font-medium">Day {i + 1}</div>
                                <div className="flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                                  <span>Spend: {(Math.random() * 2 + 0.5).toFixed(2)} ETH</span>
                                </div>
                                <div className="flex items-center">
                                  <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                  <span>Revenue: {(Math.random() * 2 + 0.5).toFixed(2)} ETH</span>
                                </div>
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
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Deposit",
                      amount: "+10 ETH",
                      status: "Completed",
                      date: "Today, 10:45 AM",
                      hash: "0x8f2...3b7a",
                    },
                    {
                      type: "Campaign Payment",
                      amount: "-2.5 ETH",
                      status: "Completed",
                      date: "Yesterday, 2:20 PM",
                      hash: "0x6d1...9c4e",
                    },
                    {
                      type: "Publisher Earnings",
                      amount: "+1.8 ETH",
                      status: "Completed",
                      date: "Yesterday, 11:30 AM",
                      hash: "0x2a7...5f8d",
                    },
                    {
                      type: "Withdrawal",
                      amount: "-5.0 ETH",
                      status: "Pending",
                      date: "Mar 12, 9:15 AM",
                      hash: "0x9e3...7c2b",
                    },
                  ].map((transaction, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            transaction.amount.startsWith("+")
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {transaction.amount.startsWith("+") ? (
                            <ArrowRight className="h-5 w-5 rotate-180" />
                          ) : (
                            <ArrowRight className="h-5 w-5" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{transaction.type}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-1">{transaction.date}</span>
                            <Link href="#" className="text-blue-500 hover:underline">
                              {transaction.hash}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-medium leading-none ${
                            transaction.amount.startsWith("+") ? "text-green-600 dark:text-green-400" : ""
                          }`}
                        >
                          {transaction.amount}
                        </p>
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
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Advertiser Quick Actions</CardTitle>
                <CardDescription>Manage your advertising campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-between bg-gradient-to-r from-blue-500 to-blue-700">
                  Create New Campaign
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  View Campaign Analytics
                  <BarChart3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Manage Ad Creatives
                  <Settings className="h-4 w-4" />
                </Button>
                <Link href="/dashboard/advertiser" className="block">
                  <Button variant="link" className="w-full justify-between">
                    Go to Advertiser Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Publisher Quick Actions</CardTitle>
                <CardDescription>Manage your ad inventory</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-between bg-gradient-to-r from-blue-500 to-blue-700">
                  Create New Ad Unit
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  View Earnings Analytics
                  <LineChart className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Manage Websites
                  <Globe className="h-4 w-4" />
                </Button>
                <Link href="/dashboard/publisher" className="block">
                  <Button variant="link" className="w-full justify-between">
                    Go to Publisher Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Wallet Quick Actions</CardTitle>
                <CardDescription>Manage your crypto wallet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-between bg-gradient-to-r from-blue-500 to-blue-700">
                  Deposit Funds
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  Withdraw Funds
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  View Transaction History
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Link href="/dashboard/wallet" className="block">
                  <Button variant="link" className="w-full justify-between">
                    Go to Wallet Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

