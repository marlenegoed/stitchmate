import {useFormContext} from 'react-hook-form';
import {FormField, FormItem, FormControl, FormMessage} from '../../ui/form';
import {type FormValues} from '../project-form';
import {PatternRadioGroup, PatternRadioGroupItem} from '../../ui/radio-group-patterns';

export default function PatternRadio({defaultValues}: {defaultValues: FormValues}) {
  const form = useFormContext();
  const patternId = defaultValues.patternId ? defaultValues.patternId.toString() : '1'

  return (
    <>
      <p className='font-semibold mt-2'>Pattern</p>
      <FormField
        control={form.control}
        name="patternId"
        render={({field}) => (
          <FormItem className="space-y-3 pl-1">
            <FormControl>
              <PatternRadioGroup
                onValueChange={field.onChange}
                defaultValue={patternId}
                className="flex flex-row flex-wrap gap-6"
              >

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="1" patternId={1} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="2" patternId={2} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="3" patternId={3} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="4" patternId={4} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="5" patternId={5} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="6" patternId={6} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="7" patternId={7} />
                  </FormControl>
                </FormItem>

                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <PatternRadioGroupItem value="8" patternId={8} />
                  </FormControl>
                </FormItem>

              </PatternRadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}