"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import Image from 'next/image'
import {cn} from "@/lib/utils"

import pattern1 from '../../../public/pattern1_sm.png'
import pattern2 from '../../../public/pattern2_sm.png'
import pattern3 from '../../../public/pattern3_sm.png'
import pattern4 from '../../../public/pattern4_sm.png'
import pattern5 from '../../../public/pattern5_sm.png'
import pattern6 from '../../../public/pattern6_sm.png'
import pattern7 from '../../../public/pattern7_sm.png'
import pattern8 from '../../../public/pattern8_sm.png'

const PatternRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({className, ...props}, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
PatternRadioGroup.displayName = RadioGroupPrimitive.Root.displayName


const patterns = [pattern1, pattern2, pattern3, pattern4, pattern5, pattern6, pattern7, pattern8]

const PatternRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {patternId: number}
>(({className, patternId, ...props}, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-6 w-6 relative z-10 rounded-full text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}

      {...props}
    >
      <div className='h-8 w-8 relative bg-stone-400/60 rounded-full'>
        <Image
          alt="pattern"
          src={patterns[patternId - 1]}
          fill
          sizes="400px"
          style={{
            objectFit: 'cover', // cover, contain, none
          }}
        />
      </div>
      <RadioGroupPrimitive.Indicator className="w-fit flex items-center justify-center">
        <div className='absolute top-0 left-0 w-10 h-10 -mt-1 -ml-1 bg-inherit border border-sienna-400 rounded-full relativ z-2' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
PatternRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export {PatternRadioGroup, PatternRadioGroupItem}
