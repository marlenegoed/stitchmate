'use client'
import {HiHeart} from 'react-icons/hi2'
import {Button} from '../ui/button'
import clsx from 'clsx'

 

export default function MakeFavorite({projectId} : {projectId: number}) {

  async function handleClick() {
      console.log(favorite)
  }

  return (

        <Button variant='ghost' size='icon' onClick={handleCLick}> <HiHeart className={clsx()}/></Button>

      )
    

}