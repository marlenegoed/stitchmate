import {SignUp} from "@clerk/nextjs";
import {PageBackground} from '@/components/ui/page-background';

export default function Page() {
  return (
    <PageBackground>
      <SignUp path="/sign-up" />
    </PageBackground>
  )
}


