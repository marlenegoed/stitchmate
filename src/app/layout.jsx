import './globals.css';
import {lato} from '@/components/ui/fonts';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import CounterSettings from '@/components/ui/counter-settings';

import {FaListUl} from "react-icons/fa6";

export default function RootLayout ({children}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased 
      flex flex-col 
      `}>
        <nav className='flex justify-between px-6 py-3'>
          <Link href=''>
            <FaListUl />
          </Link>
          <Logo />
          <CounterSettings />
        </nav>
        <main className='max-w-screen-sm flex flex-col mx-auto px-6 py-3'> {children}</main>
      </body>
    </html>
  );
}