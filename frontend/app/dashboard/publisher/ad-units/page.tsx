"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import {
  AlertCircle,
  ArrowRight,
  Check,
  Copy,
  Info,
  LayoutPanelLeft,
  LayoutTemplate,
  Loader2,
  Maximize,
  MoreHorizontal,
  Newspaper,
  Plus,
  Settings,
  Smartphone,
  Square,
  Trash,
  Video,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from 'react-hot-toast';
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"


// Define AdUnit interface
interface AdUnit {
  id: number
  name: string
  type: string
  size: string
  website: string
  status: string
  impressions: number
  clicks: number
  ctr: string
  revenue: string
  createdAt: string
}

interface Website {
  id: number
  domain: string
  status: string
}

// Pre-defined ad unit templates
const adUnitTemplates = [
  {
    id: "LEADERBOARD",
    name: "Leaderboard",
    description: "Top of page banner (728x90)",
    icon: "layout-template",
    type: "banner",
    size: "728x90",
    recommendedFor: "Page headers, above content",
    preview: "/placeholder.svg?height=90&width=728",
  },
  {
    id: "MEDIUM_RECTANGLE",
    name: "Medium Rectangle",
    description: "Versatile ad unit (300x250)",
    icon: "square",
    type: "banner",
    size: "300x250",
    recommendedFor: "Sidebars, in-content",
    preview: "/placeholder.svg?height=250&width=300",
  },
  {
    id: "LARGE_RECTANGLE",
    name: "Large Rectangle",
    description: "High-impact display ad (336x280)",
    icon: "square",
    type: "banner",
    size: "336x280",
    recommendedFor: "In-content, end of articles",
    preview: "/placeholder.svg?height=280&width=336",
  },
  {
    id: "SKYSCRAPER",
    name: "Wide rectangleSkyscraper",
    description: "Tall sidebar ad (160x600)",
    icon: "layout-panel-left",
    type: "banner",
    size: "160x600",
    recommendedFor: "Sidebars, long-form content",
    preview: "/placeholder.svg?height=600&width=160",
  },
  {
    id: "MOBILE_BANNER",
    name: "Mobile Banner",
    description: "Mobile-optimized banner (320x50)",
    icon: "smartphone",
    type: "banner",
    size: "320x50",
    recommendedFor: "Mobile websites, apps",
    preview: "/placeholder.svg?height=50&width=320",
  },
  {
    id: "INTERSTITIAL",
    name: "Interstitial",
    description: "Full-screen overlay ad",
    icon: "maximize",
    type: "interstitial",
    size: "full-screen",
    recommendedFor: "Between page transitions",
    preview: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "VIDEO",
    name: "Video Ad",
    description: "Video player ad unit (640x360)",
    icon: "video",
    type: "video",
    size: "640x360",
    recommendedFor: "Video content, pre-roll",
    preview: "/placeholder.svg?height=360&width=640",
  },
]

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

