import {Button} from '@/components/ui/button';
import {notoSans} from '@/components/ui/fonts';
import Link from 'next/link';
import {FaGithub} from "react-icons/fa";
import {HiHeart} from "react-icons/hi2";



export default function Page() {
  return (
    <>
      <section className={`${notoSans.className} opacity-80 antialiased space-y-8 flex flex-col text-left p-6 text-3xl h-full font-medium leading-normal max-w-screen-lg`}>
        <p>I&apos;m Marlene. I am a software developer and enthusiastic knitter. <span className='text-neutral-500 cursor-pointer'><Link href="/">stitchmate.xyz </Link></span>is an ongoing self driven project that allows me to fuse my passion for knitting with my skills as a creative  developer. If you have questions or improvements don&apos;t hestitate to <span><a className='whitespace-nowrap cursor-pointer text-neutral-500' href='mailto:stitchmate.contact@gmail.com'>contact me.</a></span>
        </p>

        <div className="flex flex-row items-center">
          <p> Happy Making! </p>
          <HiHeart />
        </div>

        <p className="text-xl">
          Find my source code on <a href="https://github.com/marlenegoed/stitchmate" className="text-neutral-500 whitespace-nowrap">github <FaGithub className='inline -mt-1' size={24} /> <br></br> </a>Attributions: <a href="https://www.vecteezy.com/free-vector/blob" className="text-neutral-500">Blob Vectors by Vecteezy.</a>
        </p>


        <Link href='/' className='self-start'>
          <Button size="lg" variant="outline" className="border-black hover:bg-black hover:border-black text-black hover:text-white transition hover:transition-all hover:duration-700 duration-700">
            bring me back
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-4">
              <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </Button>
        </Link>
      </section >


    </>
  )
}