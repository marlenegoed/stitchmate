import {redirect} from 'next/navigation'
import {DemoCounterPage} from './demo-counter-page'
import {auth} from "@clerk/nextjs/server";
import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';
import {DemoStoreProvider} from '@/providers/demo-store-provider';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';

export default function Page() {
  if (auth().userId) redirect('/projects')

  return (
    <>
      <Nav />
      <CounterStoreProvider>
        <UserSettingsStoreProvider>
          <DemoStoreProvider>
            <main className='h-[calc(100%-4rem)] flex flex-col mx-auto items-center py-3 w-full bg-neutral-100 rounded-t-2xl shadow'>
              <DemoCounterPage />
            </main>
          </DemoStoreProvider>
        </UserSettingsStoreProvider>
      </CounterStoreProvider >
    </>
  )
}