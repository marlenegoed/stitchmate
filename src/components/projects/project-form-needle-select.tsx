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
    <div className="order-3 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 flex flex-col bg-white rounded-lg p-8 pr-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <FormLabel className='text-md font-semibold'>Needles (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><HiOutlinePlus className='text-sienna-400' /></Button>
      </div>
      {fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            name={`needles.${index}.size`}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='font-normal border mr-2 mb-4'>
                        <SelectValue placeholder="select needle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {needlesizes.map((needlesize) => <SelectItem key={needlesize} value={needlesize}>{needlesize}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="ghost" size="icon" className='mr-1 -mt-4 text-neutral-500 disabled:opacity-50 transform opacity hover:bg-white hover:text-slate-700' disabled={fields.length < 2} onClick={() => remove(index)}><HiOutlineX /></Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      })}
    </div>
  )
}