import {Button} from '@/components/ui/button';
import {shortStack} from '@/components/ui/fonts';
import Logo from '@/components/ui/logo';

import {
  SignInButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {auth} from "@clerk/nextjs/server";


export default function Page() {
  if (auth().userId) redirect('/projects')

  return (
    <>
      <main className={`p-10 flex flex-col justify-center items-center w-full h-full space-y-10 bg-neutral-50 text-base sm:text-lg`}>
        <h1 className={` ${shortStack.className} antialiased text-slate-700`}>Welcome knitters!</h1>
        <Logo className='h-10 fill-slate-700' />
        <h3 className={` ${shortStack.className} antialiased max-w-96 sm:w-1/3 text-center text-slate-800 pt-2`}>stitchmate keeps track while you stay focused on your craft.<br /><br />We make counting a breeze.<br />100% free!</h3>

        <div className='grid grid-cols-2 gap-4'>

          <Link href='/demo'>
            <Button className='text-sm sm:text-base bg-inherit border-2 border-sienna-300 text-sienna-300 hover:bg-inherit hover:text-sienna-400/70 hover:border-sienna-400/70 transform-colors py-3 px-8'>
              Try out first
            </Button>
          </Link>

          <div className='border-2 border-slate-700 rounded-full text-center text-sm sm:text-base flex justify-center items-center font-semibold opacity-80 hover:opacity-100 transform-opacity cursor-pointer'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn >
              <Link href='/projects'>My Projects</Link>
            </SignedIn>
          </div>

        </div >
      </main>
      <footer className='flex w-full justify-center pb-10 bg-neutral-50'>
        <Link href='/about'>
          <p className='underline underline-offset-4 font-semibold text-slate-700'>?</p>
        </Link>
      </footer>
    </>
  )
}