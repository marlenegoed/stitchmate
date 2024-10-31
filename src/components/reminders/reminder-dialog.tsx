'use client'

import {Button} from "@/components/ui/button";
import {type Reminder} from '@/database/queries/queries';
import {RangeProgress, RepeatProgress} from './reminder-progress';
import ReminderRepeat from './reminder-repeat';
import {HiChevronDoubleDown, HiChevronDoubleUp, HiChevronLeft, HiChevronRight} from "react-icons/hi2";
import {ScrollArea, ScrollBar} from '@/components/ui/scroll-area';
import ReminderForm, {FormValues} from './reminder-form';
import {cn} from '@/lib/utils';
import DrawerDialog from '../ui/drawer-dialog';
import {type Dispatch, type ReactNode, type SetStateAction, useState} from 'react';
import SnoozeReminder from './reminder-snooze-btn';
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {HiOutlinePaintBrush} from "react-icons/hi2";
import {HiArrowSmallLeft} from "react-icons/hi2";
import clsx from 'clsx';
import SectionLabel from '../ui/section-label';
import {Label} from '../ui/label';
import SectionContainer from '../ui/section-container';

interface ReminderDialogProps {
  // userId?: string,
  // reminder?: Reminder,
  // handleSubmit: ((data: FormValues, reminder: Reminder) => Promise<void>) | ((data: FormValues, reminder: Reminder) => void),
  // handleSnooze?: (reminder: Reminder) => void,
  // storeCount: number,
  className?: string,
  triggerBtn: ReactNode,
  children: ReactNode,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}


export default function ReminderDialog({open, setOpen, children, className, triggerBtn}: ReminderDialogProps) {
  return (
    <DrawerDialog open={open} setOpen={setOpen} direction='top'>
      <DrawerDialog.Trigger className={cn('border-none p-0 m-0 bg-inherit flex justify-center cursor-pointer text-left', className)}>
        <button>
          {triggerBtn}
        </button>
      </DrawerDialog.Trigger>

      <DrawerDialog.Content drawerClass="bg-neutral-100 h-dvh" dialogClass="min-w-[500px] h-[calc(100%_-_6rem)] bg-neutral-100 flex flex-col-reverse">
        {children}
      </DrawerDialog.Content>
      </DrawerDialog>
    )
}



