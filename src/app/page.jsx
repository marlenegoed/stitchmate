'use client';

import useSound from 'react';

import {useStore} from './store';
import Counter from '@/components/ui/counter';
import {Button} from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import {EditableTitle} from '@/components/ui/counter-title';
import ResetAlert from '@/components/ui/reset-alert-dialog';


import {config} from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRotateLeft, faMinus, faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

// Todo: Edit title 
// prompt for button reset 

export default function Page () {

  const {count, countUp, countDown, setTitle} = useStore();

  function playSound () {}

  return (
    <>
      <EditableTitle />
      <Counter />
      <section className='flex justify-around'>
        <Button size="icon" onClick={countDown}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <Button size="icon">
          <FontAwesomeIcon icon={faVolumeHigh} />
        </Button>
        <ResetAlert />
      </section>
    </>
  );

}