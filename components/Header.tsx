"use client"

import { useState, useEffect } from "react"
import { Bell, Search, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface Notification {
  id: number; 
  message: string;
  time: string;
}

export function Header({ onSearch }: { onSearch: (query: string) => void }) {
 
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/notification")
        const data = await response.json()
        setNotifications(data.map((notification: any, index: number) => ({ ...notification, id: index })))
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }
    fetchNotifications()

  }, [])

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((_, index) => index !== id))
  }

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem('token')
    localStorage.removeItem('user')
   
    // Redirect to login
    router.push('/login')
  }

  return (
    <div className="flex h-16 items-center justify-between border-b bg-gray-950 px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-white"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span className="text-lg font-semibold text-white">Care</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            className="w-[300px] bg-gray-900 pl-8 text-white placeholder:text-gray-500"
            placeholder="Search Patient, Tag, Appointment"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
                  {notifications.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="p-4 bg-gray-100 border-b">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeNotification(notification.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg" alt="Avatar" className="rounded-full" width={32} height={32} />
          <span className="text-sm font-medium text-white">{userName}</span>
        </div>
        <button 
          onClick={handleLogout}
          className="rounded bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
        >
          Logout
        </button>
      </div>
    </div>
  )
}



