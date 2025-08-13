import { Feed } from "@/components/feed/feed"
import { QuickComposer } from "@/components/feed/quick-composer"

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to HX
        </h1>
        <p className="text-gray-600">
          Turn gameday into lasting, measurable memories
        </p>
      </div>
      
      <div className="space-y-8">
        <QuickComposer />
        <Feed />
      </div>
    </div>
  )
}
