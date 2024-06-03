'use client'

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
import {Reminder, Section, deleteProject, deleteReminder, deleteSection} from '@/database/queries/queries';
import {useToast} from '@/lib/use-toast';
import {cn} from '@/lib/utils';
import {useUser} from '@clerk/nextjs';
import {useRouter} from 'next/navigation';

import {HiOutlineTrash} from "react-icons/hi2";

interface AlertDialogProps {
  section?: Section,
  projectId?: number,
  reminder: Reminder,
  className?: string,
  handleDelete?: () => void,
  disabled?: boolean,
}

export default function DeleteDialog({section, projectId, reminder, className, handleDelete, disabled = false}: AlertDialogProps) {
  const {user} = useUser()
  const router = useRouter()
  const {toast} = useToast()

  async function handleSubmit() {
    if (handleDelete) {
      handleDelete()
      return
    }
    if (!user) return

    if (section) {
      try {
        await deleteSection(user.id, section)
        toast({title: "Section deleted"})
      } catch (e) {
        toast({title: "Failed to delete section"})
        // TODO: Send error to sentry
      }
    } else if (projectId) {
      await deleteProject(user.id, projectId)
      toast({title: "Project deleted"})
    } else if (reminder) {
      deleteReminder(user.id, reminder.sectionId, reminder.id)
      router.refresh();
      toast({title: "Reminder deleted"})
    }
  }

  function title() {
    if (section) {return 'section'}
    else if (projectId) {return 'project'}
    else if (reminder) {return 'reminder'}
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={cn('hover:bg-neutral-200 text-sienna-400  hover:text-slate-700', className)} size="icon" disabled={disabled}>
          <HiOutlineTrash size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className='text-base'>
            Deleting a {title()} cannot be undone. All your progress and settings will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='px-10'>Cancel</AlertDialogCancel>
          <AlertDialogAction className='px-10' onClick={handleSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
