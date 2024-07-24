import {ReactNode} from 'react';

export default function Tag({children}: {children: ReactNode}) {

  return (
    <span className='bg-sienna-100 text-sienna-400 h-6 text-xs px-2 rounded-full flex items-center'>
      {children}
    </span>
  )
}