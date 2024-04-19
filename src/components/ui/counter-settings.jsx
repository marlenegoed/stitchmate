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

import {FaGears} from "react-icons/fa6";

import ResetAlertDialog from './reset-alert-dialog';


// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "right";


export default function CounterSettings () {

  const {title, setTitle, count, setCount, numOfRows, setNumOfRows} = useStore();
  const [formTitle, setFormTitle] = useState(title);
  const [formCount, setFormCount] = useState(count);
  const [formRows, setFormRows] = useState(numOfRows);

  useEffect(() => {
    setFormCount(count);
  }, [count]);

  function handleSubmit (e) {
    e.preventDefault();
    setTitle(formTitle);
    setCount(formCount);
    setNumOfRows(formRows);
  }

  function handleChange (e) {
    setFormTitle(e.target.value);
  }

  function handleCountChange (e) {
    setFormCount(parseInt(e.target.value));
  }

  function handleRowChange (e) {
    setFormRows(parseInt(e.target.value));
  }

  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaGears size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle>Edit counter</SheetTitle>
              <SheetDescription>
                Make changes to your counter here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>

            <div className="grid gap-4 py-4" >
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" value={formTitle} className="col-span-3" onChange={handleChange} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="count" className="text-right">
                  Count
                </Label>
                <Input id="count" type="number" value={formCount} className="col-span-3" onChange={handleCountChange} />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rows" className="text-right">
                  Number of Rows
                </Label>
                <Input id="rows" type="number" value={formRows} className="col-span-3" onChange={handleRowChange} />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </form>
          <ResetAlertDialog />
        </SheetContent>
      </Sheet>
    </div >
  );
}
