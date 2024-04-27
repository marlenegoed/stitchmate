import shortenText from '@/lib/shorten-text';
import React from 'react';

interface ReminderTagProps{
  title: string;
}

function ReminderTag ({ title }:ReminderTagProps) {
  return (
    <div className='bg-viridian-800 rounded-full h-fit w-fit py-px px-4'>
      <p className='text-neutral-100 font-semibold text-sm leading-loose'>{shortenText(title, 30)}</p>
    </div>
  );
};

export default ReminderTag;