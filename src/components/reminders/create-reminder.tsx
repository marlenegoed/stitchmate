import ReminderDialog from './reminder-dialog';
import ReminderForm, {FormValues} from './reminder-form';
import {useState, type ReactNode} from 'react';
import DrawerDialog from '../ui/drawer-dialog';
import SafetyPin from '../ui/svg/safety-pin';
import Note from '../ui/svg/note';
import Image from 'next/image';
import SectionContainer from '../ui/section-container';
import {Button} from '../ui/button';
import {HiCheck} from 'react-icons/hi2';

interface CreateReminderDialogProps {
  triggerBtn: ReactNode
  count: number
  onSubmit: ((data: FormValues) => Promise<void>) | ((data: FormValues) => void),
} 

export default function CreateReminderDialog({triggerBtn, count, onSubmit}: CreateReminderDialogProps) {

  const [open, setOpen] = useState(false)


  return (

    <ReminderDialog open={open} setOpen={setOpen} triggerBtn={triggerBtn}>


      <div className="max-w-md w-full mx-auto flex flex-col overflow-auto h-full">
        <ReminderForm setOpen={setOpen} count={count} onSubmit={onSubmit} />
      </div>


      <DrawerDialog.Header className='items-center justify-center gap-3 ml-1 mb-6 mt-1'>
        <Note className='-mt-1 -ml-3 h-7 w-7 -rotate-12' />
        <DrawerDialog.Title className='text-gray-800 tracking-normal whitespace-nowrap'>Create a reminder</DrawerDialog.Title>
      </DrawerDialog.Header>


    </ReminderDialog>


  )
}