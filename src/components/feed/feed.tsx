"use client"

import { useEffect, useState } from "react"
import { PostCard } from "./post-card"
import { Post } from "@prisma/client"

// Mock data for now - will be replaced with real API calls
const mockPosts: Post[] = [
  {
    id: "1",
    userId: "user1",
    gameId: "game1",
    caption: "Amazing game at Yankee Stadium! The energy was incredible! #Yankees #RedSox #Baseball",
    mediaUrls: ["/uploads/game1_photo1.jpg", "/uploads/game1_photo2.jpg"],
    createdAt: new Date("2024-10-15T19:00:00Z"),
  },
  {
    id: "2",
    userId: "user2",
    gameId: "game1",
    caption: "Great rivalry game! Even though we lost, it was a fantastic experience. #RedSox #Yankees",
    mediaUrls: ["/uploads/game1_photo3.jpg"],
    createdAt: new Date("2024-10-15T19:30:00Z"),
  },
  {
    id: "3",
    userId: "user3",
    gameId: "game2",
    caption: "Dodgers on fire tonight! What a performance! #Dodgers #Mets #LA",
    mediaUrls: ["/uploads/game2_photo1.jpg"],
    createdAt: new Date("2024-10-20T20:30:00Z"),
  },
]

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏟️</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600">
          Be the first to share your gameday experience!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
