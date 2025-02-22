import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  return (
    <div className="max-w-md mx-auto bg-background min-h-screen flex flex-col">
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <Image src="/placeholder.svg" alt="Modern home" width={300} height={200} className="rounded-lg mb-6" />
          <h1 className="text-2xl font-semibold mb-2">Welcome to smart home system</h1>
        </div>
        <div className="w-full max-w-xs space-y-4">
          <Link href="/">
            <Button className="w-full rounded-full bg-black hover:bg-gray-800 text-white">Let's start</Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Don't have account?{" "}
            <Link href="/register" className="text-orange-500 hover:underline">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

