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
  setStoreTitle: (title: string) => void, 
  initialize: (state: CounterState) => void,
}

export type CounterStore = CounterState & CounterActions

export const initCounterStore = (): CounterState => {
  return defaultInitState;
}

export const defaultInitState: CounterState = {
  storeCount: 0,
  storeTitle: 'title', 
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return create<CounterStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          countStoreUp: () => set((state) => ({storeCount: state.storeCount + 1})),
          countStoreDown: () => set((state) => ({storeCount: state.storeCount - 1})),
          setStoreTitle: (title) => set((state) => ({...state, storeTitle: title})),
          initialize: (state: CounterState) => set(() => ({...state}))
        }),
        {name: "counter-store"}
      ),
    )
  )
}

// export interface CounterState {
//   storeCount: number,
//   // numOfRows: number,
//   countStoreUp: () => void,
//   countStoreDown: () => void,
//   // setStoreCount: (count: number) => void,
// }


// export const useCounterStore = create<CounterState>()(
//   devtools(
//     persist(
//       (set) => ({
//         storeCount: 0,
//         countStoreUp: () => set((state) => ({storeCount: state.storeCount + 1})),
//         countStoreDown: () => set((state) => ({storeCount: state.storeCount - 1})),
//       }),
//       {name: "counter-store"}
//     )
//   )
// );



