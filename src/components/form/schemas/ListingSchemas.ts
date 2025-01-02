import { z } from 'zod'

export const promptFormSchema = z.object({
  prompt: z.string().min(4, {
    message: 'Prompt must be at least 4 characters.',
  }),
})

export const listingFormSchema = z.object({
  description: z.string().min(4, {
    message: 'Prompt must be at least 4 characters.',
  }),
  id: z.number().optional(),
  image: z.string(),
  title: z.string().min(4, {
    message: 'Title must be at least 4 characters.',
  }),
})
