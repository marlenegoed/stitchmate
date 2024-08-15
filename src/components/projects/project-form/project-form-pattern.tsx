import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '../../ui/form';
import {Input} from '@/components/ui/input';
import {HiMiniLink} from "react-icons/hi2";



export default function ProjectFormPattern() {

  const form = useFormContext();


  return (
    <>
      <FormField
        name={'pattern'}
        control={form.control}
        render={({field}) => (
          <FormItem className='col-span-5'>
            <FormLabel>pattern name</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input defaultValue={field.value} placeholder='add name' />
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
          <FormItem className='col-span-5'>
            <FormLabel>size</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input defaultValue={field.value} placeholder='add size or bust' />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        name={'patternUrl'}
        control={form.control}
        render={({field}) => (
          <FormItem className='col-span-5'>
            <FormLabel className='flex items-center gap-2'><HiMiniLink />url</FormLabel>
            <div className="flex items-center">
              <FormControl>
                <Input defaultValue={field.value} placeholder='add link (e.g. ravelry)' />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

    </>
  )
}