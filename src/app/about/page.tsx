import {Button} from '@/components/ui/button';
import {notoSans} from '@/components/ui/fonts';
import Link from 'next/link';
import {FaGithub} from "react-icons/fa";


export default function Page() {
  return (
    <>
      <section className={`${notoSans.className} opacity-80 antialiased space-y-8 flex flex-col text-left p-6 text-3xl h-full font-medium leading-normal max-w-screen-lg`}>
        <p>
          <span className='opacity-60 cursor-pointer'><Link href="/">stitchmate.xyz </Link></span>is an ongoing hobby project born out of my passion for knitting. If you have questions or improvements don&apos;t hestitate to <span><a className='whitespace-nowrap cursor-pointer opacity-60' href='mailto:stitchmate.contact@gmail.com'>contact me.</a></span>
        </p>
        <p>
          Find my source code on <a href="https://github.com/marlenegoed/stitchmate" className="opacity-60 whitespace-nowrap">github <FaGithub className='inline' size={20} />. </a>Attributions: <a href="https://www.vecteezy.com/free-vector/blob" className="opacity-60">Blob Vectors by Vecteezy.</a>
        </p>


        <Link href='/' className='self-start'>
          <Button size="lg" variant="outline" className="border-black hover:bg-black hover:border-black text-black hover:text-white transition hover:transition-all hover:duration-700 duration-700">
            back home
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-4">
              <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </Button>
        </Link>
      </section >


    </>
  )
}