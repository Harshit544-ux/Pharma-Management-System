"use client"

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Welcome to Patient Management</h1>
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  )
}

