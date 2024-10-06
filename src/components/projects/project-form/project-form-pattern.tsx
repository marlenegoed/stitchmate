import {useFormContext} from 'react-hook-form';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '../../ui/form';
import {Input} from '@/components/ui/input';
import {HiLink} from "react-icons/hi2";
import {Label} from '@/components/ui/label';
import {useState} from 'react';
import {Button} from '@/components/ui/button';



export default function ProjectFormPattern() {

  const form = useFormContext();
  const [url, setUrl] = useState(false)

  return (
    <>
      <div className='flex flex-row gap-6 w-full'>
        <FormField
          name={'pattern'}
          control={form.control}
          render={({field}) => (
            <FormItem className='flex-1'>
              <div className='bg-neutral-100 flex flex-row items-center px-4 rounded-lg'>
                <Label className='whitespace-nowrap text-gray-500'>pattern</Label>
                <FormControl>
                  <Input
                    variant='background'
                    className='text-left pl-2 placeholder:italic'
                    placeholder='add pattern name and author'
                    {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='button'
          className='h-12 w-12 bg-neutral-100 hover:bg-neutral-200/70 min-w-12 text-sienna-400 p-0'
          onClick={() => {
            setUrl(!url)
          }}>
          <HiLink size={16} />
        </Button>
      </div>

      {url &&
        <FormField
          name={'patternUrl'}
          control={form.control}
          render={({field}) => (
            <FormItem>
              <div className='bg-neutral-100 flex flex-row items-center px-4 rounded-lg'>
                <Label className='text-gray-500 flex items-center gap-2'>url</Label>
                <FormControl>
                  <Input
                    className='text-left pl-2'
                    variant='background'
                    {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      }

    </>
  )
}