"use client"

import { useState } from "react"
import { Post } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MapPin, Calendar } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

// Mock user data - will be replaced with real data
const mockUsers = {
  user1: { name: "John Smith", avatar: "/avatars/john.jpg" },
  user2: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg" },
  user3: { name: "Mike Davis", avatar: "/avatars/mike.jpg" },
}

// Mock game data - will be replaced with real data
const mockGames = {
  game1: { homeTeam: "Yankees", awayTeam: "Red Sox", date: "2024-10-15" },
  game2: { homeTeam: "Mets", awayTeam: "Dodgers", date: "2024-10-20" },
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 5)
  const [commentCount] = useState(Math.floor(Math.random() * 20) + 2)

  const user = mockUsers[post.userId as keyof typeof mockUsers]
  const game = mockGames[post.gameId as keyof typeof mockGames]

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1)
    } else {
      setLikeCount(prev => prev + 1)
    }
    setLiked(!liked)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {user?.name?.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name}</div>
            <div className="text-sm text-gray-500">{formatDate(post.createdAt)}</div>
          </div>
        </div>
        
        {game && (
          <div className="text-right text-sm">
            <div className="text-gray-900 font-medium">
              {game.awayTeam} @ {game.homeTeam}
            </div>
            <div className="text-gray-500 flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{game.date}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 mb-3">{post.caption}</p>
        
        {/* Media Grid */}
        {post.mediaUrls && post.mediaUrls.length > 0 && (
          <div className={`grid gap-2 ${
            post.mediaUrls.length === 1 ? 'grid-cols-1' : 
            post.mediaUrls.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {post.mediaUrls.map((url, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">📸</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Game Info */}
      {game && (
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2 text-blue-700">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              {game.awayTeam} vs {game.homeTeam}
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center space-x-2 ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{commentCount}</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
