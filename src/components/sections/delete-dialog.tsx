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
import {Section, deleteSection} from '@/database/queries/projects';

import {HiOutlineTrash} from "react-icons/hi2";

interface AlertDialogProps {
  // setOpen: (value: boolean) => void,
  section: Section,
}

export default function DeleteDialog({section}: AlertDialogProps) {

  async function handleSubmit() {
    try {
      await deleteSection(section)
    } catch (e) {
      console.log(e)
    }

    // setOpen(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className='border-neutral-400 hover:bg-neutral-100' size="icon"><HiOutlineTrash className='text-sienna-500' size={20} /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this section? This action cannot be undone!</AlertDialogTitle>
          {/* <AlertDialogDescription>
            Are you ready to knit your way into uncharted territory? Resetting wipes the slate clean, including all reminders!
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
