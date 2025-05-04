import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-[80vh] w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-medium">Loading Ad Units...</h2>
        <p className="text-muted-foreground">Please wait while we fetch your ad units</p>
      </div>
    </div>
  )
}
