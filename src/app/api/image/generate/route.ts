import { NextResponse } from 'next/server'
import Replicate from 'replicate'
const replicate = new Replicate()

export async function POST(request: Request) {
  const formData = await request.formData()

  const output = await replicate.run('stability-ai/stable-diffusion', {
    input: {
      prompt: formData.get('prompt'),
    },
  })

  console.log('Output:', output)

  return NextResponse.json({ message: 'Image generated successfully' })
}
