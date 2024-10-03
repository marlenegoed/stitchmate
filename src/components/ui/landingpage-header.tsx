import logo from '../../../public/stitchmate_logo.svg'
import {SignInButton} from '@clerk/nextjs';
import {Button} from './button';
import Image from 'next/image'
import Tag from './tag';
import {borel} from './fonts';


export default function LandingPageHeader() {

  return (
    <nav className="flex flex-row justify-between w-full p-6">
      <div className='flex flex-row gap-1 w-28 sm:w-36 items-center'>
        <p className={`${borel.className} h-4 text-xl`}>stitchmate</p>
        {/* <Image src={logo} alt='' /> */}
        <Tag className='mb-6'>beta</Tag>
      </div>
      <div className='flex flex-row h-full items-center gap-6'>

        <SignInButton mode="modal">
          <Button className='h-8 min-w-24 sm:h-12 bg-black hover:bg-black/80 text-base md:text-lg'>Sign In</Button>
        </SignInButton>
      </div>
    </nav>
  )
}
