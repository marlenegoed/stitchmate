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
import {useDemoStore} from '@/providers/demo-store-provider';

import {HiMiniArrowPath} from "react-icons/hi2";


interface AlertDialogProps {
  setOpen: (value: boolean) => void,
}
export default function ResetDemoDialog({setOpen}: AlertDialogProps) {

  const {resetStore} = useDemoStore(
    (state) => state,
  )

function handleReset() {
    resetStore()
    setOpen(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size="icon"><HiMiniArrowPath size={24} /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to reset?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you ready for a new cast On? Resetting wipes the slate clean, including all reminders. This action cannot be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='grid grid-cols-2 '>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
