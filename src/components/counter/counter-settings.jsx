"use client";

import {cn} from '@/lib/utils';
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

// import {FaGears} from "react-icons/fa6";
import {MdSettings} from "react-icons/md";
import {FaGears} from "react-icons/fa6";

import FormField from '../ui/form-field';
import ResetAlertDialog from './reset-alert-dialog';


// const SHEET_SIDES = ["top", "right", "bottom", "left"];

const side = "right";


export default function CounterSettings ({className}) {

  const {title, setTitle, count, setCount, numOfRows, setNumOfRows} = useStore();
  const [formTitle, setFormTitle] = useState(title);
  const [formCount, setFormCount] = useState(count);
  const [formRows, setFormRows] = useState(numOfRows);

  useEffect(() => {
    setFormCount(count);
  }, [count]);

  const {clickSoundEnabled, toggleSound} = useStore();

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
    <div className={cn("flex items-center justify-center", className)} >
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaGears size={24} className='' />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <SheetTitle className='text-left'>Edit counter</SheetTitle>
              <SheetDescription>
              </SheetDescription>
            </SheetHeader>

            <div className='grid gap-y-4 py-4'>
              <FormField>
                <Label variant='inline' htmlFor="title">
                  Title
                </Label>
                <Input variant='inline' id="title" value={formTitle} onChange={handleChange} />
              </FormField>

              <FormField>
                <Label variant='inline' htmlFor="count">
                  Count
                </Label>
                <Input id="count" typeç="number" value={formCount} variant='inline' onChange={handleCountChange} />
              </FormField>

              <FormField>
                <Label variant='inline' htmlFor="rows">
                  Number of Rows
                </Label>
                <Input id="rows" type="number" value={formRows} variant='inline' onChange={handleRowChange} />
              </FormField>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <div className='flex w-full'>
                  <Button type="submit" className='w-fit px-12'>Save changes</Button>
                </div>
              </SheetClose>
            </SheetFooter>
            <div className='flex w-full justify-center py-20'>
              <ResetAlertDialog />
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div >
  );
}
