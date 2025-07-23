"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, User } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // For demo purposes, hardcode admin credentials
    if (username === "admin" && password === "admin") {
      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({ username: "admin", role: "Administrator" }))
      // Set cookie for middleware
      document.cookie = "user=admin; path=/"
      router.push("/")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FF]">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 text-xl font-semibold text-[#101010]">
          <User className="w-6 h-6" />
          Vortex
        </div>
      </div>
      
      <Card className="w-[400px] p-6 bg-white shadow-sm rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold">Account Login</h1>
          <p className="text-sm text-gray-500 mt-1">Enter logins</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">username</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">@</span>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-8"
                placeholder="sydney@eahd.org"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button type="submit" className="w-full bg-[#0066FF] hover:bg-blue-600 text-white">
            Login
          </Button>
        </form>
      </Card>

      <div className="mt-4 text-sm text-gray-500">
        Designed by Kipyegon Lagat
      </div>
    </div>
  )
}
