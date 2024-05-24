import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";

export default async function Page() {
  if (auth().userId) redirect('/projects')

  return "Landing page"
}