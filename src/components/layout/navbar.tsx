"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  MapPin, 
  Trophy, 
  User, 
  LogOut, 
  LogIn,
  Plus,
  Medal
} from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">HX</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Chex</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <Home className="w-4 h-4" />
              <span>Feed</span>
            </Link>
            <Link 
              href="/log" 
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Log Game</span>
            </Link>
            <Link 
              href="/me/map" 
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <MapPin className="w-4 h-4" />
              <span>My Map</span>
            </Link>
            <Link 
              href="/collections" 
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <Medal className="w-4 h-4" />
              <span>Collections</span>
            </Link>
            <Link 
              href="/me" 
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
              <Trophy className="w-4 h-4" />
              <span>FanMetrics</span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/me">
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{session.user?.name}</span>
                  </div>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="flex items-center space-x-1">
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
