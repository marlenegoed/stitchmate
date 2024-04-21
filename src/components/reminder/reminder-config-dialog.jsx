'use client';

import {useState, useEffect} from "react";

import {cn} from "@/lib/utils";
import {useMediaQuery} from "@/hooks/use-media-query";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {Alert, AlertTitle} from '../ui/alert';
import {Textarea} from "@/components/ui/textarea";

import FormField from '../ui/form-field';
import AddReminder from './add-reminder';
import {useStore} from '@/app/store';
import {FaPlus} from "react-icons/fa6";


export default function ReminderConfigDialog () {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    // const submitButton = <DialogClose asChild>
    //   <Button type="submit">Save changes</Button>
    // </DialogClose>;
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Alert className='m-0 p-0 border-none'>
            <AddReminder></AddReminder>
          </Alert>
          {/* <Button variant="outline">add reminder</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <ReminderForm setOpen={setOpen} />
        </DialogContent >
      </Dialog >
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Alert className='m-0 p-0 border-none'>
          <AddReminder></AddReminder>
        </Alert>
        {/* <Button variant="outline" className="my-8 w-full">add reminder</Button> */}
      </DrawerTrigger>
      <DrawerContent className='p4'>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Reminder</DrawerTitle>
          {/* <DrawerDescription>
            Configure your reminder here. Click save when you're done.
          </DrawerDescription> */}
        </DrawerHeader>
        <ReminderForm setOpen={setOpen} className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer >
  );
}

function ReminderForm ({className, setOpen}) {

  const defaultNote = "you can add a note to your reminder, e. g.: k1, k2tog, knit to 3 sts before end, ssk, k1...";

  const {setReminder, count} = useStore();

  const [reminderType, setReminderType] = useState('every');
  const [reminderTitle, setReminderTitle] = useState('my reminder');
  const [reminderNote, setReminderNote] = useState('');
  const [repeatValue1, setRepeatValue1] = useState('');
  const [repeatValue2, setRepeatValue2] = useState('');
  const [repeatValue3, setRepeatValue3] = useState(count);

  useEffect(() => {
    setRepeatValue3(count);
  }, [count]);


  function handleTypeChange (value) {
    setReminderType(value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    const isValid = validateForm(repeatValue1, repeatValue2, repeatValue3, reminderTitle);

    if (isValid.length > 0) {
      setOpen(true);
      return false;
    }

    const newReminder = {
      title: reminderTitle,
      type: reminderType,
      note: reminderNote,
    };

    if (reminderType === "every") {
      newReminder.repeat = {
        interval: repeatValue1,
        times: repeatValue2,
        start: repeatValue3
      };
    } else {
      newReminder.repeat = {
        from: repeatValue1,
        until: repeatValue2
      };
    }
    setReminder(newReminder);
    setOpen(false);

    setReminderTitle('my reminder');
    setReminderType('every');
    setRepeatValue1(0);
    setRepeatValue2(0);
    setRepeatValue3(count);
    setReminderNote('');
    console.log(newReminder);

  }

  // toggle form input 
  let inputType;

  if (reminderType === 'every') {
    inputType = <RepeatEveryInputs
      repeatValue1={repeatValue1} repeatValue2={repeatValue2} repeatValue3={repeatValue3} setRepeatValue1={setRepeatValue1} setRepeatValue2={setRepeatValue2} setRepeatValue3={setRepeatValue3} />;
  } else {
    inputType =
      <ForRowsInputs repeatValue1={repeatValue1} repeatValue2={repeatValue2} setRepeatValue1={setRepeatValue1} setRepeatValue2={setRepeatValue2} />;
  }

  const errorMessages = validateForm(repeatValue1, repeatValue2, repeatValue3, reminderTitle);

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <FormField className=''>
        <Label variant='inline' htmlFor="reminderTitle">Title</Label>
        <Input variant='inline' type="text" id="reminderTitle" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} />
      </FormField>
      <Select onValueChange={handleTypeChange} defaultValue="every">
        <SelectTrigger className="w-[100%]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="every">Repeat every</SelectItem>
          <SelectItem value="for-rows">Repeat for rows</SelectItem>
        </SelectContent>
      </Select>
      {inputType}
      <Textarea className='boder-none bg-neutral-100 rounded-lg p-3 text-neutral-500' placeholder={defaultNote} value={reminderNote} onChange={e => setReminderNote(e.target.value)} />
      {errorMessages.map((msg, index) => <p key={index}>{msg}</p>)}

      <Button type="submit">Save changes</Button>
    </form>
  );
}


function RepeatEveryInputs ({repeatValue1, repeatValue2, repeatValue3, setRepeatValue1, setRepeatValue2, setRepeatValue3}) {

  return (
    <div className="flex gap-x-4">
      <FormField>
        <Input variant="inline" min="0" type="number" id="start" value={numtoString(repeatValue3)} onChange={e => {setRepeatValue3(parseInt(e.target.value));}} />
        <Label variant="inline" htmlFor="start">start row</Label>
      </FormField>
      <FormField>
        <Input variant="inline" min="0" type="number" id="rows" value={numtoString(repeatValue1)} onChange={e => {setRepeatValue1(parseInt(e.target.value));}} />
        <Label variant="inline" htmlFor="rows">every<br />{makeOrdinal(repeatValue1)} </Label>
      </FormField>
      <FormField>
        <Input variant="inline" min="0" type="number" id="times" value={numtoString(repeatValue2)} onChange={e => setRepeatValue2(parseInt(e.target.value))} />
        <Label variant="inline" htmlFor="times">times</Label>
      </FormField>
    </div>
  );
}


function ForRowsInputs ({repeatValue1, repeatValue2, setRepeatValue1, setRepeatValue2}) {

  return (
    <div className="flex gap-x-4">
      <div className="flex gap-x-2 items-center">
        <Label htmlFor="from">from</Label>
        <Input min="0" type="number" id="from" value={numtoString(repeatValue1)} onChange={e => {setRepeatValue1(parseInt(e.target.value));}} />
      </div>
      <div className="flex gap-x-2 items-center">
        <Label htmlFor="until">until</Label>
        <Input min="0" type="number" id="until" value={numtoString(repeatValue2)} onChange={e => setRepeatValue2(parseInt(e.target.value))} />
      </div>
    </div>
  );
}

function validateForm (repeatValue1, repeatValue2, repeatValue3, title) {

  const messages = [];

  if (repeatValue1 === 0
    || Number.isNaN(repeatValue1)
    || repeatValue2 === 0
    || Number.isNaN(repeatValue2)
    || repeatValue3 === 0
    || Number.isNaN(repeatValue3)
    || title.length === 0
  ) {
    messages.push('please fill in the missing fields.');
  }

  if (repeatValue1 < 0 || repeatValue2 < 0) {
    messages.push('input cannot be a negative number.');
  }

  return messages;

}

function makeOrdinal (num) {

  if (num % 100 > 10 && num % 100 < 20) return 'th';

  const digit = num % 10;

  switch (digit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }

}

function numtoString (num) {

  if (Number.isNaN(num)) return '';
  return num.toString();

}





