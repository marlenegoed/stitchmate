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
import {Tooltip, TooltipTrigger} from '@radix-ui/react-tooltip';

import {HiMiniArrowPath} from "react-icons/hi2";
import {TooltipContent} from '../ui/tooltip';


interface AlertDialogProps {
  handleReset: () => Promise<void>
}
export default function ResetDialog({handleReset}: AlertDialogProps) {
  async function onClick() {
    await handleReset()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size="icon" className=' hover:bg-neutral-200 hover:bg-opacity-80 transition-colors'>
          <HiMiniArrowPath size={24} />
        </Button>
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
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
