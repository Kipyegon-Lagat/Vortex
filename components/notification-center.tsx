"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { lockEvents } from "./lock-control"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const handleLockEvent = (event: Event) => {
      const lockEvent = event as CustomEvent
      const { name, state, timestamp } = lockEvent.detail

      const newNotification = {
        id: Math.random().toString(36).substr(2, 9),
        title: name,
        message: state,
        timestamp: new Date(timestamp),
      }

      setNotifications(prev => [newNotification, ...prev].slice(0, 5))
    }

    lockEvents.addEventListener("lockStateChange", handleLockEvent)
    return () => {
      lockEvents.removeEventListener("lockStateChange", handleLockEvent)
    }
  }, [])

  return (
    <div>
      <h4 className="font-medium mb-3">Recent Notifications</h4>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-3">
            <div className="text-sm text-muted-foreground mb-1">
              {notification.timestamp.toLocaleTimeString()}
            </div>
            <div className="font-medium">{notification.title}</div>
            <div className="text-sm">{notification.message}</div>
          </Card>
        ))}
        {notifications.length === 0 && (
          <Card className="p-3">
            <div className="text-sm text-muted-foreground">No recent notifications</div>
          </Card>
        )}
      </div>
    </div>
  )
}
