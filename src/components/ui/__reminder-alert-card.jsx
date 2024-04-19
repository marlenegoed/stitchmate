// import {RocketIcon} from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

import {FaAnglesRight} from "react-icons/fa6";

import shortenText from '@/lib/shorten-text';

export default function ReminderAlertCard ({title, note}) {

  return (
    <Alert className="my-4 rounded-2xl flex border-none bg-emerald-200">
      <div>
        <AlertTitle className='text-gray-800 font-semibold'>{title}</AlertTitle>
        <AlertDescription className='text-gray-500'>
          {shortenText(note, 40)}
        </AlertDescription>
      </div>
      <div>
        <FaAnglesRight className="h-4 w-4 fill-slate-700" />
      </div>
    </Alert>
  );
}