export default function PublisherAdUnitsPage() {
  const router = useRouter()
  const [adUnits, setAdUnits] = useState<AdUnit[] | null>(null)
  const [websites, setWebsites] = useState<Website[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedAdUnit, setSelectedAdUnit] = useState<AdUnit | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [newAdUnit, setNewAdUnit] = useState({
    name: "",
    type: "",
    size: "",
    website: "",
  })
  const [adUnitCode, setAdUnitCode] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showTemplates, setShowTemplates] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Fetch ad units on component mount
  useEffect(() => {
    const fetchAdUnits = async () => {
      try {
        const response = await api.get('/websites/getAdUnits/')
        const transformedData = response.data.ad_units.map((adUnit: any) => ({
          id: adUnit.id,
          name: adUnit.ad_unit_name,
          type: adUnit.ad_unit_type,
          size: adUnit.ad_unit_size,
          website: adUnit.website,
          status: adUnit.status,
          impressions: adUnit.ad_unit_impressions || 0,
          clicks: adUnit.ad_unit_clicks || 0,
          ctr: adUnit.ad_unit_ctr || "0%",
          revenue: `$${adUnit.ad_unit_revenue || "0.00"}`,
          createdAt: new Date(adUnit.created_at).toLocaleDateString(),
        }))
        setAdUnits(transformedData)
      } catch (error) {
        console.error("Error fetching ad units:", error)
        toast.error( "Failed to load ad units. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    const fetchWebsites = async () => {
      try {
        const response = await api.get('/websites/')
        
        const transformedData = response.data.map((website: any) => ({
          id: website.id.toString(),
          domain: website.url,
          status: website.status,
        }))
        setWebsites(transformedData)
      } catch (error) {
        console.error("Error fetching websites:", error)
      }
    }

    fetchAdUnits()
    fetchWebsites()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAdUnit((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewAdUnit((prev) => ({ ...prev, [name]: value }))
  }

  // Reset form
  const resetForm = () => {
    setNewAdUnit({
      name: "",
      type: "",
      size: "",
      website: "",
    })
    setCurrentStep(1)
    setShowTemplates(true)
    setSelectedTemplate(null)
    setIsCreateDialogOpen(false)
  }

  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    setNewAdUnit({
      name: `${template.name}`,
      type: template.type,
      size: template.size,
      website: newAdUnit.website || "",
    })
    setShowTemplates(false)
  }

  // Back to templates
  const backToTemplates = () => {
    setShowTemplates(true)
    setSelectedTemplate(null)
  }

  // Create ad unit
  const handleCreateAdUnit = async () => {
    setIsVerifying(true)
    try {
      const payload =  {
        ad_unit_name: newAdUnit.name,
        ad_unit_type: newAdUnit.type.toUpperCase(),
        ad_unit_size: newAdUnit.name.toUpperCase(),
        website: newAdUnit.website,
      }
      const response = await api.post('/websites/createAdunit/', payload)
      if (response.status !== 201) {
        throw new Error("Failed to create ad unit")
      }
      // Update ad units state with the new ad unit
      const transformedData = {
        id: response.data.id,
        name: response.data.ad_unit_name,
        type: response.data.ad_unit_type,
        size: response.data.ad_unit_size,
        website: response.data.website,
        status: response.data.status,
        impressions: 0,
        clicks: 0,
        ctr: "0%",
        revenue: "$0.00",
        createdAt: new Date(response.data.created_at).toLocaleDateString(),
      }
      setAdUnits((prev) => [...(prev || []), transformedData])
      toast.success("Ad unit created successfully!")
      resetForm()
    } catch (error) {
      console.error("Error creating ad unit:", error)
      toast.error("Failed to create ad unit. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  // Delete ad unit
  const handleDeleteAdUnit = async () => {
    if (!selectedAdUnit) return
    
    try {
      await api.delete(`/websites/getAdUnit/${selectedAdUnit.id}/delete/`)
      setAdUnits((prev) => (prev ? prev.filter((unit) => unit.id !== selectedAdUnit.id) : prev))
      toast.success("Ad unit deleted successfully!")
    } catch (error) {
      console.error("Error deleting ad unit:", error)
      toast.error("Failed to delete ad unit. Please try again.")
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedAdUnit(null)
    }
  }

  // Generate ad unit code
  const generateAdUnitCode = (adUnitId: number | string) => {
    return `<script src="${API_URL}/ad/${adUnitId}" async></script>`
  }

  // Copy ad unit code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(adUnitCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Next step in creation process
  const nextStep = () => {
    if (currentStep === 1) {
      // Generate a temporary code for preview - this will be replaced with actual code after creation
      setAdUnitCode(generateAdUnitCode("preview"))
    }
    setCurrentStep((prev) => prev + 1)
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }


  return (
    <DashboardLayout userType="publisher">
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ad Units</h1>
          <p className="text-muted-foreground">Manage your ad units across all websites</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Add New Ad Unit
            </Button>
          </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            {showTemplates ? (
              <>
                <DialogHeader>
                  <DialogTitle>Select Ad Unit Template</DialogTitle>
                  <DialogDescription>Choose a pre-defined template or start from scratch</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3">
                  {adUnitTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          {template.icon === "layout-template" && (
                            <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
                          )}
                          {template.icon === "square" && <Square className="h-5 w-5 text-muted-foreground" />}
                          {template.icon === "layout-panel-left" && (
                            <LayoutPanelLeft className="h-5 w-5 text-muted-foreground" />
                          )}
                          {template.icon === "smartphone" && <Smartphone className="h-5 w-5 text-muted-foreground" />}
                          {template.icon === "maximize" && <Maximize className="h-5 w-5 text-muted-foreground" />}
                          {template.icon === "newspaper" && <Newspaper className="h-5 w-5 text-muted-foreground" />}
                          {template.icon === "video" && <Video className="h-5 w-5 text-muted-foreground" />}
                        </div>
                        <CardDescription className="mt-1.5">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="mb-2 overflow-hidden rounded border">
                          <img
                            src={template.preview || "/placeholder.svg"}
                            alt={`${template.name} preview`}
                            className="h-auto w-full object-cover"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <strong>Recommended for:</strong> {template.recommendedFor}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Card
                    className="cursor-pointer transition-all hover:border-primary hover:shadow-md"
                    onClick={() => setShowTemplates(false)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Custom Ad Unit</CardTitle>
                        <Settings className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription className="mt-1.5">Create a custom ad unit from scratch</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mb-2 flex h-[100px] items-center justify-center rounded border bg-muted">
                        <Plus className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <strong>Flexibility:</strong> Define all parameters yourself
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </>
            ) : currentStep === 1 ? (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle>
                        {selectedTemplate ? `Customize ${selectedTemplate.name}` : "Create Custom Ad Unit"}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedTemplate
                          ? "Customize the pre-filled template settings or proceed with defaults"
                          : "Enter the details for your new ad unit"}
                      </DialogDescription>
                    </div>
                    {selectedTemplate && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                        {selectedTemplate.icon === "layout-template" && <LayoutTemplate className="h-5 w-5" />}
                        {selectedTemplate.icon === "square" && <Square className="h-5 w-5" />}
                        {selectedTemplate.icon === "layout-panel-left" && <LayoutPanelLeft className="h-5 w-5" />}
                        {selectedTemplate.icon === "smartphone" && <Smartphone className="h-5 w-5" />}
                        {selectedTemplate.icon === "maximize" && <Maximize className="h-5 w-5" />}
                        {selectedTemplate.icon === "newspaper" && <Newspaper className="h-5 w-5" />}
                        {selectedTemplate.icon === "video" && <Video className="h-5 w-5" />}
                      </div>
                    )}
                  </div>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {selectedTemplate && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Template Selected</AlertTitle>
                      <AlertDescription>
                        You're using the {selectedTemplate.name} template. This is optimized for{" "}
                        {selectedTemplate.recommendedFor.toLowerCase()}.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newAdUnit.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="Homepage Banner"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("type", value)} value={newAdUnit.type}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select ad type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="interstitial">Interstitial</SelectItem>
                        <SelectItem value="native">Native</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="size" className="text-right">
                      Size
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("size", value)} value={newAdUnit.size}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select ad size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300x250">300x250 (Medium Rectangle)</SelectItem>
                        <SelectItem value="728x90">728x90 (Leaderboard)</SelectItem>
                        <SelectItem value="336x280">336x280 (Large Rectangle)</SelectItem>
                        <SelectItem value="160x600">160x600 (Wide Skyscraper)</SelectItem>
                        <SelectItem value="320x50">320x50 (Mobile Banner)</SelectItem>
                        <SelectItem value="full-screen">Full Screen</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                        <SelectItem value="640x360">640x360 (Video Player)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="website" className="text-right">
                      Website
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("website", value)} value={newAdUnit.website}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select website" />
                      </SelectTrigger>
                      <SelectContent>
                        {websites.map((website) => (
                          <SelectItem key={website.id} value={website.domain}>
                            {website.domain}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <div className="flex w-full justify-between">
                    <Button variant="outline" onClick={backToTemplates}>
                      Back to Templates
                    </Button>
                    <div>
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="mr-2">
                        Cancel
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!newAdUnit.name || !newAdUnit.type || !newAdUnit.size || !newAdUnit.website}
                      >
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </DialogFooter>
              </>
            ) : currentStep === 2 ? (
              <>
                <DialogHeader>
                  <DialogTitle>Implement Ad Unit Code</DialogTitle>
                  <DialogDescription>Add this code to your website where you want the ad to appear</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="flex items-center justify-between">
                      <code className="text-sm">{adUnitCode}</code>
                      <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 px-2">
                        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Place this code in the section of your website where you want the ad to appear. The ad will
                      automatically adapt to the container size.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={nextStep}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogFooter>
              </>
            ) : (
              currentStep === 3 && (
                <>
                  <DialogHeader>
                    <DialogTitle>Finalizing Ad Unit</DialogTitle>
                    <DialogDescription>We're setting up your ad unit for delivery</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {isVerifying ? (
                      <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p>Setting up your ad unit...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Alert className="border-green-200 bg-green-50">
                          <Check className="h-4 w-4 text-green-600" />
                          <AlertTitle className="text-green-800">Ready to finalize</AlertTitle>
                          <AlertDescription className="text-green-700">
                            Your ad unit is ready to be created. Click the button below to finalize.
                          </AlertDescription>
                        </Alert>
                        <div className="rounded-md bg-muted p-4">
                          <h4 className="mb-2 font-medium">Ad Unit Summary</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-muted-foreground">Name:</div>
                            <div>{newAdUnit.name}</div>
                            <div className="text-muted-foreground">Type:</div>
                            <div className="capitalize">{newAdUnit.type}</div>
                            <div className="text-muted-foreground">Size:</div>
                            <div>{newAdUnit.size}</div>
                            <div className="text-muted-foreground">Website:</div>
                            <div>{newAdUnit.website}</div>
                            {selectedTemplate && (
                              <>
                                <div className="text-muted-foreground">Template:</div>
                                <div>{selectedTemplate.name}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCurrentStep(2)} disabled={isVerifying}>
                      Back
                    </Button>
                    <Button onClick={handleCreateAdUnit} disabled={isVerifying}>
                      {isVerifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                        </>
                      ) : (
                        "Create Ad Unit"
                      )}
                    </Button>
                  </DialogFooter>
                </>
              )
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Ad Units</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <>
        {isLoading ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading ad units...</span>
        </div>
      ) : (
        <>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Ad Units</CardTitle>
              <CardDescription>Showing all {adUnits ? adUnits.length : 0} ad units across your websites</CardDescription>
            </CardHeader>
            <CardContent>
              {adUnits?.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No ad units found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Get started by creating your first ad unit.</p>
                  <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New Ad Unit
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(adUnits) && adUnits.map((adUnit) => (
                      <TableRow key={adUnit.id}>
                        <TableCell className="font-medium">{adUnit.name}</TableCell>
                        <TableCell className="capitalize">{adUnit.type}</TableCell>
                        <TableCell>{adUnit.size}</TableCell>
                        <TableCell>{adUnit.website}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(adUnit.status)}>{adUnit.status}</Badge>
                        </TableCell>
                        <TableCell>{adUnit.impressions.toLocaleString()}</TableCell>
                        <TableCell>{adUnit.clicks.toLocaleString()}</TableCell>
                        <TableCell>{adUnit.ctr}</TableCell>
                        <TableCell>{adUnit.revenue}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                  const code = generateAdUnitCode(adUnit.id)
                                  setAdUnitCode(code)
                                  toast.success(
                                    "Ad Code Generated")
                                }}
                              >
                                View Code
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAdUnit(adUnit)
                                  setIsDeleteDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Ad Units</CardTitle>
              <CardDescription>Showing {Array.isArray(adUnits) ? adUnits.filter((adUnit) => adUnit.status === "active").length : 0} active ad units</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(adUnits) && adUnits.filter((adUnit) => adUnit.status === "active").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No active ad units found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">All your ad units are currently inactive.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(adUnits) &&
                      adUnits.filter((adUnit) => adUnit.status === "active").map((adUnit) => (
                        <TableRow key={adUnit.id}>
                          <TableCell className="font-medium">{adUnit.name}</TableCell>
                          <TableCell className="capitalize">{adUnit.type}</TableCell>
                          <TableCell>{adUnit.size}</TableCell>
                          <TableCell>{adUnit.website}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(adUnit.status)}>{adUnit.status}</Badge>
                          </TableCell>
                          <TableCell>{adUnit.impressions.toLocaleString()}</TableCell>
                          <TableCell>{adUnit.clicks.toLocaleString()}</TableCell>
                          <TableCell>{adUnit.ctr}</TableCell>
                          <TableCell>{adUnit.revenue}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    const code = generateAdUnitCode(adUnit.id)
                                    setAdUnitCode(code)
                                    toast.success("Ad Code Generated"
                                    )
                                  }}
                                >
                                  View Code
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedAdUnit(adUnit)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Ad Units</CardTitle>
              <CardDescription>Showing {Array.isArray(adUnits) ? adUnits.filter((adUnit) => adUnit.status === "pending").length : 0} pending ad units</CardDescription>
            </CardHeader>
            <CardContent>
            {Array.isArray(adUnits) && adUnits.filter((adUnit) => adUnit.status === "pending").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No pending ad units found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">All your ad units are currently active.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {Array.isArray(adUnits) &&
                      adUnits.filter((adUnit) => adUnit.status === "pending").map((adUnit) => (
                        <TableRow key={adUnit.id}>
                          <TableCell className="font-medium">{adUnit.name}</TableCell>
                          <TableCell className="capitalize">{adUnit.type}</TableCell>
                          <TableCell>{adUnit.size}</TableCell>
                          <TableCell>{adUnit.website}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(adUnit.status)}>{adUnit.status}</Badge>
                          </TableCell>
                          <TableCell>{adUnit.impressions.toLocaleString()}</TableCell>
                          <TableCell>{adUnit.clicks.toLocaleString
                            ()}</TableCell>
                          <TableCell>{adUnit.ctr}</TableCell>
                          <TableCell>{adUnit.revenue}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    const code = generateAdUnitCode(adUnit.id)
                                    setAdUnitCode(code)
                                    toast.success("Ad Code Generated"
                                    )
                                  }}
                                >
                                  View Code
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedAdUnit(adUnit)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Ad Units</CardTitle>
              <CardDescription>Showing {Array.isArray(adUnits) ? adUnits.filter((adUnit) => adUnit.status === "inactive").length : 0} inactive ad units</CardDescription>
            </CardHeader>
            <CardContent>
            {Array.isArray(adUnits) && adUnits.filter((adUnit) => adUnit.status === "inactive").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No inactive ad units found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">All your ad units are currently active.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Website</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {Array.isArray(adUnits) &&
                      adUnits.filter((adUnit) => adUnit.status === "inactive").map((adUnit) => (
                        <TableRow key={adUnit.id}>
                          <TableCell className="font-medium">{adUnit.name}</TableCell>
                          <TableCell className="capitalize">{adUnit.type}</TableCell>
                          <TableCell>{adUnit.size}</TableCell>
                          <TableCell>{adUnit.website}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(adUnit.status)}>{adUnit.status}</Badge>
                          </TableCell>
                          <TableCell>{adUnit.impressions.toLocaleString()}</TableCell>
                          <TableCell>{adUnit.clicks.toLocaleString
                            ()}</TableCell>
                          <TableCell>{adUnit.ctr}</TableCell>
                          <TableCell>{adUnit.revenue}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => {
                                    const code = generateAdUnitCode(adUnit.id)
                                    setAdUnitCode(code)
                                    toast.success("Ad Code Generated"
                                    )
                                  }}
                                >
                                  View Code
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedAdUnit(adUnit)
                                    setIsDeleteDialogOpen(true)
                                  }}
                                  className="text-red-600"
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        </>
      )}
      </>
      </Tabs>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Ad Unit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the ad unit "{selectedAdUnit?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteAdUnit} className="bg-red-600 text-white">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  )
}
                                  