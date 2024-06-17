
import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";
import BetaBanner from '@/components/ui/beta-banner';
import Intro from '@/components/ui/intro'

export default function Page() {

  if (auth().userId) redirect('/projects')

  return (
    <>
      <BetaBanner />
      <div className='h-dvh flex flex-col justify-between items-center py-6 px-8 sm:px-12'>
       <Intro />
      </div>
      </>
  )
}
