import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatGameTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function calculateWinRate(wins: number, losses: number): number {
  const total = wins + losses
  return total === 0 ? 0 : Math.round((wins / total) * 100)
}

export function getCurrentStreak(checkins: Array<{ createdAt: Date }>): number {
  if (checkins.length === 0) return 0
  
  const sortedCheckins = [...checkins].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  
  let streak = 0
  const now = new Date()
  const oneDay = 24 * 60 * 60 * 1000
  
  for (let i = 0; i < sortedCheckins.length; i++) {
    const checkinDate = new Date(sortedCheckins[i].createdAt)
    const daysDiff = Math.floor((now.getTime() - checkinDate.getTime()) / oneDay)
    
    if (i === 0 && daysDiff <= 1) {
      streak = 1
    } else if (i > 0) {
      const prevCheckinDate = new Date(sortedCheckins[i - 1].createdAt)
      const daysBetween = Math.floor((prevCheckinDate.getTime() - checkinDate.getTime()) / oneDay)
      
      if (daysBetween <= 1) {
        streak++
      } else {
        break
      }
    }
  }
  
  return streak
}
