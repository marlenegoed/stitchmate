import {cn} from '@/lib/utils';
import {useFormContext} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../ui/form';
import {Textarea} from '../../ui/textarea';
import {Label} from '@/components/ui/label';

export default function ProjectFormDescription({className}: {className?: string}) {
  const form = useFormContext();
  return (
    <div className={cn(className)}>
      <FormField
        control={form.control}
        name="description"
        render={({field}) => (
          <FormItem>  
          <div className='flex flex-col bg-neutral-100 rounded-lg p-4 gap-3'>    
              <Label className='text-gray-500'>Description</Label>
            <FormControl>
              <Textarea 
                placeholder="add description..."
                className="border-none p-0"
                rows={3}
                {...field}
              />
            </FormControl>
            </div>  
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  )
}