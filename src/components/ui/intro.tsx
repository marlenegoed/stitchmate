'use client'

import {motion} from 'framer-motion'
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import Image from 'next/image'
import knit12 from '../../../public/knit12.png'
import LandingPageHeader from './landingpage-header';
import LandingPageFooter from './landingpage-footer';
import {borel} from './fonts';



export default function Intro() {

  return (<>
    <LandingPageHeader />

    <section className="flex max-w-screen-xl sm:px-4 xl:px-0 justify-center items-center h-full mb-10">

      <motion.div
        className='flex justify-center flex-col my-auto items-center gap-10'
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>

        <Image src={knit12} alt='' height={70} />

        <h1 className={`${borel.className} text-center font-semibold text-gray-800 lg:text-5xl lg:leading-relaxed md:text-4xl md:leading-relaxed sm:text-4xl sm:leading-relaxed text-3xl leading-normal max-w-8/12 relative `}>hey there, knitters, crocheters, <br /> and yarn addicts!</h1>

        <p className="text-gray-800 font-normal text-xl sm:text-2xl lg:text-3xl -mt-6 text-center">
          stitchmate keeps track while you focus on your craft.
        </p>

          <Link href='/demo' className=''>
            <motion.div
              whileHover={{scale: 1.1}}
              transition={{type: "spring", stiffness: 400, damping: 10}}
            >
              <Button className='bg-sienna-400/90 h-8 min-w-24 sm:h-12 text-base md:text-lg self-center hover:bg-sienna-400'>try out demo</Button>
            </motion.div>
          </Link>
      </motion.div>
    </section >

    <LandingPageFooter />
  </>)
}

