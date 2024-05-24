import {SignIn} from "@clerk/nextjs";
import landingImg from '@/../public/sm_landing_blobs.svg'

export default function Page() {
  return (
    <main className="flex items-center justify-center h-full bg-sienna-100/50 bg-no-repeat bg-cover" style={{backgroundImage: `url(${landingImg.src})`}}>

      <SignIn path="/sign-in" />
    </main>
  )
}


