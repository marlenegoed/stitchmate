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

interface RootDrawerDialogProps extends DrawerDialogProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  direction?: 'top' | 'bottom' | 'left' | 'right',
}

export const DrawerDialog = ({children, open, setOpen, breakpoint, direction}: RootDrawerDialogProps) => {

  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <Dialog open={open} onOpenChange={setOpen}>{children}</Dialog>
  }
  return <Drawer open={open} onOpenChange={setOpen} direction={direction}>{children}</Drawer >
}

export const DrawerDialogTrigger = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogTrigger asChild className={className}>{children}</DialogTrigger>
  }
  return <DrawerTrigger asChild className={className}>{children}</DrawerTrigger>
}

interface DrawerDialogClassNames {
  drawerClass?: string,
  dialogClass?: string,
}
type DrawerDialogContentProps = Omit<DrawerDialogProps, 'className'> & DrawerDialogClassNames

export const DrawerDialogContent = ({children, drawerClass, dialogClass, breakpoint}: DrawerDialogContentProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return (
      <DialogContent className={cn('min-w-[400px] h-[200px] p-10', dialogClass)}>
        {children}
      </DialogContent>
    )
  }
  return (
    <DrawerContent className={cn('flex items-center p-4', drawerClass)}>
      {children}
    </DrawerContent>
  )
}

export const DrawerDialogHeader = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogHeader className={cn(className)}>{children}</DialogHeader>
  }
  return <DrawerHeader className={cn('flex w-full', className)}>{children}</DrawerHeader>
}

export const DrawerDialogTitle = ({children, className, breakpoint}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogTitle className={cn('mr-auto font-semibold text-xl', className)}>{children}</DialogTitle>
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

interface DrawerDialogCloseProps extends DrawerDialogProps {
  asChild?: boolean
}
export const DrawerDialogClose = ({children, asChild, breakpoint, className}: DrawerDialogCloseProps) => {
  const isDesktop = useMediaQuery(breakpoint ?? BREAKPOINT)
  if (isDesktop) {
    return <DialogClose className={className} asChild={asChild}>{children}</DialogClose>
  }
  return <DrawerClose className={className} asChild={asChild}>{children}</DrawerClose>
}


DrawerDialog.Title = DrawerDialogTitle
DrawerDialog.Trigger = DrawerDialogTrigger
DrawerDialog.Content = DrawerDialogContent
DrawerDialog.Header = DrawerDialogHeader
DrawerDialog.Footer = DrawerDialogFooter
DrawerDialog.Close = DrawerDialogClose

export default DrawerDialog


