"use client"

import {useDemoStore} from '@/providers/counter-store-provider';
import {DemoState} from '@/stores/demo-store';
import {useEffect} from 'react';

export default function HydrateCounterStore(params: CounterState) {
  const initialize = useCounterStore(state => state.initialize)
  useEffect(() => {
    initialize(params)
  }, [initialize, params])
  return null;
}