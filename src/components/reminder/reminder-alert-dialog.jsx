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
import shortenText from '@/lib/shorten-text';
import Reminder from './reminder';

import {FaAnglesRight} from "react-icons/fa6";

export default function ReminderAlertDialog ({title, note}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className='border-none p-0 m-0'>
          <Reminder title={title} note={note} />
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

