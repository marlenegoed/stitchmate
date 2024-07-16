'use client'

import {motion} from 'framer-motion'
import Link from 'next/link';
import {SignInButton} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';
import Image from 'next/image'
import logo from '../../../public/stitchmate_logo.svg'
import BackgroundBlob from './background-blobs';
import arrow_loop from '../../../public/arrow_loop.svg'


export default function Intro() {

  return (<>
    <LandingPageHeader />

    <section className="max-w-screen-xl sm:px-4 xl:px-0 justify-center flex items-start mx-auto h-full">
      <motion.div
        className='absolute -z-10 top-40 sm:top-28 -left-12'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.8,
          delay: 0.5,
          circIn: [0, 0.71, 0.2, 1.01],
        }}
      >
        <BackgroundBlob stroke={false} blobIndex={0} className="fill-goldenrod-300 w-72 sm:w-[420px] h-auto" />
      </motion.div>

      <motion.div
        className='flex justify-center flex-col my-auto items-start'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>

        <div>
          <h4 className={`font-semibold text-gray-800 lg:text-6xl lg:leading-relaxed md:text-5xl md:leading-relaxed sm:text-4xl sm:leading-relaxed text-3xl leading-normal max-w-8/12 relative `}>hey there, knitters, crocheters, <br /> and yarn addicts!</h4>
          <p className="text-gray-800 font-medium text-xl sm:text-2xl lg:text-3xl mt-10">stitchmate keeps track while you stay focused on your craft.</p>
        </div>


        <div className="flex flex-row items-center gap-6 w-full mt-2">
          <div className='max-w-1/3'>
            <Image src={arrow_loop} alt='' />
          </div>
          <Link href='/demo'>
            <motion.div
              whileHover={{scale: 1.1}}
              transition={{type: "spring", stiffness: 400, damping: 10}}
            >
              <Button size="lg" className='font-medium bg-transparent border-2 border-dashed border-sienna-400 hover:bg-transparent text-sienna-400 text-xl sm:text-2xl px-6 py-6 sm:px-10 sm:py-8'>Try demo</Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </section >

  </>)
}


function LandingPageHeader() {

  return (
    <nav className="flex flex-row justify-between w-full sm:px-4">
      <div className='flex flex-row gap-1 w-28 sm:w-36'>
        <Image src={logo} alt='' />
        <div className="w-fit border border-sienna-300 h-fit px-1 rounded-full flex justify-center items-center"><p className="text-sienna-300 text-xs font-semibold">beta</p></div>
      </div>
      <div className='flex flex-row h-full items-center gap-6'>
        <Link href='/about' className='cursor-pointer '>?</Link>
        <SignInButton mode="modal">
          <Button className='h-8 min-w-24 sm:h-12 bg-black hover:bg-black text-base md:text-lg'>Sign In</Button>
        </SignInButton>
      </div>

    </nav>
  )
}

function ArrowCircle() {

  return (

    <svg width="100%" height="100%" viewBox="0 0 1564 739" version="1.1" className="fill-rule:evenodd clip-rule:evenodd stroke-linecap:square stroke-linejoin:round stroke-miterlimit:1.5"><path d="M8.839,253.614c-0,-0 484.148,-89.379 809.665,24.453c233.384,81.614 347.3,424.868 -96.344,449.365c-697.242,38.5 -383.942,-471.469 245.967,-536.649c401.88,-41.585 555.219,-24.889 555.219,-24.889" className="fill:none stroke:#faaa75 stroke-width:12.5px stroke-dasharray:12.5,25,0,0;" /><path d="M1370.1,6.25c0,0 135.106,124.612 185.264,155.386c19.919,12.221 -143.947,76.879 -212.995,110.446" className="fill:none stroke:#faaa75 stroke-width:12.5px stroke-linecap:round stroke-dasharray:12.5,25,0,0" /></svg>
  )

}
