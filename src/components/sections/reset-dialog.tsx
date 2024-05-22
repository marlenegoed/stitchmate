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
import {updateCount} from '@/database/queries/projects';

import {HiMiniArrowPath} from "react-icons/hi2";


interface AlertDialogProps {
  setOpen: (value: boolean) => void,
  sectionId: number,
}
export default function ResetDialog({setOpen, sectionId}: AlertDialogProps) {


  async function handleReset() {
    await updateCount(sectionId, 1)
    setOpen(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size="icon" className=' hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'><HiMiniArrowPath size={24} /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to reset?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you ready for a new cast On? Resetting wipes the slate clean. This action cannot be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='grid grid-cols-2'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
