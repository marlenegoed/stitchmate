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
import ReminderItem from './reminder-item';
import ReminderTag from './reminder-tag';
import Link from 'next/link';
import {type Reminder} from '@/lib/reminder';


interface ReminderAlertDialogProps {
  reminder: Reminder,
  isTag?: boolean, 
  projectId: string, 
}

export default function ReminderAlertDialog({reminder, isTag, projectId}: ReminderAlertDialogProps) {

  const {id, title, note} = reminder;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0 bg-inherit'>
          {
            isTag ?
              <ReminderTag title={title} /> :
              <ReminderItem reminder={reminder} />
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
          <Link href={`/projects/${projectId}/reminders/${id}/edit`}>
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

