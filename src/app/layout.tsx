import './globals.css';
import {lato} from '@/components/ui/fonts';
import Nav from '@/components/ui/navbar';

import {CounterStoreProvider} from '@/providers/counter-store-provider'


export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased 
      flex flex-col h-lvh bg-champagne
      `}>
        <CounterStoreProvider>
          <Nav />
          <main className='flex-1 flex flex-col mx-auto items-center py-3 w-full bg-neutral-50 rounded-t-2xl shadow'>{children}</main>
        </CounterStoreProvider>
      </body>
    </html>
  );
}