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
import ReminderConfigDialog from './reminder-config-dialog';

import {FaAnglesRight} from "react-icons/fa6";

export default function ReminderAlertDialog ({reminder}) {

  const {title, note} = reminder;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0'>
          <Reminder reminder={reminder} />
        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {note}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button>continue</Button>
          </DialogClose>
          <ReminderConfigDialog>Edit reminder</ReminderConfigDialog>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

