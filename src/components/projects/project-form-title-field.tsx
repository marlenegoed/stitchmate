import {useFormContext} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '../ui/form';
import {Input} from '../ui/input';

export default function ProjectFormTitleField() {
  const form = useFormContext();
  return (
    <>
      <p className='font-semibold mt-2'>Title</p>
      <FormField
        control={form.control}
        name="title"
        render={({field}) => (
          <FormItem>
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