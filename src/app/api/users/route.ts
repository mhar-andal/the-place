import { NextResponse } from 'next/server'
import db from '@/db'
export async function GET(request: Request) {
  const users = db('users').select('*')
  console.log(users)
  return NextResponse.json({ message: 'Hello, world!' })
}
