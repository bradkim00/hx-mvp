"use client"

import { useState } from "react"
import { Medal, Star, Trophy, Target, Zap } from "lucide-react"

// Mock data - will be replaced with real API calls
const mockBadges = [
  {
    id: "1",
    name: "First Game",
    description: "Attended your first MLB game",
    rarity: "SILVER",
    earned: "2024-03-15",
    icon: "🏟️",
    category: "milestone",
  },
  {
    id: "2",
    name: "Yankee Fan",
    description: "Attended 5 Yankees home games",
    rarity: "GOLD",
    earned: "2024-05-20",
    icon: "⚾",
    category: "team",
  },
  {
    id: "3",
    name: "Stadium Collector",
    description: "Visited 10 different stadiums",
    rarity: "PLATINUM",
    earned: "2024-08-10",
    icon: "🏛️",
    category: "exploration",
  },
  {
    id: "4",
    name: "Streak Master",
    description: "Attended 7 games in a row",
    rarity: "GOLD",
    earned: "2024-07-15",
    icon: "🔥",
    category: "achievement",
  },
  {
    id: "5",
    name: "Rivalry Expert",
    description: "Witnessed 3 classic rivalry games",
    rarity: "SILVER",
    earned: "2024-06-30",
    icon: "⚔️",
    category: "special",
  },
  {
    id: "6",
    name: "Perfect Game",
    description: "Attended a game with a perfect game",
    rarity: "PLATINUM",
    earned: null,
    icon: "🎯",
    category: "rare",
    locked: true,
  },
]

const mockCategories = [
  { id: "all", name: "All Badges", icon: Medal, count: mockBadges.length },
  { id: "milestone", name: "Milestones", icon: Target, count: mockBadges.filter(b => b.category === "milestone").length },
  { id: "team", name: "Team Loyalty", icon: Star, count: mockBadges.filter(b => b.category === "team").length },
  { id: "exploration", name: "Exploration", icon: Trophy, count: mockBadges.filter(b => b.category === "exploration").length },
  { id: "achievement", name: "Achievements", icon: Zap, count: mockBadges.filter(b => b.category === "achievement").length },
  { id: "special", name: "Special Events", icon: Medal, count: mockBadges.filter(b => b.category === "special").length },
  { id: "rare", name: "Rare Moments", icon: Star, count: mockBadges.filter(b => b.category === "rare").length },
]

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRarity, setSelectedRarity] = useState("all")

  const filteredBadges = mockBadges.filter(badge => {
    const categoryMatch = selectedCategory === "all" || badge.category === selectedCategory
    const rarityMatch = selectedRarity === "all" || badge.rarity === selectedRarity
    return categoryMatch && rarityMatch
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "PLATINUM":
        return "from-gray-300 to-gray-500 text-white"
      case "GOLD":
        return "from-yellow-300 to-yellow-500 text-white"
      case "SILVER":
        return "from-gray-400 to-gray-600 text-white"
      default:
        return "from-gray-200 to-gray-400 text-gray-700"
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case "PLATINUM":
        return "text-gray-600"
      case "GOLD":
        return "text-yellow-600"
      case "SILVER":
        return "text-gray-500"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Collections</h1>
        <p className="text-gray-600">
          Show off your achievements and unlock new badges
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{mockBadges.filter(b => !b.locked).length}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-yellow-600">{mockBadges.filter(b => b.rarity === "GOLD").length}</div>
          <div className="text-sm text-gray-600">Gold Badges</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-gray-600">{mockBadges.filter(b => b.rarity === "PLATINUM").length}</div>
          <div className="text-sm text-gray-600">Platinum Badges</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{mockBadges.filter(b => b.locked).length}</div>
          <div className="text-sm text-gray-600">Locked Badges</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Badges</h3>
        
        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
          <div className="flex flex-wrap gap-2">
            {mockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rarity */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Rarity</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", name: "All", color: "bg-gray-100 text-gray-700" },
              { id: "SILVER", name: "Silver", color: "bg-gray-100 text-gray-700" },
              { id: "GOLD", name: "Gold", color: "bg-yellow-100 text-yellow-700" },
              { id: "PLATINUM", name: "Platinum", color: "bg-gray-100 text-gray-600" },
            ].map((rarity) => (
              <button
                key={rarity.id}
                onClick={() => setSelectedRarity(rarity.id)}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  selectedRarity === rarity.id
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : ""
                } ${rarity.color}`}
              >
                {rarity.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`bg-white rounded-lg border border-gray-200 p-6 text-center transition-all duration-200 ${
              badge.locked
                ? "opacity-60 grayscale"
                : "hover:shadow-lg hover:scale-105"
            }`}
          >
            {/* Badge Icon */}
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-3xl ${
              badge.locked
                ? "bg-gray-200"
                : `bg-gradient-to-br ${getRarityColor(badge.rarity)}`
            }`}>
              {badge.icon}
            </div>

            {/* Badge Info */}
            <h3 className="text-lg font-medium text-gray-900 mb-2">{badge.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
            
            {/* Rarity */}
            <div className={`text-sm font-medium mb-3 ${getRarityTextColor(badge.rarity)}`}>
              {badge.rarity}
            </div>

            {/* Status */}
            {badge.locked ? (
              <div className="text-xs text-gray-500">
                🔒 Locked - Keep playing to unlock!
              </div>
            ) : (
              <div className="text-xs text-gray-500">
                ✅ Earned {badge.earned}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No badges found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or start playing to earn badges!
          </p>
        </div>
      )}
    </div>
  )
}
