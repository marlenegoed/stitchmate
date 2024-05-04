'use client';

import {type FormEvent, useState} from "react";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";

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
import FormField from '@/components/ui/__form-field';
import {useStore} from '@/app/store';
import makeOrdinal from '@/lib/make-ordinal';
import {Checkbox} from '../ui/checkbox';

import { type Reminder } from '@/lib/reminder';


const formSchmema = z.object({
  title: z.string().min(1).max(50),
  note: z.string().max(200).optional(),
  type: z.string(),
  notification: z.boolean().optional(),
  interval: z.number().optional(),
  from: z.number().optional(),
  until: z.number().optional(),
  start: z.number().optional(),
  times: z.number().optional(),
})

interface ReminderFormProps {
  className: string,
  handleFormSubmit: () => void, 
  reminder: Reminder
}

export default function ReminderForm({className, handleFormSubmit, reminder}: ReminderFormProps) {

  const {count} = useStore();

  const form = useForm<z.infer<typeof formSchmema>>({
    resolver: zodResolver(formSchmema),
    defaultValues: {
      title: 'remind me',
      note: 'you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1.', 
    }
  })

  // const [formState, setFormState] = useState({
  //   reminderType: reminder.type,
  //   reminderTitle: reminder.title, 
  //   reminderNote: reminder.note, 
  // })

  // const [repeatValue1, setRepeatValue1] = useState(reminder.repeat.interval || reminder.repeat.from || '');
  // const [repeatValue2, setRepeatValue2] = useState(reminder.repeat.times || reminder.repeat.until || '');
  // const [repeatValue3, setRepeatValue3] = useState(reminder.repeat.start || count);

  function handleTypeChange(value) {
    setReminderType(value);
  }

  function handleSubmit(e: FormEvent<HTMLInputElement>) {
    e.preventDefault();

    // const isValid = validateForm(repeatValue1, repeatValue2, repeatValue3, reminderTitle);

    if (isValid.length > 0) {
      return false;
    }

    const newReminder = {
      title: reminderTitle,
      type: reminderType,
      note: reminderNote,
      notification: true,
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
    <form className={cn("grid items-start gap-5", className)} onSubmit={handleSubmit}>
      <FormField>
        <Label variant='inline' htmlFor="reminderTitle">Title</Label>
        <Input variant='inline' type="text" id="reminderTitle" value={reminderTitle} onChange={(e) => setReminderTitle(e.target.value)} />
      </FormField>
      <h3 className='font-semibold text-slate-800 pl-1 pt-2 -mb-2'>Repetition:</h3>
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
      <h3 className='text-base font-semibold text-slate-800 pl-1 pt-2 -mb-2'>Add a note (optional):</h3>
      <Textarea
        className="boder-none rounded-lg p-3"
        placeholder="you can add a note to your reminder e.g. k1, k2tog, knit to 3 sts before end, ssk, k1."
        value={reminderNote}
        onChange={e => setReminderNote(e.target.value)}
        rows={5}
      />
      {/* <div className='flex flex-start gap-3 py-4'>
        <Checkbox id='notification' className='' checked={true} />
        <label htmlFor='notification' className='font-semibold text-base text-slate-800 -mt-1'>Show notification: <span className='font-normal'>Disabling notifications will pause your reminder, preventing it from appearing.</span></label>
      </div> */}
      {errorMessages.map((msg, index) => <p key={index}>{msg}</p>)}

      <Button type="submit">Save changes</Button>
    </form>
  );
}


function RepeatEveryInputs({repeatValue1, repeatValue2, repeatValue3, setRepeatValue1, setRepeatValue2, setRepeatValue3}) {
  return (
    <div className="flex gap-x-5 w-full">
      <FormField className='flex-1'>
        <Input variant="inline" min="0" type="number" id="start" value={numtoString(repeatValue3)} onChange={e => {setRepeatValue3(parseInt(e.target.value));}} />
        <Label variant="inline" htmlFor="start">start row</Label>
      </FormField>
      <FormField className='flex-1'>
        <Input variant="inline" min="0" type="number" id="rows" value={numtoString(repeatValue1)} onChange={e => {setRepeatValue1(parseInt(e.target.value));}} />
        <Label variant="inline" htmlFor="rows">every<br />{makeOrdinal(repeatValue1)} </Label>
      </FormField>
      <FormField className='flex-1'>
        <Input variant="inline" min="0" type="number" id="times" value={numtoString(repeatValue2)} onChange={e => setRepeatValue2(parseInt(e.target.value))} />
        <Label variant="inline" htmlFor="times">times</Label>
      </FormField>
    </div>
  );
}


function ForRowsInputs({repeatValue1, repeatValue2, setRepeatValue1, setRepeatValue2}) {
  return (
    <div className="flex gap-x-5 w-full">
      <FormField className='flex-1'>
        <Label variant='inline' htmlFor="from">from</Label>
        <Input variant='inline' min="0" type="number" id="from" value={numtoString(repeatValue1)} onChange={e => {setRepeatValue1(parseInt(e.target.value));}} />
      </FormField>
      <FormField className='flex-1'>
        <Label variant='inline' htmlFor="until">until</Label>
        <Input variant='inline' min="0" type="number" id="until" value={numtoString(repeatValue2)} onChange={e => setRepeatValue2(parseInt(e.target.value))} />
      </FormField>
    </div>
  );
}

function validateForm(repeatValue1, repeatValue2, repeatValue3, title) {
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


function numtoString(num) {
  if (Number.isNaN(num)) return '';
  return num.toString();
}

