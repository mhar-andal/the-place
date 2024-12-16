import db from '@/lib/db'

export const getUsers = async (slug: string) => {
  return await db('listings').where('id', slug).first()
}
