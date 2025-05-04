"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  DollarSign,
  Globe,
  LineChart,
  PieChart,
  Plus,
  Wallet,
  Loader2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useAccount } from "wagmi";

interface Website {
  id: string;
  domain: string;
  earnings: string;
  impressions: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT || "http://localhost:8000/api"

// Create axios instance with authentication
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Set auth token for all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
export default function PublisherDashboard() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [impressions, setImpressions] = useState(0)
  const [earnings, setEarnings] = useState(0)

  const { address, isConnected, isDisconnected } = useAccount();


  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/websites/")

      const transformedData = response.data.map((website: any) => ({
        id: website.id.toString(),
        domain: website.url,
        earnings: website.earnings, // This would come from a different endpoint in a real implementation
        impressions: website.impressions, // This would come from a different endpoint in a real implementation
      }))
      setImpressions(transformedData.reduce((acc: number, website: Website) => acc + parseInt(website.impressions), 0))
      setEarnings(transformedData.reduce((acc: number, website: Website) => acc + parseFloat(website.earnings), 0))


      setWebsites(transformedData)
    } catch (error) {
      console.error("Error fetching websites:", error)
      toast.error("Failed to load websites. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredWebsites = websites.filter((website) =>
    website.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )


  return (
    <DashboardLayout userType="publisher">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Publisher Dashboard</h1>
              <p className="text-muted-foreground">Manage your ad inventory and track earnings</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Ad Unit
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{`${earnings} PTT`}</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                <LineChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{impressions}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                  {impressions == 0 ?
                    <div className="text-xs text-red-500 flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                      No data
                    </div>
                    :
                    <div className="text-xs text-green-500 flex items-center">
                      <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                      +12.5% from last month
                    </div>
                  }
                </div>
              </CardContent>
            </Card>
            <Card className="border-blue-200 dark:border-blue-800 overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-500/10 to-blue-700/10">
                <CardTitle className="text-sm font-medium">Fill Rate</CardTitle>
                <PieChart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">94.2%</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Industry avg: 85%</p>
                  <div className="text-xs text-green-500 flex items-center">
                    <ArrowRight className="mr-1 h-3 w-3 rotate-45" />
                    +3.1% from last week
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Top Performing Websites</CardTitle>
                <CardDescription>Your best performing websites this month</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  </div>
                ) : filteredWebsites.length > 0 ? (
                  <div className="space-y-4">
                    {filteredWebsites.map((website) => (
                      <div key={website.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{website.domain}</p>
                          <p className="text-sm text-muted-foreground">{website.impressions} impressions</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium leading-none">{website.earnings}</p>
                            <p className="text-sm text-muted-foreground">Earnings</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Globe className="h-12 w-12 text-blue-200 dark:text-blue-800 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No websites found</h3>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/publisher/websites">
                
                <Button variant="outline" className="w-full">
                  View All Websites
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className="lg:col-span-4 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your recent earnings and withdrawals</CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-4">
                    {[
                      {
                        type: "Earnings",
                        amount: "+2.8 ETH",
                        status: "Completed",
                        date: "Today, 10:45 AM",
                        address: "0x3a...4b2e",
                        hash: "0x8f2...3b7a",
                      },
                      {
                        type: "Withdrawal",
                        amount: "-10.5 ETH",
                        status: "Completed",
                        date: "Yesterday, 2:20 PM",
                        address: "0x7c...9f3a",
                        hash: "0x6d1...9c4e",
                      },
                      {
                        type: "Earnings",
                        amount: "+1.2 ETH",
                        status: "Completed",
                        date: "Yesterday, 11:30 AM",
                        address: "0x5d...2c1b",
                        hash: "0x2a7...5f8d",
                      },
                      {
                        type: "Withdrawal",
                        amount: "-5.0 ETH",
                        status: "Completed",
                        date: "Mar 12, 9:15 AM",
                        address: "0x3a...4b2e",
                        hash: "0x9e3...7c2b",
                      },
                    ].map((transaction, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${transaction.type === "Earnings"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                          >
                            {transaction.type === "Earnings" ? (
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
                              className={`text-sm font-medium leading-none ${transaction.type === "Earnings" ? "text-green-600 dark:text-green-400" : ""
                                }`}
                            >
                              {transaction.amount}
                            </p>
                            <p className="text-xs text-muted-foreground">{transaction.address}</p>
                          </div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${transaction.status === "Completed"
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
                      Connect your wallet to view your payment history and manage your earnings
                    </p>
                  </div>
                )}
              </CardContent>
              {isConnected && (
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Transactions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
     </DashboardLayout>

  )
}

