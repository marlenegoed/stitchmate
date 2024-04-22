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
import {Title} from '../ui/title';

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
  const [formRows, setFormRows] = useState(numOfRows || '');

  useEffect(() => {
    setFormRows(numOfRows || '');
  }, [numOfRows]);

  useEffect(() => {
    setFormCount(count);
  }, [count]);

  function handleSubmit (e) {
    e.preventDefault();
    setTitle(formTitle);
    setCount(formCount || 1);
    setNumOfRows(formRows || 0);
  }

  function handleChange (e) {
    setFormTitle(e.target.value);
  }

  function handleCountChange (e) {
    const value = e.target.value;
    setFormCount(value ? parseInt(value) : '');
  }

  function handleRowChange (e) {
    const value = e.target.value;
    setFormRows(value ? parseInt(value) : '');
  }

  return (
    <div className={cn("flex items-center justify-center", className)} >
      <Sheet className='bg-neutral-300'>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaGears size={24} className='' />
          </Button>
        </SheetTrigger>
        <SheetContent side={side}>
          <form onSubmit={handleSubmit}>
            <SheetHeader>
              <Title>Edit Counter</Title>
            </SheetHeader>

            <div className='grid gap-y-5 py-4'>
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
                <Input id="count" typeç="number" value={formCount} variant='inline' min="1" onChange={handleCountChange} />
              </FormField>

              <FormField>
                <Label variant='inline' htmlFor="rows">
                  Number of Rows
                </Label>
                <Input id="rows" type="number" value={formRows} variant='inline' min="1" onChange={handleRowChange} />
              </FormField>
            </div>

            <SheetFooter>
              <SheetClose asChild>
                <div className='flex w-full mt-2'>
                  <Button type="submit" className='px-12 w-full'>Save changes</Button>
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
