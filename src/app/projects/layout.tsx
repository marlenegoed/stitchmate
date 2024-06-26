import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <UserSettingsStoreProvider>
        <CounterStoreProvider>
          <main className='h-[calc(100%-4rem)] min-h-dvh flex-1 flex justify-center w-full bg-neutral-100 rounded-t-2xl px-6'>
            <div className="h-full flex flex-col w-full">
              {children}
            </div>
          </main>
        </CounterStoreProvider>
      </UserSettingsStoreProvider>
    </>
  );
}