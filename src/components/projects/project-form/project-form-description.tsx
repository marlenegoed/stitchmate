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

export default function ProjectFormDescription({className}: {className?: string}) {
  const form = useFormContext();
  return (
    <div className={cn(className)}>
      <FormField
        control={form.control}
        name="description"
        render={({field}) => (
          <FormItem>
            <div className=''>
              <FormLabel className='font-semibold text-md'>Description (optional)</FormLabel>
            </div>
            <FormControl>
              <Textarea
                placeholder="add description..."
                className="border"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </div>
  )
}