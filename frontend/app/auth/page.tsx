"use client"

import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image"
import Link from "next/link"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {AuthContext} from "@/context/AuthContext";
import { toast } from 'react-hot-toast';

export default function AuthPage() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
        await login(email, password);
        toast.success("Logged in successfully");
    } catch (err) {
        setError("Invalid credentials. Please try again.");
        toast.error("Invalid credentials. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleWalletConnect = () => {
    setIsLoading(true)
    // Simulate wallet connection
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard/advertiser"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-blue-50/20 dark:to-blue-950/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">A</div>
              </div>
              <span className="text-xl font-bold">AdChain</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Support</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <Card className="border-blue-200 dark:border-blue-800 shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome to AdChain</CardTitle>
              <CardDescription>
                Sign in to access your dashboard and manage your advertising or publishing
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                </TabsList>
                <TabsContent value="email" className="space-y-4">
                  <form onSubmit={handleEmailLogin}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="#" className="text-xs text-blue-500 hover:text-blue-700">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing in..." : "Sign In"}
                      </Button>
                    </div>
                  </form>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={() => handleWalletConnect()}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="wallet" className="space-y-4">
                  <div className="space-y-2 text-center">
                    <p className="text-sm text-muted-foreground">
                      Connect your wallet to sign in securely without a password
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-700 justify-start h-12"
                      onClick={() => handleWalletConnect()}
                      disabled={isLoading}
                    >
                      <div className="mr-2 h-5 w-5 rounded-full bg-white p-0.5">
                        <Image src="/placeholder.svg?height=20&width=20" alt="MetaMask" width={20} height={20} />
                      </div>
                      <span>MetaMask</span>
                      {isLoading && <span className="ml-auto">Connecting...</span>}
                    </Button>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      By connecting your wallet, you agree to our{" "}
                      <Link href="#" className="text-blue-500 hover:text-blue-700 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-blue-500 hover:text-blue-700 underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
              <div className="flex items-center justify-center space-x-1 text-sm">
                <span className="text-muted-foreground">Don't have an account?</span>
                <Link href="/signup" className="text-blue-500 hover:text-blue-700">
                  Sign up
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Secured by blockchain technology</span>
                </div>
              </div>
            </CardFooter>
          </Card>
          <div className="mt-6 flex justify-center space-x-4">
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Help
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

