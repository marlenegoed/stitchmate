"use client";
import * as React from "react"
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Title} from './title';

interface MenuProps {}; // no props

import {
  FaListUl,
  FaMoon,
  FaBarsStaggered,

} from "react-icons/fa6";

import ToggleSound from './toggle-sound';

// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side:string = "left";

export default function Menu() {

  //function handleSubmit () { } // FIX: DO WE NEED THIS? NOT REALLY

  return (
    <>
    <div className="flex items-center justify-center">
      <Sheet >
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaBarsStaggered />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <Title>Settings</Title>
          </SheetHeader>
          <div className='mt-20 flex items-center justify-center w-full'>
            <ToggleSound />
          </div>
          <SheetFooter>
            <SheetClose asChild>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div >
    </>
  );
}