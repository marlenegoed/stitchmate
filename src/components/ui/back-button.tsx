import {IoIosArrowBack} from 'react-icons/io';
import {Button} from './button';
import Link from 'next/link';
import {cn} from '@/lib/utils';

interface BackButtonProps {
  urlPath: string,
  className?: string,
}

export default function BackButton({urlPath, className}: BackButtonProps) {
  return (
    <div className={cn(className)} >
      <Link href={urlPath}>
        <Button size='icon' variant='ghost'><IoIosArrowBack className='fill-slate-800' size={24} /></Button>
      </Link>
    </div>
  );
}