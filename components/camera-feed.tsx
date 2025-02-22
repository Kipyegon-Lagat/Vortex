"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Camera, CameraOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const { toast } = useToast()

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsStreaming(true)
        toast({
          title: "Camera activated",
          description: "Live feed started from webcam",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Camera error",
        description: "Unable to access webcam. Please check permissions.",
      })
    }
  }

  const stopStream = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((track) => track.stop())
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
    toast({
      title: "Camera deactivated",
      description: "Live feed stopped",
    })
  }, [toast])

  useEffect(() => {
    return () => {
      if (isStreaming) {
        stopStream()
      }
    }
  }, [isStreaming, stopStream])

  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-[120px] rounded-lg object-cover bg-gray-100"
      />
      <Button
        size="icon"
        variant="outline"
        className="absolute bottom-2 right-2 bg-white"
        onClick={isStreaming ? stopStream : startStream}
      >
        {isStreaming ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
      </Button>
    </div>
  )
}

