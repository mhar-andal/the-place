import db from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { listingFormSchema } from '@/components/form/schemas/ListingSchemas'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const body = (await request.json()) as z.infer<typeof listingFormSchema>
  const { slug } = await params

  await db('listings').where('id', slug).update({
    description: body.description,
    image: body.image,
    title: body.title,
  })

  return NextResponse.json({ message: 'Listing updated' }, { status: 200 })
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  await db('listings').where('id', slug).delete()
  return NextResponse.json({ message: 'Listing deleted' }, { status: 200 })
}
