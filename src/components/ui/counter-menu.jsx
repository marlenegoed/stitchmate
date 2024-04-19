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


import ResetAlertDialog from './reset-alert-dialog';

// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "left";

export default function CounterMenu () {

  const {toggleSound, clickSoundEnabled} = useStore();

  function handleSubmit () { }


  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaListUl />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
              </SheetDescription>
            </SheetHeader>
            <Button size="icon" variant="ghost"> <FaVolumeHigh /></Button>
            <Button size="icon" variant="ghost"> <FaMoon /></Button>
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
