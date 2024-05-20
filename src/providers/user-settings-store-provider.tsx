'use client'

import {type ReactNode, createContext, useRef, useContext} from 'react'
import {type StoreApi, useStore} from 'zustand'

import {createUserSettingsStore, type UserSettingsStore, initUserSettingsStore} from '@/stores/user-settings-store'

export const UserSettingsStoreContext = createContext<StoreApi<UserSettingsStore> | null>(
  null,
)

export interface UserSettingsStoreProviderProps {
  children: ReactNode
}

export const UserSettingsStoreProvider = ({
  children,
}: UserSettingsStoreProviderProps) => {
  const storeRef = useRef<StoreApi<UserSettingsStore>>()
  if (!storeRef.current) {
    storeRef.current = createUserSettingsStore(initUserSettingsStore())
  }

  return (
    <UserSettingsStoreContext.Provider value={storeRef.current}>
      {children}
    </UserSettingsStoreContext.Provider>
  )
}

export const useUserSettingsStore = <T,>(
  selector: (store: UserSettingsStore) => T,
): T => {
  const userSettingsStoreContext = useContext(UserSettingsStoreContext)

  if (!userSettingsStoreContext) {
    throw new Error(`useuserSettingsStore must be use within UserSettingsStoreProvider`)
  }

  return useStore(userSettingsStoreContext, selector)
}