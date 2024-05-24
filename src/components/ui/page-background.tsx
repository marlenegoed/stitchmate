import {ReactNode} from 'react';
import landingImg from '@/../public/sm_landing_blobs.svg'
import {cn} from '@/lib/utils';

export function PageBackground({children, className}: {className?: string, children: ReactNode}) {
  return (
    <main
      className={cn("flex items-center justify-center h-full bg-sienna-100/50 bg-no-repeat bg-center bg-cover", className)}
      style={{backgroundImage: `url(${landingImg.src})`}}
    >
      {children}
    </main>
  )
}