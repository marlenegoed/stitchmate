// import {createStore} from 'zustand/vanilla'

import {create} from 'zustand';
import {persist, devtools, createJSONStorage} from 'zustand/middleware'
import {type NewReminder, type Reminder} from '@/database/queries/queries';
import {colors} from '@/lib/colors'

export type DemoState = {
  reminders: Reminder[],
  id: number,
  numOfRows: number,
  color: string,
}

export type DemoActions = {
  setNumOfRows: (numOfRows: number) => void,
  resetStore: () => void,
  setReminder: (reminder: NewReminder) => void,
  updateReminder: (updatedReminder: Reminder) => void
  deleteReminder: (id: number) => void,
  initialize: (state: DemoState) => void,

}

export type DemoStore = DemoState & DemoActions

export const initDemoStore = (): DemoState => {
  return defaultInitState;
}

export const defaultInitState: DemoState = {
  reminders: [],
  id: 0,
  numOfRows: 20,
  color: colors[Math.floor(Math.random() * colors.length)],
}

export const createDemoStore = (
  initState: DemoState = defaultInitState,
) => {
  return create<DemoStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,

          setNumOfRows: (numOfRows) => set((state) => ({
            ...state,
            numOfRows
          })),

          resetStore: () => set(() => ({
            ...defaultInitState,
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

            return {
              ...state,
              id: state.id + 1,
              reminders: [...state.reminders, reminder],
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

          initialize: (state: DemoState) => set(() => ({...state}))
        }),
        {
          name: "demo-store",
          storage: createJSONStorage(() => sessionStorage)
        }
      ),
    )
  )
}





