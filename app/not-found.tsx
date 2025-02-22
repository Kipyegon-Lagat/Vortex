import Link from 'next/link'
import { Button } from "@/components/ui/button"
 
export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-gray-500">Could not find requested resource</p>
      <Button asChild className="bg-[#0066FF] hover:bg-blue-600 text-white">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
