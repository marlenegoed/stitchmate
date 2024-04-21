'use client';

import {useState, useEffect} from "react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

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
import FormField from '@/components/ui/form-field';
import {useStore} from '@/app/store';

export default function ReminderForm ({className, handleFormSubmit, reminder}) {
  const {count} = useStore();

  const [reminderType, setReminderType] = useState(reminder.type);
  const [reminderTitle, setReminderTitle] = useState(reminder.title);
  const [reminderNote, setReminderNote] = useState(reminder.note);
  const [repeatValue1, setRepeatValue1] = useState(reminder.repeat.interval || reminder.repeat.from || '');
  const [repeatValue2, setRepeatValue2] = useState(reminder.repeat.times || reminder.repeat.until || '');
  const [repeatValue3, setRepeatValue3] = useState(reminder.repeat.start || count);

  function handleTypeChange (value) {
    setReminderType(value);
  }

  function handleSubmit (e) {
    e.preventDefault();

    const isValid = validateForm(repeatValue1, repeatValue2, repeatValue3, reminderTitle);

    if (isValid.length > 0) {
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

    handleFormSubmit(newReminder);
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
      <Textarea
        className='boder-none bg-neutral-100 rounded-lg p-3 text-neutral-500'
        placeholder="you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1."
        value={reminderNote}
        onChange={e => setReminderNote(e.target.value)}
      />
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

