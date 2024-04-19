
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

import {FaAnglesRight} from "react-icons/fa6";

import {DialogClose} from '@radix-ui/react-dialog';

import {useStore} from '@/app/store';
import ReminderCard from './__reminder-card';

export default function ReminderDialog ({note, title}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ReminderCard title={title} note={note} />
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

