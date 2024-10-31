'use client'

import {useState} from 'react';
import DrawerDialog from '../ui/drawer-dialog';
import {motion} from 'framer-motion';
import {SlOptionsVertical} from 'react-icons/sl';


export default function CounterSettings () {

  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

    return (

      <DrawerDialog open setOpen={setOpen} >

          <DrawerDialog.Trigger>
         
            <motion.button
        whileTap={{scale: 0.97}}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-12 w-12 bg-sienna-100 flex justify-center items-center rounded-full text-sienna-400 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"><SlOptionsVertical size={20} /></div>
      </motion.button>
    
          </DrawerDialog.Trigger>


      </DrawerDialog>
    )


}