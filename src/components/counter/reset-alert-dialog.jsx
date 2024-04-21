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
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";

import {FaArrowRotateLeft} from "react-icons/fa6";

import {useStore} from '@/app/store';

export default function ResetAlertDialog () {

  const {resetCount} = useStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className='border-neutral-300' size="icon"><FaArrowRotateLeft className='fill-neutral-300' /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>All set for a big reset?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reset your count and embark on a fresh knitting adventure? Remember: This action cannot be undone.
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
