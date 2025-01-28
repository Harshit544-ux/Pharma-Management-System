"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("") // Clear any previous errors
    
    const form = e.target as HTMLFormElement;
    const first_name = (form.elements.namedItem("firstName") as HTMLInputElement).value;
    const last_name = (form.elements.namedItem("lastName") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const role = (form.elements.namedItem("role") as HTMLSelectElement).value;

    // Basic validation
    if (!first_name || !last_name || !email || !password || !role) {
      setError("Please fill in all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Password validation (at least 8 characters)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    try {
      const response = await fetch("http://localhost:3005/api/register_users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({first_name, last_name, email, password, role})
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Registration successful:", data)
        const fullName = `${first_name} ${last_name}`
        localStorage.setItem('userName', fullName) 
        router.push('/dashboard')
      } else {
        const errorData = await response.json()
        setError(errorData.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setError("Network error. Please check your connection and try again.")
    }
  }

  return (
    <div className="h-[700px] bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center py-8 rounded-2xl">
      <div className="w-full h-[700px] max-w-md space-y-6 bg-gray-900/30 backdrop-blur-sm p-8 rounded-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-white"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span className="text-3xl font-bold text-white">Care</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="text-sm text-gray-400">Please enter your details to sign up</p>
        </div>
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First name
              </Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                className="bg-gray-900 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last name
              </Label>
              <Input
                id="lastName"
                placeholder="Enter your last name"
                className="bg-gray-900 text-white placeholder:text-gray-500"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="bg-gray-900 text-white placeholder:text-gray-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="bg-gray-900 text-white placeholder:text-gray-500"
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">
              Role
            </Label>
            <select
              id="role"
              className="w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            >
              <option value="">Select your role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-primary"
              required
            />
            <Label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{" "}
              <Link href="/terms" className="text-gray-400 hover:underline">
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Create account
          </Button>
        </form>
        <p className="text-center text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-gray-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}
