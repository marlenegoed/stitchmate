import {useFormContext} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '../../ui/form';
import {Input} from '../../ui/input';
import {Label} from '@/components/ui/label';

export default function ProjectFormTitleField() {
  const form = useFormContext();
  return (
    <>
    <div className='flex flex-row gap-6'> 
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem className='flex-1'>
            <div className='w-full flex items-center bg-neutral-100 px-4 rounded-lg flex-row'> 
            <Label className='text-gray-500'>title</Label>
            <FormControl>
              <Input className='text-left pl-2 mt-0' variant='background' placeholder={'my project'} {...field} />
            </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={'size'}
        control={form.control}
        render={({field}) => (
          <FormItem className='w-1/3'>
              <div className='bg-neutral-100 flex flex-row items-center px-4 rounded-lg'>
                <Label className='whitespace-nowrap text-gray-500'>size</Label>
              <FormControl>
                <Input
                  className='text-left pl-2 mt-0 placeholder:italic' variant='background' placeholder='add size or bust'
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
    </>
  )
}