import {notoSans} from '@/components/ui/fonts';
import {LogoSmall} from '@/components/ui/logo';
import Link from 'next/link';
import {FaGithub} from "react-icons/fa";


export default function Page() {
  return (
    <>
      <section className={` ${notoSans.className} antialiased max-w-96 opacity-70 space-y-8 flex flex-col items-center text-center p-6 justify-center h-full`}>
        <Link className='hover:opacity-80 transform-opacity' href='/' >
          <LogoSmall className='h-6' />
        </Link >
        <p>stitchmate.xyz is an open source <br></br> hobby project born out of my own passion for knitting.</p>
        <p>If you have questions or improvements don&apos;t hestitate to contact <a className='whitespace-nowrap underline underline-offset-4 cursor-pointer hover:opacity-80 transform-opacity' href='mailto:stitchmate.contact@gmail.com'>stitchmate.contact@gmail.com</a></p>
        <p>source code:
          <a className='w-full flex justify-center p-4 hover:opacity-80 transform-opacity' href='https://github.com/marlenegoed/stitchmate'><FaGithub size={24} /></a>
        </p>
      </section >


      < footer className={`${notoSans.className} opacity-70 p-6 antialiased flex flex-col max-w-96 items-center text-center justify-center mb-4 space-y-8`} >

        <span className=' text-sm'>
          <p>attributions:</p>
          <a href="https://www.vecteezy.com/free-vector/blob">Blob Vectors by Vecteezy</a>
        </span>

        <Link className=' hover:opacity-80 transform-opacity' href='/'>
          <p className='underline underline-offset-4 font-semibold text-sm'>home</p>
        </Link>
      </footer >

    </>
  )
}