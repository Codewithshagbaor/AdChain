"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronRight, ExternalLink, Globe, LineChart, Lock, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
            </div>
            <span className="text-xl font-bold">AdChain</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#publishers" className="text-sm font-medium hover:text-primary">
              Publishers
            </Link>
            <Link href="#advertisers" className="text-sm font-medium hover:text-primary">
              Advertisers
            </Link>
            <Link href="#roadmap" className="text-sm font-medium hover:text-primary">
              Roadmap
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">Get Started/Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Backed by top crypto VCs
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  The Decentralized Advertising Protocol for Web3
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  AdChain connects Web3 advertisers with crypto-native publishers through transparent, smart
                  contract-based payments with instant settlements.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
                    Start Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    View Demo
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      E
                    </div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      S
                    </div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      A
                    </div>
                  </div>
                  <div className="text-muted-foreground">
                    Trusted by <span className="font-medium text-foreground">leading Web3 projects</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm">
                    <div className="h-full w-full bg-white/80 dark:bg-black/80">
                      <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-xs">AdChain Platform</div>
                          <div className="w-16"></div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="grid gap-4">
                            <div className="rounded-lg bg-muted p-4">
                              <div className="text-sm font-medium">Total Ad Revenue</div>
                              <div className="mt-1 text-2xl font-bold">$1,245,089</div>
                              <div className="mt-1 flex items-center text-xs text-green-500">
                                <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                                +24.5% from last month
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="rounded-lg bg-muted p-4">
                                <div className="text-sm font-medium">Active Campaigns</div>
                                <div className="mt-1 text-2xl font-bold">342</div>
                              </div>
                              <div className="rounded-lg bg-muted p-4">
                                <div className="text-sm font-medium">Publishers</div>
                                <div className="mt-1 text-2xl font-bold">1,205</div>
                              </div>
                            </div>
                            <div className="rounded-lg border bg-card p-4">
                              <div className="text-sm font-medium">Recent Transactions</div>
                              <div className="mt-2 space-y-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between rounded-lg bg-muted p-2 text-xs"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-full bg-primary/10"></div>
                                      <div>0x3a...4b2e</div>
                                    </div>
                                    <div className="font-medium">+2.45 ETH</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Revolutionizing Digital Advertising with Blockchain
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AdChain combines the transparency of blockchain with the efficiency of programmatic advertising to
                  create a new paradigm for digital marketing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="text-xl font-bold">Instant Settlements</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Payments are processed instantly using cryptocurrency, eliminating the traditional 30-90 day wait
                    times for publishers.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Contract Verification</h3>
                  </div>
                  <p className="text-muted-foreground">
                    All ad impressions and clicks are verified on-chain, ensuring complete transparency and eliminating
                    fraud.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-400">
                      <Globe className="h-4 w-4" />
                    </div>
                    <h3 className="text-xl font-bold">Permissionless Access</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Any advertiser or publisher can join the network without gatekeepers, creating a truly open
                    marketplace.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 p-1">
                  <div className="h-full w-full rounded-lg bg-background p-6">
                    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">Real-time Analytics</h3>
                        <p className="text-sm text-muted-foreground">
                          Track campaign performance with blockchain-verified metrics that update in real-time
                        </p>
                      </div>
                      <div className="w-full max-w-md rounded-lg border bg-card p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">Campaign Performance</div>
                          <div className="text-xs text-muted-foreground">Last 24 hours</div>
                        </div>
                        <div className="mt-4 h-32 w-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-25 rounded-md"></div>
                        <div className="mt-4 flex items-center justify-between text-xs">
                          <div>0:00</div>
                          <div>6:00</div>
                          <div>12:00</div>
                          <div>18:00</div>
                          <div>24:00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="publishers" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block w-fit rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  For Publishers
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Maximize Your Revenue with Crypto-Native Advertising
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join the network of premium Web3 publishers and start earning cryptocurrency for your ad inventory
                  with instant settlements.
                </p>
                <ul className="grid gap-2 py-4">
                  {[
                    "Get paid instantly in your preferred cryptocurrency",
                    "Full transparency with on-chain verification",
                    "Set your own rates and targeting preferences",
                    "Access to premium Web3 advertisers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500">
                        <ChevronRight className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href="/publishers">
                    <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
                      Join as Publisher
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Publisher Dashboard</CardTitle>
                      <CardDescription>Real-time earnings and performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium">Today's Earnings</div>
                            <div className="mt-1 text-2xl font-bold">4.28 ETH</div>
                            <div className="mt-1 flex items-center text-xs text-green-500">
                              <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                              +12.5% from yesterday
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium">Fill Rate</div>
                            <div className="mt-1 text-2xl font-bold">94.2%</div>
                            <div className="mt-1 flex items-center text-xs text-green-500">
                              <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                              +3.1% from yesterday
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium">Top Performing Placements</div>
                          <div className="mt-2 space-y-2">
                            {[
                              { name: "Homepage Banner", ctr: "4.8%" },
                              { name: "Article Sidebar", ctr: "3.2%" },
                              { name: "Newsletter", ctr: "5.7%" },
                            ].map((placement, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between rounded-lg bg-background p-2 text-sm"
                              >
                                <div>{placement.name}</div>
                                <div className="font-medium">CTR: {placement.ctr}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button variant="outline" className="w-full">
                        View Full Analytics
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="advertisers" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <div className="flex items-center justify-center lg:order-last">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="inline-block w-fit rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    For Advertisers
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Reach the Web3 Audience That Matters
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Target crypto-native users across premium publisher sites with transparent, fraud-free advertising.
                  </p>
                  <ul className="grid gap-2 py-4">
                    {[
                      "Only pay for verified impressions and clicks",
                      "Target users based on on-chain activity and wallet data",
                      "Full transparency with real-time reporting",
                      "No minimum spend requirements",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500">
                          <ChevronRight className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
                      Start Advertising
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Manager</CardTitle>
                      <CardDescription>Create and manage your advertising campaigns</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium">Active Campaigns</div>
                          <div className="mt-2 space-y-2">
                            {[
                              { name: "DeFi Product Launch", status: "Running", budget: "15 ETH" },
                              { name: "NFT Collection Promo", status: "Scheduled", budget: "8 ETH" },
                              { name: "Token Awareness", status: "Running", budget: "20 ETH" },
                            ].map((campaign, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between rounded-lg bg-background p-3 text-sm"
                              >
                                <div className="font-medium">{campaign.name}</div>
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                      campaign.status === "Running"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}
                                  >
                                    {campaign.status}
                                  </span>
                                  <span className="text-muted-foreground">{campaign.budget}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium">Total Impressions</div>
                            <div className="mt-1 text-2xl font-bold">1.2M</div>
                          </div>
                          <div className="rounded-lg bg-muted p-4">
                            <div className="text-sm font-medium">Average CTR</div>
                            <div className="mt-1 text-2xl font-bold">3.8%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700">Create New Campaign</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="roadmap" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Roadmap
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Building the Future of Advertising
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our ambitious roadmap to revolutionize the $400B digital advertising industry with blockchain
                  technology.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              {[
                {
                  title: "Q3 2023",
                  subtitle: "Foundation",
                  items: [
                    "Protocol development",
                    "Smart contract audits",
                    "Publisher onboarding",
                    "Beta testing with select advertisers",
                  ],
                  status: "Completed",
                },
                {
                  title: "Q1 2024",
                  subtitle: "Growth",
                  items: [
                    "Public platform launch",
                    "Advertiser dashboard",
                    "Publisher analytics",
                    "Multi-chain support",
                    "Token launch",
                  ],
                  status: "In Progress",
                },
                {
                  title: "Q4 2024",
                  subtitle: "Expansion",
                  items: [
                    "Decentralized governance",
                    "Advanced targeting",
                    "Cross-chain settlements",
                    "Mobile SDK",
                    "Publisher revenue sharing",
                  ],
                  status: "Planned",
                },
              ].map((phase, i) => (
                <Card key={i} className="relative overflow-hidden">
                  <div
                    className={`absolute right-2 top-2 rounded-full px-2 py-1 text-xs font-medium ${
                      phase.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : phase.status === "In Progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {phase.status}
                  </div>
                  <CardHeader>
                    <CardTitle>{phase.title}</CardTitle>
                    <CardDescription>{phase.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <ChevronRight className="mt-0.5 h-4 w-4 text-blue-500" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Advertising?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join the AdChain network today and experience the future of digital advertising.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-700">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 border-t pt-10 md:grid-cols-3">
              <div>
                <h3 className="text-xl font-bold">Backed By</h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex h-16 items-center justify-center rounded-lg border bg-background p-2">
                      <div className="text-sm font-medium text-muted-foreground">VC Logo {i}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Resources</h3>
                <ul className="mt-4 space-y-2">
                  {[
                    { name: "Documentation", url: "#" },
                    { name: "Whitepaper", url: "#" },
                    { name: "API Reference", url: "#" },
                    { name: "Case Studies", url: "#" },
                  ].map((resource, i) => (
                    <li key={i}>
                      <Link href={resource.url} className="flex items-center text-sm hover:underline">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {resource.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold">Connect</h3>
                <ul className="mt-4 space-y-2">
                  {[
                    { name: "Twitter", url: "#" },
                    { name: "Discord", url: "#" },
                    { name: "Telegram", url: "#" },
                    { name: "GitHub", url: "#" },
                  ].map((social, i) => (
                    <li key={i}>
                      <Link href={social.url} className="flex items-center text-sm hover:underline">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
            </div>
            <span className="text-xl font-bold">AdChain</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} AdChain Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

