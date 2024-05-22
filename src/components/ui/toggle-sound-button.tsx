'use client'

import {Button} from './button';
import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from 'react-icons/hi2';
import {useState} from 'react';

export function ToggleSound({sound, onToggle}: {sound: boolean, onToggle?: () => void}) {
  const [enabled, setEnabled] = useState(sound)

  function toggleSound() {
    if (!onToggle) return

    onToggle()
    const newValue = !enabled
    setEnabled(newValue)
  }

  const speaker = enabled ? <HiOutlineSpeakerWave size={24} /> : <HiOutlineSpeakerXMark size={24} />
  return <Button type='button' size='icon' variant='ghost' className='border-slate-800  hover:bg-neutral-200 hover:bg-opacity-80 transition-colors' onClick={toggleSound}>
    {speaker}
  </Button>
}