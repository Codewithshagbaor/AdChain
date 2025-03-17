"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, ExternalLink, LineChart, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PublishersPage() {
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
            <Link href="/#publishers" className="text-sm font-medium text-primary">
              Publishers
            </Link>
            <Link href="/#advertisers" className="text-sm font-medium hover:text-primary">
              Advertisers
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
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
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  For Publishers
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Maximize Your Revenue with Crypto-Native Advertising
                </h1>
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
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
                    Join as Publisher
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    View Demo
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Card className="w-full">
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
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Publisher Benefits
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Publishers Choose AdChain</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AdChain offers unique advantages for Web3 publishers looking to monetize their content.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Instant Payments",
                  description:
                    "Get paid instantly in cryptocurrency as soon as impressions and clicks are verified on-chain. No more 30-90 day payment cycles.",
                  icon: <Zap className="h-10 w-10" />,
                },
                {
                  title: "Higher Revenue",
                  description:
                    "Earn up to 95% revenue share, significantly higher than traditional ad networks that typically offer 60-70%.",
                  icon: <LineChart className="h-10 w-10" />,
                },
                {
                  title: "Fraud Protection",
                  description:
                    "Our blockchain verification system ensures that all impressions and clicks are legitimate, protecting your reputation.",
                  icon: <Shield className="h-10 w-10" />,
                },
              ].map((benefit, i) => (
                <Card key={i} className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      {benefit.icon}
                    </div>
                    <CardTitle className="mt-4">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Integration
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Easy to Integrate with Your Platform
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AdChain works seamlessly with your existing website or app with minimal development effort.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold">Simple Integration Process</h3>
                <ul className="space-y-4">
                  {[
                    "Add our JavaScript snippet to your website",
                    "Configure your ad placements and preferences",
                    "Connect your crypto wallet for payments",
                    "Start earning immediately",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs">
                        {i + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                    View Integration Docs
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm font-medium">Integration Code</div>
                  </div>
                  <div className="rounded-md bg-muted p-4">
                    <pre className="text-sm text-muted-foreground">
                      <code>{`<!-- AdChain Integration -->
<script>
  (function(a,d,c,h,i,n) {
    a.AdChainObject = i;
    a[i] = a[i] || function() {
      (a[i].q = a[i].q || []).push(arguments)
    };
    a[i].l = 1 * new Date();
    n = d.createElement(c);
    n.async = 1;
    n.src = h;
    d.getElementsByTagName('head')[0].appendChild(n);
  })(window, document, 'script', 
     'https://cdn.adchain.io/js/adchain.min.js', 'adchain');
  
  adchain('init', 'YOUR_PUBLISHER_ID');
  adchain('create', 'placement-1', {
    type: 'banner',
    sizes: [[300, 250]],
    container: 'ad-container-1'
  });
</script>

<!-- Ad Container -->
<div id="ad-container-1"></div>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Publishers Thriving with AdChain
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See how Web3 publishers are increasing their revenue with AdChain.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
              {[
                {
                  name: "CryptoNews.io",
                  logo: "/placeholder.svg?height=80&width=160",
                  quote:
                    "Since integrating AdChain, our ad revenue has increased by 40% while providing a better experience for our users.",
                  author: "Michael Chen, CEO",
                },
                {
                  name: "DeFiPulse",
                  logo: "/placeholder.svg?height=80&width=160",
                  quote:
                    "The instant payments and higher revenue share have made a significant difference to our bottom line.",
                  author: "Sarah Johnson, COO",
                },
                {
                  name: "NFTWorld",
                  logo: "/placeholder.svg?height=80&width=160",
                  quote:
                    "AdChain's targeting capabilities have helped us show more relevant ads to our users, increasing our CTR by 25%.",
                  author: "David Rodriguez, CTO",
                },
              ].map((testimonial, i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader className="pb-0">
                    <Image
                      src={testimonial.logo || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={160}
                      height={80}
                      className="h-10 w-auto object-contain"
                    />
                  </CardHeader>
                  <CardContent className="flex-1 pt-6">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.name}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-center text-2xl">Ready to Maximize Your Ad Revenue?</CardTitle>
                  <CardDescription className="text-center text-lg">
                    Join thousands of publishers already earning more with AdChain.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      { stat: "1,200+", label: "Publishers" },
                      { stat: "95%", label: "Revenue Share" },
                      { stat: "Instant", label: "Payments" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-bold">{item.stat}</div>
                        <div className="text-muted-foreground">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-700">
                    Join as Publisher
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
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

