import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ReminderAlertDialog from './reminder-alert-dialog';
import {useStore} from '@/app/store';


export default function ReminderCarousel () {


  const {nextReminders} = useStore();

  const placeholder = <CarouselItem className='invisible'><ReminderAlertDialog title="" note="" /></CarouselItem>;

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {nextReminders.map(reminder => (
          <CarouselItem key={reminder.id}>
            <ReminderAlertDialog title={reminder.title} note={reminder.note} />
          </CarouselItem>
        ))}
        {nextReminders.length === 0 && placeholder}
      </CarouselContent>
      {nextReminders.length > 1 && <CarouselPrevious />}
      {nextReminders.length > 1 && <CarouselNext />}
    </Carousel>
  );
}
