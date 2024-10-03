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
import {ReactNode, useState} from 'react';
import SnoozeReminder from './reminder-snooze-btn';
import {Tabs, TabsContent} from "@/components/ui/tabs"
import {HiOutlinePaintBrush} from "react-icons/hi2";
import {HiArrowSmallLeft} from "react-icons/hi2";
import clsx from 'clsx';
import SectionLabel from '../ui/section-label';
import {Label} from '../ui/label';
import SectionContainer from '../ui/section-container';

interface ReminderDialogProps {
  userId?: string,
  reminder: Reminder,
  handleSubmit: ((data: FormValues, reminder: Reminder) => Promise<void>) | ((data: FormValues, reminder: Reminder) => void),
  handleSnooze: (reminder: Reminder) => void,
  storeCount: number,
  className?: string,
  triggerBtn: ReactNode,
}

export default function ReminderDialog({reminder, triggerBtn, className, storeCount, handleSnooze, handleSubmit}: ReminderDialogProps) {

  const [open, setOpen] = useState(false)
  const [snoozed, setSnoozed] = useState(reminder.notification)
  const [activeTab, setActiveTab] = useState('details')
  const [showFullNote, setShowFullNote] = useState(false)

  const {title, note, type, from, until, start, interval, times} = reminder;

  const reminderProgress = type === 'range'
    ? <RangeProgress from={from} until={until} />
    : <RepeatProgress start={start} interval={interval} times={times} />

  return (
    <DrawerDialog open={open} setOpen={setOpen} direction='top'>
      <DrawerDialog.Trigger className={cn('border-none p-0 m-0 bg-inherit flex justify-center cursor-pointer text-left', className)}>
        <button>
          {/* 
          ------ trigger can be 'item' | 'tag' | 'card' | 'add' ------
          */}
          {triggerBtn}
        </button>
      </DrawerDialog.Trigger>

      <DrawerDialog.Content drawerClass="bg-neutral-100 h-dvh" dialogClass="min-w-[500px] h-[calc(100%_-_6rem)] bg-neutral-100">

        {/* allow overflow for small devices when keyboard appears */}
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto h-full">

          { /* -------------------------------------------------------------------------
          * trigger buttons to change the displayed content 
          * -----------------------------------------------------------------------*/ }
          <section className='mb-3 w-full flex flex-row'>
            <Button
              size='sm'
              variant='ghost'
              onClick={() => setActiveTab('form')}
              className={clsx({'bg-sienna-100 rounded-lg text-sienna-400 gap-1 h-8 ml-auto lg:justify-start px-3 text-base': activeTab === 'details', 'hidden': activeTab === 'form'})}
            >
              edit <HiOutlinePaintBrush />
            </Button>

            <Button
              size='sm'
              variant='ghost'
              onClick={() => setActiveTab('details')}
              className={clsx({'rounded-full bg-transparent text-gray-900 h-8 w-10 pl-0 justify-start': activeTab === 'form', 'hidden': activeTab === 'details'})}
            >
              <HiChevronLeft size={24} />
            </Button>
          </section>

          { /* -------------------------------------------------------------------------
          * Content 1:  reminder details (default) 
          * -----------------------------------------------------------------------*/ }
          <div className={clsx({'hidden': activeTab === 'form'}, ' gap-4 flex flex-col h-full')}>

            <DrawerDialog.Header className='flex items-center mb-0'>
              <DrawerDialog.Title className='text-xl bg-white rounded-lg p-3 grow'>
                {title}
              </DrawerDialog.Title>

            </DrawerDialog.Header>

            <SectionContainer className='w-full bg-white rounded-lg p-3'>
              <SectionLabel>notes</SectionLabel>

              {reminder.note ?
                <>
                  <ScrollArea className={clsx('w-full', {'h-28': !showFullNote, 'h-fit': showFullNote})}>
                    <p className='text-base mr-2'>{note}</p>
                    <ScrollBar orientation="vertical" className='bg-white transition-colors transition-duration-150 ease-out' />
                  </ScrollArea>
                  <Button
                    variant='ghost'
                    className='font-normal text-sm text-neutral-400 gap-1 justify-start p-0 h-6 mt-2'
                    onClick={() => setShowFullNote((oldNote) => !oldNote)}
                  >
                    {!showFullNote ? 'show more' : 'show less'}
                    {!showFullNote ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />}
                  </Button>
                </>
                :
                <button
                  className='w-full h-28'
                  onClick={() => setActiveTab('form')}
                >
                  <div className='h-full w-full bg-dotted-spacing-4 bg-dotted-gray-200 flex items-center justify-center'>
                    <p className='text-gray-300 italic bg-white'>no notes added yet...</p>
                  </div>
                </button>
              }


            </SectionContainer>

            <SectionContainer className='gap-2 items-center'>
              <SectionLabel>progress</SectionLabel>
              <div className='flex flex-row justify-between w-full font-semibold text-neutral-500'>
                <ReminderRepeat reminder={reminder} />
                {reminderProgress}
              </div>
            </SectionContainer>

            <DrawerDialog.Footer className='flex flex-col sm:flex-col w-full items-center grow'>
              <SectionContainer className='items-center'>
                <SnoozeReminder
                  handleSnooze={() => handleSnooze(reminder)}
                  snoozed={snoozed}
                  setSnoozed={setSnoozed}
                  className='rounded-full self-center justify-self-center mt-auto'
                />
              </SectionContainer>
              <DrawerDialog.Close asChild>
                <Button
                  className='h-8 flex mt-auto border-sienna-300 text-sienna-300'
                  variant='outline'
                >
                  continue
                  <HiChevronRight size={20} />
                </Button>
              </DrawerDialog.Close>

            </DrawerDialog.Footer>

          </div>

          {/* -------------------------------------------------------------------------
          * reminder form
          * ----------------------------------------------------------------------- */}

          <div className={clsx({'hidden': activeTab === 'details'})}>

            <ReminderForm reminder={reminder} count={storeCount} onSubmit={handleSubmit} snoozed={snoozed} setSnoozed={setSnoozed} handleSnooze={() => handleSnooze(reminder)} />

          </div>

        </div>
      </DrawerDialog.Content>
    </DrawerDialog>
  );
}


