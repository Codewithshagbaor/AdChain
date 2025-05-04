"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  Check,
  Copy,
  CreditCard,
  Edit,
  ExternalLink,
  Eye,
  EyeOff,
  Info,
  Key,
  Loader2,
  Lock,
  Save,
  Shield,
  Wallet,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'react-hot-toast';
import axios from "axios"
import { useAccount } from "wagmi";


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
export default function PublisherSettingsPage() {
  // State for loading
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isConnectingWallet, setIsConnectingWallet] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  // State for wallet
  const [hasWallet, setHasWallet] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isRegisteredOnChain, setIsRegisteredOnChain] = useState(false)
  const [showWalletDialog, setShowWalletDialog] = useState(false)
  const [registrationProgress, setRegistrationProgress] = useState(0)
  const [registrationStep, setRegistrationStep] = useState("")

  // State for profile
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    bio: "",
    avatar: "",
  })

  // State for security
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for notifications
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      payments: true,
      security: true,
      updates: false,
      newsletter: false,
    },
    push: {
      payments: true,
      security: true,
      updates: true,
      newsletter: false,
    },
  })

  // State for payment
  const [paymentThreshold, setPaymentThreshold] = useState("50")
  const [paymentMethod, setPaymentMethod] = useState("wallet")

  // State for API
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const { address, isConnected, isDisconnected } = useAccount();



  // Simulate loading data
  useEffect(() => {
    const fetchUser = async () => {
        setIsLoading(true)
        try {
          const response = await api.get('/user/getUser/')
          const transformedData = {
            name: `${response.data.first_name || ""} ${response.data.last_name || ""}`.trim(),
            email: response.data.email,
            company: response.data.role,
            website: "",
            bio: "",
            avatar: response.data.avatar || "",
          };

          setProfileData(transformedData);

        if (response.data.wallet_address && response.data.wallet_address !== "" && response.data.wallet_address === address) {
            setHasWallet(true)
            setWalletAddress(response.data.wallet_address)
            setIsRegisteredOnChain(true)
        }
        setIsLoading(false)
        }
        catch (error) {
          console.error("Error fetching user data:", error)
        }
    }
    const loadData = async () => {
      setApiKey("pub_test_sk_7f4c88f0b757e3f3b4a2c8a0b757e3f3b4a2c8a0")

      setIsLoading(false)
    }

    loadData()
    fetchUser()
  }, [])

  // Handle wallet connection
  const handleConnectWallet = async () => {
    setIsConnectingWallet(true)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful connection
      setWalletAddress(`${address}`)
      setHasWallet(true)

      toast("Wallet connected successfully")

      // If not registered, show registration dialog
      if (!isRegisteredOnChain) {
        setShowWalletDialog(true)
      }
    } catch (error) {
      toast("Failed to connect wallet")
    } finally {
      setIsConnectingWallet(false)
    }
  }

  // Handle on-chain registration
  const handleRegisterOnChain = async () => {
    setIsRegistering(true)
    setRegistrationProgress(0)
    setRegistrationStep("Initializing registration...")

    try {
      // Step 1: Initialize
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRegistrationProgress(20)
      setRegistrationStep("Preparing transaction...")

      // Step 2: Prepare transaction
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRegistrationProgress(40)
      setRegistrationStep("Waiting for confirmation...")

      // Step 3: Wait for confirmation
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setRegistrationProgress(70)
      setRegistrationStep("Registering on AdChain network...")

      // Step 4: Register on chain
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRegistrationProgress(90)
      setRegistrationStep("Syncing with backend...")

      // Step 5: Sync with backend
    try {
      const response = await api.post('/user/addWallet/', { wallet_address: walletAddress });
      if (response.status === 200) {
        setRegistrationProgress(100);
      } else {
        throw new Error('Failed to register wallet');
      }
    } catch (error) {
      console.error("Error registering wallet:", error);
      toast.error("Failed to register wallet. Please try again.");
      throw error;
    }
      setRegistrationStep("Registration complete!")

      // Update state
      setIsRegisteredOnChain(true)

      // Close dialog after a short delay
      setTimeout(() => {
        setShowWalletDialog(false)
        toast("Registration successful")
      }, 1000)
    } catch (error) {
      toast("Registration failed",)
    } finally {
      setIsRegistering(false)
    }
  }

  // Handle save profile
  const handleSaveProfile = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast("Profile updated",
      )
    } catch (error) {
      toast("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle save security settings
  const handleSaveSecurity = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast("Security settings updated")
    } catch (error) {
      toast("Failed to update security settings")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle save notification settings
  const handleSaveNotifications = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast("Notification preferences updated")
    } catch (error) {
      toast("Failed to update notification preferences"
    )
    } finally {
      setIsSaving(false)
    }
  }

  // Handle save payment settings
  const handleSavePayment = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Payment settings updated",)
    } catch (error) {
      toast.error("Failed to update payment settings")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle regenerate API key
  const handleRegenerateApiKey = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate new mock API key
      setApiKey(
        "pub_test_sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      )

      toast.success("Your API key has been regenerated successfully. Make sure to update it in your integrations.")
    } catch (error) {
      toast.error("There was an error regenerating your API key. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  // Handle copy to clipboard
  const handleCopy = (text:any, message: any) => {
    navigator.clipboard.writeText(text)
    toast("Copied to clipboard")
  }

  return (
    <DashboardLayout userType="publisher">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your publisher account settings and preferences</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your publisher profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage
                          src={profileData.avatar || "/placeholder.svg?height=96&width=96"}
                          alt={profileData.name}
                        />
                        <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Change Avatar
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Primary Website</Label>
                          <div className="flex">
                            <Input
                              id="website"
                              value={profileData.website}
                              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                              className="rounded-r-none"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-l-none border-l-0"
                              onClick={() => window.open(`https://${profileData.website}`, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet">
              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Wallet</CardTitle>
                  <CardDescription>Connect your wallet and register on the AdChain network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {hasWallet ? (
                    <>
                      <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                        <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle className="text-green-800 dark:text-green-400">Wallet Connected</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-500">
                          Your wallet is connected and ready to receive payments.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Wallet Address</Label>
                          <div className="flex">
                            <Input value={walletAddress} readOnly className="font-mono text-sm rounded-r-none" />
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-l-none border-l-0"
                              onClick={() => handleCopy(walletAddress, "Wallet address copied to clipboard")}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Registration Status</Label>
                          <div className="flex items-center gap-2 p-2 border rounded-md">
                            {isRegisteredOnChain ? (
                              <>
                                <Badge className="bg-green-500">Registered</Badge>
                                <span className="text-sm text-muted-foreground">
                                  Your publisher account is registered on the AdChain network
                                </span>
                              </>
                            ) : (
                              <>
                                <Badge variant="outline" className="text-amber-500 border-amber-500">
                                  Not Registered
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                  Your publisher account is not registered on the AdChain network
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" onClick={() => setShowWalletDialog(true)}>
                            <Wallet className="mr-2 h-4 w-4" />
                            Change Wallet
                          </Button>

                          {!isRegisteredOnChain && (
                            <Button
                              onClick={() => setShowWalletDialog(true)}
                              className="bg-gradient-to-r from-blue-500 to-blue-700"
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Register on AdChain Network
                            </Button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>No Wallet Connected</AlertTitle>
                        <AlertDescription>
                          You need to connect a blockchain wallet to receive payments and register on the AdChain
                          network.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <h3 className="font-medium mb-2">Why connect a wallet?</h3>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Receive payments directly to your wallet</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Register as a verified publisher on the AdChain network</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Access to blockchain-verified ad metrics</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Participate in the AdChain governance</span>
                            </li>
                          </ul>
                        </div>

                        <Button
                          onClick={handleConnectWallet}
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                          disabled={isConnectingWallet}
                        >
                          {isConnectingWallet ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connecting Wallet...
                            </>
                          ) : (
                            <>
                              <Wallet className="mr-2 h-4 w-4" />
                              Connect Wallet
                            </>
                          )}
                        </Button>

                        <div className="text-center text-sm text-muted-foreground">
                          <p>
                            Don't have a wallet?{" "}
                            <a href="#" className="text-blue-500 hover:underline">
                              Learn how to create one
                            </a>
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showCurrentPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input id="new-password" type={showNewPassword ? "text" : "password"} className="pr-10" />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Authenticator App</div>
                        <div className="text-sm text-muted-foreground">
                          Use an authenticator app to generate one-time codes
                        </div>
                      </div>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Enable
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">SMS Authentication</div>
                        <div className="text-sm text-muted-foreground">Receive one-time codes via SMS</div>
                      </div>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Enable
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Management</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Active Sessions</div>
                          <div className="text-sm text-muted-foreground">You have 2 active sessions</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Lock className="mr-2 h-4 w-4" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveSecurity} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Payment Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about payments and earnings
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.email.payments}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              email: { ...notificationSettings.email, payments: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Security Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about security events
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.email.security}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              email: { ...notificationSettings.email, security: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Product Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about new features and updates
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.email.updates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              email: { ...notificationSettings.email, updates: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Newsletter</div>
                          <div className="text-sm text-muted-foreground">
                            Receive our monthly newsletter with tips and insights
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.email.newsletter}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              email: { ...notificationSettings.email, newsletter: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Payment Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about payments and earnings
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.push.payments}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              push: { ...notificationSettings.push, payments: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Security Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about security events
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.push.security}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              push: { ...notificationSettings.push, security: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Product Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Receive notifications about new features and updates
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.push.updates}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              push: { ...notificationSettings.push, updates: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Newsletter</div>
                          <div className="text-sm text-muted-foreground">
                            Receive our monthly newsletter with tips and insights
                          </div>
                        </div>
                        <Switch
                          checked={notificationSettings.push.newsletter}
                          onCheckedChange={(checked) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              push: { ...notificationSettings.push, newsletter: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveNotifications} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Manage your payment preferences and payout methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payout Method</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="wallet-payout"
                          name="payout-method"
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={paymentMethod === "wallet"}
                          onChange={() => setPaymentMethod("wallet")}
                        />
                        <Label htmlFor="wallet-payout" className="flex items-center gap-2">
                          <Wallet className="h-4 w-4" />
                          Blockchain Wallet
                          {hasWallet && (
                            <Badge variant="outline" className="text-green-500 border-green-500">
                              Connected
                            </Badge>
                          )}
                        </Label>
                      </div>

                      {paymentMethod === "wallet" && (
                        <div className="ml-6 pl-2 border-l-2 border-muted">
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              Payments will be sent to your connected wallet:
                            </div>
                            <div className="font-mono text-sm bg-muted p-2 rounded">
                              {walletAddress || "No wallet connected"}
                            </div>
                            {!hasWallet && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleConnectWallet}
                                disabled={isConnectingWallet}
                              >
                                {isConnectingWallet ? (
                                  <>
                                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <Wallet className="mr-2 h-3 w-3" />
                                    Connect Wallet
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="bank-payout"
                          name="payout-method"
                          className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                        />
                        <Label htmlFor="bank-payout" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Bank Transfer
                        </Label>
                      </div>

                      {paymentMethod === "bank" && (
                        <div className="ml-6 pl-2 border-l-2 border-muted space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="account-name">Account Holder Name</Label>
                            <Input id="account-name" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" placeholder="XXXXXXXXXXXX" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="routing-number">Routing Number</Label>
                            <Input id="routing-number" placeholder="XXXXXXXXX" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" placeholder="Bank of Example" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Threshold</h3>
                    <div className="space-y-2">
                      <Label htmlFor="payment-threshold">Minimum balance required for automatic payout (USD)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="payment-threshold"
                          type="number"
                          min="10"
                          max="1000"
                          value={paymentThreshold}
                          onChange={(e) => setPaymentThreshold(e.target.value)}
                        />
                        <span className="text-sm text-muted-foreground whitespace-nowrap">USD (min: $10)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You will receive automatic payments when your balance exceeds this amount
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Schedule</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Payment Frequency</div>
                          <div className="text-sm text-muted-foreground">How often you want to receive payments</div>
                        </div>
                        <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                          <option value="monthly">Monthly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Payment Processing</AlertTitle>
                    <AlertDescription>
                      Blockchain payments are processed within 24 hours. Bank transfers may take 3-5 business days.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSavePayment} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage your API keys and integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>API Documentation</AlertTitle>
                    <AlertDescription>
                      Learn how to integrate with our API in our{" "}
                      <a href="#" className="text-blue-500 hover:underline">
                        developer documentation
                      </a>
                      .
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">API Keys</h3>
                    <div className="space-y-2">
                      <Label htmlFor="api-key">Publisher API Key</Label>
                      <div className="flex">
                        <Input
                          id="api-key"
                          type={showApiKey ? "text" : "password"}
                          value={apiKey}
                          readOnly
                          className="font-mono text-sm rounded-r-none"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-none border-l-0 border-r-0"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-l-none"
                          onClick={() => handleCopy(apiKey, "API key copied to clipboard")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This key grants access to your publisher account. Keep it secure and never share it publicly.
                      </p>
                    </div>

                    <Button variant="outline" onClick={handleRegenerateApiKey} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Regenerating...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Regenerate API Key
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Webhooks</h3>
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input id="webhook-url" placeholder="https://your-website.com/webhook" />
                      <p className="text-sm text-muted-foreground">
                        We'll send POST requests to this URL when events occur in your account
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook Events</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="payment-events"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <Label htmlFor="payment-events">Payment Events</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="ad-events"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <Label htmlFor="ad-events">Ad Performance Events</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="account-events"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            defaultChecked
                          />
                          <Label htmlFor="account-events">Account Events</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSavePayment} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Wallet Connection Dialog */}
      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isRegisteredOnChain ? "Change Wallet" : "Register on AdChain Network"}</DialogTitle>
            <DialogDescription>
              {isRegisteredOnChain
                ? "Connect a different wallet to your publisher account"
                : "Register your publisher account on the AdChain network to receive payments and access blockchain features"}
            </DialogDescription>
          </DialogHeader>

          {isRegistering ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2 text-center">
                <h3 className="font-medium">{registrationStep}</h3>
                <Progress value={registrationProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Please wait while we register your account on the AdChain network
                </p>
              </div>
            </div>
          ) : (
            <>
              {hasWallet ? (
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Connected Wallet</Label>
                    <div className="flex">
                      <Input value={walletAddress} readOnly className="font-mono text-sm rounded-r-none" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                        onClick={() => handleCopy(walletAddress, "Wallet address copied to clipboard")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {!isRegisteredOnChain && (
                    <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      <AlertTitle className="text-amber-800 dark:text-amber-400">Not Registered</AlertTitle>
                      <AlertDescription className="text-amber-700 dark:text-amber-500">
                        Your publisher account is not registered on the AdChain network. Registration is required to
                        receive payments and access blockchain features.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    {isRegisteredOnChain ? (
                      <>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={handleConnectWallet}
                          disabled={isConnectingWallet}
                        >
                          {isConnectingWallet ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Connecting New Wallet...
                            </>
                          ) : (
                            <>
                              <Wallet className="mr-2 h-4 w-4" />
                              Connect Different Wallet
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                          onClick={handleRegisterOnChain}
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Register on AdChain Network
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          Registration requires a one-time blockchain transaction
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No Wallet Connected</AlertTitle>
                    <AlertDescription>
                      You need to connect a blockchain wallet to register on the AdChain network
                    </AlertDescription>
                  </Alert>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={handleConnectWallet}
                    disabled={isConnectingWallet}
                  >
                    {isConnectingWallet ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting Wallet...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            {!isRegistering && (
              <Button variant="outline" onClick={() => setShowWalletDialog(false)}>
                Cancel
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
