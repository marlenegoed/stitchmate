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
  FaBarsStaggered,

} from "react-icons/fa6";

import ToggleSound from '../counter/toggle-sound';


// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "left";

export default function Menu () {

  // const {toggleSound, clickSoundEnabled} = useStore();

  function handleSubmit () { }

  return (
    <div className="flex items-center justify-center">
      <Sheet className='bg-neutral-200'>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaBarsStaggered />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          {/* <form onSubmit={handleSubmit}> */}
          <SheetHeader>
            <SheetTitle className='text-left'>Settings</SheetTitle>
            <SheetDescription>
            </SheetDescription>
          </SheetHeader>
          <div className='mt-20 flex items-center justify-center w-full'>
            <ToggleSound />
          </div>
          {/* <Button size="icon" variant="ghost"> <FaMoon /></Button> */}
          <SheetFooter>
            <SheetClose asChild>
              {/* <Button type="submit">Save changes</Button> */}
            </SheetClose>
          </SheetFooter>
          {/* </form> */}
        </SheetContent>
      </Sheet>
    </div >
  );
}
