"use client"

import Link from "next/link"
import { Check, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/#publishers" className="text-sm font-medium hover:text-primary">
              Publishers
            </Link>
            <Link href="/#advertisers" className="text-sm font-medium hover:text-primary">
              Advertisers
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/overview">
              <Button variant="ghost" className="hidden md:flex">
                Dashboard
              </Button>
            </Link>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Transparent Pricing
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Plan</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Simple, transparent pricing for advertisers and publishers. No hidden fees, no long-term commitments.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 max-w-5xl">
              <Tabs defaultValue="advertisers" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-[400px] grid-cols-2">
                    <TabsTrigger value="advertisers">For Advertisers</TabsTrigger>
                    <TabsTrigger value="publishers">For Publishers</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="advertisers">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="flex flex-col">
                      <CardHeader>
                        <CardTitle>Starter</CardTitle>
                        <CardDescription>Perfect for small campaigns and testing</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          0.5%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">fee</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "Up to 5 ETH monthly ad spend",
                            "Basic targeting options",
                            "Standard reporting",
                            "Email support",
                            "1 user account",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700">Get Started</Button>
                      </CardFooter>
                    </Card>
                    <Card className="flex flex-col border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Growth</CardTitle>
                          <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            Popular
                          </div>
                        </div>
                        <CardDescription>For growing businesses with multiple campaigns</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          0.3%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">fee</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "Up to 50 ETH monthly ad spend",
                            "Advanced targeting options",
                            "Real-time analytics",
                            "Priority support",
                            "5 user accounts",
                            "Custom audience segments",
                            "A/B testing tools",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800">Get Started</Button>
                      </CardFooter>
                    </Card>
                    <Card className="flex flex-col">
                      <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For large-scale advertising operations</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          0.1%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">fee</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "Unlimited monthly ad spend",
                            "Custom targeting solutions",
                            "Advanced analytics & API access",
                            "Dedicated account manager",
                            "Unlimited user accounts",
                            "Custom integration support",
                            "SLA guarantees",
                            "Early access to new features",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Contact Sales</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="publishers">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="flex flex-col">
                      <CardHeader>
                        <CardTitle>Basic</CardTitle>
                        <CardDescription>For blogs and small websites</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          90%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">revenue share</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "Standard ad formats",
                            "Basic reporting",
                            "Manual payments",
                            "Email support",
                            "1 website",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-700">Join Now</Button>
                      </CardFooter>
                    </Card>
                    <Card className="flex flex-col border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Premium</CardTitle>
                          <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            Popular
                          </div>
                        </div>
                        <CardDescription>For established content creators</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          95%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">revenue share</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "All ad formats",
                            "Advanced analytics",
                            "Automatic payments",
                            "Priority support",
                            "Up to 5 websites",
                            "Custom ad placements",
                            "Ad blocking recovery",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800">Join Now</Button>
                      </CardFooter>
                    </Card>
                    <Card className="flex flex-col">
                      <CardHeader>
                        <CardTitle>Enterprise</CardTitle>
                        <CardDescription>For large publishers and media networks</CardDescription>
                        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                          98%
                          <span className="ml-1 text-xl font-medium text-muted-foreground">revenue share</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {[
                            "All Premium features",
                            "Custom reporting API",
                            "Instant payments",
                            "Dedicated account manager",
                            "Unlimited websites",
                            "Header bidding support",
                            "Custom integration",
                            "Revenue guarantees",
                          ].map((feature, i) => (
                            <li key={i} className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Contact Sales</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to know about AdChain pricing and features.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
              {[
                {
                  question: "How are fees calculated?",
                  answer:
                    "Fees are calculated as a percentage of your total ad spend. For example, with a 0.5% fee on a 10 ETH campaign, you would pay 0.05 ETH in fees.",
                },
                {
                  question: "When do publishers get paid?",
                  answer:
                    "Publishers receive payments instantly as impressions and clicks are verified on-chain. There's no waiting period or payment threshold.",
                },
                {
                  question: "What cryptocurrencies are supported?",
                  answer:
                    "We currently support ETH, USDC, and USDT on Ethereum, Polygon, and Arbitrum networks. More tokens and chains will be added soon.",
                },
                {
                  question: "Is there a minimum ad spend?",
                  answer:
                    "There is no minimum ad spend requirement. You can start with as little as you want, though we recommend at least 0.1 ETH for meaningful results.",
                },
                {
                  question: "How do I upgrade or downgrade my plan?",
                  answer:
                    "You can change your plan at any time from your dashboard settings. Changes take effect immediately with no interruption to your campaigns.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "Since all transactions are verified on-chain and payments are made instantly, we don't offer refunds. However, you can pause or stop campaigns at any time.",
                },
                {
                  question: "What targeting options are available?",
                  answer:
                    "We offer targeting by geography, device type, browser, wallet activity, token holdings, and on-chain behavior. Advanced plans include more granular targeting options.",
                },
                {
                  question: "How do I get started?",
                  answer:
                    "Simply connect your wallet, deposit funds, and create your first campaign or publisher account. Our onboarding wizard will guide you through the process.",
                },
              ].map((faq, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      {faq.question}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-[200px] text-sm">{faq.answer}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Card className="w-full max-w-3xl border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-center">Still have questions?</CardTitle>
                  <CardDescription className="text-center">
                    Our team is ready to help you find the perfect solution for your needs.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center gap-4">
                  <Button variant="outline">View Documentation</Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700">Contact Sales</Button>
                </CardFooter>
              </Card>
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

