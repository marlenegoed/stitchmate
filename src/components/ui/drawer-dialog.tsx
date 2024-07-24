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

interface DrawerDialogProps {
  children: ReactNode,
  className?: string,
  breakpoint?: string
}

export const DrawerDialog = ({children, open, setOpen, breakpoint}: {children: ReactNode, open: boolean, setOpen: Dispatch<SetStateAction<boolean>>, breakpoint?: string}) => {

  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <Dialog open={open} onOpenChange={setOpen}>{children}</Dialog>
  }
  return <Drawer open={open} onOpenChange={setOpen}>{children}</Drawer >
}

export const DrawerDialogTrigger = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogTrigger asChild className={className}>{children}</DialogTrigger>
  }
  return <DrawerTrigger asChild className={className}>{children}</DrawerTrigger>
}

export const DrawerDialogContent = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogContent className={cn('min-w-[425px] p-10', className)}>{children}</DialogContent>
  }
  return <DrawerContent className={cn('flex items-center p-4', className)}>{children}</DrawerContent>
}

export const DrawerDialogHeader = ({children, className, breakpoint, withDialogClose}: {children: ReactNode, className?: string, breakpoint?: string, withDialogClose?: boolean}) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogHeader className={cn('mb-2', className)} withClose={withDialogClose}>{children}</DialogHeader>
  }
  return <DrawerHeader className={cn('flex justify-between w-full', className)}>{children}</DrawerHeader>
}

export const DrawerDialogTitle = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogTitle className={cn('mb-2 mr-auto font-semibold text-xl', className)}>{children}</DialogTitle>
  }
  return <DrawerTitle className={cn('text-left', className)}>{children}</DrawerTitle>
}

export const DrawerDialogFooter = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogFooter className={cn('grid grid-cols-2 gap-4', className)}>{children}</DialogFooter>
  }
  return <DrawerFooter className={cn('grid grid-cols-2 gap-4 mb-10', className)}>{children}</DrawerFooter>
}

export const DrawerDialogClose = ({children, asChild, breakpoint, className}: {children: ReactNode, asChild?: boolean, breakpoint?: string, className?: string}) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogClose className={className} asChild={asChild}>{children}</DialogClose>
  }
  return <DrawerClose className={className} asChild={asChild}>{children}</DrawerClose>
}


