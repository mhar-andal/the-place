'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import { useQueryClient } from '@tanstack/react-query'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Badge } from '@/components/ui/badge'
import { ListingType } from './types'
import { toast } from '@/hooks/use-toast'
import { Listing } from '@/app/types/models/Listing'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

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

interface ListingModalProps {
  type: ListingType
  setOpen: (open: boolean) => void
  listing?: Listing
}

export default function NewListingModal({
  type,
  setOpen,
  listing,
}: ListingModalProps) {
  const queryClient = useQueryClient()
  const [prediction, setPrediction] = useState<any>(null)
  const [error, setError] = useState(null)

  const [deleteShow, setDeleteShow] = useState(false)

  // Prompt Form
  const promptForm = useForm<z.infer<typeof promptFormSchema>>({
    defaultValues: {
      prompt: '',
    },
    resolver: zodResolver(promptFormSchema),
  })

  // Listing Form
  const form = useForm<z.infer<typeof listingFormSchema>>({
    defaultValues: {
      description: listing?.description || '',
      id: listing?.id || '',
      image: listing?.image || '',
      title: listing?.title || '',
    },
    resolver: zodResolver(listingFormSchema),
  })

  // Prompt Form Submit
  const promptSubmit = async (values: z.infer<typeof promptFormSchema>) => {
    // POST: Create a new prediction
    const response = await fetch('/api/predictions', {
      body: JSON.stringify({
        prompt: values.prompt,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    let prediction = await response.json()
    if (response.status !== 201) {
      setError(prediction.detail)
      return
    }
    setPrediction(prediction)

    while (
      prediction.status !== 'succeeded' &&
      prediction.status !== 'failed'
    ) {
      await sleep(1000)
      const response = await fetch('/api/predictions/' + prediction.id)
      prediction = await response.json()
      if (response.status !== 200) {
        setError(prediction.detail)
        return
      }
      setPrediction(prediction)
    }
  }

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['listings'] })
    setOpen(false)
    const action = type === 'new' ? 'created' : 'updated'
    toast({
      description: `Your listing has been ${action}`,
      title: `Listing ${action}`,
    })
  }

  // Listing Form Submit
  const onSubmit = async (values: z.infer<typeof listingFormSchema>) => {
    // POST: Create a new listing
    switch (type) {
      case 'new':
        await fetch('/api/listings', {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }).then((res) => {
          if (res.ok) handleSuccess()
        })
        break
      case 'edit':
        await fetch(`/api/listings/${values.id}`, {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        }).then((res) => {
          if (res.ok) handleSuccess()
        })
        break
      default:
        break
    }
  }

  // Status Badge
  const StatusBadge = useMemo(() => {
    if (prediction?.status === 'succeeded') {
      return (
        <Badge variant="default" className="bg-green-600 text-white">
          Succeeded
        </Badge>
      )
    } else if (prediction?.status === 'failed') {
      return <Badge variant="destructive">Failed</Badge>
    }
    return <Badge variant="outline">Pending</Badge>
  }, [prediction])

  const handleDelete = () => {
    fetch(`/api/listings/${listing?.id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        queryClient.invalidateQueries({ queryKey: ['listings'] })
        setOpen(false)
        toast({
          description: `Your listing has been deleted`,
          title: `Listing deleted`,
        })
      }
    })
  }

  useEffect(() => {
    // Set the image from the prediction if it's succeeded
    if (prediction?.status === 'succeeded') {
      form.setValue('image', prediction.output[prediction.output.length - 1])
    }
  }, [prediction])

  const ListingAction = useMemo(() => {
    return type === 'new' ? 'Create' : 'Update'
  }, [type])

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{ListingAction} Listing</DialogTitle>
        <DialogDescription>
          {type === 'new'
            ? 'Create a new listing'
            : 'Update an existing listing'}
        </DialogDescription>
      </DialogHeader>

      {deleteShow ? (
        <div className="space-y-2">
          <h1 className="text-center">
            Are you sure you want to delete this listing?
          </h1>
          <div className="flex justify-center space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={() => setDeleteShow(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            {prediction ? (
              <>
                {prediction.output && (
                  <div className="image-wrapper mt-2">
                    <Image
                      src={prediction.output[prediction.output.length - 1]}
                      alt="output"
                      sizes="100vw"
                      height={768}
                      width={768}
                    />
                  </div>
                )}

                <div className="flex mt-2 mb-4">{StatusBadge}</div>
              </>
            ) : (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) =>
                  field.value ? (
                    <div className="image-wrapper mt-2">
                      <Image
                        src={field.value}
                        alt="output"
                        sizes="100vw"
                        height={768}
                        width={768}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                }
              />
            )}
          </div>

          {/* Prompt Form */}
          <Form key="prompt" {...promptForm}>
            <form
              onSubmit={promptForm.handleSubmit(promptSubmit)}
              className="space-y-4"
            >
              <FormField
                control={promptForm.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prompt</FormLabel>
                    <FormDescription>
                      {type === 'new'
                        ? 'The image you want to generate'
                        : 'The prompt you want to regenerate the image with'}
                    </FormDescription>
                    <FormControl>
                      <Input
                        placeholder="A beautiful house in San Francisco"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!prediction && <Button type="submit">Generate image</Button>}
            </form>
          </Form>

          {/* Listing Form */}
          {(prediction?.status === 'succeeded' || type === 'edit') && (
            <div>
              <Form {...form}>
                <form
                  key="listing"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormDescription>
                          The title of the listing
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormDescription>
                          The description of the listing
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-2">
                    <Button variant="default" type="submit">
                      Submit
                    </Button>
                    {type === 'edit' && (
                      <Button
                        className="ml-4"
                        variant="destructive"
                        onClick={() => {
                          setDeleteShow(true)
                        }}
                      >
                        Delete
                      </Button>
                    )}
                    <DialogClose asChild>
                      <Button
                        className="ml-4"
                        variant="secondary"
                        onClick={() => {}}
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </div>
      )}
    </DialogContent>
  )
}
