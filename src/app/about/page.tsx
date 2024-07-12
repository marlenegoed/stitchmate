'use client'

import {Button} from '@/components/ui/button';
import {FaGithub} from "react-icons/fa";
import {HiHeart} from "react-icons/hi2";
import {FaRavelry} from "react-icons/fa";
import {FaInstagram} from "react-icons/fa";
import {useRouter} from 'next/navigation'


export default function Page() {

  const router = useRouter()

  return (
    <>
      <section className={`text-gray-900 flex flex-col text-left p-6 text-2xl sm:text-3xl h-full font-medium max-w-screen-lg mx-auto space-y-10`}>
        <p className='leading-relaxed'>I&apos;m Marlene, software developer and enthusiastic knitter. Stitchmate is a personal project that fuses my passion for knitting with my skills as a creative developer.
        </p>
        <hr />
        <p className='text-xl sm:text-2xl leading-relaxed'>For questions and improvements <span><a className='hover:opacity-80 whitespace-nowrap cursor-pointer font-semibold' href='mailto:stitchmate.contact@gmail.com'>contact me.</a></span> </p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-20">

          <p className="text-base sm:text-lg leading-relaxed">
            Find my source code on <a href="https://github.com/marlenegoed/stitchmate" className="font-semibold whitespace-nowrap">github
              <FaGithub className='inline -mt-1 ml-2' size={24} /></a>
          </p>

          <p className="text-base sm:text-lg leading-relaxed">
            My crafting related social accounts:
            <a href='https://www.ravelry.com/people/craftystitchess'><FaRavelry size={24} className='inline -mt-1 ml-2' /></a>
            <a href='https://www.instagram.com/crafty_stitchess'><FaInstagram size={24} className='inline whitespace-nowrap -mt-1 ml-2' /></a>
          </p>

          <p className="text-base sm:text-lg">
            Attributions: <a href="https://www.vecteezy.com/free-vector/blob">Blob Vectors by Vecteezy</a>
          </p>

        </div>

        <div className='sm:pt-10 flex flex-col sm:flex-row w-full justify-between items-start sm:items-center sm:gap-0 gap-4 self-end'>

          <div className="sm:text-3xl text-lg flex flex-row items-center gap-2">
            <p>Happy Making</p>
            <HiHeart size={24} className='mt-1' />
          </div>

          <Button size="lg" variant="outline" className="w-fit border-black hover:bg-black hover:border-black text-black hover:text-white transition hover:transition-all hover:duration-700 duration-700" onClick={() => router.back()}>
            go back
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-4">
              <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </Button>
        </div>
      </section >

    </>
  )
}