'use client'

import useSound from 'use-sound';
import {Button} from './button';
import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from 'react-icons/hi2';
import {useState} from 'react';

export function ToggleSound({sound, onToggle}: {sound: boolean, onToggle: () => void}) {
  const [enabled, setEnabled] = useState(sound)
  const [play] = useSound('/click-2.mp3', {interrupt: true});

  function toggleSound() {
    onToggle()
    const newValue = !enabled
    if (newValue) play()
    setEnabled(newValue)
  }

  const speaker = enabled ? <HiOutlineSpeakerWave size={24} /> : <HiOutlineSpeakerXMark size={24} />
  return <Button type='button' size='icon' variant='ghost' className='border-slate-800' onClick={toggleSound}>
    {speaker}
  </Button>
}