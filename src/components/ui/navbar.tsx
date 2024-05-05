'use client';

import Logo from '@/components/ui/logo';
import ProjectSettings from '@/components/project/project-settings';
import ProjectProgress from '@/components/project/project-progress';
import Menu from '@/components/ui/menu';
import {usePathname} from 'next/navigation';
import {IoIosArrowBack} from "react-icons/io";
import {Button} from './button';
import {cn} from '@/lib/utils';

import Link from 'next/link';

import {useStore, findProject} from '@/app/store';
import {useParams} from 'next/navigation';


export default function Nav() {

  const pathname = usePathname();
  const isRoot = pathname === '/';

  const {id} = useParams<{id?: string}>()
  const currentProject = useStore(findProject(id || '-1'));
  const isRowNums = currentProject.numOfRows > 0;

  return (
    <>
      <nav className='flex justify-between px-4 py-3'>
        {/* <CounterMenu /> */}
        {isRoot ? <Menu /> : <BackButton />}
        <Logo />
        <ProjectSettings className={cn(!isRoot && 'invisible')} project={currentProject} />
      </nav>
      {isRoot && isRowNums ? <ProjectProgress count={currentProject.count} numOfRows={currentProject.numOfRows} /> : <hr className='border-gray-300' />}

    </>
  );
}

function BackButton() {
  return (
    <Link href='/'>
      <Button size='icon' variant='ghost'><IoIosArrowBack className='fill-slate-800' size={24} /></Button>
    </Link>
  );
}