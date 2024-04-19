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
          <ReminderForm />
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

function ReminderForm ({className}) {

  const [reminderType, setReminderType] = useState('every');
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderNote, setReminderNote] = useState('');
  const [repeatValue1, setRepeatValue1] = useState(0);
  const [repeatValue2, setRepeatValue2] = useState(2);

  const {setReminder} = useStore();

  const inputType = reminderType === "every" ? <RepeatEveryInputs onIntervalChange={repeatValue1} /> : <ForRowsInputs />;

  function handleChange (value) {
    setReminderType(value);
  }


  function handleSubmit (e) {
    e.preventDefault();

    const newReminder = {
      title,
      type,
      note,
      repeat: {}
    };

    if (newReminder.type === "every") {
      newReminder.repeat;
    }
  }

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="reminderTitle">Title</Label>
        <Input type="text" id="reminderTitle" defaultValue="my reminder" onChange={(e) => setReminderTitle(e.target.value)} />
      </div>
      <Select onValueChange={handleChange} defaultValue="every">
        <SelectTrigger className="w-[100%]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="every">Repeat every</SelectItem>
          <SelectItem value="for-rows">Repeat for rows</SelectItem>
        </SelectContent>
      </Select>
      {inputType}
      <Textarea placeholder="you can add a note to your reminder, e. g.: k1, k2tog, knit to 3 sts before end, ssk, k1..." />
      <Button type="submit">Save changes</Button>
    </form>
  );
}


function RepeatEveryInputs ({onIntervalChange}) {

  return (
    <div className="flex gap-x-4">
      <div className="flex gap-x-2 items-center">
        <Input onChange={e => onIntervalChange(e.target.value)} type="number" id="rows" defaultValue="--" />
        <Label htmlFor="rows">th. row</Label>
      </div>
      <div className="flex gap-x-2 items-center">
        <Input type="number" id="times" defaultValue="--" />
        <Label htmlFor="times">times</Label>
      </div>
    </div>
  );
}


function ForRowsInputs () {

  return (
    <div className="flex gap-x-4">
      <div className="flex gap-x-2 items-center">
        <Label htmlFor="from">from</Label>
        <Input type="number" id="from" defaultValue="--" />
      </div>
      <div className="flex gap-x-2 items-center">
        <Label htmlFor="until">until</Label>
        <Input type="number" id="until" defaultValue="--" />

      </div>
    </div>
  );
}

