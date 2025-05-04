"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Clock,
  Code,
  Copy,
  ExternalLink,
  Globe,
  Info,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"


interface Website {
  id: string;
  domain: string;
  status: "approved" | "pending" | "rejected";
  earnings: string;
  impressions: string;
  addedDate: string;
  overall_score: number | null;
  content_quality_score: number | null;
  traffic_legitimacy_score: number | null;
  seo_trust_score: number | null;
}

interface NewWebsite {
  domain: string;
  category: string;
  description: string;
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

export default function PublisherWebsitesPage() {
  const [websites, setWebsites] = useState<Website[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingWebsite, setIsAddingWebsite] = useState(false)
  const [addWebsiteStep, setAddWebsiteStep] = useState(1)
  const [newWebsite, setNewWebsite] = useState<NewWebsite>({
    domain: "",
    category: "",
    description: "",
  })
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [deleteWebsiteId, setDeleteWebsiteId] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch websites on component mount
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
        status: website.status,
        earnings: website.earnings, // This would come from a different endpoint in a real implementation
        impressions: website.impressions, // This would come from a different endpoint in a real implementation
        addedDate: new Date(website.created_at).toISOString().split("T")[0],
        overall_score: website.overall_score,
        content_quality_score: website.content_quality_score,
        traffic_legitimacy_score: website.traffic_legitimacy_score,
        seo_trust_score: website.seo_trust_score
      }))
      
      
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

  const handleAddWebsite = () => {
    setIsAddingWebsite(true)
    setAddWebsiteStep(1)
    setNewWebsite({
      domain: "",
      category: "",
      description: "",
    })
    setVerificationProgress(0)
    setVerificationStatus("")
  }

  const handleCancelAddWebsite = () => {
    setIsAddingWebsite(false)
    setAddWebsiteStep(1)
  }

  const handleNextStep = async () => {
    if (addWebsiteStep === 1) {
      try {
        // First create the website in a pending state
        const response = await api.post("/websites/", {
          url: newWebsite.domain,
          category: newWebsite.category.toUpperCase(),
          description: newWebsite.description
        })
        
        // Get the verification code from the response
        setVerificationCode(response.data.adchain_snippet)
        setAddWebsiteStep(2)
      } catch (error: unknown) {
        console.error("Error creating website:", error)
        if (axios.isAxiosError(error) && error.response){
          toast.error(error.response?.data?.message || "Failed to add website. Please try again.")
        }
      }
    } else {
      setAddWebsiteStep(prev => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    setAddWebsiteStep(prev => prev - 1)
  }

  const handleCopyVerificationCode = () => {
    navigator.clipboard.writeText(verificationCode)
    toast("Verification code copied to clipboard")
  }

  // Replace the handleStartVerification function with this improved version
  const handleStartVerification = async () => {
    setIsVerifying(true)
    setVerificationProgress(0)
    setVerificationStatus("Starting verification process...")

    try {
      // Initial progress update
      setVerificationProgress(10)
      setVerificationStatus("Checking if verification code is present...")
      
      // Get the website URL to verify
      const websiteUrlToVerify = newWebsite.domain
      
      // Normalize the domain (remove http://, https://, www. and trailing slashes)
      const normalizeUrl = (url: any) => {
        return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
      }
      
      const normalizedUrlToVerify = normalizeUrl(websiteUrlToVerify)
      
      // First, try to refresh the websites list to ensure we have the latest data
      console.log("Refreshing websites list before verification...")
      await fetchWebsites()
      
      console.log("Looking for website with domain:", normalizedUrlToVerify)
      console.log("Available websites:", websites.map(w => `${w.id}: ${normalizeUrl(w.domain)}`))
      
      // Find the website in our list by comparing normalized domains
      let website = websites.find(w => normalizeUrl(w.domain) === normalizedUrlToVerify)
      console.log("Found website:", website)

      // If website is not found in the state, try to get it directly from the API
      if (!website) {
        console.log("Website not found in state, trying to fetch directly...")
        try {
          // Try to get all websites with this domain
          const response = await api.get(`/websites/?url=${encodeURIComponent(normalizedUrlToVerify)}`)
          console.log("Direct API response:", response.data)
          
          if (response.data && response.data.length > 0) {
            // Use the first matching website
            const matchingWebsite = response.data[0]
            website = {
              id: matchingWebsite.id.toString(),
              domain: matchingWebsite.url,
              status: matchingWebsite.status,
              earnings: matchingWebsite.earnings || "$0.00",
              impressions: matchingWebsite.impressions || "0",
              addedDate: new Date(matchingWebsite.created_at).toISOString().split("T")[0],
              overall_score: matchingWebsite.overall_score,
              content_quality_score: matchingWebsite.content_quality_score,
              traffic_legitimacy_score: matchingWebsite.traffic_legitimacy_score,
              seo_trust_score: matchingWebsite.seo_trust_score
            }
            console.log("Found website via direct API call:", website)
          }
        } catch (error) {
          console.error("Error fetching website directly:", error)
        }
      }

      if (!website) {
        console.error("Website not found. Check if the domains match exactly.")
        toast.error("Website not found. Please try again or refresh the page.")
        setIsVerifying(false)
        return
      }
      
      // Start the verification process
      setVerificationProgress(30)
      setVerificationStatus("Code verified! Analyzing website content...")
      
      // Begin verification on the backend
      const verifyEndpoint = `/websites/${website.id}/verify/`
      console.log("Calling verification endpoint:", verifyEndpoint)
      
      // Update progress while backend processes (this is just UI progress, not actual status)
      const progressInterval = setInterval(() => {
        setVerificationProgress(prev => {
          const newProgress = Math.min(prev + 10, 90)
          
          // Update status messages based on progress
          if (newProgress > 40 && prev <= 40) {
            setVerificationStatus("Evaluating content quality and relevance...")
          } else if (newProgress > 70 && prev <= 70) {
            setVerificationStatus("Almost done! Finalizing verification...")
          }
          
          return newProgress
        })
      }, 1000)
      
      // Call the actual verification endpoint
      const response = await api.post(verifyEndpoint)
      console.log("Verification response:", response.data)
      
      // Clear the fake progress interval
      clearInterval(progressInterval)
      
      // Set final progress and status
      setVerificationProgress(100)
      
      if (response.data.status && response.data.status.toLowerCase() === 'approved') {
        setVerificationStatus("Verification complete! Your website has been approved.")
      } else if (response.data.status && response.data.status.toLowerCase() === 'rejected') {
        setVerificationStatus(`Verification failed. Reason: Overall score too low (${response.data.overall_score || 0}/100)`)
      } else if (response.data.status && response.data.status.toLowerCase() === 'missing_verification') {
        setVerificationStatus(`${response.data.details} + ${response.data.expected_snippet} `)
      } else {
        setVerificationStatus("Verification complete. Your website is pending manual review.")
      }
      
      // Refresh the websites list
      await fetchWebsites()
      
      // Close the dialog after a delay if approved
      if (response.data.status && response.data.status.toLowerCase() === 'approved') {
        setTimeout(() => {
          setIsAddingWebsite(false)
          setAddWebsiteStep(1)
        }, 2000)
      }
      
    } catch (error) {
      console.error("Error during verification:", error)
      setVerificationStatus("Verification failed. Please try again.")
      if (axios.isAxiosError(error) && error.response){
        toast.error(error.response?.data?.message || "Please ensure your website has the verification code installed.")
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsVerifying(false)
    }
  }

  const handleDeleteWebsite = (id: any) => {
    setDeleteWebsiteId(id)
    setShowDeleteDialog(true)
  }

  const confirmDeleteWebsite = async () => {
    try {
      await api.delete(`/websites/${deleteWebsiteId}/delete/`)
      
      setWebsites(prev => prev.filter(website => website.id !== deleteWebsiteId))
      toast.success("The website has been successfully removed.")
    } catch (error) {
      console.error("Error deleting website:", error)
      toast.error("Failed to delete website. Please try again.")
    } finally {
      setShowDeleteDialog(false)
      setDeleteWebsiteId(null)
    }
  }

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Approved</Badge>
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</Badge>
        )
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Rejected</Badge>
      default:
        return null
    }
  }

  // Handle webhook setting if needed
  const setWebhook = async (url: any) => {
    try {
      await api.post("/webhooks/", { url })
      toast.success("Webhook URL has been successfully configured.")
    } catch (error) {
      console.error("Error setting webhook:", error)
      toast("Failed to set webhook URL. Please try again.")
    }
  }

  return (
    <DashboardLayout userType="publisher">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Management</h1>
          <p className="text-muted-foreground">Manage your websites and ad placements</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-blue-700" onClick={handleAddWebsite}>
          <Plus className="mr-2 h-4 w-4" />
          Add Website
        </Button>
      </div>

      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Your Websites</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search websites..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>Manage and monitor your registered websites</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : filteredWebsites.length > 0 ? (
            <div className="space-y-4">
              {filteredWebsites.map((website) => (
                <div key={website.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{website.domain}</p>
                        {getStatusBadge(website.status.toLowerCase())}
                      </div>
                      <p className="text-sm text-muted-foreground">Added on {website.addedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{website.earnings}</p>
                      <p className="text-sm text-muted-foreground">Earnings</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{website.impressions}</p>
                      <p className="text-sm text-muted-foreground">Impressions</p>
                    </div>
                    {website.overall_score !== null && (
                      <div className="text-right">
                        <p className="font-medium">{website.overall_score ? website.overall_score.toFixed(1) : '0'}/100</p>
                        <p className="text-sm text-muted-foreground">Trust Score</p>
                      </div>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`https://${website.domain}`} target="_blank" className="flex items-center">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Website
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/publisher/websites/${website.id}`} className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        {website.status.toLowerCase() === "approved" && (
                          <DropdownMenuItem>
                            <Link
                              href={`/dashboard/publisher/websites/${website.id}/ad-units`}
                              className="flex items-center"
                            >
                              <Code className="mr-2 h-4 w-4" />
                              Manage Ad Units
                            </Link>
                          </DropdownMenuItem>
                        )}
                        {website.status.toLowerCase() === "rejected" && (
                          <DropdownMenuItem>
                            <button 
                              className="flex items-center text-blue-600"
                              onClick={async () => {
                                try {
                                  await api.post(`/websites/${website.id}/verify/`);
                                  await fetchWebsites();
                                  toast.success("Your website is being verified again.");
                                } catch (error) {
                                  toast.error("Failed to reapply. Please try again.");
                                }
                              }}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Reapply
                            </button>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onSelect={() => handleDeleteWebsite(website.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Website
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Globe className="h-12 w-12 text-blue-200 dark:text-blue-800 mb-4" />
              <h3 className="text-lg font-medium mb-2">No websites found</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                {searchQuery ? "No websites match your search criteria." : "You haven't added any websites yet."}
              </p>
              {searchQuery ? (
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-blue-500 to-blue-700" onClick={handleAddWebsite}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Website
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Website Dialog */}
      <Dialog open={isAddingWebsite} onOpenChange={(open) => {
        if (!open) setIsAddingWebsite(false);
        if (!open && isVerifying) {
          // If closing during verification, confirm
          if (!window.confirm("Verification is in progress. Are you sure you want to cancel?")) {
            setIsAddingWebsite(true);
            return;
          }
        }
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add a New Website</DialogTitle>
            <DialogDescription>Register your website to start earning with AdChain</DialogDescription>
          </DialogHeader>

          {/* Step 1: Website Details */}
          {addWebsiteStep === 1 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    1
                  </span>
                  <span>Website Details</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border">2</span>
                  <span>Verification</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border">3</span>
                  <span>Confirmation</span>
                </div>
              </div>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Website URL</Label>
                  <Input
                    id="domain"
                    placeholder="example.com"
                    value={newWebsite.domain}
                    onChange={(e) => setNewWebsite({ ...newWebsite, domain: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Enter the full domain without http:// or https://</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Website Category</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newWebsite.category}
                    onChange={(e) => setNewWebsite({ ...newWebsite, category: e.target.value })}
                  >
                    <option value="">Select a category</option>
                    <option value="cryptocurrency">Cryptocurrency</option>
                    <option value="defi">DeFi</option>
                    <option value="nft">NFT</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="metaverse">Metaverse</option>
                    <option value="gaming">Gaming</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Website Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe your website content and audience"
                    value={newWebsite.description}
                    onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCancelAddWebsite}>
                  Cancel
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!newWebsite.domain || !newWebsite.category}
                  className="bg-gradient-to-r from-blue-500 to-blue-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Step 2: Verification */}
          {addWebsiteStep === 2 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-blue-700 dark:text-blue-300">Website Details</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    2
                  </span>
                  <span>Verification</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border">3</span>
                  <span>Confirmation</span>
                </div>
              </div>

              <div className="space-y-4 py-4">
                <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Verification Required</AlertTitle>
                  <AlertDescription>
                    To verify ownership of {newWebsite.domain}, please add the following code to your website's
                    homepage.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 rounded-md bg-muted p-3 font-mono text-sm">{verificationCode}</div>
                    <Button variant="outline" size="icon" onClick={handleCopyVerificationCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Installation Instructions</Label>
                  <div className="rounded-md bg-muted p-4 text-sm">
                    <p className="mb-2">
                      Add the following meta tag to the <code>&lt;head&gt;</code> section of your website:
                    </p>
                    <pre className="overflow-x-auto p-2 bg-background rounded-md">
                      {`<meta name="adchain-verification" content="${verificationCode}" />`}
                    </pre>
                    <p className="mt-4 mb-2">Or add this HTML comment anywhere in your homepage:</p>
                    <pre className="overflow-x-auto p-2 bg-background rounded-md">{`<!-- ${verificationCode} -->`}</pre>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  After adding the verification code to your website, click "Verify" to continue.
                </p>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handlePreviousStep}>
                  Back
                </Button>
                <Button onClick={handleNextStep} className="bg-gradient-to-r from-blue-500 to-blue-700">
                  Verify
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}

          {/* Step 3: Verification Process */}
          {addWebsiteStep === 3 && (
            <>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-blue-700 dark:text-blue-300">Website Details</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 text-muted-foreground px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-blue-700 dark:text-blue-300">Verification</span>
                </div>
                <Separator className="mx-2 w-8" />
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                    3
                  </span>
                  <span>Confirmation</span>
                </div>
              </div>

              <div className="space-y-4 py-4">
                <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Verification in Progress</AlertTitle>
                  <AlertDescription>
                    Please do not close this window. Verification can take up to 5 minutes.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Verification Status</Label>
                    {isVerifying && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Estimated time: ~5 minutes</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <Progress value={verificationProgress} className="h-2 w-full" />
                    <div className="flex items-center gap-2">
                      {isVerifying ? (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      ) : verificationProgress >= 100 ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                      <p className="text-sm">
                        {verificationStatus || "Click 'Start Verification' to begin the process"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h4 className="text-sm font-medium mb-2">Verification Process:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">1</div>
                      <span>Checking if verification code is present on your website</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">2</div>
                      <span>Analyzing website content using AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">3</div>
                      <span>Evaluating content quality and relevance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">4</div>
                      <span>Finalizing verification and approval</span>
                    </li>
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handlePreviousStep} disabled={isVerifying}>
                  Back
                </Button>
                {verificationProgress < 100 ? (
                  <Button
                    onClick={handleStartVerification}
                    disabled={isVerifying}
                    className="bg-gradient-to-r from-blue-500 to-blue-700"
                  >
                    {isVerifying ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        Start Verification
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setIsAddingWebsite(false)}
                    className="bg-gradient-to-r from-green-500 to-green-700"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Website Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Website</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this website? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Deleting this website will remove all associated ad units and earnings data.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteWebsite}>
              Delete Website
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  )
}