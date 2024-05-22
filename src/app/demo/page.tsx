import {redirect} from 'next/navigation'
import {DemoCounterPage} from './demo-counter-page'
import {auth} from "@clerk/nextjs/server";

export default function Page() {
  if (auth().userId) redirect('/projects')

  return <DemoCounterPage />
}