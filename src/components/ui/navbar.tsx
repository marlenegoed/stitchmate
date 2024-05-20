'use client';

import Logo from '@/components/ui/logo';
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
  useSignIn,
  useAuth
} from '@clerk/nextjs'
import {Button} from './button';
import {usePathname} from 'next/navigation';




export function UserMenu() {

  const {user} = useUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase()

  return (

    <SignedIn >
      <Popover>
        <PopoverTrigger>
          <Avatar >
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>{userEmail}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-6 rounded-lg shadow-sm flex flex-row gap-4 items-center bg-white'>
          <div className='border-2 rounded-full h-fit w-fit px-6 py-2 border-slate-800 font-semibold'>

            <SignOutButton />
          </div>
          <Link href=''><Button size='icon' variant='ghost' className='text-lg'>?</Button></Link>
        </PopoverContent>
      </Popover>
    </SignedIn>
  )

}

export default function Nav() {
  return (
    <>
      <nav className='flex justify-between px-4 py-3'>
        <HomeLink />
        <div className='flex items-center gap-6 flex-row'>
          {/* <HiMiniMoon className='text-slate-800' size={24} /> */}
          <Link href='/projects'>
            {/* <Button size='icon' variant='outline' className='w-10 h-10 border border-slate-800'> */}
            <HiOutlineSquares2X2 className='text-slate-800' size={24} />
            {/* </Button> */}
          </Link>
          <UserMenu />
          <SignedOut>
            <SignInButton />
          </SignedOut>

        </div>
        {/* <Menu /> */}
      </nav>
      {/* <hr className='border-gray-300' /> */}
    </>
  );
}

function HomeLink() {
  const {isSignedIn} = useAuth()

  const url = isSignedIn ? '/projects' : '/'
  return (
    <Link href={url}>
      <Logo />
    </Link>

  )
}
