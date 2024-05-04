"use client";

import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Title from './title';


import {
  FaListUl,
  FaMoon,
  FaBarsStaggered,

} from "react-icons/fa6";

import ToggleSound from './toggle-sound';

// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "left";

export default function Menu() {


  // function handleSubmit () { }

  return (
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
  );
}
