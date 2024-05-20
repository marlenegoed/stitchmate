import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CounterStoreProvider>
      <Nav />
      <main className='flex-1 flex flex-col mx-auto items-center py-3 w-full bg-neutral-50 rounded-t-2xl shadow'>{children}</main>
    </CounterStoreProvider>
  );
}