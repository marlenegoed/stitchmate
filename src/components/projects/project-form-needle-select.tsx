import {useFieldArray, useFormContext} from 'react-hook-form';

import {HiOutlineX, HiOutlinePlus} from "react-icons/hi";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Button} from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import {Input} from '../ui/input';

const needlesizes = [
  'US 0 - 2.0 mm',
  'US 1  - 2.25 mm',
  'US 1.5 - 2.5 mm',
  'US 2  - 2.75 mm',
  'US 2.5 - 3.0 mm',
  'US 3  - 3.25 mm',
  'US 4  - 3.5 mm',
  'US 5  - 3.75 mm',
  'US 6  - 4.0 mm',
  'US 7  - 4.5 mm',
  'US 8  - 5.0 mm',
  'US 9  - 5.5 mm',
  'US 10  - 6.0 mm',
  'US 10.5 - 6.5 mm',
  'US 11  - 8.0 mm',
  'US 13  - 9.0 mm',
  'US 15  - 10.0 mm',
  'US 17  - 12.0 mm',
  'US 19  - 15.0 mm',
  'US 35  - 19.0 mm',
  'US 50  - 25.0 mm',
]


export default function ProjectFormNeedleSelect() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "needles"})

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className='grid grid-cols-11 gap-4'>
            <FormField
              name={`needles.${index}.size`}
              control={form.control}
              render={({field}) => (
                <FormItem className='col-span-5'>
                  <FormLabel className='text-md font-semibold'>size</FormLabel>
                  <div className="flex items-center">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='font-normal border mr-2 mb-4'>
                          <SelectValue placeholder="select needle size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {needlesizes.map((needlesize) => <SelectItem key={needlesize} value={needlesize}>{needlesize}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`needles.${index}.usedFor`}
              control={form.control}
              render={({field}) => (
                <FormItem className='col-span-5'>
                  <FormLabel>used for</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input defaultValue={field.value} placeholder='e.g. main fabric, ribbing...' />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" variant="ghost" size="icon" className='col-span-1 self-center justify-self-end justify-end mt-2 text-neutral-500 hover:bg-white hover:text-slate-700' onClick={() => remove(index)}><HiOutlineX /></Button>
          </div>
        )

      })}
      <Button type="button" size="sm" variant='outline' className='flex gap-2 rounded' onClick={() => append({size: ""})}><HiOutlinePlus className='text-sienna-400' /> add</Button>
    </>
  )
}