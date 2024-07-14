import {useFieldArray, useFormContext} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form';
import {Button} from '../ui/button';
import {Input} from '../ui/input';
import {HiOutlineX, HiOutlinePlus} from 'react-icons/hi';

export default function ProjectFormYarnSelect() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "yarn"})

  return (
    <div className="order-5 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-6 flex flex-col gap-y-4 bg-white rounded-lg pt-6 pb-10 pr-4 pl-8 ">
      <div className="flex items-center justify-between">
        <FormLabel className='font-semibold text-md'>Yarn (optional)</FormLabel>
        <Button type="button" variant="ghost" size="icon" onClick={() => append({size: ""})}><HiOutlinePlus className='text-sienna-400' /></Button>
      </div>
      {fields.map((field, index) => {
        return (
          <FormField
            key={field.id}
            name={`yarn.${index}.yarn`}
            control={form.control}
            render={({field}) => (
              <FormItem>
                <div className="flex items-center">
                  <FormControl>
                    <Input placeholder="add yarn" className='py-6 mr-2 font-normal' {...field} />
                  </FormControl>
                  <Button type="button" variant="ghost" size="icon" className=' hover:bg-white hover:text-slate-700 text-neutral-500 disabled:opacity-50 transform opacity' disabled={fields.length < 2} onClick={() => remove(index)}>
                    <HiOutlineX className='mr-2' />
                  </Button>
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