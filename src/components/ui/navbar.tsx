'use client';

import Logo from '@/components/ui/logo';
import Menu from '@/components/ui/menu';
import {usePathname} from 'next/navigation';
import {Button} from './button';
import Link from 'next/link';
import {HiMiniSquares2X2} from "react-icons/hi2";
import {HiOutlineSquares2X2} from "react-icons/hi2";
import {HiMiniMoon} from "react-icons/hi2";
import {Avatar, AvatarFallback, AvatarImage} from './avatar';



export default function Nav() {

  const pathname = usePathname();
  const isRoot = pathname.includes('/projects');


  return (
    <>
      <nav className='flex justify-between px-4 py-3'>
        <Link href='/projects'>
          <Logo />
        </Link>

        <div className='flex items-center gap-6 flex-row'>
          <HiMiniMoon className='text-slate-800' size={24} />
          <Link href='/projects'>
            {/* <Button size='icon' variant='outline' className='w-10 h-10 border border-slate-800'> */}
            <HiMiniSquares2X2 className='text-slate-800' size={24} />
            {/* </Button> */}
          </Link>

          <Avatar >
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
        {/* <Menu /> */}
      </nav>
      {/* <hr className='border-gray-300' /> */}

    </>
  );
}
