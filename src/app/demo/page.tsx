import {redirect} from 'next/navigation'
import {Counter} from './counter'
import {auth} from "@clerk/nextjs/server";

export default function Page() {
  if (auth().userId) redirect('/projects')

  return <Counter />
}