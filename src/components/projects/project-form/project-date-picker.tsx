import {HiCalendarDays} from "react-icons/hi2";
import {FieldValues, useFormContext} from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../ui/form';
import {format, formatDistanceToNow, formatDistance} from "date-fns"
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Calendar} from "@/components/ui/calendar"
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

export function DatePickerStart({createdAt}: {createdAt: Date}) {
  const form = useFormContext();
  const startDate = form.watch("createdAt")
  const daysSince = formatDistanceToNow(startDate) + ' ago'

  return (
    <FormField
      control={form.control}
      name="createdAt"
      render={({field}) => (
        <FormItem>
          <div>
            <FormLabel className='font-semibold text-md'>Started</FormLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"datepicker"}
                  className={cn(
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {format(field.value, "PPP")}
                  <HiCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <span>{daysSince}</span>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DatePickerFinishedBy({finishBy}: {finishBy?: Date}) {
  const form = useFormContext()
  const finishDate = form.watch("finishBy") || finishBy
  const daysLeft = finishDate ? formatDistanceToNow(finishDate) + ' left' : ''

  return (
    <FormField
      control={form.control}
      name="finishBy"
      render={({field}) => (
        <FormItem>
          <div>
            <FormLabel className='font-semibold text-md'>Finish By</FormLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"datepicker"}
                  className={cn(
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <HiCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <span>{daysLeft}</span>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}



export function DatePickerCompleted({completed, createdAt}: {completed?: Date, createdAt: Date}) {
  const form = useFormContext()
  const endDate = form.watch("completed")
  const daysLeft = endDate ? formatDistanceToNow(endDate) + ' left' : ''

  return (
    <FormField
      control={form.control}
      name="completed"
      render={({field}) => (
        <FormItem>
          <div>
            <FormLabel className='font-semibold text-md'>Completed</FormLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"datepicker"}
                  className={cn(
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <HiCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <span>{daysLeft}</span>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}


export function DatePickerPlanned({startDate}: {startDate?: Date}) {
  const form = useFormContext()
  const planned = form.watch("completed")
  const daysLeft = planned ? formatDistanceToNow(startDate ?? planned) + ' from now' : ''

  return (
    <FormField
      control={form.control}
      name="completed"
      render={({field}) => (
        <FormItem>
          <div>
            <FormLabel className='font-semibold text-md'>Start On</FormLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"datepicker"}
                  className={cn(
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <HiCalendarDays className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <span>{daysLeft}</span>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}