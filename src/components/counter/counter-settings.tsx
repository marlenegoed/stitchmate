"use client";

import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {useStore} from '@/app/store';
import {useState, useEffect} from 'react';
import {Title} from '../ui/title';

import {FaGears} from "react-icons/fa6";

import FormField from '../ui/form-field';
import ResetAlertDialog from './reset-alert-dialog';


const side = "right";

export interface CounterSettingsProps {
  className: string;
}

const CounterSettings: React.FC<CounterSettingsProps> = ({className}) => {

  const {title, setTitle, count, setCount, numOfRows, setNumOfRows} = useStore();
  const [formTitle, setFormTitle] = useState<string>(title);
  const [formCount, setFormCount] = useState<number | ''>(count);
  const [formRows, setFormRows] = useState<number | ''>(numOfRows || '');

  useEffect(() => {
    setFormRows(numOfRows || '');
  }, [numOfRows]);

  useEffect(() => {
    setFormCount(count);
  }, [count]);
 
  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTitle(formTitle);
    setCount(formCount || 1);
    setNumOfRows(formRows || 0);
  }

  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    setFormTitle(e.target.value);
  }
  function handleCountChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    setFormCount(value ? parseInt(value) : '');
  }

  function handleRowChange (e: React.ChangeEvent<HTMLInputElement>) {
    const value: string = e.target.value;
    setFormRows(value ? parseInt(value) : '');
  }

  return (
    <div className={cn("flex items-center justify-center", className)} >
      <Sheet className='bg-neutral-300'>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <FaGears size={20} className='fill-slate-700' />
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
                <Input id="count" type="number" value={formCount} variant='inline' min="1" onChange={handleCountChange} />
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
            <div className='flex w-full flex-col items-center py-20 gap-y-4'>
              <p className='text-center font-semibold text-neutral-500'>Ready to cast-on?<br /><span className='text-center font-normal text-neutral-500'>you can reset your count</span></p>
              <ResetAlertDialog />
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div >
  );
}

export default CounterSettings;