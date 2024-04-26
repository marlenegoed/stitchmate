import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import {Button} from "@/components/ui/button";

import {FaArrowRotateLeft} from "react-icons/fa6";

import {useStore} from '@/app/store';

export default function ResetAlertDialog () {

  const {resetCount} = useStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className='border-neutral-400 hover:bg-neutral-100' size="icon"><FaArrowRotateLeft className='fill-neutral-400' /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>All set for a big reset?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you ready to knit your way into uncharted territory? Resetting wipes the slate clean, including all reminders!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={resetCount}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
