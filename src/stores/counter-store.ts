// import {createStore} from 'zustand/vanilla'

import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware'

// the store itself does not need any change

export type CounterState = {
  storeCount: number,
  storeTitle: string,
}

export type CounterActions = {
  countStoreUp: () => void,
  countStoreDown: () => void,
  setStoreCount: (storeCount: number) => void,
  setStoreTitle: (title: string) => void,
  initialize: (state: CounterState) => void,
  reset: () => void,
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return defaultInitState;
}

export const defaultInitState: CounterState = {
  storeCount: 1,
  storeTitle: '',
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return create<CounterStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          countStoreUp: () => set((state) => {
            let newCount = state.storeCount + 1
            if (newCount > 999) newCount = 1
            return {storeCount: newCount}
          }),
          countStoreDown: () => set((state) => {
            let newCount = state.storeCount - 1
            if (newCount < 1) newCount = 1
            return {storeCount: newCount}
          }),
          setStoreCount: (storeCount) => set(() => ({storeCount})),
          setStoreTitle: (title) => set((state) => ({...state, storeTitle: title})),
          reset: () => set((state) => ({...state, storeCount: 1})),
          initialize: (state: CounterState) => set(() => ({...state}))
        }),
        {name: "counter-store"}
      ),
    )
  )
}