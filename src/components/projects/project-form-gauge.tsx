import {useFormContext} from 'react-hook-form';
import {
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem
} from '../ui/form';
import {Input} from '../ui/input';
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from '../ui/select';
import {cn} from '@/lib/utils';

export default function ProjectFormGauge({className}: {className: string}) {
  const form = useFormContext();
  return (
    <div className={cn(className)}>
      <p className='font-semibold mt-2 mb-4'>Gauge (optional)</p>
      <div className='grid grid-cols-3 gap-4'>
        <FormField
          control={form.control}
          name="gaugeStitches"
          render={({field}) => (
            <FormItem >
              <FormLabel>stitches</FormLabel>
              <FormControl>
                <Input placeholder={''} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gaugeRows"
          render={({field}) => (
            <FormItem>
              <FormLabel>rows</FormLabel>
              <FormControl>
                <Input placeholder={''} type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gaugeInch"
          render={({field}) => (
            <FormItem>
              <FormLabel>inch</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='border'>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1"'>{`1"`}</SelectItem>
                  <SelectItem value='2"'>{`2"`}</SelectItem>
                  <SelectItem value='4"'>{`4"`}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}