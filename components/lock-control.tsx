"use client"

import { useState } from "react"
import { Lock, Unlock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface LockControlProps {
  name: string
  batteryLevel: number
}

// Create a global event system for notifications
export const lockEvents = new EventTarget()

export default function LockControl({ name, batteryLevel }: LockControlProps) {
  const [isLocked, setIsLocked] = useState(name === "Front Door")
  const { toast } = useToast()

  const toggleLock = () => {
    const newState = !isLocked
    setIsLocked(newState)
    
    // Create notification event
    const event = new CustomEvent("lockStateChange", {
      detail: {
        name,
        state: newState ? "Locked" : "Unlocked",
        timestamp: new Date(),
      },
    })
    lockEvents.dispatchEvent(event)

    // Show toast
    toast({
      title: `${name} ${newState ? "Locked" : "Unlocked"}`,
      description: `${name} has been ${newState ? "locked" : "unlocked"} ${new Date().toLocaleTimeString()}`,
    })
  }

  return (
    <Card className="p-3">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            {isLocked ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
          </div>
          <div>
            <h4 className="font-medium">{name}</h4>
            <p className="text-xs text-muted-foreground">{isLocked ? "Locked" : "Unlocked"}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-green-500">{batteryLevel}%</div>
          <Switch checked={isLocked} onCheckedChange={toggleLock} className="data-[state=checked]:bg-green-500" />
        </div>
      </div>
    </Card>
  )
}
