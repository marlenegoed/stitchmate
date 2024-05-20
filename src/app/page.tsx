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
      <main className={`flex flex-col justify-center items-center w-full h-full space-y-6`}>
        <h1 className={` ${shortStack.className} antialiased text-sienna-800`}>Welcome knitters!</h1>
        <Logo />
        <h3 className={` ${shortStack.className} antialiased max-w-96 text-center text-slate-700 pt-2`}>your all-in-one app to stay organized and focused on your craft. We make counting and tracking a breeze. 100% free!</h3>

        <div className='grid grid-cols-2 gap-6 py-4'>

          <Link href='/demo'>
            <Button className='text-lg bg-inherit border-2 border-sienna-400 text-sienna-400 hover:bg-inherit hover:text-sienna-500 hover:border-sienna-500 transform-colors py-3 px-8'>
              Try out first
            </Button>
          </Link>

          <div className='border-2 border-slate-700 rounded-full text-center py-2 px-8 text-lg font-semibold opacity-80 hover:opacity-100 transform-opacity cursor-pointer'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn >
              <Link href='/projects'>My Projects</Link>
            </SignedIn>
          </div>

        </div>
      </main>
      <footer className='flex w-full justify-center pb-10'>
        <Link href='/about'>
          <p className='underline underline-offset-4 font-semibold text-slate-700'>?</p>
        </Link>
      </footer>
    </>
  )
}