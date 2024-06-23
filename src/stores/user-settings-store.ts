// import {createStore} from 'zustand/vanilla'

import {create} from 'zustand';
import {persist, devtools} from 'zustand/middleware'

export type UserSettingsState = {
  storeSound: boolean,
  showGuide: boolean,
}

export type UserSettingsActions = {
  toggleStoreSound: () => void,
  hideGuide: () => void,
  initialize: (state: UserSettingsState) => void,
}

export type UserSettingsStore = UserSettingsState & UserSettingsActions

export const initUserSettingsStore = (): UserSettingsState => {
  return defaultInitState;
}

export const defaultInitState: UserSettingsState = {
  storeSound: false,
  showGuide: true,
}

export const createUserSettingsStore = (
  initState: UserSettingsState = defaultInitState,
) => {
  return create<UserSettingsStore>()(
    devtools(
      persist(
        (set) => ({
          ...initState,
          toggleStoreSound: () => set((state) => ({storeSound: !state.storeSound})),
          hideGuide: () => set((state) => ({showGuide: false})),
          initialize: (state: UserSettingsState) => set(() => ({...state}))
        }),
        {name: "user-settings-store"}
      ),
    )
  )
}