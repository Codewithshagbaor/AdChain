"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Github, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
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
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-primary">
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
                  Our Story
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Revolutionizing Digital Advertising with Blockchain
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  AdChain was founded in 2022 with a simple mission: to create a more transparent, efficient, and fair
                  advertising ecosystem for everyone.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-blue-500 to-blue-700">
                    Join Our Team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-6">
                    Read Our Whitepaper
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-sm">
                    <div className="h-full w-full bg-white/80 dark:bg-black/80 p-6 flex flex-col items-center justify-center text-center">
                      <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mb-6">
                        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
                          A
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-4">AdChain Protocol</h2>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Founded by a team of advertising veterans and blockchain experts to solve the biggest challenges
                        in digital advertising.
                      </p>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="text-3xl font-bold">2022</div>
                          <div className="text-sm text-muted-foreground">Founded</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-3xl font-bold">$12M</div>
                          <div className="text-sm text-muted-foreground">Funding</div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="text-3xl font-bold">32</div>
                          <div className="text-sm text-muted-foreground">Team Members</div>
                        </div>
                      </div>
                    </div>
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
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Creating a More Transparent Advertising Ecosystem
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're on a mission to eliminate fraud, reduce fees, and create direct connections between advertisers
                  and publishers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Transparency",
                  description:
                    "All transactions and ad verifications are recorded on the blockchain, creating an immutable record that anyone can audit.",
                  icon: "🔍",
                },
                {
                  title: "Efficiency",
                  description:
                    "By eliminating middlemen and using smart contracts, we reduce costs and increase the speed of transactions.",
                  icon: "⚡",
                },
                {
                  title: "Fairness",
                  description:
                    "Publishers receive fair compensation for their content, and advertisers only pay for verified impressions and clicks.",
                  icon: "⚖️",
                },
              ].map((value, i) => (
                <Card key={i} className="flex flex-col items-center text-center">
                  <CardHeader>
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-4xl dark:bg-blue-900/30">
                      {value.icon}
                    </div>
                    <CardTitle className="mt-4">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
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
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet the Founders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A team of advertising veterans and blockchain experts with a passion for innovation.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              {[
                {
                  name: "Alex Chen",
                  role: "CEO & Co-Founder",
                  bio: "Former Head of Product at AdTech Inc. with 10+ years of experience in digital advertising.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Sarah Johnson",
                  role: "CTO & Co-Founder",
                  bio: "Blockchain developer and architect with experience building DeFi protocols and smart contracts.",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Michael Rodriguez",
                  role: "COO & Co-Founder",
                  bio: "Former VP of Operations at a major ad network with expertise in scaling ad platforms.",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((person, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-square">
                    <Image
                      src={person.image || "/placeholder.svg"}
                      alt={person.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{person.name}</CardTitle>
                    <CardDescription>{person.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{person.bio}</p>
                  </CardContent>
                  <div className="flex justify-center gap-4 p-4">
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
                View Full Team
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  Our Investors
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Backed by the Best</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're proud to be supported by leading venture capital firms and angel investors in the Web3 space.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex h-24 items-center justify-center rounded-lg border bg-background p-4">
                  <div className="text-lg font-medium text-muted-foreground">VC Logo {i}</div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Card className="w-full max-w-3xl border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-center">Join Our Journey</CardTitle>
                  <CardDescription className="text-center">
                    We're always looking for talented individuals and strategic partners to join our mission.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center gap-4">
                  <Button variant="outline">View Open Positions</Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-700">Contact Us</Button>
                </CardContent>
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

