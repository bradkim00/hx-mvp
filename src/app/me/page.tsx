"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Trophy, MapPin, TrendingUp, Calendar, Medal, Star } from "lucide-react"

// Mock data - will be replaced with real API calls
const mockUserStats = {
  name: "John Smith",
  totalGames: 15,
  wins: 12,
  losses: 3,
  currentStreak: 5,
  longestStreak: 8,
  stadiumsVisited: 7,
  totalBadges: 12,
  favoriteTeams: ["Yankees", "Mets"],
  recentGames: [
    { date: "2024-10-15", home: "Yankees", away: "Red Sox", result: "W", score: "5-3" },
    { date: "2024-10-10", home: "Mets", away: "Dodgers", result: "L", score: "2-7" },
    { date: "2024-10-05", home: "Yankees", away: "Blue Jays", result: "W", score: "4-1" },
  ],
  badges: [
    { name: "First Game", rarity: "SILVER", earned: "2024-03-15" },
    { name: "Yankee Fan", rarity: "GOLD", earned: "2024-05-20" },
    { name: "Stadium Collector", rarity: "PLATINUM", earned: "2024-08-10" },
  ],
}

export default function FanMetricsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const winRate = Math.round((mockUserStats.wins / mockUserStats.totalGames) * 100)

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{mockUserStats.totalGames}</div>
          <div className="text-sm text-gray-600">Games Attended</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{winRate}%</div>
          <div className="text-sm text-gray-600">Win Rate</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-orange-600">{mockUserStats.currentStreak}</div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{mockUserStats.stadiumsVisited}</div>
          <div className="text-sm text-gray-600">Stadiums</div>
        </div>
      </div>

      {/* Record */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Season Record
        </h3>
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{mockUserStats.wins}</div>
            <div className="text-sm text-gray-600">Wins</div>
          </div>
          <div className="text-4xl font-bold text-gray-400">-</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{mockUserStats.losses}</div>
            <div className="text-sm text-gray-600">Losses</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-600">
          {winRate}% win rate • {mockUserStats.totalGames} total games
        </div>
      </div>

      {/* Recent Games */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Recent Games
        </h3>
        <div className="space-y-3">
          {mockUserStats.recentGames.map((game, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  game.result === "W" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {game.result}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {game.away} @ {game.home}
                  </div>
                  <div className="text-sm text-gray-500">{game.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{game.score}</div>
                <div className="text-sm text-gray-500">{game.result === "W" ? "Win" : "Loss"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBadges = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Medal className="w-5 h-5 mr-2 text-yellow-500" />
          Your Badges ({mockUserStats.badges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUserStats.badges.map((badge, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 text-center">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                badge.rarity === "PLATINUM" ? "bg-gradient-to-br from-gray-300 to-gray-500" :
                badge.rarity === "GOLD" ? "bg-gradient-to-br from-yellow-300 to-yellow-500" :
                "bg-gradient-to-br from-gray-400 to-gray-600"
              }`}>
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="font-medium text-gray-900">{badge.name}</div>
              <div className={`text-sm font-medium ${
                badge.rarity === "PLATINUM" ? "text-gray-600" :
                badge.rarity === "GOLD" ? "text-yellow-600" :
                "text-gray-500"
              }`}>
                {badge.rarity}
              </div>
              <div className="text-xs text-gray-500 mt-1">Earned {badge.earned}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTeams = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-blue-500" />
          Favorite Teams
        </h3>
        <div className="space-y-3">
          {mockUserStats.favoriteTeams.map((team, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{team.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{team}</div>
                  <div className="text-sm text-gray-500">Favorite team</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Games
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FanMetrics</h1>
        <p className="text-gray-600">
          Track your gameday stats and achievements
        </p>
      </div>

      {/* Profile Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-xl">{mockUserStats.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{mockUserStats.name}</h2>
            <p className="text-gray-600">Member since 2024</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "badges", label: "Badges", icon: Medal },
              { id: "teams", label: "Teams", icon: Star },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4 inline mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && renderOverview()}
      {activeTab === "badges" && renderBadges()}
      {activeTab === "teams" && renderTeams()}
    </div>
  )
}
