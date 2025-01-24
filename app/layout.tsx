import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Patient Management System',
  description: 'Created with Next.js 14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
