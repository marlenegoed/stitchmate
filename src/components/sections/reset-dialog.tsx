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
import {Tooltip} from '../ui/tooltip';
import {HiOutlineRefresh} from "react-icons/hi";


interface AlertDialogProps {
  handleReset: () => Promise<void>
}
export default function ResetDialog({handleReset}: AlertDialogProps) {
  async function onClick() {
    await handleReset()
  }

  return (
    <AlertDialog>
      <Tooltip title="Reset counter">
        <AlertDialogTrigger asChild>
          <Button variant='ghost' size="icon">
            <HiOutlineRefresh size={24} />
          </Button>
        </AlertDialogTrigger>
      </Tooltip>
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
