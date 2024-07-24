import logo from '../../../public/stitchmate_logo.svg'
import {SignInButton} from '@clerk/nextjs';
import {Button} from './button';
import Image from 'next/image'


export default function LandingPageHeader() {

  return (
    <nav className="flex flex-row justify-between w-full sm:px-4">
      <div className='flex flex-row gap-1 w-28 sm:w-36'>
        <Image src={logo} alt='' />
        <div className="w-fit border border-sienna-300 h-fit px-1 rounded-full flex justify-center items-center"><p className="text-sienna-300 text-xs font-semibold">beta</p></div>
      </div>
      <div className='flex flex-row h-full items-center gap-6'>

        <SignInButton mode="modal">
          <Button className='h-8 min-w-24 sm:h-12 bg-black hover:bg-black text-base md:text-lg'>Sign In</Button>
        </SignInButton>
      </div>
    </nav>
  )
}
