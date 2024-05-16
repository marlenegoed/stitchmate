"use client"

import {useCounterStore} from '@/providers/counter-store-provider';
import {CounterState} from '@/stores/counter-store';
import {useEffect} from 'react';

export default function HydrateCounterStore(params: CounterState) {
  const initialize = useCounterStore(state => state.initialize)
  useEffect(() => {
    initialize(params)
  }, [initialize, params])
  return null;
}