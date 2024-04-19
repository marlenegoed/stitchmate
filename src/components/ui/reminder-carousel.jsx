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


const reminder = {
  title: 'decrease',
  note: 'k1, k2tog, knit to 3 sts before end, ssk, k1...'
};

const reminders = [
  {
    title: 'decrease',
    note: 'k1, k2tog, knit to 3 sts before end, ssk, k1...'
  },

  {
    title: 'short row (rs)',
    note: 'k to 4 sts before end, w&t'
  },

  {
    title: 'short row (ws)',
    note: 'p to 4 sts before end, w&t'
  },


];



export default function ReminderCarousel () {

  const title = 'decrease';
  const note = 'k1, k2tog, knit to 3 sts before end, ssk, k1...';

  // const {nextReminders} = useStore();

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({length: 5}).map((_, index) => (
          <CarouselItem key={index}>
            <ReminderAlertDialog title={title} note={note} />
            {/* <ReminderDialog title={title} note={note} /> */}
            {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
