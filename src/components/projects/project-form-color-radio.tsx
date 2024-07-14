import {useFormContext} from 'react-hook-form';
import {FormField, FormItem, FormControl, FormMessage} from '../ui/form';
import {type FormValues} from './project-form';
import {RadioGroup, RadioGroupItem} from '../ui/radio-group-colors';

export default function ProjectFormColorRadio({defaultValues}: {defaultValues: FormValues}) {
  const form = useFormContext();

  return (
    <>
      <p className='font-semibold mt-2 mb-4'>Color</p>
      <FormField
        control={form.control}
        name="color"
        render={({field}) => (
          <FormItem className="space-y-3 pl-1">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={defaultValues.color}
                className="flex flex-row flex-wrap gap-6"
              >

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="olivine" className='bg-olivine' />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="orchid" className='bg-orchid' />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="flax" className='bg-flax' />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="jordy" className='bg-jordy' />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="tangerine" className='bg-tangerine' />
                  </FormControl>
                </FormItem>

              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}