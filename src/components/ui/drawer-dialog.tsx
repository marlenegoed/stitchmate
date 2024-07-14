'use client'

import {Dispatch, ReactNode, SetStateAction} from 'react';
import {
  Dialog,
  DialogClose,
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
  DrawerFooter,
  DrawerClose
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

export const DrawerDialogHeader = ({children, className}: {children: ReactNode, className?: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogHeader className={cn('mb-2', className)}>{children}</DialogHeader>
  }
  return <DrawerHeader className={cn('my-6 max-w-[425px]', className)}>{children}</DrawerHeader>
}

export const DrawerDialogTitle = ({children, className}: {children: ReactNode, className?: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogTitle className={cn('mb-2 mr-auto font-semibold text-xl', className)}>{children}</DialogTitle>
  }
  return <DrawerTitle className={cn('text-left', className)}>{children}</DrawerTitle>
}

export const DrawerDialogFooter = ({children, className}: {children: ReactNode, className: string}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogFooter className={cn('grid grid-cols-2 gap-4', className)}>{children}</DialogFooter>
  }
  return <DrawerFooter className={cn('grid grid-cols-2 gap-4 mb-10', className)}>{children}</DrawerFooter>
}

export const DrawerDialogClose = ({children, asChild}: {children: ReactNode, asChild?: boolean}) => {
  const isDesktop = useMediaQuery(BREAKPOINT)
  if (isDesktop) {
    return <DialogClose asChild={asChild}>{children}</DialogClose>
  }
  return <DrawerClose asChild={asChild}>{children}</DrawerClose>
}


