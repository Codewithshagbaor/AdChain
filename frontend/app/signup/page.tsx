"use client"

import { useState, useContext } from "react";
import Link from "next/link"
import { Shield, CheckCircle2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {AuthContext} from "@/context/AuthContext";
import { toast } from 'react-hot-toast';
import axios from 'axios';
export default function SignUpPage() {
  const { signup } = useContext(AuthContext);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [accountType, setAccountType] = useState("advertiser")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleEmailSignUp = async (e: React.FormEvent | React.MouseEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords don't match");
    return;
  }
  
  if (step === 1) {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 500);
  } else {
    
    setIsLoading(true);
    try {
      const role = accountType.toUpperCase();
      await signup(email, password, role);
      toast.success("Email sent! Check your inbox to complete the signup process.");
    } catch (error: unknown) {
      console.error("Full error object:", error);
      
      if (axios.isAxiosError(error) && error.response) {
        console.error("Response data:", error.response.data);
        
        // Handle validation errors (like duplicate email)
        if (error.response.data.email) {
          toast.error(`${error.response.data.email[0]}`);
        } else if (error.response.data.message) {
          toast.error(`Signup failed: ${error.response.data.message}`);
        } else {
          toast.error("Signup failed. Please check your information and try again.");
        }
      } else {
        toast.error(`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      setIsLoading(false);
    }
  }
};

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
              <CardTitle className="text-2xl font-bold">Create your AdChain account</CardTitle>
              <CardDescription>
                {step === 1
                  ? "Sign up to start advertising or publishing on the blockchain"
                  : "Complete your account setup"}
              </CardDescription>
              {step > 1 && (
                <div className="flex justify-center mt-2">
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Step 1 completed</span>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6">
              {step === 1 ? (
                <form onSubmit={handleEmailSignUp}>
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
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Continue"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Label>I want to use AdChain as a:</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-blue-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>You won't be able to change your account type after registration.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <Select defaultValue="advertiser" value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advertiser">Advertiser</SelectItem>
                        <SelectItem value="publisher">Publisher</SelectItem>
                      </SelectContent>
                    </Select>

                    <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300">
                      <Info className="h-4 w-4" />
                      <AlertDescription className="text-xs">
                        Important: You won't be able to change your account type after registration.
                      </AlertDescription>
                    </Alert>

                    <div className="mt-2">
                      {accountType === "advertiser" && (
                        <p className="text-sm text-muted-foreground">
                          As an <strong>Advertiser</strong>, you'll be able to create and manage advertising campaigns
                          on the blockchain.
                        </p>
                      )}
                      {accountType === "publisher" && (
                        <p className="text-sm text-muted-foreground">
                          As a <strong>Publisher</strong>, you'll be able to monetize your content with blockchain-based
                          advertising.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3 w-full">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleEmailSignUp}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Complete Sign Up"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
              <div className="flex items-center justify-center space-x-1 text-sm">
                <span className="text-muted-foreground">Already have an account?</span>
                <Link href="/auth" className="text-blue-500 hover:text-blue-700">
                  Sign in
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

