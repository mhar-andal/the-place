'use client'

import { useMemo, useState } from 'react'
import { PlusCircleIcon } from 'lucide-react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import ListingModal from './ListingModal'
import { ListingType } from './types'

interface ListingProps {
  type: ListingType
}

export default function Listing({ type }: ListingProps) {
  const [open, setOpen] = useState(type === 'new' ? false : true)

  const DialogTitle = useMemo(
    () => `${type === 'new' ? 'Create' : 'Edit'} a listing`,
    [type],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* New Listing Button Desktop */}
      <DialogTrigger className="hidden sm:block" asChild>
        <Button variant="secondary">{DialogTitle}</Button>
      </DialogTrigger>

      {/* New Listing Button Mobile */}
      <DialogTrigger className="block sm:hidden px-2" asChild>
        <Button variant="secondary">
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>

      {/* New Listing Modal */}
      <ListingModal type={type} setOpen={setOpen} />
    </Dialog>
  )
}
