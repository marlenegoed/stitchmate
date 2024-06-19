import {redirect} from 'next/navigation'
import {auth} from "@clerk/nextjs/server";
import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';
import {DemoStoreProvider} from '@/providers/demo-store-provider';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';


export default function DemoLayout({children}: Readonly<{children: React.ReactNode}>) {
  if (auth().userId) redirect('/projects')

  return (
    <>
      <Nav />
      <CounterStoreProvider>
        <UserSettingsStoreProvider>
          <DemoStoreProvider>
            <main className='min-h-[calc(100dvh_-_4rem)] flex flex-col mx-auto items-center w-full bg-neutral-100'>
              {children}
            </main>
          </DemoStoreProvider>
        </UserSettingsStoreProvider>
      </CounterStoreProvider >
    </>
  )
}