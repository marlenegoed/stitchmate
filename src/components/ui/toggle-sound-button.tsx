'use client'

import {Button} from './button';
import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from "react-icons/hi2";

import {useState} from 'react';
import {Tooltip} from './tooltip';

export function ToggleSound({sound, onToggle}: {sound: boolean, onToggle?: () => void}) {
  const [enabled, setEnabled] = useState(sound)

  function toggleSound() {
    if (!onToggle) return

    onToggle()
    const newValue = !enabled
    setEnabled(newValue)
  }

  const speaker = enabled ? <HiOutlineSpeakerWave size={20} /> : <HiOutlineSpeakerXMark size={20} />

  return (
    // <Tooltip title="Toggle sound">
    <Button type='button' size='icon' variant='outline' className='h-8 w-8 border-neutral-300 rounded-full' onClick={toggleSound}>
      {speaker}
    </Button>
    // </Tooltip>
  )
}