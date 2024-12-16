import db from '@/lib/db'
import { NextResponse } from 'next/server'

import { listingFormSchema } from '@/components/modals/Listing/ListingModal'
import { z } from 'zod'

export async function GET(request: Request) {
  const listings = await db.select().from('listings')
  return NextResponse.json(listings)
}

export async function POST(request: Request) {
  const body = (await request.json()) as z.infer<typeof listingFormSchema>

  const listing = await db('listings').insert({
    description: body.description,
    image: body.image,
    title: body.title,
  })

  return NextResponse.json({ message: 'Listing created' }, { status: 201 })
}
