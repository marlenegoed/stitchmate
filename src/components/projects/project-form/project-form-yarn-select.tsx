import {useFieldArray, useFormContext} from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import {Button} from '../../ui/button';
import {Input} from '../../ui/input';
import {HiOutlineX, HiOutlinePlus} from 'react-icons/hi';

export default function ProjectFormYarn() {
  const form = useFormContext();
  const {fields, append, remove} = useFieldArray({control: form.control, name: "yarn"})

  return (
    <>
      {fields.map((field, index) => {
        return (
          <div className='flex flex-row-reverse justify-end'>
            <Button type="button" variant="ghost" size="icon" className='col-span-1 justify-self-start mt-2 text-neutral-500 hover:bg-white hover:text-slate-700' onClick={() => remove(index)}><HiOutlineX /></Button>

            <div className='flex flex-col'>
              <FormField
                key={field.id}
                name={`yarn.${index}.name`}
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input placeholder="add yarn" className='py-6 mr-2 font-normal' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex'>
                <FormField
                  key={field.id}
                  name={`yarn.${index}.color`}
                  control={form.control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>colorway</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  key={field.id}
                  name={`yarn.${index}.lot`}
                  control={form.control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>dye lot</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                key={field.id}
                name={`yarn.${index}.material`}
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <FormLabel>material</FormLabel>
                    <div className="flex items-center">
                      <FormControl>
                        <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex'>
                <FormField
                  key={field.id}
                  name={`yarn.${index}.yardage`}
                  control={form.control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>yardage</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  key={field.id}
                  name={`yarn.${index}.perSkein`}
                  control={form.control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>grams</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  key={field.id}
                  name={`yarn.${index}.perSkein`}
                  control={form.control}
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>total skeins</FormLabel>
                      <div className="flex items-center">
                        <FormControl>
                          <Input placeholder="" className='py-6 mr-2 font-normal' {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

          </div>
        )

      })}
      <Button type="button" size="sm" variant='outline' className='flex gap-2 rounded w-14 text-sienna-400 border-sienna-400 mt-2' onClick={() => append({size: ""})}><HiOutlinePlus />add</Button>

    </>
  )
}