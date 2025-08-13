"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Camera, MapPin, Calendar } from "lucide-react"

export function QuickComposer() {
  const [caption, setCaption] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (caption.trim()) {
      console.log("Creating post:", caption)
      setCaption("")
      setIsExpanded(false)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">👤</span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your gameday experience..."
              className="w-full border-0 resize-none focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
              rows={isExpanded ? 3 : 1}
              onFocus={() => setIsExpanded(true)}
            />
            
            {isExpanded && (
              <div className="mt-3 space-y-3">
                {/* Game Selection */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Select a game or create custom</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Add location</span>
                </div>
                
                {/* Media Upload */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Camera className="w-4 h-4" />
                  <span>Add photos/videos</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Media</span>
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                    >
                      Cancel
                    </Button>
                    
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!caption.trim()}
                      className="flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
