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
      <section className={`text-gray-900 flex flex-col text-left p-6 text-3xl h-full font-medium leading-normal max-w-screen-lg mx-auto space-y-10`}>
        <p>I&apos;m Marlene, software developer and enthusiastic knitter. Stitchmate is a personal project that fuses my passion for knitting with my skills as a creative developer.
        </p>
        <hr />
        <p className='text-2xl'>For questions and improvements <span><a className='hover:opacity-80 whitespace-nowrap cursor-pointer font-semibold' href='mailto:stitchmate.contact@gmail.com'>contact me.</a></span> </p>

        <div className="grid grid-cols-3 gap-20">
          <p className="text-lg">
            Find my source code on <a href="https://github.com/marlenegoed/stitchmate" className="text-neutral-500 whitespace-nowrap">github
              <FaGithub className='inline -mt-1' size={24} /></a>
          </p>

          <p className="text-xl">
            my crafting related social accounts:
            <FaRavelry />
            <FaInstagram />
          </p>

          <p className="text-xl">
            Attributions: <a href="https://www.vecteezy.com/free-vector/blob" className="text-neutral-500">Blob Vectors by Vecteezy.</a>
          </p>

        </div>

        <div className='flex flex-row w-full justify-between'>

          <div className="flex flex-row items-center gap-2">
            <p> Happy Making </p>
            <HiHeart />
          </div>

          <Button size="lg" variant="outline" className="w-fit border-black hover:bg-black hover:border-black text-black hover:text-white transition hover:transition-all hover:duration-700 duration-700" onClick={() => router.back()}>
            go back
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-4">
              <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </Button>
        </div>
      </section >

    </>
  )
}