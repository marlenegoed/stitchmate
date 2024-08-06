import {useFormContext} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel
} from '../../ui/form';
import {Input} from '../../ui/input';

export default function ProjectFormTitleField() {
  const form = useFormContext();
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem>
            <FormLabel className='font-semibold mt-2'>Title (required)</FormLabel>
            <FormControl>
              <Input placeholder={'my project'} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}