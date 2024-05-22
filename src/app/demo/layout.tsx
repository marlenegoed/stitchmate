import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';
import {DemoStoreProvider} from '@/providers/demo-store-provider';
import {UserSettingsStoreProvider} from '@/providers/user-settings-store-provider';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CounterStoreProvider>
      <UserSettingsStoreProvider>
        <DemoStoreProvider>
          <Nav />
          <main className='flex-1 flex flex-col mx-auto items-center py-3 w-full bg-neutral-50 rounded-t-2xl shadow'>{children}</main>
        </DemoStoreProvider>
      </UserSettingsStoreProvider>
    </CounterStoreProvider>
  );
}