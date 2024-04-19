import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {FaAnglesRight} from "react-icons/fa6";
import shortenText from '@/lib/shorten-text';

const ReminderCard = React.forwardRef(
  ({note, title}, ref) => {

    return (
      <Card className=" pt-3 pb-4 px-4 rounded-2xl border-none bg-emerald-200 flex flex-row" ref={ref}>
        <CardHeader className='p-0'>
          <CardTitle className='text-base text-gray-800 font-semibold'>{title}</CardTitle>
          {/* <CardDescription>{note}</CardDescription> */}
          <CardContent className='p-0'>
            <p className='py-0 text-base text-gray-500'>{shortenText(note, 40)}</p>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-between p-0">
          {/* <FaAnglesRight className="fill-slate-700" /> */}
        </CardFooter>
      </Card>
    );
  });

ReminderCard.displayName = "ReminderCard";

export default ReminderCard;
