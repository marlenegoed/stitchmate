import {
  Alert,
} from "@/components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {DialogClose} from '@radix-ui/react-dialog';
import Reminder from './reminder';
import ReminderTag from './reminder-tag';
import Link from 'next/link';

export default function ReminderAlertDialog ({reminder, tag = false}) {

  const {id, title, note} = reminder;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0 bg-inherit'>
          {!tag ?
            <Reminder reminder={reminder} /> :
            <ReminderTag title={title} />
          }
        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className='mb-2'>
          <DialogTitle className='mb-2'>{title}</DialogTitle>
          <DialogDescription className=''>
            {note}
          </DialogDescription>
        </DialogHeader>


        <DialogFooter className='flex flex-row gap-x-4'>
          <Link href={`/reminders/${id}/edit`}>
            <Button variant="outline" className='flex-1 w-full'>
              edit reminder
            </Button>
          </Link>
          <DialogClose asChild>
            <Button className='border-2 border-sienna-400 flex-1 w-full'>continue</Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

