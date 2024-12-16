import { getUsers } from '@/app/api/listings/[slug]/getUsers'
import NewListingModal from '@/components/modals/Listing/NewListingModal'

export default async function ViewListing({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const listing = await getUsers(id)

  return <NewListingModal listing={listing} />
}
