'use client';

import Logo from '@/components/ui/logo';
import CounterSettings from '@/components/counter/counter-settings';
import CounterProgress from '@/components/counter/counter-progress';
import Menu from '@/components/ui/menu';
import {usePathname} from 'next/navigation';
import {IoIosArrowBack} from "react-icons/io";
import {Button} from './button';
import {cn} from '@/lib/utils';

import Link from 'next/link';


export default function Nav () {
  const pathname = usePathname();
  const isRoot = pathname === '/';

  return (
    <>
      <nav className='flex justify-between p-4'>
        {/* <CounterMenu /> */}
        {isRoot ? <Menu /> : <BackButton />}
        <Logo />
        <CounterSettings className={cn(!isRoot && 'invisible')} />
      </nav>
      {isRoot ? <CounterProgress /> : <hr className='border-gray-300' />}
    </>
  );
}

function BackButton () {
  return (
    <Link href='/'>
      <Button size='icon' variant='ghost'><IoIosArrowBack size={24} /></Button>
    </Link>
  );
}