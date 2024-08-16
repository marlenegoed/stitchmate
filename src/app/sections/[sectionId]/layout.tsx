import Nav from '@/components/ui/navbar';
import {CounterStoreProvider} from '@/providers/counter-store-provider';

export default function PageLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav />
      <CounterStoreProvider>
        <main className='h-fit flex flex-col mx-auto items-center w-full bg-neutral-100'>
          {children}
        </main>
      </CounterStoreProvider>
    </>
  );
}