'use client';

import Image from 'next/image'
import Link from 'next/link';
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
  useAuth,
} from '@clerk/nextjs'
import logo from '../../../public/stitchmate_logo.svg'
import {Button} from './button';
import {HiSquares2X2} from 'react-icons/hi2';



export default function Nav() {

  return (
    <nav className='flex justify-between items-center py-4 px-6 w-full mx-auto'>
      <ProjectPageButton />
      <Logo />
      <SignedIn>
        <UserMenu />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" ><span className='font-semibold cursor-pointer bg-inherit text-gray-800 hover:text-gray-600 hover:transition-colors pr-4'>Sign in</span></SignInButton>
      </SignedOut>
    </nav>
  );
}

function Logo() {
  const {isSignedIn} = useAuth()

  const url = isSignedIn ? '/projects' : '/'
  return (
    <Link href={url}>
      <div className='w-24'>
        <Image src={logo} alt='' style={{objectFit: "contain"}} />
      </div>
    </Link>
  )
}


function ProjectPageButton() {
  const {isSignedIn} = useAuth()

  return (
    <>
      {isSignedIn ?
        <Link href='/projects'>
          <HiSquares2X2 className='text-gray-800 hover:text-neutral-600' size={24} />
        </Link>
        :
        <Link className="hover:opacity-80" href="/">
          <Button className="bg-sienna-100 text-sienna-400 hover:bg-sienna-100 hover:text-sienna-400" size="sm">demo</Button>
        </Link>
      }
    </>
  )
}

export function UserMenu() {
  const {user} = useUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase()

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback className='hover:bg-neutral-300/70 transition hover:transition-colors' >{userEmail}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-fit p-6 rounded-lg shadow-sm flex flex-col gap-2 bg-white'>
          <Link href='/user-profile'><p className='rounded h-fit w-fit px-6 py-2 hover:bg-neutral-100'>Account</p></Link>
          <div className='rounded h-fit w-fit px-6 py-2  hover:bg-neutral-100'>
            <SignOutButton redirectUrl='/' />
          </div>
          <Link href='/about'><p className='rounded h-fit w-fit px-6 py-2 hover:bg-neutral-100'>About</p></Link>
        </PopoverContent>
      </Popover>
    </>
  )
}
