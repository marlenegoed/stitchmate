'use client'

import {motion} from 'framer-motion'
import Link from 'next/link';
import {SignInButton, useUser} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';
import {kalam} from '@/components/ui/fonts';


export default function Intro() {
 const user = useUser()

return ( <>
<section className="max-w-screen-lg flex justify-center flex-col items-center mx-auto text-center h-full">
 
  <motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}>
  
  <h4 className={`${kalam.className} font-bold text-slate-800 lg:text-8xl md:text-7xl sm:text-6xl text-5xl`}>hey there, knitters, crocheters, and yarn addicts!</h4>
  <p className={` text-slate-800 opacity-70 text-xl sm:text-2xl lg:text-3xl font-semibold mt-10 mb-12 px-12`}>stitchmate keeps track while you stay focused on your craft.</p>

  <div className='grid grid-cols-2 gap-6 mx-auto w-80 my-6'>
  <SignInButton mode="modal">
      <motion.div 
      className='col-span-2 sm:col-span-1 '
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }} >
      <Button size='lg' className='w-8/12 sm:w-full bg-black hover:bg-black'>Sign In</Button>
      </motion.div>
    </SignInButton>

    <Link href='/demo' className='col-span-2 sm:col-span-1'>  
    <motion.div 
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }} >
      <Button size='lg' className='w-8/12 sm:w-full bg-sienna-400/90 hover:bg-sienna-400/90'>Try demo</Button>
      </motion.div>
    </Link>
  </div>
</motion.div>
</section>
<footer className='text-center'> 
<motion.div 
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}>
  <Link href='/about' className='cursor-pointer font-semibold text-xl mt-auto'>?</Link>
  </motion.div>
</footer>
</> )


}