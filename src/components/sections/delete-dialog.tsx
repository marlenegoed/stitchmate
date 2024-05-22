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
import {Section, deleteProject, deleteReminder, deleteSection} from '@/database/queries/projects';
import {cn} from '@/lib/utils';
import {useRouter} from 'next/navigation';

import {HiOutlineTrash} from "react-icons/hi2";

interface AlertDialogProps {
  section?: Section,
  projectId?: number,
  reminderId?: number,
  className?: string
}

export default function DeleteDialog({section, projectId, reminderId, className}: AlertDialogProps) {
  const router = useRouter()

  async function handleSubmit() {
    if (section) {
      try {
        await deleteSection(section)
      } catch (e) {
        // TODO toast
        console.log(e)
      }
    } else if (projectId) {
      deleteProject(projectId)
      // redirect("/projects")
    } else if (reminderId) {
      deleteReminder(reminderId)
      //  TODO toast
      router.refresh();
    }

    // setOpen(false)
  }

  function title() {
    if (section) {return 'section'}
    else if (projectId) {return 'project'}
    else if (reminderId) {return 'reminder'}
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={cn('hover:bg-neutral-200 text-sienna-400  hover:text-slate-700', className)} size="icon">
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
