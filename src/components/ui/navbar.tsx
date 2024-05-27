'use client';

import {LogoSmall} from '@/components/ui/logo';
import Link from 'next/link';
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {Avatar, AvatarFallback} from './avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {useUser} from "@clerk/clerk-react";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  useAuth
} from '@clerk/nextjs'
import {Button} from './button';
import {usePathname} from 'next/navigation';

export function UserMenu() {
  const {user} = useUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase()

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback className='hover:text-sienna-400 hover:transition-colors' >{userEmail}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-6 rounded-lg shadow-sm flex flex-col gap-4 bg-white'>
          <div className='rounded h-fit w-fit px-6 py-2  hover:bg-neutral-100'>
            <SignOutButton redirectUrl='/' />
          </div>
          <Link href='/about'><p className='rounded h-fit w-fit px-6 py-2 hover:bg-neutral-100'>About</p></Link>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default function Nav() {

  const pathname = usePathname()
  const isDemo = pathname.startsWith('/demo')

  return (
    <nav className='flex justify-between px-6 py-3 w-full max-w-6xl mx-auto'>
      <HomeLink />
      <div className='flex items-center gap-4 flex-row'>

        {!isDemo && <Link href='/projects' className='hover:bg-slate-100 h-10 w-10 flex justify-center items-center rounded-full'>
          <HiOutlineSquares2X2 className='text-slate-600' size={24} />
        </Link>}

        <SignedIn>
          <UserMenu />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal" ><span className='font-semibold text-sm cursor-pointer bg-inherit text-sienna-400/70 hover:text-sienna-400/90 transition-colors'>Sign in</span></SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

function HomeLink() {
  const {isSignedIn} = useAuth()

  const url = isSignedIn ? '/projects' : '/'
  return (
    <Link href={url}>
      <div className='mt-1'>
        <LogoSmall className={'fill-neutral-200 h-8 w-8 hover:fill-sienna-200 transition-colors'} />
      </div>
    </Link>
  )
}
