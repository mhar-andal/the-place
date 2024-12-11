'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to login page
      window.location.href = '/api/auth/signin'
    }
  }, [status])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div>
      {session ? <p>Welcome, {session?.user?.email}</p> : <p>Please log in</p>}
    </div>
  )
}
