import { promptFormSchema } from '@/components/modals/Listing/ListingModal'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { z } from 'zod'

const CONTROLLED_PROMPT = ', in the style of house architecture'

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error(
    'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.',
  )
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: Request) {
  const body = (await request.json()) as z.infer<typeof promptFormSchema>

  const options = {
    input: { prompt: `${body.prompt}${CONTROLLED_PROMPT}` },
    model: 'stability-ai/stable-diffusion',
    version: 'ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4',
  }

  const prediction = await replicate.predictions.create(options)

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 })
  }

  return NextResponse.json(prediction, { status: 201 })
}
