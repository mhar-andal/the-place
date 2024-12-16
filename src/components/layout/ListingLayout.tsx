'use client'

import { motion } from 'motion/react'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { data: listings, isLoading } = useQuery({
    queryFn: () => fetch('/api/listings').then((res) => res.json()),
    queryKey: ['listings'],
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const Listings = useMemo(() => {
    if (listings?.length === 0)
      return <div className="font-mono text-center">No listings found</div>
    return listings?.map(
      (listing: {
        id: string
        title: string
        description: string
        image: string
      }) => (
        <motion.div
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          key={listing.id}
        >
          <Card>
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription className="pt-2">
                {listing.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Image
                className="rounded-lg"
                src={listing.image}
                alt={listing.title}
                width={300}
                height={300}
              />

              <Button
                onClick={() =>
                  router.push(`/listing/${listing.id}`, { scroll: false })
                }
                className="w-full mt-4"
              >
                View
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ),
    )
  }, [listings])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
      {Listings}
      <div>{children ? children : null}</div>
    </div>
  )
}
