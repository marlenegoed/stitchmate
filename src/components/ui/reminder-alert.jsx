// import {RocketIcon} from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

import {FaAnglesRight} from "react-icons/fa6";

import {useStore} from '@/app/store';
import {DialogClose} from '@radix-ui/react-dialog';

function shortenText (text, maxlength = 100) {
  if (text.length > maxlength) {
    return text.substring(0, maxlength - 3) + "...";
  }
  return text;
}

export default function ReminderAlert () {

  const {nextReminders} = useStore();

  const reminder = {
    title: 'decrease',
    note: 'k1, k2tog, knit to 3 sts before end, ssk, k1...'
  };

  return (
    <Dialog>
      <DialogTrigger asChild>

        <Alert className="my-4 rounded-2xl flex border-none bg-emerald-200">
          <div>
            <AlertTitle className='text-gray-800 font-semibold'>{reminder.title}</AlertTitle>
            <AlertDescription className='text-gray-500'>
              {shortenText(reminder.note, 40)}
            </AlertDescription>
          </div>
          <div>
            <FaAnglesRight className="h-4 w-4 fill-slate-700" />
          </div>

        </Alert>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{reminder.title}</DialogTitle>
          <DialogDescription>
            {reminder.note}
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

