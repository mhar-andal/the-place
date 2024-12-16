import NextAuth from 'next-auth'
import Providers from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import db from '@/lib/db'

const options = {
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers({
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
      ) {
        if (!credentials) return null
        const user = await getUserByEmail(credentials.email)
        if (user && (await compare(credentials.password, user.password))) {
          return user
        }
        return null
      },
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      name: 'Credentials',
    }),
  ],
  session: {
    jwt: true,
  },
}

export default (req, res) => NextAuth(req, res, options)

async function getUserByEmail(email: string) {
  const user = await db('users').where('email', email).first()
  return user
}
