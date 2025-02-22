"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function LivingRoomPage() {
  const [temperature, setTemperature] = useState(22)

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen p-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-medium">Living Room</h1>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Temperature</h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Auto Mode
          </Button>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-medium">{temperature}°C</div>
          </div>
          <svg className="w-full h-full -rotate-90">
            <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className="text-blue-500"
              strokeDasharray={553}
              strokeDashoffset={553 - (553 * (temperature - 16)) / (30 - 16)}
            />
          </svg>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Heating</span>
            </div>
            <Button variant="outline" size="sm">
              Off <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Cooling</span>
            </div>
            <Button variant="outline" size="sm">
              On <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

