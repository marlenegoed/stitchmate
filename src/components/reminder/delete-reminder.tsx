import {Button} from '../ui/button';
import {AiFillDelete} from "react-icons/ai";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteReminderProps {
  handleDelete: () => void
}

export default function DeleteReminder({handleDelete}:DeleteReminderProps) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='icon' variant='ghost' className='-mr-2'><AiFillDelete className='fill-sienna-400' size={20} /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete your reminder?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  );
}