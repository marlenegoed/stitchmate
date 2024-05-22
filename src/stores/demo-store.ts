// import {createStore} from 'zustand/vanilla'

import {create} from 'zustand';
import {persist, devtools, createJSONStorage} from 'zustand/middleware'
import {type NewReminder, type Reminder} from '@/database/queries/projects';
import findNextReminders from '@/lib/find-next-reminders';

export type CounterState = {
  storeCount: number,
  storeTitle: string,
  numOfRows: number,
  reminders: Reminder[],
  nextReminders: Reminder[],
  sound: boolean,
  id: number,
}

export type CounterActions = {
  countStoreUp: () => void,
  countStoreDown: () => void,
  setStoreTitle: (title: string) => void,
  resetStore: () => void,
  setCount: (count: number) => void,
  setNumOfRows: (rows: number) => void,
  setReminder: (reminder: NewReminder) => void,
  updateReminder: (updatedReminder: Reminder) => void
  deleteReminder: (id: number) => void,
  toggleSound: () => void,
  initialize: (state: CounterState) => void,
}

export type DemoStore = CounterState & CounterActions

export const initDemoStore = (): CounterState => {
  return defaultInitState;
}

export const defaultInitState: CounterState = {
  storeCount: 1,
  storeTitle: 'title',
  numOfRows: 100,
  reminders: [],
  nextReminders: [],
  sound: true,
  id: 0,
}

export const createDemoStore = (
  initState: CounterState = defaultInitState,
) => {
  return create<DemoStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,

          countStoreUp: () => set((state) => ({
            ...state,
            storeCount: state.storeCount + 1,
            nextReminders: findNextReminders(state.reminders, state.storeCount + 1)
          })),

          countStoreDown: () => set((state) => {
            let newCount = state.storeCount - 1
            if (newCount < 1) newCount = 1
            return {
              ...state,
              storeCount: newCount,
              nextReminders: findNextReminders(state.reminders, newCount)
            }
          }),

          setStoreTitle: (title) => set((state) => ({
            ...state,
            storeTitle: title,
          })),

          resetStore: () => set(() => ({
            ...defaultInitState,
          })),

          setCount: (count) => set((state) => ({
            ...state,
            storeCount: count,
            nextReminders: findNextReminders(state.reminders, count)
          })),

          setNumOfRows: (rows) => set((state) => ({
            ...state,
            numOfRows: rows
          })),

          setReminder: (newReminder) => set((state) => {
            const reminder: Reminder = {
              id: state.id,
              sectionId: newReminder.sectionId,
              title: newReminder.title,
              note: newReminder.note || null,
              notification: !!newReminder.notification,
              type: newReminder.type,
              interval: newReminder.interval || null,
              times: newReminder.times || null,
              start: newReminder.start || null,
              from: newReminder.from || null,
              until: newReminder.until || null,
              updatedAt: newReminder.updatedAt || null,
              createdAt: newReminder.createdAt || null,
            }
            state.id++;
            const newReminders: Reminder[] = [...state.reminders, reminder];

            return {
              ...state, reminders: newReminders,
              nextReminders: findNextReminders(newReminders, state.storeCount),
            }
          }),

          updateReminder: (updatedReminder) => set((state) => {
            const updatedReminders: Reminder[] = state.reminders.map(reminder => {
              if (reminder.id === updatedReminder.id) {
                return updatedReminder
              } else {
                return reminder
              }
            })
            return {
              ...state,
              reminders: updatedReminders,
            }
          }),

          deleteReminder: (id) => set((state) => {
            const updatedReminders: Reminder[] = state.reminders.filter(reminder => reminder.id !== id)

            return {
              ...state,
              reminders: updatedReminders,
            }
          }),

          toggleSound: () => set((state) => ({...state, sound: !state.sound})),

          initialize: (state: CounterState) => set(() => ({...state}))
        }),
        {
          name: "demo-store",
          storage: createJSONStorage(() => sessionStorage)
        }
      ),
    )
  )
}





