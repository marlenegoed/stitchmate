import {Button} from '@/components/ui/button';
import {shortStack} from '@/components/ui/fonts';
import Logo from '@/components/ui/logo';
import Link from 'next/link';
import {FaGithub} from "react-icons/fa";


export default function Page() {
  return (
    <>
      <main className={`flex flex-col justify-center items-center w-full h-full space-y-6`}>
        <h1 className={` ${shortStack.className} antialiased text-sienna-800`}>about</h1>
        <Logo />
        <section className={` ${shortStack.className} antialiased max-w-96 text-slate-700 pt-2 space-y-4 flex flex-col items-center text-center gap-4`}>
          <p>stitchmate is an open source hobby project born out of my own passion for knitting.</p>
          <p>If you have questions or improvements don't hestitate to contact <a className='whitespace-nowrap underline underline-offset-4 cursor-pointer hover:opacity-70 transform-opacity' href='mailto:stitchmate.contact@gmail.com'>stitchmate.contact@gmail.com</a></p>
          <p>source code:
            <a className='w-full flex justify-center p-4 hover:opacity-80 transform-opacity' href='https://github.com/marlenegoed/stitchmate'><FaGithub size={24} /></a>
          </p>
          <span className='opacity-60'>
            <p>credits to:</p>
            <p>someone for the blobs<br />someone else for the sounds</p>
          </span>
        </section>
      </main>

      <footer className='flex w-full justify-center pb-10'>
        <Link href='/'>
          <p className='underline underline-offset-4 font-semibold text-slate-700'>home</p>
        </Link>
      </footer>
  
    </>
  )
}