import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";
import landingImg from '@/../public/sm_landing_blobs.svg'
import Title from '@/components/ui/title';
import Link from 'next/link';
import {SignInButton} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';

export default function Page() {
  if (auth().userId) redirect('/projects')

  return (
    <main className="flex flex-col items-center justify-center h-full bg-sienna-100/50 bg-no-repeat bg-cover" style={{backgroundImage: `url(${landingImg.src})`}}>
      <Title variant='center'>Stitchmate</Title>

      <section className='flex gap-4 justify-center items-center'>
        <SignInButton>
          <Button variant='outline'>
            Sign In
          </Button>
        </SignInButton>
        
        <Link href='/demo'>
          <Button>Try it out</Button>
        </Link>
      </section>
    </main>
  )
}
