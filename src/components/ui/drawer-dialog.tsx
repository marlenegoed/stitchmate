'use client'

import {Dispatch, ReactNode, SetStateAction} from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter
} from './drawer';
import {useMediaQuery} from '@/lib/use-media-query';
import {cn} from '@/lib/utils';

const BREAKPOINT = "(min-width: 1024px)"

export const DrawerDialog = ({children, open, setOpen}: {children: ReactNode, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)

  if (isDesktop) {
    return <Dialog open={open} onOpenChange={setOpen}>{children}</Dialog>
  }
  return <Drawer open={open} onOpenChange={setOpen}>{children}</Drawer >
}

export const DrawerDialogTrigger = ({children}: {children: ReactNode}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogTrigger asChild>{children}</DialogTrigger>
  }
  return <DrawerTrigger asChild>{children}</DrawerTrigger>
}

export const DrawerDialogContent = ({children, className}: {children: ReactNode, className?: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogContent className={cn('min-w-[425px] p-10', className)}>{children}</DialogContent>
  }
  return <DrawerContent className='flex items-center'>{children}</DrawerContent>
}

export const DrawerDialogHeader = ({title}: {title: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return (
      <DialogHeader className='mb-2'>
        <DialogTitle className='mb-2 mr-auto font-semibold text-xl'>{title}</DialogTitle>
      </DialogHeader>
    )
  }
  return (
    <DrawerHeader className="my-6 max-w-[425px]">
      <DrawerTitle className='text-left'>{title}</DrawerTitle>
    </DrawerHeader>
  )
}

export const DrawerDialogFooter = ({children, className}: {children: ReactNode, className: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogFooter className={cn('grid grid-cols-2 gap-4', className)}>{children}</DialogFooter>
  }
  return <DrawerFooter className={cn('grid grid-cols-2 gap-4 mb-10', className)}>{children}</DrawerFooter>
}


