'use client'

import { Listing } from '@/app/types/models/Listing'
import ListingModal from '@/components/modals/Listing/ListingModal'
import { Dialog } from '@/components/ui/dialog'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useParams } from 'next/navigation'

export default function NewListingModal({ listing }: { listing: Listing }) {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.push('/', { scroll: false })}>
      {/* New Listing Modal */}
      <ListingModal
        key={listing.id}
        setOpen={() => router.push('/', { scroll: false })}
        type={'edit'}
        listing={listing}
      />
    </Dialog>
  )
}
