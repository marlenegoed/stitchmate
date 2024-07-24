import logo from '../../../public/stitchmate_logo.svg'
import {SignInButton} from '@clerk/nextjs';
import {Button} from './button';
import Image from 'next/image'
import Tag from './tag';


export default function LandingPageHeader() {

  return (
    <nav className="flex flex-row justify-between w-full sm:px-4">
      <div className='flex flex-row gap-1 w-28 sm:w-36'>
        <Image src={logo} alt='' />
        <Tag>beta</Tag>
      </div>
      <div className='flex flex-row h-full items-center gap-6'>

        <SignInButton mode="modal">
          <Button className='h-8 min-w-24 sm:h-12 bg-black hover:bg-black text-base md:text-lg'>Sign In</Button>
        </SignInButton>
      </div>
    </nav>
  )
}
