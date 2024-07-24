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
import {HiOutlineSquares2X2} from 'react-icons/hi2';
import Tag from './tag';
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import ZustandHydration from '../store/zustand-hydration';
import {ToggleSound} from '../ui/toggle-sound-button';
import {useUserSettingsStore} from '@/providers/user-settings-store-provider';
import {toggleSound} from '@/database/queries/queries';





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
          <HiOutlineSquares2X2 className='text-gray-800 hover:text-neutral-600' size={24} />
        </Link>
        :
        <Link className="hover:opacity-80" href="/">
          <Tag className="hover:bg-sienna-100 hover:text-sienna-400">demo</Tag>
        </Link>
      }
    </>
  )
}

export function UserMenu() {
  const {storeSound, toggleStoreSound} = useUserSettingsStore(state => state)
  const {user} = useUser()
  const userEmail = user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase()

  async function handleSoundToggle() {
    toggleStoreSound()
    if (user) {
      await toggleSound(user.id)
    }
  }

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback className='hover:bg-neutral-300/70 transition hover:transition-colors' >{userEmail}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className='w-fit rounded-lg shadow-sm flex flex-col bg-white p-0 m-4 mt-2'>
          <div className='m-2 w-24 text-left'>
            <Link href='/user-profile'><p className='rounded h-fit px-3 py-2 hover:bg-neutral-100'>Account</p></Link>
            <Link href='/about'><p className='rounded h-fit px-3 py-2 hover:bg-neutral-100'>About</p></Link>
          </div>
          <div className='border-t flex items-center justify-between px-3 py-2'>
            <ZustandHydration fallback={<ToggleSound sound={false} />}>
              <ToggleSound sound={storeSound} onToggle={handleSoundToggle} />
            </ZustandHydration>
            <SignOutButton><Button size='icon' variant='ghost'><HiArrowRightOnRectangle size={20} /></Button></SignOutButton>
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
