import {Button} from '@/components/ui/button';

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton
} from '@clerk/nextjs'

export default function Page() {
  return (
    <>
      <h1>This is going to be the landing page</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn >
        <UserButton />
        <SignOutButton />
      </SignedIn>

      <Button>Try demo</Button>
    </>
  )
}