import './globals.css';
import {lato} from '@/components/ui/fonts';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import CounterSettings from '@/components/ui/counter-settings';

import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faListUl} from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

export default function RootLayout ({children}) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased 
      flex flex-col 
      `}>
        <nav className='flex justify-between px-6 py-3'>
        <Link href=''>
            <FontAwesomeIcon icon={faListUl} />
          </Link>
          <Logo />
          <CounterSettings />
        </nav>
        <main className='max-w-screen-sm flex flex-col mx-auto px-6 py-3'> {children}</main>
      </body>
    </html>
  );
}