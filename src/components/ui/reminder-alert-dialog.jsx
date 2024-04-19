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

import {Button} from "@/components/ui/button";
import {DialogClose} from '@radix-ui/react-dialog';
import shortenText from '@/lib/shorten-text';

import {FaAnglesRight} from "react-icons/fa6";

export default function ReminderAlertDialog ({title, note}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Alert className="my-4 rounded-2xl flex border-none bg-emerald-200">
          <div>
            <AlertTitle className='text-gray-800 font-semibold'>{title}</AlertTitle>
            <AlertDescription className='text-gray-500'>
              {shortenText(note, 40)}
            </AlertDescription>
          </div>
          {/* <div>
            <FaAnglesRight className="h-4 w-4 fill-slate-700" />
          </div> */}
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

