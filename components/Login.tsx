"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { useNavigation } from "react-day-picker"



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    
    try {
      const response = await fetch("http://localhost:3005/api/login_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful, redirecting to dashboard...");
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
 <div className="flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl">
  <div className="w-full max-w-lg h-[550px] space-y-4 bg-gray-900/30 backdrop-blur-sm p-8  rounded-2xl  px-15">
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-white mb-4 mr-25"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="text-3xl font-bold text-white">Care</span>
      </div>
      <h2 className="text-2xl font-bold text-white">Welcome back</h2>
      <p className="text-sm text-gray-400">Please enter your details to sign in</p>
    </div>
    <form onSubmit={handleLogin} className="space-y-6">
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
            placeholder="Enter your password"
            className="bg-gray-900 text-white placeholder:text-gray-500"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-primary"
          />
          <Label htmlFor="remember" className="text-sm text-gray-400">
            Remember me
          </Label>
        </div>
        <Link href="/forgot-password" className="text-sm text-gray-400 hover:underline">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl">
        Sign in
      </Button>
    </form>
    <p className="text-center text-gray-400">
      Don't have an account?{' '}
      <Link href="/register" className="text-gray-400 hover:underline">
        Register here
      </Link>
    </p>
  </div>
</div>

  )
}

