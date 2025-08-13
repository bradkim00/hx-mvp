"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Camera, Ticket, Users, MessageSquare } from "lucide-react"

export default function LogGamePage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    gameType: "mlb", // mlb, custom
    homeTeam: "",
    awayTeam: "",
    stadium: "",
    seatText: "",
    friends: "",
    caption: "",
    ticketImage: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        ticketImage: e.target.files[0],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Logging game:", formData)
    // Here you would submit to your API
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">When was the game?</h3>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">What type of game?</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="gameType"
              value="mlb"
              checked={formData.gameType === "mlb"}
              onChange={handleInputChange}
              className="mr-3"
            />
            <span>MLB Game</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="gameType"
              value="custom"
              checked={formData.gameType === "custom"}
              onChange={handleInputChange}
              className="mr-3"
            />
            <span>Custom Game</span>
          </label>
        </div>
      </div>

      <Button onClick={() => setStep(2)} className="w-full">
        Continue
      </Button>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {formData.gameType === "mlb" ? (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Select the game</h3>
          <div className="space-y-3">
            <select
              name="homeTeam"
              value={formData.homeTeam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select home team</option>
              <option value="yankees">New York Yankees</option>
              <option value="mets">New York Mets</option>
              <option value="redsox">Boston Red Sox</option>
              <option value="dodgers">Los Angeles Dodgers</option>
            </select>
            
            <div className="text-center text-gray-500">vs</div>
            
            <select
              name="awayTeam"
              value={formData.awayTeam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select away team</option>
              <option value="yankees">New York Yankees</option>
              <option value="mets">New York Mets</option>
              <option value="redsox">Boston Red Sox</option>
              <option value="dodgers">Los Angeles Dodgers</option>
            </select>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Custom game details</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="homeTeam"
              placeholder="Home team name"
              value={formData.homeTeam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="text-center text-gray-500">vs</div>
            <input
              type="text"
              name="awayTeam"
              placeholder="Away team name"
              value={formData.awayTeam}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Where was the game?</h3>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="stadium"
            placeholder="Stadium name"
            value={formData.stadium}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Where were you sitting?</h3>
        <input
          type="text"
          name="seatText"
          placeholder="e.g., Section 105, Row 15, Seat 8"
          value={formData.seatText}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Who were you with?</h3>
        <div className="relative">
          <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="friends"
            placeholder="e.g., John, Sarah, Mike"
            value={formData.friends}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Upload ticket (optional)</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="ticket-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-500 font-medium">
                Upload a file
              </span>
              <input
                id="ticket-upload"
                name="ticketImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            <p className="text-gray-500 text-sm">or drag and drop</p>
          </div>
          {formData.ticketImage && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.ticketImage.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
          Back
        </Button>
        <Button onClick={() => setStep(4)} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add a caption</h3>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            name="caption"
            placeholder="Share your gameday experience..."
            value={formData.caption}
            onChange={handleInputChange}
            rows={4}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Game Summary</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>Date:</strong> {formData.date}</p>
          <p><strong>Game:</strong> {formData.awayTeam} @ {formData.homeTeam}</p>
          <p><strong>Stadium:</strong> {formData.stadium}</p>
          {formData.seatText && <p><strong>Seat:</strong> {formData.seatText}</p>}
          {formData.friends && <p><strong>With:</strong> {formData.friends}</p>}
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Log Game
        </Button>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Your Game</h1>
        <p className="text-gray-600">
          Record your gameday experience and build your FanMetrics
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-600"
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  )
}
