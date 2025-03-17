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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AnalyticsDashboard() {
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
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
                >
                  <Wallet className="h-4 w-4" />
                  Wallet
                </Link>
                <Link
                  href="/dashboard/analytics"
                  className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
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
              <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
              <p className="text-muted-foreground">
                Detailed insights into your advertising and publishing performance
              </p>
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

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="advertiser">Advertiser</TabsTrigger>
              <TabsTrigger value="publisher">Publisher</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                    <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                    <LineChart className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="text-2xl font-bold">4.2M</div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Last 30 days</p>
                      <div className="text-xs text-green-500 flex items-center">
                        <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                        +15.2% from last month
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
                <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
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
                    <CardTitle className="text-sm font-medium">Spend</CardTitle>
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
              </div>

              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Impressions, clicks, and conversions over time</CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Metrics
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Impressions</DropdownMenuItem>
                        <DropdownMenuItem>Clicks</DropdownMenuItem>
                        <DropdownMenuItem>Conversions</DropdownMenuItem>
                        <DropdownMenuItem>Revenue</DropdownMenuItem>
                        <DropdownMenuItem>Spend</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-700/10 p-6">
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
                                    <span>Impressions: {Math.floor(Math.random() * 100000)}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                                    <span>Clicks: {Math.floor(Math.random() * 5000)}</span>
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
            </TabsContent>

            <TabsContent value="advertiser" className="mt-4 space-y-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Performance metrics for your advertising campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "DeFi Product Launch",
                        impressions: "450K",
                        clicks: "18K",
                        ctr: "4.2%",
                        spend: "5.2 ETH",
                      },
                      {
                        name: "NFT Collection Promo",
                        impressions: "320K",
                        clicks: "12.2K",
                        ctr: "3.8%",
                        spend: "3.8 ETH",
                      },
                      { name: "Token Awareness", impressions: "280K", clicks: "9.8K", ctr: "3.5%", spend: "3.2 ETH" },
                      {
                        name: "Wallet Integration",
                        impressions: "210K",
                        clicks: "6.1K",
                        ctr: "2.9%",
                        spend: "2.5 ETH",
                      },
                    ].map((campaign, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">{campaign.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{campaign.impressions} impressions</span>
                            <span>{campaign.clicks} clicks</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{campaign.ctr}</p>
                            <p className="text-sm text-muted-foreground">CTR</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{campaign.spend}</p>
                            <p className="text-sm text-muted-foreground">Spend</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
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
            </TabsContent>

            <TabsContent value="publisher" className="mt-4 space-y-4">
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Website Performance</CardTitle>
                  <CardDescription>Performance metrics for your publishing websites</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "crypto-news.com", impressions: "850K", fillRate: "96.2%", earnings: "8.4 ETH" },
                      { name: "defi-pulse.io", impressions: "620K", fillRate: "94.8%", earnings: "6.2 ETH" },
                      { name: "nft-world.com", impressions: "480K", fillRate: "92.5%", earnings: "4.8 ETH" },
                      { name: "blockchain-daily.net", impressions: "320K", fillRate: "90.1%", earnings: "3.2 ETH" },
                    ].map((website, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <p className="font-medium">{website.name}</p>
                          <p className="text-sm text-muted-foreground">{website.impressions} impressions</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{website.fillRate}</p>
                            <p className="text-sm text-muted-foreground">Fill Rate</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{website.earnings}</p>
                            <p className="text-sm text-muted-foreground">Earnings</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Websites
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>User distribution by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", percentage: 35, impressions: "1.47M" },
                    { country: "United Kingdom", percentage: 18, impressions: "756K" },
                    { country: "Germany", percentage: 12, impressions: "504K" },
                    { country: "Japan", percentage: 10, impressions: "420K" },
                    { country: "Canada", percentage: 8, impressions: "336K" },
                    { country: "Other", percentage: 17, impressions: "714K" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-full max-w-[50%]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.country}</span>
                          <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="mt-1 h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{item.impressions}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Impressions by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[250px] items-center justify-center">
                  <div className="relative h-40 w-40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">4.2M</div>
                        <div className="text-sm text-muted-foreground">Total Impressions</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="20"
                        className="text-muted opacity-10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#blue-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="0"
                        className="text-blue-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#green-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                        className="text-green-500"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#purple-gradient)"
                        strokeWidth="20"
                        strokeDasharray="251.2"
                        strokeDashoffset="188.4"
                        className="text-purple-500"
                      />
                      <defs>
                        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#1d4ed8" />
                        </linearGradient>
                        <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                        <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#7e22ce" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { device: "Mobile", percentage: 50, color: "bg-blue-500" },
                    { device: "Desktop", percentage: 30, color: "bg-green-500" },
                    { device: "Tablet", percentage: 20, color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                        <span className="font-medium">{item.device}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.percentage}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

