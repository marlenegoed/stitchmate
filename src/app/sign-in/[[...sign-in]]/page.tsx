import {SignIn} from "@clerk/nextjs";
import {PageBackground} from '@/components/ui/page-background';

export default function Page() {
  return (
    <PageBackground>
      <SignIn path="/sign-in" />
    </PageBackground>
  )
}