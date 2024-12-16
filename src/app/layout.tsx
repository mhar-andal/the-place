import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Providers from '../stores/Providers'

import './globals.css'
import Navbar from '@/components/layout/Navbar'
import ListingLayout from '@/components/layout/ListingLayout'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  description: 'A platform for creating and sharing listings',
  title: 'The Place',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="dark"
      style={{ colorScheme: 'dark' }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="w-full mx-auto max-w-2xl px-4">
            <Navbar />
            <ListingLayout>{children}</ListingLayout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
