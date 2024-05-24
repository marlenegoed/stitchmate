import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";
import Title from '@/components/ui/title';
import Link from 'next/link';
import {SignInButton} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';
import {PageBackground} from '@/components/ui/page-background';
import {kalam, shortStack} from '@/components/ui/fonts';

export default function Page() {
  if (auth().userId) redirect('/projects')

  return (
    <PageBackground className="flex-col">

      <div className='bg-white/80 shadow rounded-lg p-8 pb-4 max-w-96 text-center m-10'>
        <p className={`${shortStack.className} text-slate-800 mb-4`}>welcome knitters</p>
        <h4 className={`${shortStack.className} text-xl font-semibold text-slate-800 mb-8`}>stitchmate keeps track while you stay focused on your craft.</h4>
        <section className='grid grid-cols-2 gap-4 justify-center items-center w-full mb-4'>
          <SignInButton mode="modal">
            <Button variant='outline' className='col-span-2 sm:col-span-1'>Sign In</Button>
          </SignInButton>

          <Link href='/demo' className='col-span-2 sm:col-span-1 '>
            <Button variant='outline' className='text-sienna-400/80 border-sienna-400/80 w-full hover:text-sienna-500 hover:border-sienna-500 hover:transition-colors'>Try out first</Button>
          </Link>
        </section>

        <Link href='/about' className='text-neutral-500/70'>
          <Button size='icon' variant='ghost'>?</Button>
        </Link>
      </div>
    </PageBackground >
  )
}
