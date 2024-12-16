'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'
import { useMemo } from 'react'
import Listing from '../modals/Listing/Listing'

export default function Name() {
  const router = useRouter()
  const session = useSession()
  const { setTheme } = useTheme()

  const initial = useMemo(() => {
    return session.data?.user?.name?.charAt(0)
  }, [session.data?.user?.name])

  return (
    <div className="w-full p-4 flex">
      <button
        title="Logo"
        className="cursor-pointer"
        onClick={() => router.push('/')}
      >
        <Image
          className="dark:hidden block"
          src="/LogoLight.png"
          alt="logo"
          width={200}
          height={200}
        />
        <Image
          className="hidden dark:block"
          src="/LogoDark.png"
          alt="logo"
          width={200}
          height={200}
        />
      </button>
      <div className="ml-auto flex items-center">
        <div className="mr-2">
          <Listing type="new" />
        </div>
        <div className="mr-2">
          <ThemeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.data?.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
