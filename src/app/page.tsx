
import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";
import Intro from '@/components/ui/intro'


export default function Page() {

  if (auth().userId) redirect('/projects')

  return (
    <>
      <div className='h-dvh flex flex-col justify-between items-center bg-dotted-spacing-6 bg-dotted-gray-300'>
        <Intro />
      </div>
    </>
  )
}
