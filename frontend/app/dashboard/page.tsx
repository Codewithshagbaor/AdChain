"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to advertiser dashboard by default
    // In a real app, this would check the user's role and redirect accordingly
    router.push("/dashboard/advertiser")
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-blue-50/10 dark:to-blue-950/10">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="text-lg font-medium">Redirecting to your dashboard...</p>
      </div>
    </div>
  )
}

