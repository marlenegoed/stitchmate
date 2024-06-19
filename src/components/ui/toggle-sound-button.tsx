'use client'

import {Button} from './button';
import {HiOutlineVolumeUp, HiOutlineVolumeOff} from "react-icons/hi";
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

  const speaker = enabled ? <HiOutlineVolumeUp size={24} /> : <HiOutlineVolumeOff size={24} />
  return (
    <Tooltip title="Toggle sound">
      <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={toggleSound}>
        {speaker}
      </Button>
    </Tooltip>
  )
}