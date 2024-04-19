import {useState} from "react";

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
import {Textarea} from "@/components/ui/textarea";

import {useStore} from '@/app/store';


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
          <Button variant="outline" className="my-8">add reminder</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
            <DialogDescription>
              Configure your reminder here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ReminderForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="my-8">add reminder</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Reminder</DrawerTitle>
          <DrawerDescription>
            Configure your reminder here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ReminderForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ReminderForm ({className, setOpen}) {

  const [reminderType, setReminderType] = useState('every');

  const defaultNote = "you can add a note to your reminder, e. g.: k1, k2tog, knit to 3 sts before end, ssk, k1...";

  const [reminderTitle, setReminderTitle] = useState('my reminder');
  const [reminderNote, setReminderNote] = useState('');
  const [repeatValue1, setRepeatValue1] = useState('');
  const [repeatValue2, setRepeatValue2] = useState('');

  const {setReminder} = useStore();

  function handleTypeChange (value) {
    setReminderType(value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    const isValid = validateForm(repeatValue1, repeatValue2, reminderTitle);

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
        times: repeatValue2
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
    setReminderNote('');
    console.log(newReminder);

  }

  // toggle form input 
  let inputType;

  if (reminderType === 'every') {
    inputType = <RepeatEveryInputs
      repeatValue1={repeatValue1} repeatValue2={repeatValue2} setRepeatValue1={setRepeatValue1} setRepeatValue2={setRepeatValue2} />;
  } else {
    inputType =
      <ForRowsInputs repeatValue1={repeatValue1} repeatValue2={repeatValue2} setRepeatValue1={setRepeatValue1} setRepeatValue2={setRepeatValue2} />;
  }

  const errorMessages = validateForm(repeatValue1, repeatValue2, reminderTitle);


  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="reminderTitle">Title</Label>
        <Input type="text" id="reminderTitle" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} />
      </div>
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
      <Textarea placeholder={defaultNote} value={reminderNote} onChange={e => setReminderNote(e.target.value)} />
      {errorMessages.map((msg, index) => <p key={index}>{msg}</p>)}

      <Button type="submit">Save changes</Button>
    </form>
  );
}


function RepeatEveryInputs ({repeatValue1, repeatValue2, setRepeatValue1, setRepeatValue2}) {

  return (
    <div className="flex gap-x-4">
      <div className="flex gap-x-2 items-center">
        <Input min="0" type="number" id="rows" value={numtoString(repeatValue1)} onChange={e => {setRepeatValue1(parseInt(e.target.value));}} />
        <Label htmlFor="rows">{makeOrdinal(repeatValue1)} row</Label>
      </div>
      <div className="flex gap-x-2 items-center">
        <Input min="0" type="number" id="times" value={numtoString(repeatValue2)} onChange={e => setRepeatValue2(parseInt(e.target.value))} />
        <Label htmlFor="times">times</Label>
      </div>
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

function validateForm (repeatValue1, repeatValue2, title) {

  const messages = [];

  if (repeatValue1 === 0
    || Number.isNaN(repeatValue1)
    || repeatValue2 === 0
    || Number.isNaN(repeatValue2)
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





