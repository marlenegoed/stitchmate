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

export const DrawerDialogContent = ({children}: {children: ReactNode}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogContent>{children}</DialogContent>
  }
  return <DrawerContent>{children}</DrawerContent>
}

export const DrawerDialogHeader = ({title}: {title: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return (
      <DialogHeader className='mb-2 -mt-2'>
        <DialogTitle className='mb-2 mr-auto font-semibold text-xl'>{title}</DialogTitle>
      </DialogHeader>
    )
  }
  return (
    <DrawerHeader className="text-center my-6">
      <DrawerTitle>{title}</DrawerTitle>
    </DrawerHeader>
  )
}

export const DrawerDialogFooter = ({children}: {children: ReactNode}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogFooter className='grid grid-cols-2 gap-4'>{children}</DialogFooter>
  }
  return <DrawerFooter className='grid grid-cols-2 gap-4'>{children}</DrawerFooter>
}


