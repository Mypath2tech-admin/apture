import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ComingSoonProps {
  title: string
  description?: string
  backLink?: string
  backLinkText?: string
  estimatedRelease?: string
}

export default function ComingSoon({
  title,
  description = "This feature is currently under development and will be available soon.",
  backLink = "/dashboard",
  backLinkText = "Back to Dashboard",
  estimatedRelease,
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-yellow-100 p-4 rounded-full mb-6">
        <Construction className="h-12 w-12 text-yellow-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-lg text-gray-600 max-w-md mb-6">{description}</p>

      {estimatedRelease && (
        <div className="bg-gray-100 px-4 py-2 rounded-md mb-8">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Estimated Release:</span> {estimatedRelease}
          </p>
        </div>
      )}

      <Link href={backLink}>
        <Button variant="outline" size="lg">
          {backLinkText}
        </Button>
      </Link>
    </div>
  )
}
