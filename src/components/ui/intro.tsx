'use client'

import {motion} from 'framer-motion'
import Link from 'next/link';
import {SignInButton, useUser} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';
import {kalam} from '@/components/ui/fonts';
import Image from 'next/image'
import logo from '../../../public/stitchmate_logo.svg'
import arrow_curve from '../../../public/arrow_curve.svg'
import {HiHeart} from "react-icons/hi2";


import BackgroundBlob from './background-blobs';



export default function Intro() {
  const user = useUser()

  return (<>
    <BackgroundBlob stroke={false} blobIndex={5} className="fill-prussian-200 absolute -top-36 -left-16 w-72 h-auto" />
    <LandingPageHeader />
    <section className="max-w-screen-lg justify-center flex flex-col items-center mx-auto h-full">

      <motion.div
        className='flex flex-col h-full items-start justify-center'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>

        <div>
          <h4 className={`font-medium text-gray-800 text-6xl max-w-8/12 leading-relaxed`}>hey there, <span className="border-b-4 border-b-sienna-400">knitters,</span><span className="whitespace-nowrap"> cr<span ><HiHeart className='inline text-goldenrod-300 py-1' /></span>cheters,</span> and <span className='border border-dashed rounded-lg border-prussian-300 py-1 px-2'>yarn</span> addicts!</h4>
          <p className={` text-gray-800 text-xl sm:text-2xl lg:text-3xl mt-10 mb-12`}>stitchmate keeps track while you stay focused on your craft.</p>
        </div>

        <div className="flex flex-row">
          {/* <Image src={arrow_curve} alt='' width={120} /> */}
          <Link href='/demo' className=' mt-auto'>
            <motion.div
              whileHover={{scale: 1.1}}
              transition={{type: "spring", stiffness: 400, damping: 10}} >
              <Button size='lg' className='font-medium bg-transparent border border-dashed border-sienna-400 hover:bg-transparent text-sienna-400'>Try demo</Button>
            </motion.div>
          </Link>

          {/* <ArrowCircle /> */}
        </div>

      </motion.div>
    </section>

  </>)
}


function LandingPageHeader() {

  return (
    <nav className="flex flex-row justify-between w-full relativ z-20">
      <div className='flex flex-row gap-1'>
        <Image src={logo} alt='' className={{objectFit: "contain"}} width={120} />
        <div className="w-fit border border-white h-fit px-1 rounded-full flex justify-center items-center"><p className="text-white text-xs font-semibold">beta</p></div>
      </div>
      <div className='flex flex-row h-full items-center gap-6'>
        <Link href='/about' className='cursor-pointer text-xl'>?</Link>
        <SignInButton mode="modal">
          <Button className='bg-black hover:bg-black'>Sign In</Button>
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