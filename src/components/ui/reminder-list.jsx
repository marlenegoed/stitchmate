"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {useStore} from '@/app/store';
import {useState, useEffect} from 'react';

import {
  FaListUl,
  FaMoon,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";

// import {MdBubbleChart} from "react-icons/md";
import {MdBatchPrediction} from "react-icons/md";

import ResetAlertDialog from './reset-alert-dialog';

// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "left";

export default function ReminderList () {

  const {toggleSound, clickSoundEnabled} = useStore();

  function handleSubmit () { }

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MdBatchPrediction size={28} className='fill-emerald-400' />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>Your Reminders</SheetTitle>
              <SheetDescription>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                {/* <Button type="submit">Save changes</Button> */}
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div >
  );
}
